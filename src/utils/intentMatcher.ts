export type FlowId = 'leave' | 'shifts' | 'payStub' | 'personalInfo' | 'benefits' | 'runPayroll' | null;

interface IntentPattern {
  flowId: FlowId;
  keywords: string[];
}

const intentPatterns: IntentPattern[] = [
  {
    flowId: 'leave',
    keywords: [
      'time off', 'pto', 'day off', 'leave', 'vacation', 'take off',
      'request off', 'sick day', 'personal day', 'request time',
    ],
  },
  {
    flowId: 'shifts',
    keywords: [
      'shifts', 'schedule', 'pick up', 'open shifts', 'available shifts',
      'swap shift', 'work more hours', 'extra hours', 'view shifts',
      'browse shifts',
    ],
  },
  {
    flowId: 'payStub',
    keywords: [
      'pay stub', 'paycheck', 'earnings', 'how much', 'paid', 'pay history',
      'last check', 'deductions', 'net pay', 'gross pay', 'check my pay',
      'view pay',
    ],
  },
  {
    flowId: 'personalInfo',
    keywords: [
      'address', 'direct deposit', 'bank', 'phone number', 'emergency contact',
      'personal info', 'update my info', 'change my', 'update my',
    ],
  },
  {
    flowId: 'benefits',
    keywords: [
      'benefits', 'health insurance', 'dental', 'vision', 'enrollment',
      'my benefits', 'show my benefits', 'view benefits', 'benefit plan',
      'open enrollment', 'coverage',
    ],
  },
  {
    flowId: 'runPayroll',
    keywords: [
      'run payroll', 'payroll preview', 'process payroll', 'submit payroll',
      'payroll run', 'execute payroll', 'start payroll', 'payroll processing',
      'preview payroll', 'payroll report', 'labor cost', 'labor report',
    ],
  },
];

export function matchIntent(input: string): FlowId {
  const lower = input.toLowerCase();
  for (const pattern of intentPatterns) {
    for (const keyword of pattern.keywords) {
      if (lower.includes(keyword)) {
        return pattern.flowId;
      }
    }
  }
  return null;
}

export function detectPersonalInfoSubType(input: string): string | null {
  const lower = input.toLowerCase();
  if (lower.includes('direct deposit') || lower.includes('bank')) return 'directDeposit';
  if (lower.includes('address')) return 'address';
  if (lower.includes('phone')) return 'phone';
  if (lower.includes('emergency')) return 'emergencyContact';
  return null;
}
