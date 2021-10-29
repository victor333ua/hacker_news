import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { usersResolver } from './resolvers/users';
import { postsResolver } from './resolvers/posts';
import { merge } from 'lodash';
import { getUserId } from './utils/getUserId';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import cors from 'cors';
import { createServer } from 'http';
import { MyContext } from './types';
import { getUserIdFromCtx } from './utils/getUserIdFromWsCtx';

export const pubsub = new PubSub();

const prisma = new PrismaClient(
  // { log: ['query'] }
);

const init = async () => {

  const app = express();
  app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
  );

  const httpServer = createServer(app);
 
  const typeDefs = fs.readFileSync(
    path.join(path.resolve(), 'src/schema.graphql'),
    'utf8'
  );
  const resolvers = merge(usersResolver, postsResolver);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const apolloServer = new ApolloServer({
      schema,     
      context: ({ req }): MyContext => {
        const userId = req && req.headers.authorization
        ? getUserId(req.headers.authorization)
        : null;
        return {
          req,
          prisma,
          pubsub,
          userId
        };
      },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  httpServer.listen(process.env.PORT, () => {
    const wsServer = new ws.Server({
      server: httpServer,
      path: '/graphql',
    });
    useServer({ 
      schema,
      context: (ctx) => ({ prisma, pubsub, userId: getUserIdFromCtx(ctx) }),
      onConnect: (ctx) => {
          console.log('Connect');
      },
      onDisconnect: (ctx) => {
        console.log('Disconnect');
      },
      onSubscribe: (ctx, msg) => {
          console.log('Subscribe');
      },     
      onNext: (ctx, msg, args, result) => {
        // console.debug('Next', { ctx, msg, args, result });
      },
      onError: (ctx, msg, errors) => {
          console.error('Error');
      },
      onComplete: (ctx, msg) => {
          console.log('Complete');
      }, 
    }, wsServer); 
    console.log(`server started on localhost:${process.env.PORT}`);
  })  
};

init()
  .catch((err) => {
    console.error(err);
});

