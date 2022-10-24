import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace UserModule {
  interface DefinedFields {
    Query: 'user' | 'allUsers' | 'me' | 'imgur' | 'getPosts';
    Mutation: 'signup' | 'login' | 'logout' | 'logWithValidToken' | 'changeAvatar';
    Subscription: 'userIsOnline';
    User: 'id' | 'name' | 'email' | 'imageLink' | 'deletehash' | 'lastTime' | 'links';
    AuthPayload: 'user' | 'token';
    IsOnlinePayload: 'userId' | 'lastTime';
    ImgurPayload: 'isAuthed' | 'clientId' | 'accessToken';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type ImgurPayload = Pick<Types.ImgurPayload, DefinedFields['ImgurPayload']>;
  export type Link = Types.Link;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type AuthPayload = Pick<Types.AuthPayload, DefinedFields['AuthPayload']>;
  export type Subscription = Pick<Types.Subscription, DefinedFields['Subscription']>;
  export type IsOnlinePayload = Pick<Types.IsOnlinePayload, DefinedFields['IsOnlinePayload']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type SubscriptionResolvers = Pick<Types.SubscriptionResolvers, DefinedFields['Subscription']>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  export type AuthPayloadResolvers = Pick<Types.AuthPayloadResolvers, DefinedFields['AuthPayload'] | '__isTypeOf'>;
  export type IsOnlinePayloadResolvers = Pick<Types.IsOnlinePayloadResolvers, DefinedFields['IsOnlinePayload'] | '__isTypeOf'>;
  export type ImgurPayloadResolvers = Pick<Types.ImgurPayloadResolvers, DefinedFields['ImgurPayload'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Subscription?: SubscriptionResolvers;
    User?: UserResolvers;
    AuthPayload?: AuthPayloadResolvers;
    IsOnlinePayload?: IsOnlinePayloadResolvers;
    ImgurPayload?: ImgurPayloadResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      user?: gm.Middleware[];
      allUsers?: gm.Middleware[];
      me?: gm.Middleware[];
      imgur?: gm.Middleware[];
      getPosts?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      signup?: gm.Middleware[];
      login?: gm.Middleware[];
      logout?: gm.Middleware[];
      logWithValidToken?: gm.Middleware[];
      changeAvatar?: gm.Middleware[];
    };
    Subscription?: {
      '*'?: gm.Middleware[];
      userIsOnline?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      name?: gm.Middleware[];
      email?: gm.Middleware[];
      imageLink?: gm.Middleware[];
      deletehash?: gm.Middleware[];
      lastTime?: gm.Middleware[];
      links?: gm.Middleware[];
    };
    AuthPayload?: {
      '*'?: gm.Middleware[];
      user?: gm.Middleware[];
      token?: gm.Middleware[];
    };
    IsOnlinePayload?: {
      '*'?: gm.Middleware[];
      userId?: gm.Middleware[];
      lastTime?: gm.Middleware[];
    };
    ImgurPayload?: {
      '*'?: gm.Middleware[];
      isAuthed?: gm.Middleware[];
      clientId?: gm.Middleware[];
      accessToken?: gm.Middleware[];
    };
  };
}