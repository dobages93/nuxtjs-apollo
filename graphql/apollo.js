import { createNetworkInterface } from "apollo-client";

export default ctx => {
  const networkInterface = createNetworkInterface({
    uri: "http://localhost:4001/graphql",
  });

  // here you can place your middleware. ctx has the context forwarded from Nuxt
  const exampleWare1 = {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the headers object if needed.
      }
      req.options.headers.authorization = ctx.token;
      next();
    },
  };
  networkInterface.use([exampleWare1]);

  // you can return the networkInterface directly or return an object with additional
  // apollo-client options
  // return networkInterface

  // alternative return a object with constructor options of apollo-client
  return {
    networkInterface,
    dataIdFromObject: o => o.id,
  };
};
