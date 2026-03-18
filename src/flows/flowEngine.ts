import type { Message } from '../data/messages';
import { matchIntent, detectPersonalInfoSubType } from '../utils/intentMatcher';
import type { FlowId } from '../utils/intentMatcher';
import { ptoBalance } from '../data/ptoBalances';
import { payStubs } from '../data/payStubs';
import { openShifts, weekSchedule } from '../data/shifts';
import { employee } from '../data/employee';
import { formatCurrency } from '../utils/formatters';
import { formatTimeRange, formatDateShort } from '../utils/timeUtils';

let messageIdCounter = 1000;
function nextMsgId() {
  return `bot-msg-${++messageIdCounter}`;
}

function botMsg(channelId: string, content: string, richContent?: any): Message {
  return {
    id: nextMsgId(),
    channelId,
    senderId: 'bot',
    senderName: 'NEX',
    senderInitials: 'NX',
    timestamp: new Date().toISOString(),
    content,
    isBot: true,
    richContent,
  };
}

export interface FlowResult {
  messages: Message[];
  openOverlay?: { type: string; data?: Record<string, any> };
  setFlow?: { flowId: string; step: number; subType?: string; data?: Record<string, any> };
  clearFlow?: boolean;
  navigateTo?: string; // Netchex page to navigate to (e.g., 'benefits')
}

export function handleUserMessage(
  channelId: string,
  input: string,
  currentFlow: { flowId: string | null; step: number; subType?: string | null; data: Record<string, any> }
): FlowResult {
  // If there's an active flow, handle continuation
  if (currentFlow.flowId) {
    return handleFlowContinuation(channelId, input, currentFlow);
  }

  // Try to match intent
  const flowId = matchIntent(input);
  if (flowId) {
    return startFlow(channelId, flowId, input);
  }

  // Fallback
  return {
    messages: [
      botMsg(
        channelId,
        "I'm not sure I understand. You can ask me about time off, pay stubs, shifts, benefits, payroll, or updating your personal info. Or try one of the quick actions below!"
      ),
    ],
  };
}

function startFlow(channelId: string, flowId: FlowId, input: string): FlowResult {
  switch (flowId) {
    case 'leave':
      return startLeaveFlow(channelId);
    case 'shifts':
      return startShiftFlow(channelId);
    case 'payStub':
      return startPayStubFlow(channelId);
    case 'personalInfo':
      return startPersonalInfoFlow(channelId, input);
    case 'benefits':
      return startBenefitsFlow(channelId);
    case 'runPayroll':
      return startRunPayrollFlow(channelId);
    default:
      return { messages: [] };
  }
}

// ========== LEAVE FLOW ==========
function startLeaveFlow(channelId: string): FlowResult {
  const bal = ptoBalance;
  return {
    messages: [
      botMsg(channelId, "Sure thing! Here's your current time-off balance:", {
        type: 'card',
        data: {
          title: bal.planName,
          rows: [
            { label: 'Available', value: `${bal.availableHours} hours`, highlight: true },
            { label: 'Used (YTD)', value: `${bal.usedHours} hours` },
            { label: 'Total Allotment', value: `${bal.totalAllotment} hours` },
          ],
        },
      }),
      botMsg(channelId, 'Would you like to submit a time-off request?', {
        type: 'quickReplies',
        data: ['Yes, request time off', 'No, just checking'],
      }),
    ],
    setFlow: { flowId: 'leave', step: 1, data: {} },
  };
}

// ========== SHIFT FLOW ==========
function startShiftFlow(channelId: string): FlowResult {
  const shiftCards = openShifts.map((s) => ({
    id: s.id,
    title: `${formatDateShort(s.date)} | ${formatTimeRange(s.startTime, s.endTime)}`,
    subtitle: `${s.location} — ${s.role}`,
    detail: `Posted by: ${s.postedBy}${s.type === 'swap' ? ' (swap)' : ''}`,
    action: 'Pick Up Shift',
  }));

  return {
    messages: [
      botMsg(channelId, 'Here are the open shifts available this week:', {
        type: 'cardList',
        data: shiftCards,
      }),
      botMsg(channelId, 'Tap any shift to pick it up, or ask me to filter by day or location.'),
    ],
    setFlow: { flowId: 'shifts', step: 1, data: {} },
  };
}

// ========== PAY STUB FLOW ==========
function startPayStubFlow(channelId: string): FlowResult {
  const stub = payStubs[0];
  const totalDeductions =
    stub.deductions.federalTax +
    stub.deductions.stateTax +
    stub.deductions.socialSecurity +
    stub.deductions.medicare;

  return {
    messages: [
      botMsg(channelId, "Here's your most recent pay stub:", {
        type: 'card',
        data: {
          title: `Pay Period: ${formatDateShort(stub.payPeriodStart)} – ${formatDateShort(stub.payPeriodEnd)}`,
          subtitle: `Paid On: ${formatDateShort(stub.paidOn)}`,
          sections: [
            {
              heading: 'EARNINGS',
              rows: [
                { label: 'Regular Hours', value: `${stub.earnings.regularHours} hrs`, amount: formatCurrency(stub.earnings.regularPay) },
                { label: 'Overtime', value: `${stub.earnings.overtimeHours} hrs`, amount: formatCurrency(stub.earnings.overtimePay) },
                { label: 'Total Gross', value: '', amount: formatCurrency(stub.earnings.grossPay), bold: true },
              ],
            },
            {
              heading: 'DEDUCTIONS',
              rows: [
                { label: 'Federal Tax', amount: formatCurrency(stub.deductions.federalTax) },
                { label: 'State Tax (LA)', amount: formatCurrency(stub.deductions.stateTax) },
                { label: 'Social Security', amount: formatCurrency(stub.deductions.socialSecurity) },
                { label: 'Medicare', amount: formatCurrency(stub.deductions.medicare) },
              ],
            },
            {
              heading: 'NET PAY',
              rows: [
                { label: 'Net Pay', amount: formatCurrency(stub.netPay), bold: true, highlight: true },
                { label: `Direct Deposit to ${stub.depositAccount}`, amount: '' },
              ],
            },
          ],
        },
      }),
      botMsg(channelId, 'Want to see a previous pay period or have a question about this one?'),
    ],
    setFlow: { flowId: 'payStub', step: 1, data: {} },
  };
}

// ========== PERSONAL INFO FLOW ==========
function startPersonalInfoFlow(channelId: string, input: string): FlowResult {
  const subType = detectPersonalInfoSubType(input);

  if (subType) {
    return handlePersonalInfoSubType(channelId, subType);
  }

  return {
    messages: [
      botMsg(channelId, 'Of course — what would you like to update?', {
        type: 'quickReplies',
        data: ['Address', 'Direct Deposit', 'Phone Number', 'Emergency Contact'],
      }),
    ],
    setFlow: { flowId: 'personalInfo', step: 1, data: {} },
  };
}

function handlePersonalInfoSubType(channelId: string, subType: string): FlowResult {
  const labels: Record<string, string> = {
    directDeposit: 'direct deposit information',
    address: 'address',
    phone: 'phone number',
    emergencyContact: 'emergency contact',
  };

  const msgs: Message[] = [
    botMsg(channelId, `I'll help you update your ${labels[subType]}. ${subType === 'directDeposit' ? 'Please have your new bank details ready.' : ''}`),
  ];

  if (subType === 'directDeposit') {
    msgs.push(
      botMsg(channelId, 'This is sensitive financial information. Your changes will be verified before taking effect.')
    );
  }

  return {
    messages: msgs,
    openOverlay: { type: subType },
    setFlow: { flowId: 'personalInfo', step: 2, subType, data: {} },
  };
}

// ========== BENEFITS FLOW ==========
function startBenefitsFlow(channelId: string): FlowResult {
  return {
    messages: [
      botMsg(channelId, "Here's your current benefits enrollment. You can view coverage details and make changes from the full page.", {
        type: 'card',
        data: {
          title: 'Your Benefits',
          rows: [
            { label: 'Health', value: 'Blue Cross PPO' },
            { label: 'Dental', value: 'Delta Dental Basic' },
            { label: 'Vision', value: 'VSP Choice' },
          ],
          action: { label: 'Open Benefits Page', navigateTo: 'benefits' },
        },
      }),
    ],
    setFlow: { flowId: 'benefits', step: 1, data: {} },
  };
}

// ========== RUN PAYROLL FLOW ==========
function startRunPayrollFlow(channelId: string): FlowResult {
  return {
    messages: [
      botMsg(channelId, "Here's a quick summary of the upcoming payroll run:", {
        type: 'card',
        data: {
          title: 'Payroll Preview — Mar 28, 2026',
          rows: [
            { label: 'Pay Period', value: 'Mar 15 – Mar 28' },
            { label: 'Employees', value: '8 active' },
            { label: 'Est. Gross', value: '$12,480.00' },
            { label: 'Est. Net', value: '$9,936.00' },
            { label: 'Status', value: 'Ready to process', highlight: true },
          ],
          action: { label: 'Open Payroll Dashboard', navigateTo: 'runPayroll' },
        },
      }),
    ],
    setFlow: { flowId: 'runPayroll', step: 1, data: {} },
  };
}

// ========== FLOW CONTINUATION ==========
function handleFlowContinuation(
  channelId: string,
  input: string,
  flow: { flowId: string | null; step: number; subType?: string | null; data: Record<string, any> }
): FlowResult {
  const lower = input.toLowerCase();

  // Leave flow continuations
  if (flow.flowId === 'leave') {
    if (lower.includes('yes') || lower.includes('request time off')) {
      return {
        messages: [],
        openOverlay: { type: 'leaveRequest' },
        setFlow: { flowId: 'leave', step: 2, data: flow.data },
      };
    }
    if (lower.includes('no') || lower.includes('just checking')) {
      return {
        messages: [
          botMsg(channelId, `No problem! Your balance is ${ptoBalance.availableHours} hours of ${ptoBalance.planName}. Let me know if you need anything else.`),
        ],
        clearFlow: true,
      };
    }
  }

  // Pay stub flow continuations
  if (flow.flowId === 'payStub') {
    if (lower.includes('lower') || lower.includes('less') || lower.includes('why') || lower.includes('compare') || lower.includes('difference')) {
      const cur = payStubs[0];
      const prev = payStubs[1];
      const diff = cur.netPay - prev.netPay;

      return {
        messages: [
          botMsg(channelId, "Good question — let me compare your last two paychecks:", {
            type: 'comparison',
            data: {
              headers: ['', formatDateShort(cur.paidOn), formatDateShort(prev.paidOn)],
              rows: [
                { label: 'Regular', values: [`${cur.earnings.regularHours} hrs`, `${prev.earnings.regularHours} hrs`] },
                { label: 'Overtime', values: [`${cur.earnings.overtimeHours} hrs`, `${prev.earnings.overtimeHours} hrs`] },
                { label: 'Gross', values: [formatCurrency(cur.earnings.grossPay), formatCurrency(prev.earnings.grossPay)] },
                { label: 'Net', values: [formatCurrency(cur.netPay), formatCurrency(prev.netPay)] },
              ],
              summary: {
                difference: formatCurrency(Math.abs(diff)),
                reason: `${prev.earnings.regularHours - cur.earnings.regularHours} fewer regular hours, ${prev.earnings.overtimeHours - cur.earnings.overtimeHours} fewer OT hrs`,
              },
            },
          }),
          botMsg(
            channelId,
            `Your ${formatDateShort(cur.paidOn)} check was ${formatCurrency(Math.abs(diff))} less because you worked ${prev.earnings.regularHours - cur.earnings.regularHours} fewer regular hours and ${prev.earnings.overtimeHours - cur.earnings.overtimeHours} fewer overtime hours. The tax withholdings also adjusted proportionally.`
          ),
        ],
        clearFlow: true,
      };
    }
  }

  // Shift flow - check for schedule question
  if (flow.flowId === 'shifts') {
    if (lower.includes('schedule') || lower.includes('next week') || lower.includes('my schedule')) {
      const schedRows = weekSchedule.map((s) => ({
        date: formatDateShort(s.date),
        shift: s.role === 'OFF' ? 'OFF' : `${formatTimeRange(s.startTime, s.endTime)}, ${s.location}`,
        isNew: s.isNew,
      }));

      return {
        messages: [
          botMsg(channelId, "Here's your schedule for next week (Mar 17\u201323):", {
            type: 'schedule',
            data: schedRows,
          }),
          botMsg(channelId, "You're working 40 hours next week. Let me know if you need to make changes."),
        ],
        clearFlow: true,
      };
    }
  }

  // Benefits flow continuations
  if (flow.flowId === 'benefits') {
    if (lower.includes('yes') || lower.includes('show my benefits')) {
      return {
        messages: [
          botMsg(channelId, "Taking you to your benefits page now. You'll find your full enrollment details, coverage summaries, and options to make changes."),
        ],
        navigateTo: 'benefits',
        clearFlow: true,
      };
    }
    if (lower.includes('no') || lower.includes('thanks')) {
      return {
        messages: [
          botMsg(channelId, "No problem! Let me know if you need anything else."),
        ],
        clearFlow: true,
      };
    }
  }

  // Run payroll flow continuations
  if (flow.flowId === 'runPayroll') {
    if (lower.includes('yes') || lower.includes('open payroll')) {
      return {
        messages: [
          botMsg(channelId, "Opening the payroll dashboard now. You'll see the full breakdown, overtime alerts, and can submit when ready."),
        ],
        navigateTo: 'runPayroll',
        clearFlow: true,
      };
    }
    if (lower.includes('no') || lower.includes('thanks')) {
      return {
        messages: [
          botMsg(channelId, "No problem! Let me know if you need anything else."),
        ],
        clearFlow: true,
      };
    }
  }

  // Personal info flow - quick reply selection
  if (flow.flowId === 'personalInfo' && flow.step === 1) {
    const subMap: Record<string, string> = {
      address: 'address',
      'direct deposit': 'directDeposit',
      'phone number': 'phone',
      phone: 'phone',
      'emergency contact': 'emergencyContact',
      emergency: 'emergencyContact',
    };
    for (const [key, val] of Object.entries(subMap)) {
      if (lower.includes(key)) {
        return handlePersonalInfoSubType(channelId, val);
      }
    }
  }

  // If no continuation matched, try new intent
  const newFlowId = matchIntent(input);
  if (newFlowId) {
    return startFlow(channelId, newFlowId, input);
  }

  return {
    messages: [
      botMsg(channelId, "I can help you with time off, pay stubs, shifts, or updating your info. What would you like to do?"),
    ],
    clearFlow: true,
  };
}

// ========== OVERLAY SUBMIT HANDLERS ==========
export function handleOverlaySubmit(
  channelId: string,
  overlayType: string,
  formData: Record<string, any>
): Message[] {
  switch (overlayType) {
    case 'leaveRequest': {
      const startDate = formData.startDate || 'Mar 24';
      const endDate = formData.endDate || 'Mar 26';
      const hours = formData.hoursPerDay || 8;
      const days = formData.days || 3;
      return [
        botMsg(channelId, 'Your time-off request has been submitted!', {
          type: 'card',
          data: {
            title: 'Time Off Request — Submitted',
            status: 'success',
            rows: [
              { label: 'Dates', value: `${startDate} – ${endDate}, 2026` },
              { label: 'Hours', value: `${days * hours} hours (${days} days x ${hours} hrs/day)` },
              { label: 'Status', value: 'Pending manager approval' },
              { label: 'Approver', value: employee.manager.name },
            ],
          },
        }),
        botMsg(channelId, `Your manager ${employee.manager.name} will review this shortly. I'll let you know when it's approved.`),
      ];
    }
    case 'shiftPickup': {
      const shift = formData.shift;
      return [
        botMsg(channelId, "You're all set!", {
          type: 'card',
          data: {
            title: 'Shift Confirmed',
            status: 'success',
            rows: [
              { label: 'Date', value: shift?.title || 'Fri, Mar 20 | 11 AM – 7 PM' },
              { label: 'Location', value: shift?.subtitle?.split(' — ')[0] || 'Store #142' },
              { label: 'Role', value: shift?.subtitle?.split(' — ')[1] || 'Shift Lead' },
              { label: 'Swapping with', value: shift?.detail?.replace('Posted by: ', '').replace(' (swap)', '') || 'David Kim' },
            ],
          },
        }),
        botMsg(channelId, 'This shift has been added to your schedule. David Kim will be notified of the swap.'),
      ];
    }
    case 'directDeposit': {
      const last4 = formData.accountNumber ? formData.accountNumber.slice(-4) : '7890';
      return [
        botMsg(channelId, 'Your direct deposit information has been updated.', {
          type: 'card',
          data: {
            title: 'Direct Deposit Updated',
            status: 'success',
            rows: [
              { label: 'Bank', value: formData.bankName || 'New Bank' },
              { label: 'Account', value: `****${last4}` },
              { label: 'Type', value: formData.accountType || 'Checking' },
              { label: 'Effective', value: 'Next pay period' },
            ],
          },
        }),
        botMsg(channelId, 'Changes will take effect starting your next paycheck on Mar 28. If you need to make another change, just let me know.'),
      ];
    }
    case 'address': {
      const addr = `${formData.street || ''}${formData.apt ? ', ' + formData.apt : ''}, ${formData.city || ''}, ${formData.state || ''} ${formData.zip || ''}`;
      return [
        botMsg(channelId, `Your address has been updated to ${addr}. This will be reflected in your profile and tax documents going forward.`),
      ];
    }
    case 'phone': {
      return [botMsg(channelId, 'Your phone number has been updated.')];
    }
    case 'emergencyContact': {
      return [botMsg(channelId, 'Your emergency contact has been updated.')];
    }
    default:
      return [botMsg(channelId, 'Done! Your changes have been saved.')];
  }
}

// ========== WHISPER DETECTION ==========
export function detectWhisperIntent(input: string): { flowId: string; message: string } | null {
  const flowId = matchIntent(input);
  if (!flowId) return null;

  const actionNames: Record<string, string> = {
    leave: 'request time off',
    shifts: 'browse shifts',
    payStub: 'check your pay stub',
    personalInfo: 'update your personal info',
    benefits: 'view your benefits',
    runPayroll: 'run payroll',
  };

  return {
    flowId,
    message: `It looks like you want to **${actionNames[flowId]}**. Would you like me to help with that?`,
  };
}
