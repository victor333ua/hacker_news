import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { PubSub } from "graphql-subscriptions";

// export type MyContext = {
//     req?: Request;
//     prisma: PrismaClient;
//     userId: number | null;
//     pubsub: PubSub;
// };

declare module 'jsonwebtoken' {
    interface JwtPayload {
        userId: number;
    }
};

declare module 'express-session' {
    interface SessionData {
      messages: string[];
    }
};

declare global {
    namespace GraphQLModules {
      interface GlobalContext {
        req?: Request;
        prisma: PrismaClient;
        userId: number | null;
        pubsub: PubSub;  
      }
    }
  }

// declare global {
//     namespace Express {      
//         interface Request {
//             federatedUser: {id: number};
//         }
//     }
// };
