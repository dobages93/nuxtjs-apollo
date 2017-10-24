import { Nuxt, Builder } from 'nuxt';
import bodyParser from 'body-parser';
import session from 'express-session';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './graphql/schema';

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

const port = process.env.PORT;
app.listen(port);
console.log(`Server is listening on http://localhost:${port}`);

const myGraphQLSchema = schema; // ... define or import your schema here!
const PORT = Number.parseInt(port) + 1;
const gqApp = express();

gqApp.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
gqApp.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

gqApp.listen(PORT);
console.log(`GraphQL Server is listening on http://localhost:${PORT}`);
