import { User } from '.prisma/client';
import bcrypt from 'bcrypt';
import "dotenv-safe/config.js";
import { IS_ONLINE_USER } from '../subscriptionsConst.js';
import { MyContext } from '../types.js';
import { createToken } from '../utils/token.js';

const onlinePublish = async (context: MyContext, userId: number, currentDate: Date | null) => {
    try {
        await context.prisma.user.update({
            where: { id: userId },
            data: { lastTime: { set: currentDate } }
        });
    } catch (err: any) {
        console.dir(err);
        throw new Error(
            JSON.stringify({email: `invalid lastTime`}));
    }             
    context.pubsub.publish(IS_ONLINE_USER, { userIsOnline: {
        userId,
        lastTime: currentDate 
    }});
};

export const usersResolver = {
    Query: {
        async user(_: any, args: { id: number}, context: MyContext){
            return context.prisma.user.findUnique({
                where: {
                    id: args.id
                }
            });
        },
        async allUsers(_: any, __: any, context: MyContext) {
            return context.prisma.user.findMany();
        },
        async me(_: any, __: any, context: MyContext) {
            if (!context.userId) throw new Error('not authenticated');
            return context.prisma.user.findFirst({ where: { id: context.userId }})
        }
    },
    Mutation: {
        async signup(_: any, args: any, context: MyContext) {
            const password = await bcrypt.hash(args.password, 10); 
            const user = await context.prisma.user.create({
                data: {...args, password}
            });
           return createToken(user);             
        },

        async login(_: any, args: any, context: MyContext) {
            const user = await context.prisma.user.findUnique({
                where: { email: args.email }
            });
            if (!user) throw new Error(
                JSON.stringify({email: 'not such user'}));

            const res = await bcrypt.compare(args.password, user.password);
            if(!res) throw new Error(JSON.stringify({password: 'invalid password'}));

            onlinePublish(context, user.id, null);
            return createToken(user);   
        },

        async logout(_: any, __: any, context: MyContext) {
            onlinePublish(context, context.userId as number, new Date());
            return true;
        },
    },
    Subscription: {
        userIsOnline: {
            subscribe: (_: any, __: any, context: any) => 
                    context.pubsub.asyncIterator(IS_ONLINE_USER),
        },
    },
    User: {
        async links(parent: User, _: any, context: MyContext) {
            return context.prisma.link.findMany({
                where: {
                    postedById: parent.id
                }
            })
        }
    }
};