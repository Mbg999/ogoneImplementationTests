"use strict";
const connectSdk = require("connect-sdk-nodejs");

const ogoneConfig = JSON.parse(process.env.OGONE);

class OgoneController {
  // merchantId: https://sandbox.account.ingenico.com/account/merchantid
  static merchantId = "1014";

  constructor() {
    connectSdk.init(ogoneConfig);
  }

  /**
   * returns a simple hello world json, for test the app
   */
  test(req, res) {
    return res.status(200).json({
      data: "Hello world",
    });
  }

  /**
   * https://epayments.developer-ingenico.com/documentation/sdk/server/nodejs/#paymentwithrpp
   * https://epayments-api.developer-ingenico.com/s2sapi/v1/en_US/nodejs/hostedcheckouts/create.html?paymentPlatform=GLOBALCOLLECT#hostedcheckouts-create-request
   *
   * @param {*} req
   * @param {*} res
   * @returns json
   */
  hosted(req, res) {
    // amount: 2.45 -> 245 -> hay que pasar el precio a integer salvando los centimos, siempre se consideran 2 digitos para centimos
    const amount = parseInt(req.body.amount * 100);
    const body = {
      order: {
        amountOfMoney: {
          currencyCode: "EUR",
          amount,
        },
        shoppingCart: {
          items: [
            {
              amountOfMoney: {
                currencyCode: "EUR",
                amount,
              },
              invoiceData: {
                description: req.body.name,
                nrOfItems: "1",
                pricePerItem: amount,
              },
            },
          ],
        },
        customer: {
          merchantCustomerId: "1234",
          billingAddress: {
            countryCode: "ES",
          },
        },
      },
      hostedCheckoutSpecificInput: {
        variant: "100",
        locale: "es_ES",
        returnUrl: "http://localhost:4200/paymentDone",
      },
    };

    connectSdk.hostedcheckouts.create(
      OgoneController.merchantId,
      body,
      null,
      function (error, sdkResponse) {
        // if sdkResponse is not null, it has the following properties:
        // - status: the HTTP status code
        // - body: the response body
        // - isSuccess: true if the call was successful,
        //              or false if the Ingenico ePayments platform returned an error response

        if (error) {
          return res.status(500).json({
            error,
          });
        }

        if (sdkResponse.isSuccess) {
          return res.status(200).json({
            redirectTo: `${ogoneConfig.scheme}://payment.${sdkResponse.body.partialRedirectUrl}`,
          });
        }

        return res.status(500).json({
          error: "payment error",
        });
      }
    );
  }

  session(req, res) {
    connectSdk.sessions.create(
      OgoneController.merchantId,
      {},
      null,
      function (error, sdkResponse) {
        // if sdkResponse is not null, it has the following properties:
        // - status: the HTTP status code
        // - body: the response body
        // - isSuccess: true if the call was successful,
        //              or false if the Ingenico ePayments platform returned an error response

        if (error) {
          return res.status(500).json({
            error,
          });
        }

        if (sdkResponse.isSuccess) {
          return res.status(200).json(sdkResponse.body);
        }

        return res.status(500).json({
          error: "create session error",
        });
      }
    );
  }

  createPaymentByClientSDK(req, res) {
    const amount = req.body.shoppingCart.amount * 100;
    const body = {
      encryptedCustomerInput: req.body.encryptedCustomerInput,
      redirectPaymentMethodSpecificInput: {
        redirectionData: {
          returnUrl: req.body.returnUrl
        },
        paymentProductId: req.body.paymentProductId,
        tokenize: req.body.tokenize
      },
      order: {
        customer: {
          merchantCustomerId: "1234",
          billingAddress: {
            countryCode: "ES",
          },
        },
        amountOfMoney: {
          currencyCode: "EUR",
          amount,
        },
        shoppingCart: {
          items: [
            {
              amountOfMoney: {
                currencyCode: "EUR",
                amount,
              },
              invoiceData: {
                nrOfItems: "1",
                pricePerItem: amount,
                description: req.body.shoppingCart.name,
              },
            },
          ],
        },
      },
    };
    connectSdk.payments.create(
      OgoneController.merchantId,
      body,
      null,
      function (error, sdkResponse) {
        // if sdkResponse is not null, it has the following properties:
        // - status: the HTTP status code
        // - body: the response body
        // - isSuccess: true if the call was successful,
        //              or false if the Ingenico ePayments platform returned an error response

        if (error) {
          return res.status(500).json({
            error,
          });
        }

        if (sdkResponse.isSuccess) {
          return res.status(200).json(sdkResponse.body);
        }

        return res.status(500).json({
          error: "create payment error",
        });
      }
    );
  }
}

module.exports.OgoneController = new OgoneController();
