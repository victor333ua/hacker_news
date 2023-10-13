import { withFilter } from "graphql-subscriptions";

// type predicat helps to tell TS about obj has a property
function hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop);
};

export const publishWithoutMe = (subscr_name: string) => {
    const resolverFn = withFilter(
        (_, __, context) => context.pubsub.asyncIterator(subscr_name),
        (payload, __, context) => {
// here context from ws, has been made for every subscriber
            const userId = context.userId;
            let userIdFromHttp;
            Object.values(payload).forEach(val => {
                 if (val && typeof val === "object" && hasOwnProperty(val, 'userId')) 
                    userIdFromHttp = val.userId;
            });
            // console.log('userId, userIdFromHttp = ',
            //     [userId, userIdFromHttp]);
            return userIdFromHttp !== userId;         
        }
    );
    return (
        (_: any, __: any, context: any) => {
            return {
                [Symbol.asyncIterator]() {
                    return resolverFn(_, __, context) ;
                  },
            }
        }  
    ) 
};
// Subscription: {
//     messageAdded: {
//       subscribe: withFilter(
//         () => pubsub.asyncIterator(MESSAGE_ADDED_TOPIC),
//         (payload, args) => {
//           return Boolean(
//             args.groupIds &&
//             ~args.groupIds.indexOf(payload.messageAdded.groupId) &&
// don't send to user creating message
//             args.userId !== payload.messageAdded.userId,
// args here from subscription parameters from client (http userId),
// we get it from http ctx in resolver
// https://medium.com/react-native-training/building-chatty-part-6-graphql-subscriptions-b54df7d63e27