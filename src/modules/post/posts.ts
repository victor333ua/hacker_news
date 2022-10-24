import { Prisma } from ".prisma/client";
import { isAuth } from "../../utils/isAuth";
import { DELETE_POST, NEW_POST, VOTE_POST } from "../../subscriptionsConst";
import { publishWithoutMe } from '../../utils/publishWithoutMe';

import { createModule } from 'graphql-modules';
import { PostModule } from './generated-types/module-types';
import { loadFilesSync } from "@graphql-tools/load-files";
import { join, resolve } from "path";
 
const resolvers: PostModule.Resolvers = {
    Query: {
        async feed(_, args, context){
            let where: Prisma.LinkWhereInput = args.filter
            ? {
                OR: [
                    { description: { contains: args.filter } },
                ],
            }
            : {};

            if (args.cursor) {
                const date = new Date(parseInt(args.cursor));
                where = { ...where, createdAt: { lt: date }};
            }
           
            const orderBy: Prisma.Enumerable<Prisma.LinkOrderByWithRelationInput> =
                { createdAt: 'desc' };
            const take = Number(args.take);
            const params = {
                where, 
                orderBy, 
                take: take + 1, 
                skip: args.skip ? Number(args.skip) : 0
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
        async createPost(_, args, context) {
            isAuth(context);
            let newPost;
            try {
                newPost = await context.prisma.link.create({
                    data: {
                        ...args, 
                        postedById: context.userId as number }
                }); 
            } catch (e: any) {
                console.log('createPostError: ', e.message);
                throw new Error(`error creating post: ${e.message}`);
            };
            try { 
                await context.pubsub.publish(
                    NEW_POST,
                    { postCreated: { newPost, userId: context.userId }}
                );
            } catch (e: any) {
                console.log('createPostErrorPublish: ', e.message);
                throw new Error(`error publishing new post: ${e.message}`);
            }            
            return newPost;
        },
        async deletePost(_, args, context) {
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
            return postDeleted.id;
        },
        async vote(_, args, context) {
            isAuth(context);
            const { delta } = args;
            try {
                // voting is the same as prev - nothing to do
                if (!delta) return false;

                // previous voting exist, change to opposite
                if (delta === 2 || delta === -2)
                    await context.prisma.updoot.update({
                        where: {
                            postId_userId: { postId: args.postId, userId: context.userId as number }
                        },
                        data: { value: { increment: delta }}
                    });
                // user for this post votes first time    
                else {
                    await context.prisma.updoot.create({ data: {
                        postId: args.postId, 
                        userId: context.userId as number,
                        value: delta 
                    }});
                }                   
            } catch (e: any) {
                console.log('votePostError: ', e.message);
                throw new Error(`votePostError: ${e.message}`);
            }

            await context.pubsub.publish(VOTE_POST, {
                postVoted: { postId: args.postId, delta, userId: context.userId }
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
        async postedBy(parent, _, context) {
            const user = await context.prisma.user.findUnique({
                where: { id: parent.postedById as number }
            });
            if (!user) throw new Error('Post w/o owner');
            return user; 
        },
        async votesUp(parent, _, context) {
            const count = await context.prisma.updoot.count({
                where: {
                    postId: parent.id,
                    value: 1   
                }               
            });
            return count ? count : 0; 
        },
        async votesDown(parent, _, context) {
            const count = await context.prisma.updoot.count({
                where: {
                    postId: parent.id,
                    value: -1   
                }               
            });
            return count ? count : 0; 
        },
        async voteValue(parent, _, context) {
            if (!context.userId) return 0;
            const updoot = await context.prisma.updoot.findUnique({
                where: {
                    postId_userId: { postId: parent.id, userId: context.userId as number }
                },
                select: { value: true }
            });
            return updoot ? updoot.value : 0;
        },
    },
};

export const postsModule = createModule({
    id: 'posts-module',
    dirname: __dirname,
    typeDefs: loadFilesSync(
        join(resolve(), 'src/modules/post/post.graphql'),
    ),
    resolvers
});