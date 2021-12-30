import { BasicPaymentProduct } from './../../interfaces/basic-payment-product';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

// SERVICES
import { OgoneService } from './../../services/ogone/ogone.service';

// INTERFACES
import { ConnectSdk } from './../../interfaces/connectsdk';
import { BasicPaymentItem } from 'src/app/interfaces/basic-payment-item';
import { Router } from '@angular/router';

const connectsdk: ConnectSdk = window['connectsdk'];

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss'],
})
export class PurchaseItemComponent implements OnInit {
  form: FormGroup;
  submited: boolean;
  basicPaymentItems: BasicPaymentItem[];
  basicPaymentProducts: BasicPaymentProduct[];
  session: any;

  constructor(
    private fb: FormBuilder,
    private _ogoneService: OgoneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  submittable(): boolean {
    this.submited = true;
    return this.form.valid;
  }

  hostedPay(): void {
    this._ogoneService
      .hostedPayment(this.form.value)
      .subscribe((resp) => (window.location.href = resp.redirectTo));
  }

  getPaymentItemMethods(): void {
    this._ogoneService.createSession().subscribe((session) => {
      this.session = new connectsdk.Session(session);
      console.log(this.session);

      const paymentProductRequest = {
        countryCode: 'ES',
        currency: 'EUR',
        totalAmount: this.amount.value * 100,
      };
      this.session
        .getBasicPaymentItems(paymentProductRequest)
        .then((resp) => (this.basicPaymentItems = resp.basicPaymentItems));
    });
  }

  getPaymentProductMethods(): void {
    this._ogoneService.createSession().subscribe((session) => {
      this.session = new connectsdk.Session(session);
      console.log(this.session);

      const paymentProductRequest = {
        countryCode: 'ES',
        currency: 'EUR',
        totalAmount: this.amount.value * 100,
      };
      // console.log(this.session.getBasicPaymentProductGroups(paymentProductRequest));

      this.session
        .getBasicPaymentProducts(paymentProductRequest)
        .then((resp) => {
          this.basicPaymentProducts = resp.basicPaymentProducts;
          console.log(resp);
        });
    });
  }

  clientSDKPay(basicPaymentProduct: BasicPaymentProduct): void {
    // This will return the same instance of PaymentRequest every time.
    const paymentRequest = this.session.getPaymentRequest();
    // paymentProduct is an instance of the PaymentProduct class
    const paymentProduct = new connectsdk.PaymentProduct(basicPaymentProduct);
    console.log(paymentProduct);

    // AQUI DEBERIA DE SALIR UN DIALOGO PARA PEDIR LOS DATOS DE LA TARJETA (ACCOUNT ON FILE)

    paymentRequest.setPaymentProduct(paymentProduct);
    // console.log(paymentRequest);
    // // used to indicate whether a payment request should be stored as an account on file
    paymentRequest.setTokenize(false);

    if (!paymentRequest.isValid()) {
      console.log(paymentRequest.getErrorMessageIds());
      return;
    }

    const encryptor = this.session.getEncryptor();

    // Encrypting is an async task that we provide you as a promise.
    encryptor.encrypt(paymentRequest).then(
      (encryptedString) => {
        // The promise has fulfilled. The encryptedString contains the ciphertext
        // that should be sent to the Worldline platform via the Server API
        // ENVIAR AL BACK PARA QUE CREE EL CreatePaymentRequest Y PROCESE LA TRANSACCION
        // https://epayments-api.developer-ingenico.com/s2sapi/v1/en_US/nodejs/payments/create.html?paymentPlatform=ALL#payments-create-request-example
        this._ogoneService
          .createPaymentClientSDK({
            shoppingCart: this.form.value,
            encryptedCustomerInput: encryptedString,
            returnUrl: 'http://localhost:4200/paymentDone',
            paymentProductId: paymentProduct.id,
            tokenize: paymentRequest.getTokenize(),
          })
          .subscribe((resp) => {
            this.router.navigate(['/paymentDone'], {
              queryParams: {
                paymentId: resp.payment.id
              }
            });
          });
      },
      (errors) => {
        // The promise failed, inform the user what happened.
        console.log(errors);
      }
    );
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      amount: [9.99, [Validators.required, Validators.min(1)]],
    });
  }

  // getters
  get name(): AbstractControl {
    return this.form.get('name');
  }

  get amount(): AbstractControl {
    return this.form.get('amount');
  }
}
