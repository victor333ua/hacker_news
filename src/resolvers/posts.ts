import { Link, Prisma } from ".prisma/client";
import { MyContext } from "../types";

export const postsResolver = {
    Query: {
        async feed(_: any, args: any, context: MyContext){
            let where: Prisma.LinkWhereInput = args.filter
            ? {
                OR: [
                    { description: { contains: args.filter } },
                    { url: { contains: args.filter } },
                ],
            }
            : {};

            if (args.cursor)  where = { ...where, createdAt: { gt: args.cursor }};
           
            const orderBy: any = { createdAt: 'desc' };
            const params = {
                where, 
                orderBy, 
                take: args.take, 
                skip: args.skip,
            };
           
            return context.prisma.link.findMany(params);
        }
    },
    Mutation: {
        async createPost(_: any, args: any, context: MyContext) {
            if (!context.userId) throw new Error('not authenticated');
            const newPost = context.prisma.link.create({
                data: { ...args, postedById: context.userId }
            });
            // context.pubsub.publish("NEW_LINK", newLink);
            return newPost;
        },
        async deletePost(_: any, args: any, context: MyContext) {
            if (!context.userId) throw new Error('not authenticated');
            return context.prisma.link.delete({ where: { id: args.id }});
        }
    },
    // Subscription: {
    //     newPostSubscribe(_, args, context) {
    //         return context.pubsub.asyncIterator("NEW_POST");
    //     }
    // },

    Link: {
        async postedBy(parent: Link, _: any, context: MyContext) {
            return context.prisma.user.findUnique({
                where: { id: parent.postedById as number }
            })
        }
    }
}