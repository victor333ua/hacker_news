import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace PostModule {
  interface DefinedFields {
    Query: 'feed';
    Mutation: 'createPost' | 'deletePost' | 'vote';
    Subscription: 'postCreated' | 'postDeleted' | 'postVoted';
    Link: 'id' | 'createdAt' | 'description' | 'musicUrl' | 'postedById' | 'postedBy' | 'votesUp' | 'votesDown' | 'voteValue' | 'imageLink' | 'deleteHash' | 'lat' | 'lng';
    LinksPayload: 'posts' | 'hasMore';
    Updoot: 'postId' | 'userId' | 'value';
    VotePayload: 'delta' | 'postId' | 'userId';
    PostCreatedPayload: 'newPost' | 'userId';
    PostDeletedPayload: 'postId' | 'userId';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type LinksPayload = Pick<Types.LinksPayload, DefinedFields['LinksPayload']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Link = Pick<Types.Link, DefinedFields['Link']>;
  export type Subscription = Pick<Types.Subscription, DefinedFields['Subscription']>;
  export type PostCreatedPayload = Pick<Types.PostCreatedPayload, DefinedFields['PostCreatedPayload']>;
  export type PostDeletedPayload = Pick<Types.PostDeletedPayload, DefinedFields['PostDeletedPayload']>;
  export type VotePayload = Pick<Types.VotePayload, DefinedFields['VotePayload']>;
  export type User = Types.User;
  export type Updoot = Pick<Types.Updoot, DefinedFields['Updoot']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type SubscriptionResolvers = Pick<Types.SubscriptionResolvers, DefinedFields['Subscription']>;
  export type LinkResolvers = Pick<Types.LinkResolvers, DefinedFields['Link'] | '__isTypeOf'>;
  export type LinksPayloadResolvers = Pick<Types.LinksPayloadResolvers, DefinedFields['LinksPayload'] | '__isTypeOf'>;
  export type UpdootResolvers = Pick<Types.UpdootResolvers, DefinedFields['Updoot'] | '__isTypeOf'>;
  export type VotePayloadResolvers = Pick<Types.VotePayloadResolvers, DefinedFields['VotePayload'] | '__isTypeOf'>;
  export type PostCreatedPayloadResolvers = Pick<Types.PostCreatedPayloadResolvers, DefinedFields['PostCreatedPayload'] | '__isTypeOf'>;
  export type PostDeletedPayloadResolvers = Pick<Types.PostDeletedPayloadResolvers, DefinedFields['PostDeletedPayload'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Subscription?: SubscriptionResolvers;
    Link?: LinkResolvers;
    LinksPayload?: LinksPayloadResolvers;
    Updoot?: UpdootResolvers;
    VotePayload?: VotePayloadResolvers;
    PostCreatedPayload?: PostCreatedPayloadResolvers;
    PostDeletedPayload?: PostDeletedPayloadResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      feed?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      createPost?: gm.Middleware[];
      deletePost?: gm.Middleware[];
      vote?: gm.Middleware[];
    };
    Subscription?: {
      '*'?: gm.Middleware[];
      postCreated?: gm.Middleware[];
      postDeleted?: gm.Middleware[];
      postVoted?: gm.Middleware[];
    };
    Link?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      createdAt?: gm.Middleware[];
      description?: gm.Middleware[];
      musicUrl?: gm.Middleware[];
      postedById?: gm.Middleware[];
      postedBy?: gm.Middleware[];
      votesUp?: gm.Middleware[];
      votesDown?: gm.Middleware[];
      voteValue?: gm.Middleware[];
      imageLink?: gm.Middleware[];
      deleteHash?: gm.Middleware[];
      lat?: gm.Middleware[];
      lng?: gm.Middleware[];
    };
    LinksPayload?: {
      '*'?: gm.Middleware[];
      posts?: gm.Middleware[];
      hasMore?: gm.Middleware[];
    };
    Updoot?: {
      '*'?: gm.Middleware[];
      postId?: gm.Middleware[];
      userId?: gm.Middleware[];
      value?: gm.Middleware[];
    };
    VotePayload?: {
      '*'?: gm.Middleware[];
      delta?: gm.Middleware[];
      postId?: gm.Middleware[];
      userId?: gm.Middleware[];
    };
    PostCreatedPayload?: {
      '*'?: gm.Middleware[];
      newPost?: gm.Middleware[];
      userId?: gm.Middleware[];
    };
    PostDeletedPayload?: {
      '*'?: gm.Middleware[];
      postId?: gm.Middleware[];
      userId?: gm.Middleware[];
    };
  };
}