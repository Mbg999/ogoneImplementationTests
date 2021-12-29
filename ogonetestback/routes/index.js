"use strict";

const express = require("express");
const app = express();

app.use("/ogone", require("./ogone"));

module.exports = app;
