import { createWithEqualityFn } from "zustand/traditional";
import bankingPartners from "constants/banking-partners.json";

const bankingPartnerState = createWithEqualityFn<BankingPartnerState>(
  (set) => ({
    partner: bankingPartners[0].value,
    setPartner: (value) => set({ partner: value }),
  }),
  Object.is
);

export default bankingPartnerState;
