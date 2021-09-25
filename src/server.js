const express = require('express');
const { apollo } = require('./graphql/apollo');
const app = express();

const health = (_, res) => {
  res.json({status: 'up'});
};

const notfound = (_, res) => {
  res.status(404).json({message: 'not found on this server.'});
};

app.get('/health', health); // cannot make it run into kubernetes without liveness probe
apollo.applyMiddleware({ app });
app.use(notfound); // let's make clear the 404

module.exports = { app };
