"use strict";

const express = require("express");
const app = express();

// suport parsing of application/json type
// https://expressjs.com/es/api.html#express.json
app.use(express.json({strict: true}));

// SERVER ENVIRONMENT VARIABLES
require('./environments/environment');

// cors configuration
app.use(require('./app/middlewares/cors').cors);

// IMPORT ROUTES
app.use('/api',require("./routes/index.js"));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
