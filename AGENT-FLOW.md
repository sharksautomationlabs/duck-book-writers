# DuckBook Writers — AI Call Agent Full Flow

## System Overview

DuckBook Writers uses a **Retell AI voice agent (Olivia)** to automatically call clients after they submit a form on the website or book a meeting on Calendly. The agent handles two different scenarios based on where the client came from.

---

## Architecture

```
┌──────────────────────┐      ┌──────────────────────┐
│   Website Forms      │      │   Calendly Booking    │
│  (Hero + Footer)     │      │   (invitee.created)   │
└──────────┬───────────┘      └──────────┬────────────┘
           │                             │
           ▼                             ▼
┌──────────────────────┐      ┌──────────────────────────┐
│ POST /api/retell/call│      │ POST /api/webhooks/       │
│                      │      │      calendly             │
│ call_source:         │      │ call_source:              │
│ "contact_form"       │      │ "calendly"                │
└──────────┬───────────┘      └──────────┬────────────────┘
           │                             │
           └──────────┬──────────────────┘
                      ▼
          ┌───────────────────────┐
          │   Retell AI API       │
          │   create-phone-call   │
          │                       │
          │   Agent: Olivia       │
          │   Voice: retell-Grace │
          │   Model: GPT-4.1     │
          └───────────┬───────────┘
                      │
                      ▼
          ┌───────────────────────┐
          │   Outbound Call to    │
          │   Client's Phone     │
          │   From: +14693170603 │
          └───────────┬───────────┘
                      │
           ┌──────────┴──────────┐
           ▼                     ▼
   ┌───────────────┐    ┌────────────────┐
   │  SCENARIO A   │    │  SCENARIO B    │
   │  (Calendly)   │    │  (Contact Form)│
   │  Confirm only │    │  Confirm +     │
   │               │    │  Book meeting  │
   └───────┬───────┘    └───────┬────────┘
           │                    │
           ▼                    ▼
   ┌──────────────────────────────────┐
   │       Agent Tools (Webhooks)     │
   │                                  │
   │  📧 send_confirmation_email      │
   │     POST /api/retell/send-email  │
   │     → Sends via Resend           │
   │                                  │
   │  📅 schedule_meeting             │
   │     POST /api/retell/book-meeting│
   │     → Sends Calendly invite      │
   │                                  │
   │  📞 end_call                     │
   │     → Ends the call              │
   └──────────────────────────────────┘
```

---

## Entry Points

### 1. Website Contact Form (Hero + Footer)

**Trigger:** Client fills out the form on the website and submits it.

**Form Fields:**

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Full Name | Text | Yes | — |
| Email | Email | Yes | — |
| Contact Number | Phone | Yes | — |
| Project/Service | Select | Yes | Ghost Writing, Publishing, Editing, Marketing, Distribution, Printing, Book to YouTube |
| Budget | Select | No | Under $500, $500-$1,000, $1,000-$2,500, $2,500-$5,000, $5,000-$10,000, Over $10,000, Let's discuss |

**What happens on submit:**

1. Email sent to DuckBook Writers via **EmailJS** (service_ms74fti / template_kagzkck)
2. If phone number provided → **POST /api/retell/call** is triggered
3. Retell AI creates an outbound call to the client's phone
4. Agent receives `call_source: "contact_form"`

**API Route:** `app/api/retell/call/route.ts`

**Dynamic Variables Passed to Agent:**

```
client_name      → from form "name" field
client_email     → from form "email" field
client_phone     → from form "contact" field (formatted to E.164)
project_service  → from form "project" field
budget           → from form "budget" field
call_source      → "contact_form"
```

---

### 2. Calendly Booking

**Trigger:** Client books a meeting on Calendly (invitee.created webhook event).

**Required Calendly Setup:**

1. Go to **Calendly Developer Portal** → Webhook Subscriptions
2. Create webhook pointing to: `https://www.duckbookwriters.com/api/webhooks/calendly`
3. Subscribe to event: `invitee.created`
4. Add a **Phone Number** question in Calendly event type (required)

**What happens on booking:**

1. Calendly sends webhook to `/api/webhooks/calendly`
2. Code extracts: name, email, phone from the invitee payload
3. Phone is found from: `phone_number` field, `questions_and_answers`, or `text_reminder_number`
4. If phone found → Retell AI creates outbound call
5. Agent receives `call_source: "calendly"`

**API Route:** `app/api/webhooks/calendly/route.ts`

**Dynamic Variables Passed to Agent:**

```
client_name      → from Calendly invitee name
client_email     → from Calendly invitee email
client_phone     → extracted from phone fields (formatted to E.164)
project_service  → Calendly event type name (default: "Book to YouTube Consultation")
budget           → "Not specified"
call_source      → "calendly"
```

**Phone Extraction Priority:**
1. `invitee.phone_number` (direct field)
2. `questions_and_answers` → question containing "phone/contact/number/cell/mobile/whatsapp/tel"
3. `questions_and_answers` → any answer with 10-15 digits (fallback)
4. `text_reminder_number` (SMS reminder number)

**If no phone found:** Call is skipped, logged as warning.

---

## Agent Configuration

| Setting | Value |
|---------|-------|
| Agent ID | `agent_cbb84cd302ededccb48504d3c9` |
| LLM ID | `llm_1628ba974b1be5b241ba688f6561` |
| Agent Name | Book to YouTube - Elite Pitch Agent |
| Voice | retell-Grace |
| Model | GPT-4.1 |
| Language | en-US |
| Interruption Sensitivity | 0.85 |
| Max Call Duration | 60 minutes |
| Agent Starts Speaking | Yes (agent initiates) |

---

## Call Scenarios

### SCENARIO A — Client Came from Calendly

> Meeting is already booked. This is a **confirmation call**.

```
┌─────────────────────────────────────────────────┐
│  A1. GREETING                                    │
│  "Hi, this is Olivia from DuckBook Writers..."   │
│  "Thanks for booking a meeting with us."         │
│  → Confirm client name                           │
├─────────────────────────────────────────────────┤
│  A2. MANUSCRIPT                                  │
│  "Do you have your manuscript or draft ready?"   │
│  → Ready: "You can send it digitally"            │
│  → Not ready: "No rush, send whenever ready"     │
│  → Show interest if they share about their book  │
├─────────────────────────────────────────────────┤
│  A3. SYNOPSIS                                    │
│  "Do you have a brief synopsis or outline?"      │
│  → Yes: "Include it with your manuscript"        │
│  → No: "Jot a quick overview when you can"       │
├─────────────────────────────────────────────────┤
│  A4. EMAIL CONFIRMATION                          │
│  "I have your email as [email] — is that right?" │
│  → Confirm or correct email                      │
│  → Send confirmation email (tool call)           │
│  → "Check your inbox"                            │
├─────────────────────────────────────────────────┤
│  A5. QUESTIONS                                   │
│  "Any questions at all? I'm happy to help."      │
│  → Answer warmly if yes                          │
├─────────────────────────────────────────────────┤
│  A6. CONFIRM MEETING TIMING                      │
│  "You're still good with the time you selected   │
│   on Calendly, right?"                           │
│  → Yes: "Perfect, we're aligned."                │
│  → Want to change: Send new Calendly link        │
├─────────────────────────────────────────────────┤
│  A7. CLOSURE                                     │
│  "Everything's in place. Thanks for your time."  │
│  → Wait for client to say bye                    │
│  → End call                                      │
└─────────────────────────────────────────────────┘
```

---

### SCENARIO B — Client Came from Contact Form

> No meeting booked yet. Need to **collect info AND book meeting**.

```
┌─────────────────────────────────────────────────┐
│  B1. GREETING                                    │
│  "Hi, this is Olivia from DuckBook Writers..."   │
│  "Thanks for reaching out through our website."  │
│  → Confirm client name                           │
├─────────────────────────────────────────────────┤
│  B2. ACKNOWLEDGE INTEREST                        │
│  "I see you were interested in [service]."       │
│  → Mention budget if provided                    │
│  → "Let me ask a couple of quick things"         │
├─────────────────────────────────────────────────┤
│  B3. MANUSCRIPT                                  │
│  "Do you have your manuscript or draft ready?"   │
│  → Ready / Not ready (same as A2)                │
│  → Show interest in their book                   │
├─────────────────────────────────────────────────┤
│  B4. SYNOPSIS                                    │
│  "Do you have a brief synopsis or outline?"      │
│  → Yes / No (same as A3)                         │
├─────────────────────────────────────────────────┤
│  B5. EMAIL CONFIRMATION                          │
│  "I have your email as [email] — is that right?" │
│  → Confirm or correct                            │
│  → Send confirmation email (tool call)           │
│  → "Check your inbox"                            │
├─────────────────────────────────────────────────┤
│  B6. QUESTIONS                                   │
│  "Do you have any quick questions for me?"       │
│  → Answer warmly if yes                          │
├─────────────────────────────────────────────────┤
│  B7. BOOK THE MEETING ← KEY DIFFERENCE           │
│  "The next step would be a quick consultation    │
│   with our team — about 30 minutes."             │
│  → Pause 1-2 seconds                             │
│  → "Would you be open to scheduling that?"       │
│                                                  │
│  If YES:                                         │
│    → "Let me send you a meeting invite"          │
│    → Pause (1 sec)                               │
│    → Call schedule_meeting tool                   │
│    → "Done — check your inbox"                   │
│    → Ask client to confirm receipt                │
│                                                  │
│  If NOT READY:                                   │
│    → "No pressure. Reply to the email or         │
│       book through the link when ready."          │
├─────────────────────────────────────────────────┤
│  B8. CLOSURE                                     │
│  "We're all set! Thanks for your time."          │
│  → Wait for client to say bye                    │
│  → End call                                      │
└─────────────────────────────────────────────────┘
```

---

## Agent Tools (Webhook Endpoints)

### 1. send_confirmation_email

**Purpose:** Sends a professional HTML email with project summary + Calendly booking link.

**Webhook URL:** `https://www.duckbookwriters.com/api/retell/send-email`

**Method:** POST

**Parameters:**

| Param | Required | Description |
|-------|----------|-------------|
| to | Yes | Client email address |
| client_name | Yes | Client full name |
| project_service | Yes | Selected service |
| subject | No | Email subject line |
| budget | No | Budget range |
| target_audience | No | Book's target audience |
| stuck_points | No | Where client is stuck |
| success_definition | No | Client's success goals |
| timeline | No | Client's timeline |
| previous_experience | No | Previous publishing experience |

**Email Contains:**
- Duck Book Writers branded header (gold gradient)
- Personalized greeting
- Project summary table (service, budget, audience, challenges, goals, timeline, experience)
- "Book Your Meeting Now" button → Calendly link
- Contact info: +1 (346) 463-7721 / contact@duckbookwriters.com

**Sent via:** Resend API (`from: Duck Book Writers <onboarding@resend.dev>`)

---

### 2. schedule_meeting

**Purpose:** Sends a meeting invitation email with Calendly booking link.

**Webhook URL:** `https://www.duckbookwriters.com/api/retell/book-meeting`

**Method:** POST

**Parameters:**

| Param | Required | Description |
|-------|----------|-------------|
| attendee_name | Yes | Client full name |
| attendee_email | Yes | Client email address |
| preferred_time | No | Preferred meeting time |

**Email Contains:**
- Duck Book Writers branded header
- Personalized greeting
- Preferred time (if provided)
- "Book Your Meeting Now" button → Calendly link
- What to Expect section (project review, roadmap, pricing, Q&A)
- Contact info

**Sent via:** Resend API

---

### 3. end_call

**Purpose:** Ends the phone call.

**Type:** Built-in Retell tool (no webhook needed).

**When used:** After all steps complete and client says bye.

---

## Agent Conversation Rules

| Rule | Description |
|------|-------------|
| One question at a time | Never stack multiple questions in one turn |
| Wait 500-800ms | Pause after client finishes before responding |
| 3-4 sentences max | Keep each response short but warm |
| Never rush | Take natural pauses between steps |
| Don't hang up early | Wait for ALL steps to complete AND client says bye |
| No time limit pressure | If call goes past 5 min, that's fine |
| Show interest | React naturally when client shares about their book |
| Gentle redirect | If off-topic: "For sure. So let me make sure I have everything..." |
| No filler phrases | Avoid "that's a great question" / "absolutely" on repeat |
| Friendly colleague vibe | Not a call center agent checking boxes |

---

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `RETELL_API_KEY` | Retell AI authentication | `key_4ac1e2d...` |
| `RETELL_FROM_NUMBER` | Outbound caller ID | `+14693170603` |
| `RETELL_AGENT_ID` | Default agent ID | `agent_cbb84cd302ededccb48504d3c9` |
| `RESEND_API_KEY` | Email sending (Resend) | `re_GqwaZXM...` |
| *(contact email)* | Hardcoded in components | `contact@duckbookwriters.com` |

---

## Phone Number Formatting (E.164)

Both routes format phone numbers to E.164 standard before calling Retell:

| Input | Output |
|-------|--------|
| `2125551234` | `+12125551234` (10 digits → US) |
| `12125551234` | `+12125551234` (11 digits starting with 1) |
| `+442071234567` | `+442071234567` (already E.164) |
| `923001234567` | `+923001234567` (international, 12 digits) |
| `12345` | `null` (invalid — too short) |

---

## File Structure

```
app/
├── api/
│   ├── retell/
│   │   ├── call/route.ts           ← Triggers outbound call (from contact form)
│   │   ├── send-email/route.ts     ← Agent tool: sends confirmation email
│   │   └── book-meeting/route.ts   ← Agent tool: sends meeting invite
│   └── webhooks/
│       └── calendly/route.ts       ← Calendly webhook → triggers call
├── components/
│   ├── HeroFormSection.tsx          ← Main contact form (hero section)
│   └── Footer.tsx                   ← Footer contact form
└── .env.local                       ← Environment variables
```

---

## Calendly Setup Checklist

- [ ] Go to Calendly Developer Portal → Webhook Subscriptions
- [ ] Create webhook: `https://www.duckbookwriters.com/api/webhooks/calendly`
- [ ] Subscribe to event: `invitee.created`
- [ ] In Calendly event type → Add required question: "Phone Number"
- [ ] Test by booking a meeting → check server logs for webhook receipt

---

## Complete Flow Summary

```
CLIENT FILLS FORM ON WEBSITE          CLIENT BOOKS ON CALENDLY
         │                                      │
         ▼                                      ▼
   EmailJS sends email               Calendly fires webhook
   to DuckBook Writers                (invitee.created)
         │                                      │
         ▼                                      ▼
   POST /api/retell/call             POST /api/webhooks/calendly
   source: "contact_form"            source: "calendly"
         │                                      │
         └────────────┬─────────────────────────┘
                      │
                      ▼
              Retell AI creates
              outbound phone call
                      │
                      ▼
              Agent (Olivia) calls client
              Checks {{call_source}}
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
    SCENARIO A               SCENARIO B
    (Calendly)               (Contact Form)
          │                       │
    ✓ Greeting              ✓ Greeting
    ✓ Manuscript            ✓ Acknowledge service
    ✓ Synopsis              ✓ Manuscript
    ✓ Email confirm         ✓ Synopsis
    ✓ Questions             ✓ Email confirm
    ✓ Confirm timing        ✓ Questions
    ✓ Closure               ✓ Book meeting ← NEW
                            ✓ Closure
          │                       │
          └───────────┬───────────┘
                      │
                      ▼
              Tools Used During Call:
              📧 send_confirmation_email
              📅 schedule_meeting (Scenario B)
              📞 end_call
                      │
                      ▼
                 CALL ENDS
```
