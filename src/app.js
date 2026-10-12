const express = require('express');
const storesRouter = require('./routes/stores');

const app = express();
app.use(express.json());

app.use('/api/stores', storesRouter);

module.exports = app;
