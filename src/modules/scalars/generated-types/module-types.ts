import * as Types from "../../../generated-types/graphql";
import * as gm from "graphql-modules";
export namespace ScalarsModule {
  export type Scalars = Pick<Types.Scalars, 'Date'>;
  export type DateScalarConfig = Types.DateScalarConfig;
  
  export interface Resolvers {
    Date?: Types.Resolvers['Date'];
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
  };
}