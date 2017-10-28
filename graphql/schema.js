import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { resolvers } from "./resolvers";

const typeDefs = `
type Dog {
  _id: String,
  breed: String
}
type Query {
  testString: String,
  Breeds: [Dog]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema });

export default schema;
