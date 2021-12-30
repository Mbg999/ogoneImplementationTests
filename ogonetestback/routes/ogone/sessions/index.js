"use strict";

const express = require("express");
const app = express();
const {
  OgoneController,
} = require("../../../app/controllers/ogone-controller");

app.get("/", OgoneController.session);

module.exports = app;
