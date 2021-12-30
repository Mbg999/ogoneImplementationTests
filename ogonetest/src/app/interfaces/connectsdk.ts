export interface Net {
  serialize: string;
  parseJSON: string;
  parseXML: string;
  get: string;
  post: string;
  jsonp: string;
  ajax: string;
}

export interface Util {
  getInstance: string;
}

export interface ConnectSdk {
  Promise: string;
  get: string;
  post: string;
  jsonp: string;
  net: Net;
  Util: Util;
  GooglePay: string;
  ApplePay: string;
  PublicKeyResponse: string;
  C2SCommunicatorConfiguration: string;
  IinDetailsResponse: string;
  C2SCommunicator: string;
  LabelTemplateElement: string;
  Attribute: string;
  AccountOnFileDisplayHints: string;
  AccountOnFile: string;
  PaymentProduct302SpecificData: string;
  PaymentProduct320SpecificData: string;
  PaymentProduct863SpecificData: string;
  PaymentProductDisplayHints: string;
  BasicPaymentProduct: string;
  BasicPaymentProductGroup: string;
  MaskedString: string;
  MaskingUtil: string;
  ValidationRuleLuhn: string;
  ValidationRuleExpirationDate: string;
  ValidationRuleFixedList: string;
  ValidationRuleLength: string;
  ValidationRuleRange: string;
  ValidationRuleRegularExpression: string;
  ValidationRuleResidentIdNumber: string;
  ValidationRuleEmailAddress: string;
  ValidationRuleTermsAndConditions: string;
  ValidationRuleBoletoBancarioRequiredness: string;
  ValidationRuleIban: string;
  ValidationRuleFactory: string;
  DataRestrictions: string;
  ValueMappingElement: string;
  FormElement: string;
  Tooltip: string;
  PaymentProductFieldDisplayHints: string;
  PaymentProductField: string;
  PaymentProduct: any;
  PaymentProductGroup: string;
  BasicPaymentProducts: string;
  BasicPaymentProductGroups: string;
  BasicPaymentItems: string;
  PaymentRequest: string;
  C2SPaymentProductContext: string;
  JOSEEncryptor: string;
  Encryptor: string;
  Session: any;
}
