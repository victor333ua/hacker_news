import { Context } from "graphql-ws";
import { Extra } from 'graphql-ws/lib/use/ws';
import { getUserId } from "./getUserId";

export const getUserIdFromCtx =
    (ctx: Context<Extra & Partial<Record<PropertyKey, never>>>) =>  {
        const auth = ctx.connectionParams?.authorization as string;
        return auth ? getUserId(auth) : null;
    };