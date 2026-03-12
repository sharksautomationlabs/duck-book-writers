# Retell Agent Prompt — Email Sending Instructions

> **Copy the sections below into your Retell agent's LLM prompt** (Retell Dashboard → Agent → LLM → General Prompt). Put "USE REAL DATA" at the top so the agent never says variable names on the call.

---

## 1. USE REAL DATA (put this at the TOP of your prompt)

```
## USE REAL DATA — CRITICAL

The system gives you real data for THIS call. You must use these actual values when you speak. Retell replaces {{placeholders}} with real values before you speak.

- When you greet, use the person's real name: say "Hi {{client_name}}" (Retell will replace {{client_name}} with their actual name, e.g. "Hi John").
- When you confirm email, say their real email: "I have your email as {{client_email}}" (Retell will replace with their actual email).
- When you mention their service, say the real service: "I see you're interested in {{project_service}}".
- You can also use {{budget}} when relevant.

NEVER say the words "client_name", "client_email", "project_service", "variable", or "dynamic variable" out loud. Only use the {{variable_name}} form in your prompt text — Retell will substitute the real data so the user hears their real name, email, and service.
```

---

## 2. Add This to Your Agent Prompt (email sending)

```
## EMAIL SENDING (send_confirmation_email)

### When to Send
- Send the confirmation email in both Scenario A (Calendly) and Scenario B (Contact Form).
- Send it right after the client confirms their email address is correct.
- Do NOT send if the client has no email or refuses to share one.

### How to Call the Tool
Use the send_confirmation_email tool with these parameters. **Important:** The "to" field must be the **actual email address** (the one the client confirmed, or the corrected one they said). Never pass the literal text "confirmed_email" or "client_email" — always the real address (e.g. john@gmail.com). If they said "yes, that's correct", use the value of {{client_email}}; if they gave a different email, use that.

**Required (always include):**
- to: The actual confirmed email address (real value, e.g. "john@example.com").
- client_name: Use {{client_name}} — the client's full name.
- project_service: Use {{project_service}} — the service they selected.

**Optional (include if you learned them during the call):**
- budget: Use {{budget}} or what they said (e.g., "$1,000-$2,500").
- target_audience: Who their book is for.
- stuck_points: Where they're stuck or their challenges.
- success_definition: What success looks like for them.
- timeline: When they want to complete.
- previous_experience: Any prior publishing experience.

### What to Say Before Sending
Right before calling the tool, say something like:
"I'm sending you a confirmation email right now with everything we discussed and a link to book your meeting."

### What to Say After Sending
After the tool returns successfully, say:
"Done — check your inbox. You should see an email from Aly Reed with our Book to YouTube pitch and a link to schedule your consultation."

If the client asks to resend or use a different email, call the tool again with the new email in the "to" field.
```

---

## Dynamic Variables Available to Agent

| Variable | Source | Example |
|----------|--------|---------|
| `{{client_name}}` | Form / Calendly | "John Smith" |
| `{{client_email}}` | Form / Calendly | "john@example.com" |
| `{{client_phone}}` | Form / Calendly | "+12125551234" |
| `{{project_service}}` | Form / Calendly | "Book to YouTube" |
| `{{budget}}` | Form | "$1,000-$2,500" or "Not specified" |
| `{{call_source}}` | System | "calendly" or "contact_form" |

---

## Webhook Details (for Retell Tool Config)

- **URL:** `https://www.duckbookwriters.com/api/retell/send-email`
- **Method:** POST
- **Body:** JSON. Example (use **real email** in "to", not the word "confirmed_email"):

```json
{
  "to": "client@example.com",
  "client_name": "{{client_name}}",
  "project_service": "{{project_service}}",
  "budget": "{{budget}}",
  "target_audience": "...",
  "stuck_points": "...",
  "success_definition": "...",
  "timeline": "...",
  "previous_experience": "..."
}
```

---

## Where Email Is Sent From (SMTP — not Retell)

**Retell does not send email.** Retell only calls our webhook. Our backend (`/api/retell/send-email`) sends the email using **our** SMTP:

- **Server:** `mail.duckbookwriters.com` (use this, not `duckbookwriters.com`)
- **Port:** 465 (SSL/TLS)
- **Username:** `contact@duckbookwriters.com`
- **From address:** contact@duckbookwriters.com (set in code)

So you do **not** need to configure SMTP inside Retell. You only need the agent to call the webhook with the correct "to" (actual email address). SMTP credentials live in Vercel env: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`. If you tested manually (e.g. Thunderbird) with the same server/port/user, that confirms SMTP works; the same config is used when the webhook runs.

---

## Backend (already set)

- Contact form and Calendly both send **real user data** to Retell in `retell_llm_dynamic_variables`: `client_name`, `client_email`, `client_phone`, `project_service`, `budget`, `call_source`. Values are trimmed strings from the form/Calendly. So the agent receives the actual name, email, and service — you only need to use `{{client_name}}`, `{{client_email}}`, etc. in your prompt so Retell substitutes them when the agent speaks.
