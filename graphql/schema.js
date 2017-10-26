import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { resolvers } from "./resolvers";

const typeDefs = `
type Query {
  testString: String,
  breeds: [String]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema });

export default schema;
