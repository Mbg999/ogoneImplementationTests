"use strict";
const connectSdk = require("connect-sdk-nodejs");

const ogoneConfig = JSON.parse(process.env.OGONE);

class OgoneController {
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
    // amount: 2.45 -> 24500 -> hay que pasar el precio a integer salvando los centimos y dejar 2 digitos extra al final
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
      "1014", // merchantId // https://sandbox.account.ingenico.com/account/merchantid
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
}

module.exports.OgoneController = new OgoneController();
