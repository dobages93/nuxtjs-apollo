// const bodyParser = require('body-parser');
// const session = require('express-session');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "nuxt-demo1",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Add modules
  */
  // modules: ["@nuxtjs/bootstrap-vue"],
  modules: ["bootstrap-vue/nuxt", "@nuxtjs/apollo"],
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo.js'
    }
  },
  /*
  ** Add plugins
  */
  plugins: [
    { ssr: false, src: "~/plugins/debug.js" },
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        // config.module.rules.push({
        //   enforce: "pre",
        //   test: /\.(js|vue)$/,
        //   loader: "eslint-loader",
        //   exclude: /(node_modules)/,
        // });
      }
    },
  },
};
