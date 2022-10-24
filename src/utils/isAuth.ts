export const isAuth = (ctx:  GraphQLModules.Context) => {
    if (!ctx.userId) {
        throw new Error('not authenticated');
    }
}