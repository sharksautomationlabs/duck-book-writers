# Calendly → Agent Call — Setup (step by step)

Jab koi **Calendly pe booking kare**, usi waqt **agent call** lage, iske liye ye 3 cheezein **zaroor** karo:

---

## 1. Calendly me Webhook add karo (sabse zaroori)

Calendly ko batana hai ki booking hone pe **tumhara URL** hit kare.

- **Link:** https://developer.calendly.com/receive-data-from-scheduled-events-in-real-time-with-webhook-subscriptions  
- **Kaam:** Webhook subscription create karo (API se ya Calendly UI se, agar option ho).

**API se (recommended):**

1. **Personal Access Token** banao:  
   https://developer.calendly.com/getting-started → API & Webhooks → **Create token** (scope: **user** ya **organization**).

2. **Organization / User URI** nikalo:  
   https://developer.calendly.com/how-to-find-the-organization-or-user-uri  

3. **POST** request bhejo (Postman / curl):

   ```
   POST https://api.calendly.com/webhook_subscriptions
   Headers: Authorization: Bearer YOUR_CALENDLY_TOKEN
            Content-Type: application/json
   Body:
   {
     "url": "https://www.duckbookwriters.com/api/webhooks/calendly",
     "events": ["invitee.created"],
     "organization": "https://api.calendly.com/organizations/YOUR_ORG_ID"
   }
   ```
   Agar sirf apni bookings pe chahiye to `"user": "https://api.calendly.com/users/YOUR_USER_ID"` use karo (organization ki jagah).

4. Success response me **webhook subscription** create ho jayega — ab har **invitee.created** (nayi booking) pe Calendly is URL pe POST karega.

**Bina webhook ke:** Calendly kabhi tumhari site ko hit hi nahi karega, isliye call kabhi trigger nahi hogi.

---

## 2. Vercel pe CALENDLY_API_TOKEN set karo

Calendly webhook me **sirf URI** aati hai (invitee ka link). Name, email, phone lene ke liye hum **Calendly API** se invitee fetch karte hain — iske liye token chahiye.

- **Vercel** → Project → **Settings** → **Environment Variables**
- **Name:** `CALENDLY_API_TOKEN`
- **Value:** wahi **Personal Access Token** jo tumne step 1 me banaya (Calendly Developer se)
- **Environment:** Production (aur Preview agar test karna ho)
- Save karo → **Redeploy** karo taake naya env load ho.

**Bina token ke:** Webhook to aayegi, lekin "Could not fetch invitee details" ki wajah se call **skip** ho jayegi (Vercel logs me ye reason dikhega).

---

## 3. Calendly Event Type me Phone question add karo

Call tabhi lagegi jab **phone number** mile. Phone **Calendly ke custom question** se aata hai.

- **Link:** https://calendly.com/event_types (login ke baad)
- **Event type** kholo (jis pe consultation booking hoti hai) → **Edit**
- **Invitee questions** me **Add question** → maslan **"Phone number"** ya **"What's your phone number?"** (required)
- Save karo.

**Bina phone question ke:** Webhook aayegi, lekin phone nahi milega — logs me "No phone number provided in Calendly booking" aayega aur call **skip** hogi.

---

## Verify

1. **Webhook URL live hai:** Browser me open karo:  
   https://www.duckbookwriters.com/api/webhooks/calendly  
   → JSON me `status: "active"` dikhna chahiye.

2. **Test booking:** Apne hi Calendly link se **khud ek booking** karo (phone number question zaroor bharo).

3. **Vercel Logs:** Project → **Logs** → search: `CALENDLY`  
   - `=== CALENDLY WEBHOOK RECEIVED ===` → webhook aa rahi hai  
   - `CALL SUCCESS` → call trigger ho gayi  
   - `action: 'skipped', reason: '...'` → jo reason hai wahi fix karo (token / phone question / webhook).

---

## Short checklist

| # | Kya karna hai | Kahan |
|---|----------------|--------|
| 1 | Webhook subscription banao, URL = `https://www.duckbookwriters.com/api/webhooks/calendly`, event = `invitee.created` | Calendly Developer API (POST webhook_subscriptions) |
| 2 | `CALENDLY_API_TOKEN` = Calendly Personal Access Token | Vercel → Environment Variables → Redeploy |
| 3 | Event type me **Phone number** question (required) add karo | Calendly → Event types → Edit → Invitee questions |

In teeno ke baad Calendly form fill (booking) hote hi agent call trigger honi chahiye.
