import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from "graphql-tools";
import { resolvers } from "./resolvers";
import gql from "graphql-tag";

const typeDefs = gql`
  type Dog {
    _id: String
    breed: String,
    v: Int
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
