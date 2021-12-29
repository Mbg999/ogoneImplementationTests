"use strict";

const express = require("express");
const app = express();
const { OgoneController } = require("../app/controllers/ogone-controller");

app.get("/test", OgoneController.test);
app.get("/hosted", OgoneController.hosted);

module.exports = app;
