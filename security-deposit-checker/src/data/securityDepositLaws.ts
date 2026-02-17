export interface SecurityDepositLaw {
  state: string;
  stateCode: string;
  maxDeposit: string;
  interestRequired: boolean;
  interestRate?: string;
  returnDeadline: string;
  holdingAccount: string;
  penalties: string;
  notes?: string;
}

export const securityDepositLaws: SecurityDepositLaw[] = [
  {
    state: "California",
    stateCode: "CA",
    maxDeposit: "2 months' rent (unfurnished), 3 months' rent (furnished)",
    interestRequired: false,
    returnDeadline: "21 days after tenant moves out",
    holdingAccount: "No specific requirement",
    penalties: "Bad faith retention: tenant may recover up to 2x the deposit amount",
    notes: "Itemized statement of deductions required"
  },
  {
    state: "New York",
    stateCode: "NY",
    maxDeposit: "No statutory limit (typically 1 month's rent)",
    interestRequired: true,
    interestRate: "Prevailing rate (set annually by Comptroller)",
    returnDeadline: "14 days (no deductions) or 45 days (with deductions)",
    holdingAccount: "Required for buildings with 6+ units in interest-bearing account",
    penalties: "Failure to comply: forfeiture of right to retain any portion",
    notes: "Annual interest statements required"
  },
  {
    state: "Texas",
    stateCode: "TX",
    maxDeposit: "No statutory limit",
    interestRequired: false,
    returnDeadline: "30 days after tenant moves out",
    holdingAccount: "No specific requirement",
    penalties: "Bad faith: tenant may recover $100 + 3x deposit amount + attorney fees",
    notes: "Written description of charges required if withholding"
  },
  {
    state: "Florida",
    stateCode: "FL",
    maxDeposit: "No statutory limit",
    interestRequired: true,
    interestRate: "At least 75% of annualized average rate (for interest-bearing accounts)",
    returnDeadline: "15 days (no deductions) or 30 days (with deductions and notice)",
    holdingAccount: "Required in Florida banking institution",
    penalties: "Improper withholding: tenant may recover actual damages",
    notes: "Must notify tenant of account location within 30 days"
  },
  {
    state: "Illinois",
    stateCode: "IL",
    maxDeposit: "No statutory limit",
    interestRequired: true,
    interestRate: "Must pay interest on deposits held 6+ months",
    returnDeadline: "30-45 days depending on lease terms",
    holdingAccount: "Interest-bearing account for buildings with 25+ units",
    penalties: "Bad faith: tenant may recover 2x deposit + court costs + attorney fees",
    notes: "Itemized statement required for any deductions"
  },
  {
    state: "Washington",
    stateCode: "WA",
    maxDeposit: "No statutory limit (market practice: 1-2 months)",
    interestRequired: false,
    returnDeadline: "21 days after tenant moves out",
    holdingAccount: "No specific requirement",
    penalties: "Bad faith: tenant may recover 2x deposit amount",
    notes: "Must provide written checklist at move-in and move-out"
  },
  {
    state: "Massachusetts",
    stateCode: "MA",
    maxDeposit: "1 month's rent",
    interestRequired: true,
    interestRate: "5% annual interest or actual interest earned (whichever is less)",
    returnDeadline: "30 days after tenant moves out",
    holdingAccount: "Required in separate, interest-bearing account in MA bank",
    penalties: "Improper handling: tenant may recover 3x deposit + attorney fees + costs",
    notes: "Receipt required; statement of condition required at move-in"
  },
  {
    state: "Arizona",
    stateCode: "AZ",
    maxDeposit: "1.5 months' rent",
    interestRequired: false,
    returnDeadline: "14 business days after tenant moves out",
    holdingAccount: "No specific requirement",
    penalties: "Bad faith: tenant may recover 2x wrongfully withheld amount + attorney fees",
    notes: "Itemized statement required for deductions"
  },
  {
    state: "Georgia",
    stateCode: "GA",
    maxDeposit: "No statutory limit",
    interestRequired: false,
    returnDeadline: "30 days (or within lease term if specified)",
    holdingAccount: "Escrow account required for buildings with 10+ units",
    penalties: "Bad faith: tenant may recover 3x deposit + attorney fees",
    notes: "Written notice of forwarding address required from tenant"
  },
  {
    state: "Colorado",
    stateCode: "CO",
    maxDeposit: "No statutory limit",
    interestRequired: false,
    returnDeadline: "30 days (no deductions) or 60 days (with deductions)",
    holdingAccount: "No specific requirement",
    penalties: "Bad faith: tenant may recover 3x deposit + attorney fees + costs",
    notes: "Must provide written statement of deductions"
  },
  {
    state: "Pennsylvania",
    stateCode: "PA",
    maxDeposit: "2 months' rent (1st year), 1 month's rent (after 1st year)",
    interestRequired: true,
    interestRate: "Interest accrues after 2 years of occupancy",
    returnDeadline: "30 days after tenant moves out",
    holdingAccount: "Escrow account in regulated financial institution",
    penalties: "Improper withholding: tenant may recover 2x wrongfully withheld amount",
    notes: "Deposit must be placed in escrow within 30 days"
  },
  {
    state: "Ohio",
    stateCode: "OH",
    maxDeposit: "No statutory limit",
    interestRequired: true,
    interestRate: "5% annual interest if deposit is held 6+ months",
    returnDeadline: "30 days after tenant moves out",
    holdingAccount: "Interest-bearing account required",
    penalties: "Bad faith: tenant may recover actual damages",
    notes: "Itemized statement required for any deductions"
  },
  {
    state: "Michigan",
    stateCode: "MI",
    maxDeposit: "1.5 months' rent",
    interestRequired: false,
    returnDeadline: "30 days after tenant moves out",
    holdingAccount: "Regulated financial institution or surety bond",
    penalties: "Bad faith: tenant may recover 2x deposit + attorney fees",
    notes: "Must provide written notice of landlord's name and address"
  },
  {
    state: "Virginia",
    stateCode: "VA",
    maxDeposit: "2 months' rent",
    interestRequired: false,
    returnDeadline: "45 days after tenant moves out",
    holdingAccount: "Escrow account required unless landlord is individual owning <10 units",
    penalties: "Bad faith: tenant may recover actual damages",
    notes: "Itemized statement of deductions required"
  },
  {
    state: "North Carolina",
    stateCode: "NC",
    maxDeposit: "1.5 months' rent (month-to-month), 2 months' rent (longer term)",
    interestRequired: false,
    returnDeadline: "30 days (or within lease term if specified)",
    holdingAccount: "Trust account or in NC within state",
    penalties: "Bad faith: landlord forfeits right to retain any portion",
    notes: "Landlord must provide contact information and location of deposit"
  }
];
