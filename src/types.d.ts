declare global {
  interface Keyable {
    [key: string]: any;
  }

  interface Children {
    children: ReactNode;
  }

  interface Offer {
    id: string;
    loanId: string;
    assessorId: string;
    isVisibleToAssessor: boolean;
    country: string;
    decision: string;
    reviewStatus: string;
    documentUploadStatus: string;
    conditionalOfferStatus: string;
    bankingPartner: string;
    errorComment: string | null;
    createdAt: string;
    updatedAt: string;
    fullName: string;
    finalCreditDecision: string;
    applicantType: string;
    productType: string;
  }

  interface OfferListReq {
    query: string;
    page: string;
    country: string;
    bankingPartner: string;
    assessorEmail: string;
    reviewStatus: string;
    withErrors: boolean;
  }

  interface OfferListRes {
    offers: Offer[];
    total: number;
  }

  interface OfferList {
    request: OfferListReq;
    response: OfferListRes;
  }

  interface BankingPartnerState {
    partner: string;
    setPartner: (value: string) => void;
  }
}

export {};
