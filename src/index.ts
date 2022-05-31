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
//import { composeResolvers } from '@graphql-tools/resolvers-composition';
import { PubSub } from 'graphql-subscriptions';
import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import cors from 'cors';
import { createServer } from 'http';
import { MyContext } from './types';
import { getUserIdFromCtx } from './utils/getUserIdFromWsCtx';
import { __prod__ } from './constants';
import passport from 'passport';
import './oauth2/passport';
import authRoute from './oauth2/routes/auth';
import cookieParser from 'cookie-parser';

export const pubsub = new PubSub();

export const prisma = new PrismaClient(
  // { log: ['query'] }
)

const init = async () => {

  const app = express();
 
  app.use(
    cors({
        origin: [
          process.env.CORS_ORIGIN as string,
          "https://studio.apollographql.com"
        ],
        credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use('/oauth2', authRoute);
  // app.use((err: any, _: any, res: any, __: any) => {
  //   if (err.errorCode) res.status(500).send(err.message);
  //   res.status(401).send(err.message);
  // });

// --------------------------------------------------------
// ----- Apollo Server ------------------------------------
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
  const httpServer = createServer(app);
  apolloServer.applyMiddleware({ app, cors: false });
// ---------------------------------------------------------

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
        // console.log('Subscribe');
      },     
      onNext: (ctx, msg, args, result) => {
        // console.debug('Next', { ctx, msg, args, result });
        // const objPayload: any = Object.values(msg.payload.data as {})[0];
        // console.debug('Next: payload',  objPayload);
        // console.debug('Next: userId', objPayload.userId);
        // we don't have userId here???
      },
      onError: (ctx, msg, errors) => {
          console.error('Error');
      },
      onComplete: (ctx, msg) => {
          // console.log('Complete');
      }, 
    }, wsServer); 
    console.log(`server started on localhost:${process.env.PORT}`);
  })  
};

init()
  .catch((err) => {
    console.error(err);
});

