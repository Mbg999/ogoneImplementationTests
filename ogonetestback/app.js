"use strict";

const express = require("express");
const app = express();

// SERVER ENVIRONMENT VARIABLES
require('./environments/environment');

app.use('/api',require("./routes/index.js"));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
