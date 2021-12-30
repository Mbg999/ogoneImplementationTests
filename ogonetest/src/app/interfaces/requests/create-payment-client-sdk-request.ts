import { Item } from './../item';

export interface CreatePaymentClientSDKRequest {
  shoppingCart: Item;
  encryptedCustomerInput: string;
  returnUrl: string;
  paymentProductId: number;
  tokenize: boolean;
}
