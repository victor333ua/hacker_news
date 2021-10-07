import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { usersResolver } from './resolvers/users.js';
import { postsResolver } from './resolvers/posts.js';
import { merge } from 'lodash';
import { getUserId } from './utils/getUserId.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const prisma = new PrismaClient();

const startApolloServer = async () => {
  
  const app = express();
  
  const typeDefs = fs.readFileSync(
    path.join(path.resolve(), 'src/schema.graphql'),
    'utf8'
  );
  const resolvers = merge(usersResolver, postsResolver);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  
  const apolloServer = new ApolloServer({
      schema,     
      context: ({ req }) => {
        return {
          req,
          prisma,
          pubsub,
          userId: req && req.headers.authorization
            ? getUserId(req)
            : null
        };
      }
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const server = app.listen(process.env.PORT, () => {
      const wsServer = new ws.Server({
        server,
        path: '/graphql',
      });
      useServer({ 
        schema,
        execute,
        subscribe,
        onConnect: (ctx) => {
            console.log('Connect');
        },
        onSubscribe: (ctx, msg) => {
            console.log('Subscribe');
        },
        onNext: (ctx, msg, args, result) => {
            console.debug('Next');
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

startApolloServer()
  .catch((err) => {
    console.error(err);
});