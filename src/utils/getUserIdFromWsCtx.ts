import { Context } from "graphql-ws";
import { Extra } from 'graphql-ws/lib/use/ws';
import { getUserId } from "./getUserId";

export const getUserIdFromCtx =
    (ctx: any) =>  {
        const auth = ctx.connectionParams?.authorization;
        return auth ? getUserId(auth as string) : null;
    };