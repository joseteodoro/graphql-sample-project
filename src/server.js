const express = require('express');
const { server } = require('./graphql/apollo');
const app = express();

const health = (_, res) => {
  res.json({status: 'up'});
};

const notfound = (_, res) => {
  res.status(404).json({message: 'not found on this server.'});
};

app.get('/health', health);
server.applyMiddleware({ app });
// non-existent routes will recieve 404
app.use(notfound);

module.exports = { app };
