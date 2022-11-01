import bcrypt from 'bcrypt';
import { IS_ONLINE_USER } from '../../subscriptionsConst';
import { createToken } from '../../utils/token';
import { publishWithoutMe } from '../../utils/publishWithoutMe';
import { isAuth } from '../../utils/isAuth';
import { getImgurData } from '../../services/imgurService';
import { createModule } from 'graphql-modules';
import { UserModule } from './generated-types/module-types';
import { join, resolve } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';

export const onlinePublish = async (
    context: GraphQLModules.GlobalContext,
    userId: number | null, 
    currentDate: Date | null) => {

    if (userId) {
        try {
            await context.prisma.user.update({
                where: { id: userId },
                data: { lastTime: { set: currentDate } }
            });
        } catch (err: any) {
            console.dir(`onlinePublish ${err}
                userId=${userId} lastTime=${currentDate}`);
            throw new Error(
                JSON.stringify({email: `set lastTime error`}));
        }  
    };           
    context.pubsub.publish(IS_ONLINE_USER, { userIsOnline: {
        userId,
        lastTime: currentDate ? currentDate.getTime() : null
    }});
};

const resolvers: UserModule.Resolvers = {
    Query: {
        async user(_, args, context){
            const user = await context.prisma.user.findUnique({
                where: {
                    id: args.id
                },
            });
            if (!user) throw Error('no such user');
            return user;
        },
        async allUsers(_, __, context) {
            return context.prisma.user.findMany();
        },
        async me(_, __, context) {  
            isAuth(context);
            return context.prisma.user.findFirst({ where: { id: context.userId as number }})
        },
        async imgur() {
           return getImgurData();
        },
        async getPosts(_, args, context){
            return context.prisma.link.findMany({
                where: {
                    postedById: args.userId
                }
            })
        }
    },
    Mutation: {
        async signup(_, args, context) {
            let user = await context.prisma.user.findUnique({
                where: { email: args.email }
            });
            if (user) throw new Error(
                JSON.stringify({email: 'error: user already exist !!!'}));

            const password = await bcrypt.hash(args.password, 10); 
            user = await context.prisma.user.create({
                data: {...args, password}
            });
            await onlinePublish(context, user.id, null);
            return { token: createToken(user.id), user};             
        },

        async login(_, args, context) {
            const user = await context.prisma.user.findUnique({
                where: { email: args.email }
            });
            if (!user) throw new Error(
                JSON.stringify({email: 'error: not such user !'}));

            if (!user.password) throw new Error(
                JSON.stringify({email: 'error: this user was authorized through social media !'}));

            const res = await bcrypt.compare(args.password, user.password);
            if(!res) throw new Error(JSON.stringify({password: 'invalid password'}));

            await onlinePublish(context, user.id, null);
            return { token: createToken(user.id), user};    
        },

        async logout(_, __, context) {
            isAuth(context);
            await onlinePublish(context, context.userId as number, new Date());
            return true;
        },

        async logWithValidToken(_, __, context) {
            isAuth(context);
            await onlinePublish(context, context.userId, null);
            return true;
        },

        async changeAvatar(_, args, context) {
            isAuth(context);
            try {
                await context.prisma.user.update({
                    where: { id: context.userId as number },
                    data: { 
                        imageLink: { set: args.imageLink },
                        deletehash: { set: args.deletehash}
                    }
                });
            } catch (err: any) { 
                throw new Error('error change avatar');
            }
            return true;
        },
    },
    Subscription: {
        userIsOnline: {
            subscribe: publishWithoutMe(IS_ONLINE_USER)
        }
    },
    User: {
        async links(parent, _, context) {
            return context.prisma.link.findMany({
                where: {
                    postedById: parent.id
                }
            })
        } 
    }
};

export const usersModule = createModule({
    id: 'users-module',
    dirname: __dirname,
    typeDefs: loadFilesSync(
        join(resolve(), 'src/modules/user/user.graphql'),
    ),
    resolvers
});