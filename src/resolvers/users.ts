import { User } from '.prisma/client';
import bcrypt from 'bcrypt';
import "dotenv-safe/config.js";
import { MyContext } from '../types.js';
import { createToken } from '../utils/token.js';

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
        }
    },
    Mutation: {
        async signup(_: any, args: any, context: MyContext) {
            const password = await bcrypt.hash(args.password, 10); 
                // process.env.PASSWORD_SECRET);
            const user = await context.prisma.user.create({
                data: {...args, password}
            });
           return createToken(user);             
        },

        async login(_: any, args: any, context: MyContext) {
            const user = await context.prisma.user.findUnique({
                where: { email: args.email }
            });
            if (!user) throw new Error('not such user');
            const res = await bcrypt.compare(args.password, user.password);
            if(!res) throw new Error('invalid password');
            return createToken(user);   
        }
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