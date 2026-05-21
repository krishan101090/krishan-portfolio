# Feature · Contact Console

| Field       | Value                              |
|-------------|------------------------------------|
| Status      | Shipped                            |
| Component   | `components/Contact.jsx`           |
| Data source | `profile.contact`, `profile.services[]` |

## 1. Intent

A contact form that **looks and feels like prompting an AI** — a
monospace console, a glowing caret, service pre-selection, clear success
state — converting "interested visitor" into "conversation in my inbox"
without cognitive friction.

## 2. User story

As a prospective client, I want a fast, frictionless way to request a call
and describe my need, with clear feedback that the message was sent.

## 3. Scope

**In:** name, email, service select (populated from `profile.services`),
message textarea, submit, success + error states, URL-param prefill of
service.
**Out:** file upload, calendar embed, live chat, captcha v1 (rely on
honeypot + Vercel bot protection).

## 4. Data contract

```ts
// Consumed
profile.contact: {
  eyebrow: string;
  title: string;
  intro: string;
  placeholders: { name: string; email: string; message: string };
  submitLabel: string;           // e.g. "DEPLOY MESSAGE"
  successTitle: string;
  successBody: string;
};

// Emitted on submit
POST /api/contact
{ name: string; email: string; service?: string; message: string; website?: string /* honeypot */ }
```

## 5. Behavior / states

| State        | Trigger                                   | UI                                    |
|--------------|-------------------------------------------|---------------------------------------|
| `idle`       | default                                   | empty console with blinking caret     |
| `editing`    | any field focused / has value             | caret follows; submit enabled when valid |
| `submitting` | submit clicked with valid form            | submit label → "TRANSMITTING…", inputs disabled |
| `success`    | 200 response                               | replace form with success card        |
| `error`      | non-2xx or network                         | inline error above submit; keep input |
| `bot`        | honeypot field filled                      | silently return 204; no email sent    |

### Validation

- Name: trimmed length 2–80.
- Email: matches `^\S+@\S+\.\S+$` and Zod `.email()`.
- Message: trimmed length 10–2000.
- Service: must be one of `profile.services[].id` or empty.

## 6. Visual

- Console frame: same terminal chrome as Hero, header reads `contact.console · ready`.
- Fields: no labels — the first line of each input is a prompt like
  `> your_name := `, then the user's text appears in accent color.
- Submit: full-width ghost button; label in mono caps.
- Success card: ASCII-like confirmation block with `✔` in success color
  and `successTitle` / `successBody`.

## 7. Non-functional requirements

- **A11y:**
  - Every visual prompt is paired with a real `<label>` (visually hidden).
  - Inline errors linked to inputs via `aria-describedby`.
  - On submit success, focus moves to the success card's heading with
    `role="status" aria-live="polite"`.
- **Perf:** single client component; no form libraries on the bundle.
- **Security:** honeypot field `website` hidden via CSS and `tabindex="-1"`;
  server route rejects if populated. Rate-limited at the edge (10/min/IP).
- **Privacy:** no cookies set; email service receives only the 4 fields.

## 8. Acceptance criteria

- [x] **Given** valid input, **When** the user submits, **Then** the form
      POSTs to `/api/contact`, receives 200, and the success card replaces
      the form.
- [x] **Given** invalid email, **When** submit is attempted, **Then** an
      inline error appears and no network request is made.
- [x] **Given** the URL contains `?service=ai-architecture-review`, **When**
      the form renders, **Then** that service is pre-selected.
- [x] **Given** the honeypot field is filled, **When** submitted, **Then**
      the server returns 204 and no email is sent.
- [x] **Given** network failure, **When** submit is attempted, **Then** an
      error message appears and the input remains intact.
- [x] Keyboard: `Tab` through fields in visual order; `Enter` in textarea
      inserts a newline, does not submit.

## 9. AI Prompt (Seed)

> Implement `components/Contact.jsx` (client component) + API route
> `app/api/contact/route.js`. UI per §6 (console aesthetic). Validation,
> states, security per §5 + §7. Service select populated from the prop
> `services: Service[]`. Use `useSearchParams` to pre-fill service. Honeypot
> field name `website`. Return only the component, its CSS module, and the
> route handler.

## 10. Out of scope

- Calendar booking (link out to a Cal.com URL is acceptable later).
- Multi-language form (handled via profile data when needed).
- File attachments.
