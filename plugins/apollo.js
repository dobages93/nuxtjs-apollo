import fetch from "node-fetch";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4001/graphql", fetch }),
  cache: new InMemoryCache(),
});

export default client;
