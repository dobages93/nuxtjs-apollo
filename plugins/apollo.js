import fetch from "node-fetch";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4001/graphql", fetch }),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;
