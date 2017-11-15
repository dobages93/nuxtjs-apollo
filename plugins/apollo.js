import fetch from "node-fetch";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const ssr = process.SERVER_BUILD;

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4001/graphql", fetch }),
  cache: new InMemoryCache(),
  // dataIdFromObject: r => r.id || r._id,
  // ...(ssr ? { ssrMode: true } : { connectToDevTools: true }),
  connectToDevTools: true
});

export default client;
