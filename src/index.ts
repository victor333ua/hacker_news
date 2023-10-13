import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { usersModule } from './modules/user/users';
import { postsModule } from './modules/post/posts';
import { getUserId } from './utils/getUserId';
// import fs from 'fs';
// import path from 'path';
// import { merge } from 'lodash';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { composeResolvers } from '@graphql-tools/resolvers-composition';
import { PubSub } from 'graphql-subscriptions';
import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import cors from 'cors';
import { createServer } from 'http';
import { getUserIdFromCtx } from './utils/getUserIdFromWsCtx';
import passport from 'passport';
import './oauth2/passport';
import authRoute from './oauth2/routes/auth';
import { createApplication } from 'graphql-modules';

// import cookieParser from 'cookie-parser';

export const pubsub = new PubSub();
export const prisma = new PrismaClient(
  // { log: ['query'] }
);

const init = async () => {

  const app = express();

  const corsOptions = {
    origin:[ 
      process.env.CORS_ORIGIN as string,
      "https://studio.apollographql.com",
    ],
    credentials: true,
  }
// necessary for oauth2 login 
  app.use(cors(corsOptions));
  app.use(passport.initialize());
  app.use('/', authRoute);

  // app.use(cookieParser());
  // app.use((err: any, _: any, res: any, __: any) => {
  //   if (err.errorCode) res.status(500).send(err.message);
  //   res.status(401).send(err.message);
  // });
  // app.set("trust proxy", 1);
// --------------------------------------------------------
// ----- Apollo Server ------------------------------------

  // const typeDefs = fs.readFileSync(
  //   path.join(path.resolve(), 'src/schema.graphql'),
  //   'utf8'
  // );
  // const resolvers = merge(usersResolver, postsResolver);
  // const schema = makeExecutableSchema({ typeDefs, resolvers });

  const application = createApplication({
    modules: [postsModule, usersModule]
  });
  const schema = application.schema;
  const executor = application.createApolloExecutor();
  const subscribe = application.createSubscription();
  const execute = application.createExecution();

  const apolloServer = new ApolloServer({
      schema,
      executor,     
      context: ({ req }) => {
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
      // introspection: false
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ 
    app, 
    cors: corsOptions, // !once more here, express cors not sufficient
    path: '/graphql'
  });
// ---------------------------------------------------------
  const httpServer = createServer(app);

  const wsServer = new ws.Server({
    server: httpServer,
    path: '/ws',
  });
  useServer({ 
    schema,
    subscribe,
    execute,
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

  httpServer.listen(process.env.PORT, () => {
    console.log(`server started on port:${process.env.PORT}`);
  })  
};

init()
  .catch((err) => {
    console.error(err);
});

