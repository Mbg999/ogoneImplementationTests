export interface BasicPaymentProduct {
  deviceFingerprintEnabled: boolean;
  allowsInstallments: boolean;
  allowsRecurring: true;
  allowsTokenization: boolean;
  autoTokenized: boolean;
  displayHints: {
    displayOrder: number;
    label: string;
    logo: string;
  };
  id: number;
  maxAmount: number;
  paymentMethod: string;
  usesRedirectionTo3rdParty: boolean;
}
