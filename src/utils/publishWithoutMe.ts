import { withFilter } from "graphql-subscriptions";

// type predicat helps to tell TS about obj has a property
function hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop);
};

export const publishWithoutMe = (subscr_name: string) => {
    return  withFilter(
        (_: any, __: any, context) => 
            context.pubsub.asyncIterator(subscr_name),
        
        (payload: any, __: any, context) => {
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
    ) 
};