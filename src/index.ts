import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { usersResolver } from './resolvers/users.js';
import { postsResolver } from './resolvers/posts.js';
import { merge } from 'lodash';
import { getUserId } from './utils/getUserId.js'

const prisma = new PrismaClient();

const startApolloServer = async () => {
  const app = express();
     
  const server = new ApolloServer({
      typeDefs: fs.readFileSync(
          path.join(path.resolve(), 'src/schema.graphql'),
          'utf8'
      ),
      resolvers: merge(usersResolver, postsResolver),
      context: ({ req }) => {
        return {
          req,
          prisma,
          userId: req && req.headers.authorization
            ? getUserId(req)
            : null
        };
      }
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
      console.log(`server started on localhost:${process.env.PORT}`); 
  })  
};

startApolloServer()
  .catch((err) => {
    console.error(err);
});