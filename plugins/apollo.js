// import fetch from "node-fetch";
// import ApolloClient from "apollo-client";
// import { HttpLink } from "apollo-link-http";
// import { InMemoryCache } from "apollo-cache-inmemory";

// const ssr = process.SERVER_BUILD;

// const client = new ApolloClient({
//   link: new HttpLink({ uri: "http://localhost:4001/graphql", fetch }),
//   cache: new InMemoryCache(),
//   // dataIdFromObject: r => r.id || r._id,
//   // ...(ssr ? { ssrMode: true } : { connectToDevTools: true }),
//   connectToDevTools: true
// });

// export default client;

import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export default ctx => {
  const httpLink = new HttpLink({ uri: "http://localhost:4001/graphql" });

  // auth token
  const token = ctx.isServer ? ctx.req.session : window.__NUXT__.state.session;

  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: { authorization: `Bearer ${token}` },
    });
    return forward(operation);
  });

  const link = middlewareLink.concat(httpLink);

  return {
    link,
    cache: new InMemoryCache(),
  };
};
