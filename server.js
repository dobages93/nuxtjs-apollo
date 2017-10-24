// const { Nuxt, Builder } = require('nuxt');
import { Nuxt, Builder } from 'nuxt';
import bodyParser from 'body-parser';
import session from 'express-session';
import express from 'express';

const app = express();

// Import and Set Nuxt.js options
const config = require('./nuxt.config.js');

config.dev = !(process.env.NODE_ENV === 'production');

// Init Nuxt.js
const nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Body parser, to access `req.body`
app.use(bodyParser.json());

// Sessions to create `req.session`
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
}));

// NOTE: In Postman in the Body section choose application/json from the dropdown
// Submit raw json { "val": "foo" }
app.post('/api/test', (req, res) => {
  res.status(200).json({ val: req.body.val });
});

// POST `/api/login` to log in the user and add him to the `req.session.authUser`
app.post('/api/login', (req, res) => {
  // console.log(`server login`);
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' };
    return res.json({ username: 'demo' });
  }
  res.status(401).json({ error: 'Bad credentials' });
});

// POST `/api/logout` to log out the user and remove it from the `req.session`
app.post('/api/logout', (req, res) => {
  delete req.session.authUser;
  res.json({ ok: true });
});

// app.get('*', (req, res) => {
//   const context = { url: req.url };
//   renderer.renderToString(context, (error, html) => {
//     if (error) return res.send(error.stack);
//     const {
//       title,
//       htmlAttrs,
//       bodyAttrs,
//       link,
//       style,
//       script,
//       noscript,
//       meta,
//     } = context.meta.inject();
//     return res.send(`
//       <!doctype html>
//       <html data-vue-meta-server-rendered ${htmlAttrs.text()}>
//         <head>
//           ${meta.text()}
//           ${title.text()}
//           ${link.text()}
//           ${style.text()}
//           ${script.text()}
//           ${noscript.text()}
//         </head>
//         <body ${bodyAttrs.text()}>
//           ${html}
//           <script src="/assets/vendor.bundle.js"></script>
//           <script src="/assets/client.bundle.js"></script>
//         </body>
//       </html>
//     `);
//   });
// });

const port = process.env.PORT;
app.listen(port);
console.log(`Server is listening on http://localhost:${port}`);
