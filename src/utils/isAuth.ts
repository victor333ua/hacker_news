import { MyContext } from "../types";

export const isAuth = (ctx: MyContext) => {
    if (!ctx.userId) {
        throw new Error('not authenticated');
    }
}