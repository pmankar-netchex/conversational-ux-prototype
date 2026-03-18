export interface PayStub {
  id: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  paidOn: string;
  earnings: {
    regularHours: number;
    regularPay: number;
    overtimeHours: number;
    overtimePay: number;
    grossPay: number;
  };
  deductions: {
    federalTax: number;
    stateTax: number;
    socialSecurity: number;
    medicare: number;
  };
  netPay: number;
  depositAccount: string;
}

export const payStubs: PayStub[] = [
  {
    id: 'PS-2026-006',
    payPeriodStart: '2026-03-03',
    payPeriodEnd: '2026-03-14',
    paidOn: '2026-03-14',
    earnings: {
      regularHours: 76.0,
      regularPay: 1254.0,
      overtimeHours: 4.5,
      overtimePay: 111.38,
      grossPay: 1365.38,
    },
    deductions: {
      federalTax: 136.54,
      stateTax: 42.33,
      socialSecurity: 84.65,
      medicare: 19.80,
    },
    netPay: 1082.06,
    depositAccount: 'Chase ****4521',
  },
  {
    id: 'PS-2026-005',
    payPeriodStart: '2026-02-17',
    payPeriodEnd: '2026-02-28',
    paidOn: '2026-02-28',
    earnings: {
      regularHours: 80.0,
      regularPay: 1320.0,
      overtimeHours: 6.0,
      overtimePay: 148.50,
      grossPay: 1468.50,
    },
    deductions: {
      federalTax: 146.85,
      stateTax: 45.52,
      socialSecurity: 91.05,
      medicare: 21.29,
    },
    netPay: 1163.79,
    depositAccount: 'Chase ****4521',
  },
  {
    id: 'PS-2026-004',
    payPeriodStart: '2026-02-03',
    payPeriodEnd: '2026-02-14',
    paidOn: '2026-02-14',
    earnings: {
      regularHours: 80.0,
      regularPay: 1320.0,
      overtimeHours: 3.0,
      overtimePay: 74.25,
      grossPay: 1394.25,
    },
    deductions: {
      federalTax: 139.43,
      stateTax: 43.22,
      socialSecurity: 86.44,
      medicare: 20.22,
    },
    netPay: 1104.94,
    depositAccount: 'Chase ****4521',
  },
];
