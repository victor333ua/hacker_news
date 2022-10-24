import { loadFilesSync } from '@graphql-tools/load-files';
import { GraphQLScalarType, Kind } from 'graphql';
import { createModule } from 'graphql-modules';
import { join, resolve } from 'path';

const dateScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: Date) {
    return value ? value.getTime() : null; // Convert outgoing Date to integer for JSON
  },
  parseValue(value: number) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const resolvers = {
    Date: dateScalarType
}

export const scalarsModule = createModule({
    id: 'scalars-module',
    dirname: __dirname,
    typeDefs: loadFilesSync(
        join(resolve(), 'src/modules/scalars/scalars.graphql'),
    ),
    resolvers
});