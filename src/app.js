const express = require('express');
const routes = require('./routes');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use(routes);

module.exports = app;
