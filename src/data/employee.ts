export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  employeeCode: string;
  company: string;
  location: string;
  address: string;
  email: string;
  phone: string;
  hireDate: string;
  manager: {
    name: string;
    title: string;
    initials: string;
  };
  hourlyRate: number;
  payFrequency: string;
  nextPayDate: string;
  directDeposit: {
    bankName: string;
    accountLast4: string;
    accountType: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export const employee: Employee = {
  id: 'EMP-142-0087',
  firstName: 'Maria',
  lastName: 'Rodriguez',
  initials: 'MR',
  role: 'Shift Lead',
  employeeCode: 'MROD142',
  company: "Domino's SE Louisiana LLC",
  location: 'Store #142, Metairie, LA',
  address: '1155 Hwy 190, Metairie, LA 70001',
  email: 'mrodriguez@dominosla.com',
  phone: '(504) 555-0142',
  hireDate: '2024-06-15',
  manager: {
    name: 'James Chen',
    title: 'Store Manager',
    initials: 'JC',
  },
  hourlyRate: 16.5,
  payFrequency: 'Bi-Weekly',
  nextPayDate: '2026-03-28',
  directDeposit: {
    bankName: 'Chase Bank',
    accountLast4: '4521',
    accountType: 'Checking',
  },
  emergencyContact: {
    name: 'Carlos Rodriguez',
    relationship: 'Spouse',
    phone: '(504) 555-0198',
  },
};
