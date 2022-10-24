import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel, Link as LinkModel } from 'node_modules/.prisma/client/index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type ImgurPayload = {
  __typename?: 'ImgurPayload';
  accessToken: Scalars['String'];
  clientId: Scalars['String'];
  isAuthed: Scalars['Boolean'];
};

export type IsOnlinePayload = {
  __typename?: 'IsOnlinePayload';
  lastTime?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
};

export type Link = {
  __typename?: 'Link';
  createdAt: Scalars['String'];
  deleteHash?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['Int'];
  imageLink?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  musicUrl?: Maybe<Scalars['String']>;
  postedBy: User;
  postedById: Scalars['Int'];
  voteValue: Scalars['Int'];
  votesDown: Scalars['Int'];
  votesUp: Scalars['Int'];
};

export type LinksPayload = {
  __typename?: 'LinksPayload';
  hasMore: Scalars['Boolean'];
  posts: Array<Link>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changeAvatar: Scalars['Boolean'];
  createPost: Link;
  deletePost: Scalars['Int'];
  logWithValidToken: Scalars['Boolean'];
  login: AuthPayload;
  logout: Scalars['Boolean'];
  signup: AuthPayload;
  vote: Scalars['Boolean'];
};


export type MutationChangeAvatarArgs = {
  deletehash: Scalars['String'];
  imageLink: Scalars['String'];
};


export type MutationCreatePostArgs = {
  deleteHash?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  imageLink?: InputMaybe<Scalars['String']>;
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  musicUrl?: InputMaybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVoteArgs = {
  delta: Scalars['Int'];
  postId: Scalars['Int'];
};

export type PostCreatedPayload = {
  __typename?: 'PostCreatedPayload';
  newPost: Link;
  userId: Scalars['Int'];
};

export type PostDeletedPayload = {
  __typename?: 'PostDeletedPayload';
  postId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  allUsers?: Maybe<Array<Maybe<User>>>;
  feed: LinksPayload;
  getPosts?: Maybe<Array<Maybe<Link>>>;
  imgur: ImgurPayload;
  me?: Maybe<User>;
  user?: Maybe<User>;
};


export type QueryFeedArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetPostsArgs = {
  userId: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  postCreated: PostCreatedPayload;
  postDeleted: PostDeletedPayload;
  postVoted: VotePayload;
  userIsOnline: IsOnlinePayload;
};

export type Updoot = {
  __typename?: 'Updoot';
  postId: Scalars['Int'];
  userId: Scalars['Int'];
  value: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  deletehash?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['Int'];
  imageLink?: Maybe<Scalars['String']>;
  lastTime?: Maybe<Scalars['String']>;
  links?: Maybe<Array<Maybe<Link>>>;
  name?: Maybe<Scalars['String']>;
};

export type VotePayload = {
  __typename?: 'VotePayload';
  delta: Scalars['Int'];
  postId: Scalars['Int'];
  userId: Scalars['Int'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'user'> & { user: ResolversTypes['User'] }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ImgurPayload: ResolverTypeWrapper<ImgurPayload>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IsOnlinePayload: ResolverTypeWrapper<IsOnlinePayload>;
  Link: ResolverTypeWrapper<LinkModel>;
  LinksPayload: ResolverTypeWrapper<Omit<LinksPayload, 'posts'> & { posts: Array<ResolversTypes['Link']> }>;
  Mutation: ResolverTypeWrapper<{}>;
  PostCreatedPayload: ResolverTypeWrapper<Omit<PostCreatedPayload, 'newPost'> & { newPost: ResolversTypes['Link'] }>;
  PostDeletedPayload: ResolverTypeWrapper<PostDeletedPayload>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Updoot: ResolverTypeWrapper<Updoot>;
  User: ResolverTypeWrapper<UserModel>;
  VotePayload: ResolverTypeWrapper<VotePayload>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: Omit<AuthPayload, 'user'> & { user: ResolversParentTypes['User'] };
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  Float: Scalars['Float'];
  ImgurPayload: ImgurPayload;
  Int: Scalars['Int'];
  IsOnlinePayload: IsOnlinePayload;
  Link: LinkModel;
  LinksPayload: Omit<LinksPayload, 'posts'> & { posts: Array<ResolversParentTypes['Link']> };
  Mutation: {};
  PostCreatedPayload: Omit<PostCreatedPayload, 'newPost'> & { newPost: ResolversParentTypes['Link'] };
  PostDeletedPayload: PostDeletedPayload;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  Updoot: Updoot;
  User: UserModel;
  VotePayload: VotePayload;
};

export type AuthPayloadResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type ImgurPayloadResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['ImgurPayload'] = ResolversParentTypes['ImgurPayload']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  clientId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAuthed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IsOnlinePayloadResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['IsOnlinePayload'] = ResolversParentTypes['IsOnlinePayload']> = {
  lastTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinkResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deleteHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  musicUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  postedById?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  voteValue?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  votesDown?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  votesUp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinksPayloadResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['LinksPayload'] = ResolversParentTypes['LinksPayload']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  changeAvatar?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangeAvatarArgs, 'deletehash' | 'imageLink'>>;
  createPost?: Resolver<ResolversTypes['Link'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'description'>>;
  deletePost?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  logWithValidToken?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  signup?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'password'>>;
  vote?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationVoteArgs, 'delta' | 'postId'>>;
};

export type PostCreatedPayloadResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['PostCreatedPayload'] = ResolversParentTypes['PostCreatedPayload']> = {
  newPost?: Resolver<ResolversTypes['Link'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostDeletedPayloadResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['PostDeletedPayload'] = ResolversParentTypes['PostDeletedPayload']> = {
  postId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  feed?: Resolver<ResolversTypes['LinksPayload'], ParentType, ContextType, Partial<QueryFeedArgs>>;
  getPosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Link']>>>, ParentType, ContextType, RequireFields<QueryGetPostsArgs, 'userId'>>;
  imgur?: Resolver<ResolversTypes['ImgurPayload'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type SubscriptionResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  postCreated?: SubscriptionResolver<ResolversTypes['PostCreatedPayload'], "postCreated", ParentType, ContextType>;
  postDeleted?: SubscriptionResolver<ResolversTypes['PostDeletedPayload'], "postDeleted", ParentType, ContextType>;
  postVoted?: SubscriptionResolver<ResolversTypes['VotePayload'], "postVoted", ParentType, ContextType>;
  userIsOnline?: SubscriptionResolver<ResolversTypes['IsOnlinePayload'], "userIsOnline", ParentType, ContextType>;
};

export type UpdootResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['Updoot'] = ResolversParentTypes['Updoot']> = {
  postId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  deletehash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  links?: Resolver<Maybe<Array<Maybe<ResolversTypes['Link']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VotePayloadResolvers<ContextType = GraphQLModules.Context, ParentType extends ResolversParentTypes['VotePayload'] = ResolversParentTypes['VotePayload']> = {
  delta?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLModules.Context> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  ImgurPayload?: ImgurPayloadResolvers<ContextType>;
  IsOnlinePayload?: IsOnlinePayloadResolvers<ContextType>;
  Link?: LinkResolvers<ContextType>;
  LinksPayload?: LinksPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PostCreatedPayload?: PostCreatedPayloadResolvers<ContextType>;
  PostDeletedPayload?: PostDeletedPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Updoot?: UpdootResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VotePayload?: VotePayloadResolvers<ContextType>;
};


export type Date = Scalars["Date"];