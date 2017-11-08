import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import gql from "graphql-tag";
import { resolvers } from "./resolvers";

const typeDefs = gql`
  scalar Date

  type Dog {
    _id: String!
    breed: String
    v: Int
    created: Date
    updated: Date
  }

  type RootQuery {
    testString: String
    Breeds: [Dog]
  }

  type RootMutation {
    createBreed(input: String!): Dog
  }

  input DogBreedInput {
    breed: String!
  }

  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema });

export default schema;
