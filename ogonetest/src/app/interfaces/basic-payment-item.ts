export interface BasicPaymentItem {
  json: {
    deviceFingerprintEnabled: boolean;
    allowsInstallments: boolean;
    allowsRecurring: boolean;
    allowsTokenization: boolean;
    autoTokenized: boolean;
    displayHints: {
      displayOrder: number;
      label: string;
      logo: string;
    };
    id: number;
    paymentMethod: string;
    usesRedirectionTo3rdParty: boolean;
    type: string;
  };
  accountsOnFile: [];
  accountOnFileById: {};
  allowsRecurring: boolean;
  allowsTokenization: boolean;
  autoTokenized: boolean;
  allowsInstallments: boolean;
  displayHints: {
    json: {
      displayOrder: number;
      label: string;
      logo: string;
    };
    displayOrder: number;
    label: string;
    logo: string;
  };
  id: number;
  paymentMethod: string;
  usesRedirectionTo3rdParty: boolean;
}
