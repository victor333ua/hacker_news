import { Link, Prisma } from ".prisma/client";
import { isAuth } from "../utils/isAuth";
import { MyContext } from "../types";
import { DELETE_POST, NEW_POST, VOTE_POST } from "../subscriptionsConst";
import { publishWithoutMe } from './../utils/publishWithoutMe';

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

            if (args.cursor) {
                const date = new Date(parseInt(args.cursor));
                where = { ...where, createdAt: { lt: date }};
            }
           
            const orderBy: any = { createdAt: 'desc' };
            const take = Number(args.take);
            const params = {
                where, 
                orderBy, 
                take: take + 1, 
                skip: args.skip,
            };
            let hasMore = true;
            const posts = await context.prisma.link.findMany(params);
            if (posts.length <= take) hasMore = false;
            return {
                posts: posts.slice(0, take),
                hasMore
            }
        }
    },
    Mutation: {
        async createPost(_: any, args: any, context: MyContext) {
            isAuth(context);
            const newPost = await context.prisma.link.create({
                data: { ...args, postedById: context.userId }
            });  
// pass userId from http context to compare with ws clients id       
            await context.pubsub.publish(
                NEW_POST,
                { postCreated: { newPost, userId: context.userId }}
            );           
            return newPost;
        },
        async deletePost(_: any, args: any, context: MyContext) {
            isAuth(context);
            let postDeleted;
            try {
                postDeleted = await context.prisma.link.delete({ where: { id: args.id }});
            } catch (e: any) {
                console.log('deletePostError: ', e.message);
                throw new Error(`error deleting post: ${e.message}`);
            }
            await context.pubsub.publish(
                DELETE_POST,
                { postDeleted: { postId: args.id, userId: context.userId }}
            );
            return postDeleted;
        },
        async vote(_: any, args: any, context: MyContext) {
            isAuth(context);
            let value;
            try {
                const updoot = await context.prisma.updoot.findUnique({
                    where: {
                        postId_userId: { postId: args.postId, userId: context.userId as number }
                    }
                });
                if (updoot) {
                    if (updoot.value === args.value) return false;
                    await context.prisma.updoot.update({
                        where: {
                            postId_userId: { postId: args.postId, userId: context.userId as number }
                        },
                        data: { value: args.value }
                    });
                    value = 2*args.value;
                } else {
                    await context.prisma.updoot.create({ data: {
                        postId: args.postId, 
                        userId: context.userId as number,
                        value: args.value 
                    }});
                    value = args.value;
                }                   
            } catch (e: any) {
                console.log('votePostError: ', e.message);
                throw new Error(`votePostError: ${e.message}`);
            }

            await context.pubsub.publish(VOTE_POST, {
                postVoted: { postId: args.postId, value, userId: context.userId }
            });
            return true;
        },
    },

    Subscription: {
        postCreated: {
            subscribe: publishWithoutMe(NEW_POST)
        },
        postDeleted: {
            subscribe: publishWithoutMe(DELETE_POST)
        },
        postVoted: {
            subscribe: publishWithoutMe(VOTE_POST)
        }
    },

    Link: {
        async postedBy(parent: Link, _: any, context: MyContext) {
            return context.prisma.user.findUnique({
                where: { id: parent.postedById as number }
            })
        },
        async votesUp(parent: Link, _: any, context: MyContext) {
            const count = await context.prisma.updoot.count({
                where: {
                    postId: parent.id,
                    value: 1   
                }               
            });
            return count ? count : 0; 
        },
        async votesDown(parent: Link, _: any, context: MyContext) {
            const count = await context.prisma.updoot.count({
                where: {
                    postId: parent.id,
                    value: -1   
                }               
            });
            return count ? count : 0; 
        },
        async voteValue(parent: Link, _: any, context: MyContext) {
            if (!context.userId) return 0;
            const updoot = await context.prisma.updoot.findUnique({
                where: {
                    postId_userId: { postId: parent.id, userId: context.userId as number }
                },
                select: { value: true }
            });
            return updoot ? updoot.value : 0;
        }
    }
}