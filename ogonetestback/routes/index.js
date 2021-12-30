"use strict";

const express = require("express");
const app = express();

app.use("/ogone", require("./ogone/index"));

module.exports = app;
