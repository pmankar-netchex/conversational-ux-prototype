# Conversational UX Prototype — Product Requirements Document

> **Status:** Implementation-Ready Spec  
> **Audience:** Netchex Leadership, Investors, and Engineering  
> **Last updated:** March 13, 2026

---

## 1. Context & Problem

### Background

Netchex is a cloud-based HR and payroll platform serving small to mid-sized businesses (50–500 employees) in restaurants, hospitality, healthcare, and manufacturing. Its employee self-service portal provides access to pay stubs, PTO requests, benefits enrollment, shift scheduling, tax documents, earned wage access, and learning — via web and mobile. The platform reports 80% employee engagement and positions itself as an empowerment layer on top of payroll infrastructure.

For a detailed breakdown of Netchex features, see [Appendix A](#appendix-a-netchex-platform-features).

### The Core Problem

Netchex serves a workforce that is overwhelmingly deskless — hourly employees in industries like hospitality, healthcare, staffing, and retail. These users interact with the platform infrequently (to request time off, check a pay stub, pick up a shift) and have low tolerance for navigational friction. The current experience is built around traditional form-based UX: nested menus, multi-step wizards, and pages that assume users remember where things live.

**The result:** employees struggle to complete routine self-service tasks — not because the tasks are complex, but because *finding and navigating to the right screen* is the bottleneck. Common pain points include:

- Not knowing where to go to submit a leave request
- Inability to locate the shift scheduler or understand how to apply for open shifts
- Difficulty finding pay stubs or understanding earnings breakdowns
- Confusion around how to update personal information like address or direct deposit

> **Note:** This hypothesis is currently qualitative — informed by internal observations and customer-facing team feedback rather than instrumented usage data. A key outcome of this prototype is to build conviction (internally and with investors) that conversational UX materially reduces friction, which would justify investing in usage analytics to quantify the problem at scale.

### Why Now

1. **User behavior has changed.** Billions of people now interact with services through chat — WhatsApp, Telegram, iMessage, and workplace tools like Slack and Teams have normalized conversational interaction patterns. Deskless workers, in particular, are mobile-first and messaging-native. They are more comfortable typing "show me my pay stub" than navigating a menu hierarchy.

2. **LLM technology has matured.** Large language models can now power natural-language task completion with high reliability — understanding intent, handling ambiguity, and orchestrating multi-step workflows through conversation. What would have required rigid chatbot decision trees two years ago can now be a fluid, adaptive experience.

### The Hypothesis

> If we overlay a conversational interface onto Netchex's core employee workflows, deskless workers will be able to complete routine tasks faster and with less confusion — reducing support burden and creating a meaningful product differentiator in the HCM market.

This prototype exists to test that hypothesis visually and interactively, giving leadership and investors a tangible sense of the experience before committing to a full engineering investment.

### Strategic Framing

- **Short-term (this prototype):** Demonstrate that conversational UX is viable and compelling for Netchex's core employee workflows.
- **Medium-term (6–12 months):** If validated, build a production conversational layer powered by LLM, connected to Netchex backend APIs.
- **Long-term (12+ months):** Conversational-first becomes a platform differentiator — Netchex positions as the HCM platform built for the way deskless workers actually communicate.

---

## 2. Scope

### What This Prototype Is

A **frontend-only, interactive prototype** that simulates a conversational UX layer over Netchex's employee-facing workflows. It is designed to be demoed live to leadership and investors to build conviction around the product direction.

### Deliverables

| Deliverable | Description |
|---|---|
| **Conversational UI** | A chat-based interface where an employee can type or tap to complete tasks. Styled to feel native to the Netchex product using React + MUI. |
| **4 hardcoded use-case flows** | Fully scripted conversational paths with branching where needed. |
| **Mock employee data** | Realistic sample data (employee profile, leave balances, shift schedules, pay stubs) embedded as static data in the frontend. See [Mock Data Specification](docs/mock-data.md) for full details. |
| **Demo script** | A recommended walkthrough sequence for presenting to leadership/investors (see Section 11). |

### Use Cases in Scope

These four flows represent the highest-frequency, highest-friction employee self-service actions:

| # | Use Case | What the User Does | What the Prototype Shows |
|---|---|---|---|
| 1 | **Apply for Leave / PTO** | Employee asks to take time off → sees balance → selects dates → confirms submission | Conversational form-fill that replaces a 4-screen wizard |
| 2 | **View & Apply for Shifts** | Employee asks about available shifts → filters by date/role → picks a shift → confirms | Discovery + action in a single thread vs. navigating to scheduler |
| 3 | **Check Pay Stubs / Earnings** | Employee asks about recent pay → sees breakdown → can ask follow-up questions ("why was this check lower?") | Contextual Q&A that replaces static PDF viewing |
| 4 | **Update Personal Info** | Employee wants to change address or bank details → guided through fields → confirms update | Sensitive data flow handled conversationally with confirmation step |

### How It Works (Technical Approach)

- **No LLM integration.** All conversations are driven by hardcoded flow logic — pattern-matched user inputs trigger scripted bot responses. This keeps the prototype deterministic and demo-safe.
- **No backend.** All data is static JSON embedded in the frontend.
- **No authentication.** The prototype launches directly into a logged-in employee view.
- **Tech stack:** React 18 + Material UI (MUI) v5, matching the Netchex Figma component library.

---

## 3. Not in Scope

The following are explicitly excluded from this prototype. These are deliberate boundaries to keep the prototype focused on demonstrating the *experience*, not the infrastructure.

| Exclusion | Rationale |
|---|---|
| **Authentication / login flow** | Adds complexity with zero demo value. Prototype assumes the user is already logged in. |
| **Backend API integration** | This is a frontend-only prototype. No calls to Netchex services. |
| **Database or persistent storage** | No data is written or persisted. All state resets on page refresh. |
| **LLM / AI model integration** | Intentionally excluded. Hardcoded flows ensure demo reliability and avoid unpredictable model outputs during investor presentations. The prototype *simulates* what an LLM-powered experience would feel like. |
| **Manager / admin workflows** | Scope is limited to the *employee* persona. Manager approvals, admin configuration, and reporting are out of scope. |
| **Mobile-native build** | Prototype is web-based. Responsive design is a nice-to-have but not required for the demo context. |
| **Accessibility / i18n** | Important for production but not required at prototype stage. |
| **Error states and edge cases** | Only happy paths and 1–2 key alternate paths per flow are scripted. |

---

## 4. Target Users

### User Personas (Production)

| Priority | Persona | Description |
|---|---|---|
| P0 | **End Employees** | Deskless workers at restaurants, dealerships, health clubs. Not tech-savvy, hard to train, low tolerance for friction. |
| P1 | **Managers** | Sometimes more technically adept; handle 1:1s, performance reviews, scheduling. Not tech-savvy but regular platform users. |
| P2 | **Client Admins** | Perform involved setup tasks. Full conversational UX is impractical for admin workflows, but conversational navigation to the right pages adds value. |

### Prototype Persona (P0 only)

This prototype focuses exclusively on the **P0 End Employee** persona, set in the context of a **Domino's Pizza franchise with multiple locations** in the greater New Orleans metro area.

See [Section 10: Demo Persona](#10-demo-persona) for the specific employee profile used throughout the prototype.

---

## 5. Design System

All visual decisions are derived from the existing Netchex product (see `screenshots/` folder) and the Figma component library at `https://www.figma.com/design/BCt3hXmhIREIC6EsTOJ9kA/Import-Integrations?node-id=39-2041`.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#2563EB` | Primary buttons, active states, links, selected nav items |
| `primary-dark` | `#1D4ED8` | Button hover states |
| `neutral-900` | `#333333` | Headings, primary body text |
| `neutral-700` | `#757575` | Secondary text, labels |
| `neutral-600` | `#999999` | Placeholder text, disabled states |
| `neutral-400` | `#E9E9E9` | Borders, dividers |
| `gray-50` | `#F9FAFB` | Background (left nav, card backgrounds) |
| `gray-200` | `#E5E7EB` | Borders, subtle dividers |
| `gray-500` | `#6B7280` | Icon default color |
| `white` | `#FFFFFF` | Card surfaces, center pane background |
| `semantic-success` | `#16A34A` | Success messages, approved status badges |
| `semantic-warning` | `#FFE44D` | Warning indicators |
| `semantic-error` | `#DC2626` | Error messages, failed status badges |
| `netchex-green` | `#6BBF59` | Netchex logo/brand mark (used sparingly) |
| `top-nav-bg` | `#1A1A2E` | Top navigation bar background (dark navy) |
| `user-bubble` | `#2563EB` | User chat message background |
| `bot-bubble` | `#F3F4F6` | Bot chat message background |

### Typography

**Font family:** Source Sans Pro (Google Fonts) — all weights used.

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `H1` | 30px | 400 | 100% | Page titles (Dashboard) |
| `H3` | 20px | 400 | 100% | Section headings |
| `H4` | 16px | 600 (SemiBold) | 100% | Card titles, bold labels |
| `H5` | 14px | 400 | 100% | Small headings, nav items |
| `body1` | 16px | 400 | 24px | Primary body text, chat messages |
| `body2` | 14px | 400 | 1.43 | Secondary text, descriptions |
| `button` | 14px | 500 (Medium) | 100% | Button labels |
| `caption` | 12px | 400 | 1.4 | Timestamps, meta info |

### Component Library

The prototype uses **MUI v5** components. Key components and their roles:

| Component | Usage |
|---|---|
| `Card`, `CardHeader`, `CardContent`, `CardActions` | Widget cards on #ask-ai home, pay stub display, shift cards |
| `Paper` | Elevated surface containers, chat message bubbles |
| `Avatar` | Employee avatars, channel member avatars, bot avatar |
| `Button` | Primary/secondary actions, quick-action chips |
| `TextField` | Chat input, overlay form fields |
| `Drawer` | Overlay form panels (slides up from bottom or in from right) |
| `Dialog` | Confirmation dialogs for sensitive actions |
| `List`, `ListItem`, `ListItemIcon`, `ListItemText` | Left nav channel list, Netchex product links |
| `Chip` | Quick-action tags above chat input, status badges |
| `IconButton` | Nav icons (notification bell, hamburger menu, attachments) |
| `Divider` | Section separators in left nav |
| `Badge` | Unread count indicators on channels |
| `Menu`, `MenuItem` | Netchex Tasks flyup, profile dropdown, search dropdown |
| `Tooltip` | Icon hover explanations |

### Elevation & Shadows

Use MUI elevation level 1 for cards and floating elements:
```
box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),
            0px 1px 1px 0px rgba(0,0,0,0.14),
            0px 1px 3px 0px rgba(0,0,0,0.12);
```

### Logo

- File: `assets/Logomark@2x.png` (green Netchex swirl mark)
- Used in: top nav bar (left side), bot chat avatar
- Size in top nav: 32px height
- Size as bot avatar: 36px diameter circular

### Top Navigation Bar Reference

Derived from existing Netchex screenshots. Dark navy bar containing:
- Left: Netchex logo + company name ("Domino's SE Louisiana LLC")
- Center: Navigation links — DASHBOARD, MEET THE TEAM, TASKS, DOCUMENTS, LEARN (NETLEARN)
- Right: Search icon, notification bell, help icon, profile avatar with initials

---

## 6. Layout Specification

### Overall Structure

Three-panel layout with a fixed top navigation bar:

```
+--------------------------------------------------------------+
|  Top Nav Bar (fixed, 56px height)                            |
+----------+-----------------------------------+---------------+
|  Left    |  Center Pane                      |  Right Panel  |
|  Nav     |  (flex: 1)                        |  (conditional |
|  (260px) |                                   |   360px)      |
|  fixed   |  Chat / Dashboard / Content       |  Chat history |
|          |                                   |               |
+----------+-----------------------------------+---------------+
```

Full viewport height. No page-level scrolling — each panel scrolls independently.

### Top Navigation Bar

**Height:** 56px fixed.  
**Background:** `top-nav-bg` (`#1A1A2E`).  
**Text color:** white.

| Position | Element | Behavior |
|---|---|---|
| Left | Netchex logo (32px) + company name "Domino's SE Louisiana LLC" | Static |
| Center | Nav links: DASHBOARD, MEET THE TEAM, TASKS, DOCUMENTS, LEARN | Click navigates to corresponding Netchex product page in left nav section 2. Active link is underlined white. |
| Right | Search bar (Cmd+K to focus) → Notification bell (with badge count) → Profile avatar dropdown | Search bar: expandable text input. Typing shows filtered results dropdown. Last dropdown option is always "Ask AI about '[query]'" which navigates to #ask-ai with query pre-filled. Profile dropdown: View Profile, Settings, Logout (non-functional in prototype). |

### Left Navigation Panel

**Width:** 260px fixed (when open).  
**Background:** `gray-50` (`#F9FAFB`).  
**Collapse behavior:** Clicking the hamburger icon (top of left nav) toggles the panel. When user sends a chat message in center pane, left nav auto-collapses. User can re-expand at any time via hamburger icon or by hovering on the collapsed strip (40px wide, shows icons only).

#### Section 1: Channels

Header label: **"Channels"** in `H5` weight 600, with a `+` icon button to the right (non-functional in prototype).

| Channel | Icon | Type | Unread Badge |
|---|---|---|---|
| `#ask-ai` | Sparkle/stars icon (MUI `AutoAwesome`) | AI chat | — |
| `#announcements` | Megaphone icon (MUI `Campaign`) | Read-only feed | 2 |
| `#south-region` | Hash icon (MUI `Tag`) | Group channel | 5 |
| `#store-142-team` | Hash icon (MUI `Tag`) | Group channel | 3 |
| 1:1 James Chen | Avatar "JC" | Direct message | 1 |
| 1:1 Sofia Martinez | Avatar "SM" | Direct message | — |

Below the list: **"View 4 more..."** link in `primary` blue, collapsed by default. Clicking reveals:

| Channel | Icon | Type |
|---|---|---|
| `#store-207-team` | Hash icon | Group channel |
| `#new-hires-2026` | Hash icon | Group channel |
| 1:1 David Kim | Avatar "DK" | Direct message |
| 1:1 Lisa Tran | Avatar "LT" | Direct message |

Active channel is highlighted with `primary` blue left border (3px) and light blue background (`#EFF6FF`).

#### Section 2: Netchex

Separated from Channels by a `Divider` with 16px vertical margin.

Header label: **"Netchex"** in `H5` weight 600.

Style this section like the Zoom Workplace sidebar (see `screenshots/zoom_ux.png`) — icon + label per row, compact vertical spacing.

| Item | Icon | Navigates to |
|---|---|---|
| Home | MUI `Home` | Employee dashboard (see Section 7e) |
| Tasks | MUI `Assignment` | Static tasks page |
| Performance | MUI `TrendingUp` | Static performance page |
| Engagement | MUI `Favorite` | Static engagement page |
| Benefits | MUI `HealthAndSafety` | Static benefits page |
| Payroll | MUI `AccountBalance` | Static payroll page |
| Documents | MUI `Description` | Static documents page |

Active item: `primary` blue text + icon, light blue background. All items except "Home" render a placeholder page in the center pane with the page title and a "Coming soon" message (not fully built out).

### Center Pane

**Width:** `flex: 1` (fills remaining horizontal space).  
**Background:** `white` (`#FFFFFF`).  
**Content:** Determined by the active selection in left nav. See [Section 7](#7-screen-by-screen-specifications) for each screen state.

### Right Panel (Conditional)

**Width:** 360px.  
**Background:** `white`.  
**Border:** 1px `gray-200` left border.  
**Visibility:** Only shown when the user clicks "Chat History" in the #ask-ai channel. Slides in from right with a 200ms ease transition. Has a close (X) button in top-right corner.

**Content:** List of past chat sessions (mock data), each showing session title, date/time, and preview of last message. See [Mock Data Specification](docs/mock-data.md) §8 (Chat History). Clicking a session loads that conversation in the center pane (mock: just show a different set of pre-loaded messages).

---

## 7. Screen-by-Screen Specifications

### 7a. #ask-ai Channel — Home State

This is the **default landing screen** when the prototype loads. The left nav shows `#ask-ai` as active.

#### Header Area

Top of center pane, 80px padding top.

- **Greeting:** "Good morning, Maria!" (or afternoon/evening based on time-of-day logic; fallback to "Welcome back, Maria!")
- **Subtext:** "Shift Lead — Domino's Store #142, Metairie" in `body2` `neutral-700`
- **Avatar:** Large (64px) circle with initials "MR" in `primary` blue background, white text

#### Widgets Row

Below the greeting, 24px gap. A row of 3–4 `Card` components (MUI), arranged horizontally with `gap: 16px`, wrapping on narrow viewports.

**Card 1 — PTO Balance**
- Title: "Time Off" (H4 semibold)
- Body: "Flexible Time Off" label, large number "48 hours" in `primary` blue, "available" caption below
- Action: "Request Time Off" text button in `primary` blue
- Clicking the action triggers Flow 1 (same as typing "request time off")

**Card 2 — Next Paycheck**
- Title: "Next Paycheck" (H4 semibold)
- Body: "Mar 28, 2026" date, "$1,247.50" estimated amount in `neutral-900` bold
- Subtext: "Bi-Weekly | Direct Deposit" in `body2` gray
- Action: "View Pay History" text button in `primary` blue
- Clicking triggers Flow 3

**Card 3 — Upcoming Shift**
- Title: "Next Shift" (H4 semibold)
- Body: "Tomorrow, 11:00 AM – 7:00 PM" in `neutral-900`
- Subtext: "Store #142 — Shift Lead" in `body2` gray
- Action: "View Schedule" text button in `primary` blue
- Clicking triggers Flow 2

**Card 4 — Quick Actions**
- Title: "Quick Actions" (H4 semibold)
- Body: vertical stack of text links:
  - "Update Direct Deposit" → triggers Flow 4 (bank details)
  - "View Benefits" → navigates to Benefits in left nav
  - "Download W-2" → mock toast: "W-2 downloaded"

#### Chat Bar (Bottom, Sticky)

Pinned to the bottom of the center pane. 16px padding all sides. White background with top border (`gray-200`).

**Quick-action chips row** (above the input): Horizontal scrollable row of `Chip` components:
- "Request Time Off" (MUI `EventAvailable` icon)
- "Check My Pay" (MUI `Payments` icon)
- "View Shifts" (MUI `Schedule` icon)
- "Update My Info" (MUI `PersonOutline` icon)

Clicking a chip is equivalent to the user typing the corresponding trigger phrase — it sends the chip label as a message and initiates the matching flow.

**Input row:**
- Left icons: Attachment (MUI `AttachFile` — non-functional, shows tooltip "Coming soon"), Microphone (MUI `Mic` — non-functional)
- Center: `TextField` with placeholder "Ask me anything or pick a task..."
- Right icons: Netchex Tasks button (MUI `GridView`), Send button (MUI `Send`, `primary` blue, disabled when input is empty)

**Netchex Tasks menu:** Clicking the `GridView` button opens a `Menu` flyup anchored to the button, listing:

| Task | Icon | Description |
|---|---|---|
| Request Time Off | `EventAvailable` | Submit a PTO or leave request |
| View Pay Stubs | `Payments` | Check your recent earnings and deductions |
| Browse Open Shifts | `Schedule` | See and pick up available shifts |
| Update Personal Info | `PersonOutline` | Change address, bank details, or contact info |

Clicking a menu item is equivalent to sending the corresponding trigger phrase.

**Send behavior:** Pressing Enter or clicking Send dispatches the message. Cmd+Enter also sends (matching Slack convention).

### 7b. #ask-ai Channel — Active Chat State

Transitions from Home State when the user sends their first message.

**Transition animation:** Greeting, widgets, and quick-action chips fade out (200ms). The message thread area expands to fill the center pane from top to chat bar.

**Message thread layout:**
- Scrollable area between top bar and chat bar
- Messages appear in chronological order, newest at bottom
- Auto-scrolls to newest message on send/receive

**User messages:**
- Right-aligned
- `user-bubble` (`#2563EB`) background, white text
- Rounded corners: 16px top-left, 16px top-right, 4px bottom-right, 16px bottom-left
- Max width: 70% of pane width
- Timestamp below in `caption` gray, right-aligned

**Bot messages:**
- Left-aligned
- `bot-bubble` (`#F3F4F6`) background, `neutral-900` text
- Netchex logo avatar (36px) to the left, label "Netchex AI" in `H5` semibold above the bubble
- Rounded corners: 4px top-left, 16px top-right, 16px bottom-right, 16px bottom-left
- Max width: 70% of pane width
- Timestamp below in `caption` gray, left-aligned

**Rich content in bot messages:**
- Inline cards (PTO balance, pay stub, shift list) render as embedded `Card` components within the message bubble, full width of the bubble
- Quick-reply buttons render as a horizontal row of outlined `Button` components below the message text

**Overlay form behavior:**
When a flow reaches the form step, an overlay panel slides up from the bottom of the center pane:
- Overlay covers the bottom 60–70% of the center pane (the chat is still partially visible behind it, dimmed)
- Header bar with flow title (e.g., "Request Time Off") and close (X) button
- Form fields per the flow spec (see Section 8)
- Primary action button at bottom ("Submit Request", "Confirm Update", etc.)
- Closing the overlay (X or clicking dimmed area) returns to chat; the bot sends "No worries — let me know if you change your mind."
- This matches the overlay pattern from Claude's chat interface (see `screenshots/claude-chat-overlay-experience.png`)

**Chat history button:**
In the top-right of the center pane header (when in #ask-ai), a `IconButton` with MUI `History` icon. Clicking opens the Right Panel (see Section 6).

**Chat bar in active state:** Same as home state, minus the quick-action chips row (which is hidden once chat is active). The chips can be re-accessed via the Netchex Tasks menu.

### 7c. #announcements Channel

Read-only company announcement feed.

**Channel header:** "#announcements" title, member count ("124 members"), channel description: "Company-wide announcements and updates."

**Message feed:** Displays 3–4 pre-loaded announcement messages. Each announcement:
- Sender avatar + name + "Admin" badge + timestamp
- Message body (multi-line text, may include bold formatting)
- Reaction row: emoji reaction chips (e.g., thumbs up ×12, heart ×5) — clicking adds/removes the user's reaction
- No reply button or thread capability

**Chat bar:** Disabled state. Gray background, placeholder text: "This channel is read-only." Input is non-editable.

**Mock announcements data:** See [Mock Data Specification](docs/mock-data.md) §5 for the full list of 4 announcement messages (Updated Employee Handbook, March Payroll Schedule, Store #142 Employee of the Month, System Maintenance).

### 7d. Group / 1:1 Channels (Interactive)

Two channels are fully interactive: **#store-142-team** and **1:1 James Chen**. All other channels display a static conversation with a functional chat bar.

#### Common Elements (all group/DM channels)

**Channel header:** Channel name (or DM partner name + avatar), member count for groups, online status indicator for DMs.

**Message layout:** Standard Slack-like threading:
- Messages chronologically ordered
- Each message: avatar + sender name + timestamp on first line, message body below
- Messages grouped by sender (consecutive messages from same sender collapse into one block)
- Date dividers between days ("— March 12, 2026 —")

**Chat bar:** Full-featured:
- Left: Emoji picker (MUI `EmojiEmotions`), Attachment (MUI `AttachFile`), AI Rephrase (MUI `AutoFixHigh` — non-functional, tooltip "AI Rephrase coming soon")
- Center: `TextField` with placeholder "Message #channel-name"
- Right: Netchex Tasks button (MUI `GridView`), Send button
- Send via Enter or Cmd+Enter

#### Bot Whisper Behavior (Key Feature)

When the user types a message whose content matches a use-case intent (see trigger phrases in Section 8), a **private bot whisper** appears immediately below their message:

- Visually distinct: light yellow (`#FFFBEB`) background, dashed border, smaller text
- "Only visible to you" label in `caption` gray italic
- Bot avatar + "Netchex AI" label
- Text: "It looks like you want to **[action name]**. Would you like me to help with that?"
- Two buttons: "Yes, let's do it" (`primary` filled) and "Dismiss" (text button)
- Clicking "Yes" opens the overlay form for that flow
- Clicking "Dismiss" fades the whisper out
- Other channel members do not see the whisper (in the prototype, other messages are pre-loaded mock data, so this is purely visual)

**After form submission:**
- A private success message appears (same yellow background styling): "Your [action] has been submitted successfully."
- On failure scenario (optional alternate path): "Something went wrong submitting your [action]. [Go to [Page Name] →] to complete it manually." The link is a blue text button.

#### #store-142-team — Pre-loaded Conversation

**Members:** 8 people (shown in header). Mock message thread: see [Mock Data Specification](docs/mock-data.md) §6 (#store-142-team). At Maria's message about swapping shifts, a bot whisper appears and triggers the shift flow suggestion.

#### 1:1 James Chen — Pre-loaded Conversation

Mock message thread: see [Mock Data Specification](docs/mock-data.md) §6 (1:1 James Chen). A bot whisper appears for the direct deposit mention.

### 7e. Home / Dashboard Page

Selected via the "Home" item in the Left Nav Section 2 (Netchex).

**Renders a layout matching** `screenshots/employee_dashboard_ux.png`:

**Left sidebar (within center pane, not the main left nav):** Quick Links section with the same structure as the existing Netchex dashboard:
- Access Your Pay Early (external link icon)
- Buy Now Pay Later (external link icon)
- NetLearn (external link icon)
- Tasks
- Performance section: Reviews, Violation Points, Disciplinary Actions
- Engagement section: Surveys, Recognition, AskHR, Anonymous Reporting
- Benefits section: Benefits Overview, Change My Benefits, Current Benefits Summary
- Payroll section: Compensation, Deductions, Direct Deposit Accounts, Other Scheduled Earnings, Taxes, Total Comp Statement, Year End Tax Forms
- Personal Info section: Demographics, Dependents/Beneficiaries, Emergency Contacts, Profile

**Main content area:**
- Welcome header: "Welcome back, MARIA!" with avatar, title, company, address, email, Edit Info link
- "Access your pay early!" banner (green, with arrow)
- TO DO section: "Download 2025 1099" action item
- Recognition widget: count badge
- View Payment History widget: latest paycheck, pay period, paid-on date
- View Time Off widget: Flexible Time Off balance display, "Request Time Off" button
- Company Info widget: Org Chart, AskHR, Anonymous Reporting, Company Files, Company Links
- Announcements widget: latest company announcement

All links/buttons either navigate to the relevant channel/flow or show a tooltip "Navigating to [section]..." (non-functional deep links in prototype).

---

## 8. Use Case Flow Scripts

Each flow below defines: trigger phrases (for the intent matcher), the exact sequence of bot messages, form fields for the overlay, and branching logic. These are used in both the #ask-ai channel and bot whisper detection in group/DM channels.

### Flow 1: Apply for Leave / PTO

**Intent triggers** (case-insensitive, partial match):
- "time off", "PTO", "day off", "leave", "vacation", "take off", "request off", "sick day", "personal day"
- Quick-action chip: "Request Time Off"

**Sequence:**

```
USER: "I want to request some time off"

BOT: "Sure thing! Here's your current time-off balance:"
     [Embedded Card]
     ┌─────────────────────────────┐
     │  Flexible Time Off          │
     │  48 hours available         │
     │  16 hours used (YTD)        │
     │  64 hours total allotment   │
     └─────────────────────────────┘
     "Would you like to submit a time-off request?"
     [Quick replies: "Yes, request time off" | "No, just checking"]

USER: clicks "Yes, request time off"

--> OVERLAY OPENS: "Request Time Off"
```

**Overlay form fields:**

| Field | Type | Default | Validation |
|---|---|---|---|
| Plan Type | Dropdown | "Flexible Time Off" (only option) | Required |
| Date Range | Date range picker | Empty | Required; start date must be today or future |
| Hours Per Day | Number input | 8 | Required; min 1, max 12 |
| Excluded Days | Checkbox group: S, M, T, W, T, F, S, HOL | S and HOL checked | Optional |
| Reason | Text area | Empty | Optional; placeholder "e.g., Family vacation" |

**Submit button:** "Submit Request"

**On submit:**
```
--> OVERLAY CLOSES

BOT: "Your time-off request has been submitted! ✓"
     [Embedded Card]
     ┌─────────────────────────────────────┐
     │  Time Off Request — Submitted       │
     │  Mar 24 – Mar 26, 2026             │
     │  24 hours (3 days × 8 hrs/day)     │
     │  Pending manager approval           │
     │  Approver: James Chen               │
     └─────────────────────────────────────┘
     "Your manager James Chen will review this shortly. I'll let you know when it's approved."
```

**Alternate path — "No, just checking":**
```
BOT: "No problem! Your balance is 48 hours of Flexible Time Off. Let me know if you need anything else."
```

**Alternate path — insufficient balance (if user manually enters hours exceeding balance):**
```
BOT: "Heads up — you're requesting 56 hours but only have 48 hours available. Would you like to proceed anyway? Your manager will see the overage."
     [Quick replies: "Submit anyway" | "Adjust my request"]
```

### Flow 2: View & Apply for Shifts

**Intent triggers:**
- "shifts", "schedule", "pick up", "open shifts", "available shifts", "swap shift", "work more hours", "extra hours"
- Quick-action chip: "View Shifts"

**Sequence:**

```
USER: "Are there any open shifts this week?"

BOT: "Here are the open shifts available this week:"
     [Embedded Card List — each card is clickable]
     ┌──────────────────────────────────────────┐
     │  📅 Thursday, Mar 19 | 6:00 AM – 2:00 PM │
     │  Store #207, Kenner — Delivery Driver     │
     │  Posted by: Lisa Tran                     │
     │  [Pick Up Shift]                          │
     ├──────────────────────────────────────────┤
     │  📅 Friday, Mar 20 | 11:00 AM – 7:00 PM  │
     │  Store #142, Metairie — Shift Lead        │
     │  Posted by: David Kim (swap)              │
     │  [Pick Up Shift]                          │
     ├──────────────────────────────────────────┤
     │  📅 Saturday, Mar 21 | 4:00 PM – 11:00 PM│
     │  Store #142, Metairie — Line Cook         │
     │  Posted by: James Chen                    │
     │  [Pick Up Shift]                          │
     └──────────────────────────────────────────┘
     "Tap any shift to pick it up, or ask me to filter by day or location."
```

**User clicks "Pick Up Shift" on a card → OVERLAY OPENS: "Confirm Shift Pickup"**

**Overlay form fields:**

| Field | Type | Value | Editable |
|---|---|---|---|
| Shift Date | Static display | "Friday, Mar 20, 2026" | No |
| Time | Static display | "11:00 AM – 7:00 PM" | No |
| Location | Static display | "Store #142, Metairie" | No |
| Role | Static display | "Shift Lead" | No |
| Note to Manager | Text area | Empty | Optional; placeholder "Any notes for your manager?" |

**Submit button:** "Confirm Pickup"

**On submit:**
```
--> OVERLAY CLOSES

BOT: "You're all set! ✓"
     [Embedded Card]
     ┌─────────────────────────────────────┐
     │  Shift Confirmed                    │
     │  Fri, Mar 20 | 11 AM – 7 PM        │
     │  Store #142 — Shift Lead            │
     │  Swapping with: David Kim           │
     └─────────────────────────────────────┘
     "This shift has been added to your schedule. David Kim will be notified of the swap."
```

**Follow-up:**
```
USER: "What does my schedule look like next week?"

BOT: "Here's your schedule for next week (Mar 17–23):"
     [Embedded Table]
     │ Mon 3/17 │ OFF               │
     │ Tue 3/18 │ 11 AM – 7 PM, #142│
     │ Wed 3/19 │ 11 AM – 7 PM, #142│
     │ Thu 3/20 │ OFF               │
     │ Fri 3/21 │ 11 AM – 7 PM, #142│ ← NEW
     │ Sat 3/22 │ 6 AM – 2 PM, #142 │
     │ Sun 3/23 │ OFF               │
     "You're working 40 hours next week. Let me know if you need to make changes."
```

### Flow 3: Check Pay Stubs / Earnings

**Intent triggers:**
- "pay stub", "paycheck", "earnings", "how much", "paid", "pay history", "last check", "deductions", "net pay", "gross pay"
- Quick-action chip: "Check My Pay"

**Sequence:**

```
USER: "Show me my last paycheck"

BOT: "Here's your most recent pay stub:"
     [Embedded Card — detailed]
     ┌──────────────────────────────────────┐
     │  Pay Period: Mar 3 – Mar 14, 2026    │
     │  Paid On: Mar 14, 2026               │
     ├──────────────────────────────────────┤
     │  EARNINGS                            │
     │  Regular Hours    76.0 hrs  $1,254.00│
     │  Overtime          4.5 hrs    $111.38│
     │  Total Gross               $1,365.38│
     ├──────────────────────────────────────┤
     │  DEDUCTIONS                          │
     │  Federal Tax                  $136.54│
     │  State Tax (LA)                $42.33│
     │  Social Security               $84.65│
     │  Medicare                      $19.80│
     ├──────────────────────────────────────┤
     │  NET PAY                   $1,082.06 │
     │  → Direct Deposit to Chase ****4521  │
     └──────────────────────────────────────┘
     "Want to see a previous pay period or have a question about this one?"
```

**Follow-up — "why was this check lower?"**
```
USER: "Why was this check lower than last time?"

BOT: "Good question — let me compare your last two paychecks:"
     [Comparison Card]
     ┌──────────────────────────────────────────────────┐
     │           │  Mar 14          │  Feb 28           │
     ├───────────┼──────────────────┼───────────────────┤
     │ Regular   │  76.0 hrs        │  80.0 hrs         │
     │ Overtime  │   4.5 hrs        │   6.0 hrs         │
     │ Gross     │  $1,365.38       │  $1,452.00        │
     │ Net       │  $1,082.06       │  $1,152.22        │
     ├───────────┴──────────────────┴───────────────────┤
     │ Difference: -$70.16                              │
     │ Reason: 4 fewer regular hours, 1.5 fewer OT hrs │
     └──────────────────────────────────────────────────┘
     "Your Mar 14 check was $70.16 less because you worked 4 fewer regular hours and 1.5 fewer overtime hours. The tax withholdings also adjusted proportionally."
```

No overlay form for this flow — it is purely conversational with rich card displays.

### Flow 4: Update Personal Info

**Intent triggers:**
- "address", "direct deposit", "bank", "phone number", "emergency contact", "personal info", "update my info", "change my"
- Quick-action chip: "Update My Info"

**Sequence:**

```
USER: "I need to update my direct deposit"

BOT: "Of course — what would you like to update?"
     [Quick-reply buttons: "Address" | "Direct Deposit" | "Phone Number" | "Emergency Contact"]
```

If the user's original message already specifies the type (e.g., "update my direct deposit"), skip the selection step and go directly to the appropriate overlay.

#### Sub-flow 4a: Direct Deposit

```
USER: clicks "Direct Deposit"

BOT: "I'll help you update your direct deposit information. Please have your new bank details ready."
     "⚠️ This is sensitive financial information. Your changes will be verified before taking effect."

--> OVERLAY OPENS: "Update Direct Deposit"
```

**Overlay form fields:**

| Field | Type | Default | Validation |
|---|---|---|---|
| Bank Name | Text input | "Chase Bank" (current) | Required |
| Routing Number | Text input (masked after entry) | Empty | Required; 9 digits |
| Account Number | Text input (masked after entry) | Empty | Required; 6–17 digits |
| Account Type | Radio: Checking / Savings | Checking | Required |
| Confirm | Checkbox: "I confirm these details are correct" | Unchecked | Must be checked to submit |

**Submit button:** "Update Direct Deposit" (disabled until confirmation checkbox is checked)

**On submit:**
```
--> OVERLAY CLOSES

BOT: "Your direct deposit information has been updated. ✓"
     [Embedded Card]
     ┌─────────────────────────────────────┐
     │  Direct Deposit Updated             │
     │  Bank: [Bank Name]                  │
     │  Account: ****[last 4]              │
     │  Type: Checking                     │
     │  Effective: Next pay period          │
     └─────────────────────────────────────┘
     "Changes will take effect starting your next paycheck on Mar 28. If you need to make another change, just let me know."
```

#### Sub-flow 4b: Address

**Overlay form fields:**

| Field | Type | Default | Validation |
|---|---|---|---|
| Street Address | Text input | "1155 Hwy 190" (current) | Required |
| Apt / Suite | Text input | Empty | Optional |
| City | Text input | "Metairie" (current) | Required |
| State | Dropdown (US states) | "LA" (current) | Required |
| ZIP Code | Text input | "70001" (current) | Required; 5 digits |

**On submit:**
```
BOT: "Your address has been updated to [new address]. ✓ This will be reflected in your profile and tax documents going forward."
```

#### Sub-flow 4c: Phone Number

**Overlay form fields:**

| Field | Type | Default | Validation |
|---|---|---|---|
| Cell Phone | Phone input | "(504) 555-0142" (current) | Required; valid US phone |
| Share with team | Checkbox | Checked | Optional |

**On submit:**
```
BOT: "Your phone number has been updated. ✓"
```

#### Sub-flow 4d: Emergency Contact

**Overlay form fields:**

| Field | Type | Default | Validation |
|---|---|---|---|
| Contact Name | Text input | "Carlos Rodriguez" (current) | Required |
| Relationship | Dropdown: Spouse, Parent, Sibling, Child, Other | "Spouse" (current) | Required |
| Phone Number | Phone input | "(504) 555-0198" (current) | Required |

**On submit:**
```
BOT: "Your emergency contact has been updated. ✓"
```

---

## 9. Mock Data Schema

Mock data lives in `src/data/` as static TypeScript objects (exported constants). It covers: Employee profile, PTO balances, pay stubs (≥3), shifts (open + scheduled), channels, messages, and chat sessions (4–5 for history panel).

**Full schemas, TypeScript interfaces, data file structure, and implementation notes:** [Mock Data Specification](docs/mock-data.md) §§1–4, §8.

---

## 10. Demo Persona

The prototype uses a single demo employee and supporting cast so all flows and channels feel consistent. **Full persona table and supporting cast:** [Mock Data Specification](docs/mock-data.md) §2.

- **Primary:** Maria Rodriguez — Shift Lead, Domino's Store #142, Metairie. Manager: James Chen. PTO 48/64 hrs, Chase ****4521, emergency contact Carlos Rodriguez (Spouse).
- **Supporting cast:** James Chen, Sofia Martinez, David Kim, Lisa Tran, Nicole Moore (roles and context in mock-data doc).

---

## 11. Demo Walkthrough Script

Recommended sequence for live presentation (approximately 8–10 minutes):

### Act 1: First Impression (2 min)

1. **Load the app.** The prototype opens to the #ask-ai home state. Left nav is open.
2. **Narrate the layout:** "This is the new conversational-first Netchex experience. Instead of navigating through menus, employees land on a chat interface that surfaces the most important information up front."
3. **Point out the widgets:** PTO balance, next paycheck, upcoming shift. "These are personalized at-a-glance cards — the things Maria checks most often."
4. **Point out the left nav:** "Channels work like Slack or Teams — there's an AI assistant, company announcements, team channels, and direct messages. Below that are familiar Netchex shortcuts."

### Act 2: PTO Request Flow (2 min)

5. **Click the "Request Time Off" chip** in the chat bar.
6. **Bot shows PTO balance card** and asks to confirm. Click "Yes, request time off."
7. **Overlay slides up.** Fill in dates (Mar 24–26), keep 8 hours/day, add reason "Family vacation."
8. **Submit.** Overlay closes, bot confirms with a summary card.
9. **Narrate:** "What used to be a 4-screen wizard — find the page, check balance, fill the form, submit — is now a 30-second conversation."

### Act 3: Pay Stub Q&A (2 min)

10. **Type:** "what was my last paycheck"
11. **Bot shows detailed pay stub card** with earnings, deductions, net pay.
12. **Type:** "why was this check lower than last time?"
13. **Bot shows comparison card** highlighting the difference in hours and pay.
14. **Narrate:** "Instead of downloading a PDF and trying to figure out the math, the employee just asks. This is the kind of thing that generates HR tickets today."

### Act 4: Team Channel + Bot Whisper (2 min)

15. **Click #store-142-team** in the left nav. Show the pre-loaded team conversation.
16. **Point out:** "This is a familiar team messaging experience — like Slack."
17. **Type:** "Hey does anyone want to swap shifts Friday? I have 11-7."
18. **Bot whisper appears** privately: "It looks like you want to browse shifts. Would you like me to help?"
19. **Click "Yes, let's do it."** Overlay opens with shift details.
20. **Narrate:** "The AI is always listening in context. Even in regular team chat, it recognizes when an employee wants to take action — and offers to help without disrupting the conversation."

### Act 5: Announcements + Wrap-up (1 min)

21. **Click #announcements.** Show the read-only feed.
22. **Point out:** "Company announcements live alongside conversations — employees see them without needing to check a separate portal."
23. **Click back to #ask-ai.** Show the chat history button, open the right panel briefly.
24. **Close:** "This is a prototype — no AI model, no backend — but it demonstrates what a conversational-first Netchex could feel like. The next step is to validate this direction and invest in the real infrastructure."

---

## 12. Technical Architecture

### Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | React 18 | Component-based, widely supported, matches team skills |
| **UI Library** | MUI (Material UI) v5 | Matches Netchex Figma component library exactly |
| **Routing** | React Router v6 | Client-side routing for channel/page navigation |
| **State Management** | Zustand | Lightweight, minimal boilerplate, sufficient for prototype scope |
| **Build Tool** | Vite | Fast HMR, zero-config for React+TS |
| **Language** | TypeScript | Type safety for mock data schemas and flow logic |
| **Fonts** | Google Fonts (Source Sans Pro) | Loaded via `@fontsource/source-sans-pro` or CDN link |

### Project Structure

```
conversational-ux-prototype/
├── public/
│   └── assets/
│       └── Logomark@2x.png
├── src/
│   ├── App.tsx                     # Root component with routing
│   ├── main.tsx                    # React entry point
│   ├── theme.ts                    # MUI theme (colors, typography, shadows)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopNav.tsx          # Fixed top navigation bar
│   │   │   ├── LeftNav.tsx         # Collapsible left panel with channels + products
│   │   │   ├── CenterPane.tsx      # Dynamic content area (routes to views)
│   │   │   └── RightPanel.tsx      # Slide-in chat history panel
│   │   │
│   │   ├── chat/
│   │   │   ├── ChatView.tsx        # Message thread + input for a channel
│   │   │   ├── MessageBubble.tsx   # Single message (user, bot, or member)
│   │   │   ├── ChatInput.tsx       # Input bar with icons, chips, send button
│   │   │   ├── OverlayForm.tsx     # Bottom-sheet overlay for action forms
│   │   │   ├── BotWhisper.tsx      # Private bot suggestion message
│   │   │   └── RichCard.tsx        # Embedded card renderer (pay stub, PTO, shifts)
│   │   │
│   │   ├── widgets/
│   │   │   ├── PTOCard.tsx         # PTO balance widget
│   │   │   ├── PaycheckCard.tsx    # Next paycheck widget
│   │   │   ├── ShiftCard.tsx       # Upcoming shift widget
│   │   │   └── QuickActions.tsx    # Quick actions link list
│   │   │
│   │   ├── channels/
│   │   │   ├── AskAIHome.tsx       # #ask-ai home state (greeting + widgets + chat bar)
│   │   │   ├── AnnouncementFeed.tsx# Read-only announcements
│   │   │   └── ChannelHeader.tsx   # Channel name, members, description
│   │   │
│   │   └── dashboard/
│   │       └── EmployeeDashboard.tsx # Netchex home/dashboard page
│   │
│   ├── data/
│   │   ├── employee.ts             # Employee profile mock data
│   │   ├── channels.ts             # Channel list with metadata
│   │   ├── messages.ts             # Pre-loaded messages per channel
│   │   ├── payStubs.ts             # Array of pay stub records
│   │   ├── shifts.ts               # Open shifts + scheduled shifts
│   │   ├── ptoBalances.ts          # PTO plan balances
│   │   ├── announcements.ts        # Announcement messages
│   │   └── chatSessions.ts         # Mock chat history sessions
│   │
│   ├── flows/
│   │   ├── types.ts                # Flow step types, action types
│   │   ├── leaveFlow.ts            # PTO request flow definition
│   │   ├── shiftFlow.ts            # Shift browsing/pickup flow
│   │   ├── payStubFlow.ts          # Pay stub viewing + comparison flow
│   │   ├── personalInfoFlow.ts     # Personal info update sub-flows
│   │   └── flowEngine.ts           # Orchestrator: matches intent → runs flow → yields messages
│   │
│   ├── store/
│   │   ├── chatStore.ts            # Active messages, current channel, overlay state
│   │   ├── navStore.ts             # Left nav collapsed/expanded, active item
│   │   └── uiStore.ts              # Right panel visibility, search state
│   │
│   └── utils/
│       ├── intentMatcher.ts        # Pattern-matching: input string → flow ID
│       ├── timeUtils.ts            # Greeting logic (morning/afternoon/evening)
│       └── formatters.ts           # Currency, date, phone number formatting
│
├── screenshots/                    # Existing Netchex UI screenshots (reference only)
├── assets/                         # Logo and brand assets
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Flow Engine Design

The flow engine is a simple state machine that does not use an LLM:

1. **Intent Matching** (`intentMatcher.ts`): Takes a user input string, lowercases it, and checks against an array of keyword patterns for each flow. Returns the matching flow ID or `null` (for general conversation, bot responds with a fallback message).

2. **Flow Execution** (`flowEngine.ts`): Each flow is defined as an array of steps. A step can be:
   - `message`: Bot sends a text/rich message
   - `prompt`: Bot asks a question with quick-reply options
   - `overlay`: Opens an overlay form; on submit, continues to next step
   - `branch`: Conditional step based on user choice or data check

3. **State**: The current flow, current step index, and any collected form data are held in the Zustand `chatStore`. Each user message either advances the active flow or triggers a new one via intent matching.

4. **Bot Response Delay**: Simulate natural typing with a 500–1000ms delay before showing bot messages, with a typing indicator ("Netchex AI is typing...") animated with three pulsing dots.

### Routing

```
/                    → Redirect to /channels/ask-ai
/channels/:id        → Center pane shows chat for that channel
/dashboard           → Center pane shows employee dashboard
/netchex/:page       → Center pane shows placeholder for Netchex product pages
```

Left nav click handlers call `navigate()` to update the route; center pane renders based on current route.

---

## 13. Screenshot Reference Map

Each screenshot in the `screenshots/` folder informs a specific part of the prototype:

| Screenshot | Informs |
|---|---|
| `employee_dashboard_ux.png` | Section 7e — Home/Dashboard page layout. Replicate the quick links sidebar, widgets (Recognition, Payment History, Time Off, Company Info, Announcements), and welcome header. |
| `zoom_ux.png` | Section 6 — Left nav "Netchex" section styling. Use this Zoom Workplace sidebar as inspiration for compact icon + label rows with section headers. |
| `claude-chat-overlay-experience.png` | Section 7b — Overlay form pattern. The overlay slides up from the bottom of the chat pane, partially obscuring the conversation. Has a close button and numbered/structured content. |
| `ask_hr_homeapge.png` | Baseline for the existing AskHR chat experience. The prototype #ask-ai channel should feel like a significant upgrade from this — richer cards, inline actions, better visual design. |
| `new-timeoff-requests.png` | Section 8 Flow 1 — PTO overlay form fields. Reference for: Type dropdown, date range picker, hours per day, excluded days checkboxes, reason textarea, Submit Request button. |
| `view_time_offs.png` | Section 8 Flow 1 — Time Off history display. Shows the table of past requests with employee name, company, dates, hours, and status (Approved/Pending). |
| `compensation-homepage.png` | Section 9 — Employee data reference. Shows Pranav Mankar's actual compensation data (hourly rate, pay period amount, salary, schedules). Use this as structural reference for the pay data mock. |
| `profile_homepage.png` | Section 8 Flow 4 — Personal info form fields. Shows the profile edit page with personal email, cell phone, social media, interests. |
| `benefits-homepage.png` | Section 7e — Benefits overview widget. Shows "My Benefits Overview" with total cost per paycheck and active benefits count. |
| `payment-history-homepage.png` | Section 8 Flow 3 — Pay stub layout reference. Shows the Payment History page structure with Recent Check History table and Paycheck Totals breakdown (Earnings, Taxes, Deductions, Direct Deposit tabs). |
| `reviews_homepage.png` | Not directly used in the prototype (performance reviews are out of scope), but informs the general page layout with left sidebar navigation pattern. |
| `violation-points-homepage.png` | Not directly used in the prototype. |
| `admin_dashboard_ux.png` | Reference for the admin sidebar navigation pattern (People, Hire, Payroll, Time & Attendance, etc.). Informs the Netchex section of the left nav — employee version should be a subset of these items. |
| `my_tasks.png` | Section 7e — Tasks page placeholder. Shows the task list structure if we need to render a basic tasks view. |
| `download_documents.png` | Not directly used, but informs the Document Center page if linked from the dashboard. |

---

## Appendix A: Netchex Platform Features

*Reference material — not part of the prototype spec.*

### What Employees Can Do — Core Self-Service Features

**Pay & Payroll Access:** Employees can view pay stubs, access direct deposit details, and review their complete payment history from the platform or mobile app. They can also review W-2s and access quarterly tax statements online, eliminating the need to go through HR for routine document retrieval.

**Time & Attendance:** Employees can clock in and out via mobile with geofencing support, submit missed punch requests, and request or swap shifts — all from their phones. PTO requests and leave balance visibility are also self-service.

**Benefits Management:** Employees can access and configure their benefits coverage using mobile or desktop through the NetBenefits feature, which supports qualifying life events, compensation statement access, and self-service enrollment.

**Earned Wage Access (EWA):** Employees can request access to wages they've already earned directly through their Netchex account, choosing to receive funds instantly or on their next payday.

**Financial Wellness — Buy Now, Pay Later:** Built into Netchex, this benefit allows employees to pay for essential purchases through interest-free payroll deductions, with no credit checks.

**Learning & Development:** Employees have access to a library of 2,000+ courses on business topics including HR, compliance, and interpersonal skills — available in both English and Spanish.

**Engagement & Recognition:** Employees can receive personalized recognition through Shoutouts and Kudos features, and can submit feedback to help managers understand their concerns.

**AskHR (AI Assistant):** Automated employee assistance, bilingual, for common HR queries without waiting on the HR team.

### How It Helps Employees

| Pain Point | How Netchex Addresses It |
|---|---|
| Waiting on HR for documents | Self-service access to pay stubs, W-2s, tax forms 24/7 |
| Financial stress between paychecks | Earned Wage Access + Buy Now Pay Later via payroll deduction |
| Scheduling friction | Mobile shift swaps, pickups, and geofenced clock-in |
| Benefits confusion | Guided self-enrollment, plan education, and digital carrier forms |
| Lack of recognition | Shoutouts, Kudos, and feedback loops built into the platform |
| Training access | 2,000+ bilingual courses available on-demand |

### Employee Engagement Stats

Netchex reports 80% employee engagement on the platform, which is notable for a payroll-first tool and reflects how deeply the employee-facing features are adopted.

### Platform Access

Web (desktop) and mobile app. The mobile app supports time-off requests, tax document access, and other self-service workflows and is consistently rated as user-friendly by employees in reviews.