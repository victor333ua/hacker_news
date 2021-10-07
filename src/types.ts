import { PrismaClient, Prisma } from "@prisma/client";
import { Request } from "express";

export type MyContext = {
    req: Request;
    prisma: PrismaClient;
    userId: number | null;
};

declare module 'jsonwebtoken' {
    interface JwtPayload {
        userId: number;
    }
};

// declare module '@prisma/client' {
//     namespace Prisma {
//         type LinkWhereUniqueInput = {
//             createdAt: Date;
//         }
//     }
// }

