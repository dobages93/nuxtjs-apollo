import client from "../plugins/apollo";

client.cache.restore(window.__APOLLO_STATE__);

window.localStorage.debug = "*";
