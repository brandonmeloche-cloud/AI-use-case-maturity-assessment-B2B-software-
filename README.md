# B2B Software AI Use Case Maturity Assessment

Interactive web app for self-rating AI use-case maturity across common B2B software functions.

## Features
- Function-based tabs across the B2B software value chain.
- 0–5 maturity scoring per use case.
- Auto-updating summary stats (rated count, total count, average score).
- `Submit` sends compiled results to `brandon@korza.com` through a serverless API.
- If API is unavailable, the app falls back to opening a `mailto:` draft.

## Run locally
```bash
python3 -m http.server 3000
```
Open: `http://localhost:3000`

## Deploy as a web app (Netlify)
This repo is now set up for Netlify deployment using a serverless function.

### 1) Push this repo to GitHub
```bash
git push
```

### 2) Create a Netlify site from the repo
- In Netlify: **Add new site** → **Import an existing project**.
- Choose this GitHub repo.
- Netlify auto-detects `netlify.toml`.

### 3) Configure environment variables in Netlify
Set these site variables:
- `RESEND_API_KEY` = your Resend API key
- `FROM_EMAIL` = a verified sender in Resend (e.g. `Assessments <assessments@yourdomain.com>`)

### 4) Deploy
- Trigger deploy from Netlify UI (or push a commit).
- Netlify hosts `index.html` and routes `/api/submit` to `netlify/functions/submit.js`.

### 5) Verify
- Open your Netlify URL.
- Complete ratings and click submit.
- Confirm email lands at `brandon@korza.com`.

## Notes
- You must verify your sender domain/email in Resend before production use.
- If API configuration is missing, users still get a prefilled local email draft via `mailto:` fallback.

## Troubleshooting
- If clicking **Submit** opens your email client instead of sending directly, the `/api/submit` function is not reachable or Netlify env vars are missing.
- Re-check `RESEND_API_KEY` and `FROM_EMAIL` in Netlify Site Settings, then redeploy.
