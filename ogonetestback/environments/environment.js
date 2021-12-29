"use strict";

/**
 *  ===================
 *   PORT production or development
 *  ===================
 */
process.env.PORT = process.env.PORT || 3000;

/**
 *  ===================
 *   ENVIRONMENT production or development
 *  ===================
 */
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

process.env.OGONE = JSON.stringify({
  host: "eu.sandbox.api-ingenico.com",
  scheme: "https",
  port: 443,
  enableLogging: true, // defaults to false
  //   logger: logger, // if undefined console.log will be used
  apiKeyId: "603575a1b24527fc", // https://sandbox.account.ingenico.com/account/apikey
  secretApiKey: "dIj4dIqwU7V3VXlnOoKgnpemfKuSOC4cbgCygrSLPKs=",
  integrator: "softtek",
});
