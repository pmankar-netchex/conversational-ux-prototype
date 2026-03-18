# Mock Data Specification

This document consolidates all mock data details for the Conversational UX Prototype. It is referenced from the main [PRD](../prd.md).

---

## 1. Overview

- **Location:** All mock data lives in `src/data/` as static TypeScript objects (exported constants, not JSON files), so they are type-safe and importable.
- **Scope:** Realistic sample data for employee profile, leave balances, shift schedules, pay stubs, channels, messages, announcements, and chat history. No backend; all data is embedded in the frontend.
- **Theming:** All mock data is themed around the demo persona (Maria Rodriguez, Domino's SE Louisiana LLC) — see [Section 2: Demo Persona](#2-demo-persona).

---

## 2. Demo Persona

All mock data is themed around this specific employee:

| Field | Value |
|---|---|
| **Name** | Maria Rodriguez |
| **Role** | Shift Lead |
| **Location** | Domino's Store #142, 1155 Hwy 190, Metairie, LA 70001 |
| **Company** | Domino's SE Louisiana LLC |
| **Manager** | James Chen (Store Manager) |
| **Employee Code** | MROD142 |
| **Hire Date** | June 15, 2024 |
| **Hourly Rate** | $16.50 |
| **Pay Frequency** | Bi-Weekly |
| **Next Paycheck** | March 28, 2026 |
| **PTO Balance** | 48 hours available (of 64 total) |
| **Direct Deposit** | Chase Bank, Checking ****4521 |
| **Emergency Contact** | Carlos Rodriguez (Spouse), (504) 555-0198 |

### Supporting Cast (appears in channels/messages)

| Name | Role | Initials | Context |
|---|---|---|---|
| James Chen | Store Manager, Store #142 | JC | Maria's manager; DM partner; posts in team channel |
| Sofia Martinez | Team Member, Store #142 | SM | Appears in team channel conversations |
| David Kim | Delivery Driver, Store #142 | DK | Swap shift partner; appears in team channel |
| Lisa Tran | Assistant Manager, Store #207 | LT | Posts open shifts from neighboring store |
| Nicole Moore | HR Administrator | NM | Posts announcements and company updates |

---

## 3. Mock Data Schema (TypeScript Interfaces)

### Employee Profile

```typescript
interface Employee {
  id: string;               // "EMP-142-0087"
  firstName: string;        // "Maria"
  lastName: string;         // "Rodriguez"
  initials: string;         // "MR"
  role: string;             // "Shift Lead"
  employeeCode: string;     // "MROD142"
  company: string;          // "Domino's SE Louisiana LLC"
  location: string;         // "Store #142, Metairie, LA"
  address: string;          // "1155 Hwy 190, Metairie, LA 70001"
  email: string;            // "mrodriguez@dominosla.com"
  phone: string;            // "(504) 555-0142"
  hireDate: string;         // "2024-06-15"
  manager: {
    name: string;           // "James Chen"
    title: string;          // "Store Manager"
    initials: string;       // "JC"
  };
  hourlyRate: number;       // 16.50
  payFrequency: string;     // "Bi-Weekly"
  nextPayDate: string;      // "2026-03-28"
  directDeposit: {
    bankName: string;       // "Chase Bank"
    accountLast4: string;   // "4521"
    accountType: string;    // "Checking"
  };
  emergencyContact: {
    name: string;           // "Carlos Rodriguez"
    relationship: string;   // "Spouse"
    phone: string;          // "(504) 555-0198"
  };
}
```

### PTO Balances

```typescript
interface PTOBalance {
  planName: string;         // "Flexible Time Off"
  availableHours: number;   // 48
  usedHours: number;        // 16
  totalAllotment: number;   // 64
  pendingRequests: number;  // 0
}
```

### Pay Stubs

```typescript
interface PayStub {
  id: string;
  payPeriodStart: string;   // "2026-03-03"
  payPeriodEnd: string;     // "2026-03-14"
  paidOn: string;           // "2026-03-14"
  earnings: {
    regularHours: number;   // 76.0
    regularPay: number;     // 1254.00
    overtimeHours: number;  // 4.5
    overtimePay: number;    // 111.38
    grossPay: number;       // 1365.38
  };
  deductions: {
    federalTax: number;     // 136.54
    stateTax: number;       // 42.33
    socialSecurity: number; // 84.65
    medicare: number;       // 19.80
  };
  netPay: number;           // 1082.06
  depositAccount: string;   // "Chase ****4521"
}
```

Provide at least **3 pay stubs** (current + 2 previous periods) so the comparison flow works.

### Shifts

```typescript
interface Shift {
  id: string;
  date: string;             // "2026-03-20"
  startTime: string;        // "11:00"
  endTime: string;          // "19:00"
  location: string;         // "Store #142, Metairie"
  role: string;             // "Shift Lead"
  postedBy: string;         // "David Kim"
  type: "open" | "swap";
}

interface ScheduledShift {
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  role: string;
  isNew?: boolean;          // for highlighting newly picked-up shifts
}
```

Provide **3–4 open shifts** and a **full week schedule (7 days)** for the employee.

### Channels

```typescript
interface Channel {
  id: string;               // "ask-ai", "announcements", "store-142-team", etc.
  name: string;             // "#ask-ai", "#announcements", "James Chen"
  type: "ai" | "announcement" | "group" | "dm";
  icon?: string;            // MUI icon name: "AutoAwesome", "Campaign", "Tag"
  memberCount?: number;
  unreadCount: number;
  isInteractive: boolean;   // true for ask-ai, store-142-team, james-chen DM
  description?: string;
  members?: ChannelMember[];
}

interface ChannelMember {
  name: string;
  initials: string;
  role?: string;
  isOnline?: boolean;
}
```

### Messages

```typescript
interface Message {
  id: string;
  channelId: string;
  senderId: string;         // "user" for the employee, or member name
  senderName: string;
  senderInitials: string;
  senderRole?: string;      // "Admin", "Manager", etc.
  timestamp: string;        // ISO 8601
  content: string;
  isPrivate?: boolean;      // true for bot whispers
  isBot?: boolean;
  richContent?: RichContent;
  reactions?: Reaction[];
}

interface RichContent {
  type: "card" | "cardList" | "comparison" | "schedule" | "quickReplies";
  data: any;                // typed per content type in implementation
}

interface Reaction {
  emoji: string;            // "👍", "❤️", "🎉"
  count: number;
  includesUser: boolean;
}
```

### Chat Sessions (for History Panel)

```typescript
interface ChatSession {
  id: string;
  title: string;            // "PTO Request — Mar 10"
  lastMessagePreview: string;
  timestamp: string;
  messageCount: number;
}
```

Provide **4–5 mock sessions** so the history panel looks populated.

---

## 4. Data File Structure

Mock data files under `src/data/`:

| File | Contents |
|---|---|
| `employee.ts` | Employee profile mock data |
| `channels.ts` | Channel list with metadata |
| `messages.ts` | Pre-loaded messages per channel |
| `payStubs.ts` | Array of pay stub records |
| `shifts.ts` | Open shifts + scheduled shifts |
| `ptoBalances.ts` | PTO plan balances |
| `announcements.ts` | Announcement messages |
| `chatSessions.ts` | Mock chat history sessions |

---

## 5. Announcements Mock Data (#announcements channel)

Read-only feed. Display 3–4 pre-loaded announcement messages. Each announcement: sender avatar + name + "Admin"/"Manager"/"System" badge + timestamp; message body (multi-line, may include bold); reaction row (e.g. thumbs up ×12, heart ×5).

**Announcements:**

1. **"Updated Employee Handbook"** — Nicole Moore, Admin, Mar 11, 2026  
   "The 2026 Employee Handbook has been updated with new PTO policies. Please review it in the Document Center. Changes are effective April 1."

2. **"March Payroll Schedule"** — Nicole Moore, Admin, Mar 8, 2026  
   "Reminder: the next pay date is March 28. Please ensure your timesheets are submitted by March 22. Contact your manager if you have any discrepancies."

3. **"Store #142 — Employee of the Month"** — James Chen, Manager, Mar 5, 2026  
   "Congratulations to Maria Rodriguez for outstanding customer service scores this month! 🏆"

4. **"System Maintenance"** — Netchex Support, System, Feb 28, 2026  
   "Netchex will be undergoing scheduled maintenance on Saturday, March 1 from 2:00 AM – 5:00 AM CT. Self-service features will be temporarily unavailable."

---

## 6. Pre-loaded Channel Conversations

### #store-142-team

**Members:** 8 people (shown in header).

**Pre-loaded messages:**

| Sender | Time | Content |
|---|---|---|
| James Chen (Store Manager) | 9:15 AM | Hey team — reminder that the health inspection is next Tuesday. Please make sure your stations are spotless by end of shift Monday. |
| David Kim | 9:22 AM | Got it, will deep clean the prep area Monday afternoon. |
| Sofia Martinez | 9:30 AM | @James do we need to update the cleaning logs too? |
| James Chen | 9:35 AM | Yes please — make sure the last 7 days are filled in on the sheet behind the register. |
| Maria Rodriguez (You) | 9:45 AM | I'll handle the front-of-house checklist. Also — does anyone want to swap shifts this Friday? I have 11-7 but need the morning off. |

*At this point, a bot whisper would appear for Maria's message about shift swapping, triggering the shift flow suggestion.*

### 1:1 James Chen

**Pre-loaded messages:**

| Sender | Time | Content |
|---|---|---|
| James Chen | Yesterday 4:30 PM | Hey Maria, great job handling the lunch rush today. The customer feedback scores were the highest this week. |
| Maria Rodriguez (You) | Yesterday 4:45 PM | Thanks James! The new prep routine is really helping. By the way, I need to update my direct deposit — I switched banks. |
| *Bot whisper appears for the direct deposit mention.* | | |
| James Chen | Yesterday 4:50 PM | No problem. You can do that through the system. Let me know if you need help. |

---

## 7. Widget & Flow Values (from mock data)

These values appear in the #ask-ai home state and flows; they must match the mock data above.

- **PTO widget:** "Flexible Time Off", "48 hours" available.
- **Next Paycheck widget:** "Mar 28, 2026", "$1,247.50", "Bi-Weekly | Direct Deposit".
- **Next Shift widget:** "Tomorrow, 11:00 AM – 7:00 PM", "Store #142 — Shift Lead".
- **Pay stub flow (latest):** Pay period Mar 3 – Mar 14, 2026; Paid Mar 14; Regular 76.0 hrs $1,254.00; Overtime 4.5 hrs $111.38; Gross $1,365.38; deductions (Federal $136.54, State LA $42.33, SS $84.65, Medicare $19.80); Net $1,082.06; Direct Deposit Chase ****4521.
- **Personal info form defaults:** Address "1155 Hwy 190", City "Metairie", State "LA", ZIP "70001"; Phone "(504) 555-0142"; Direct deposit bank "Chase Bank"; Emergency contact "Carlos Rodriguez", "Spouse", "(504) 555-0198".

---

## 8. Right Panel — Chat History

List of past chat sessions (mock data). Each session shows:

- Session title (e.g. "PTO Request — Mar 10")
- Date/time
- Preview of last message (truncated to 1 line)

Provide 4–5 mock `ChatSession` records so the panel looks populated. Clicking a session loads that conversation in the center pane (mock: show a different set of pre-loaded messages).
