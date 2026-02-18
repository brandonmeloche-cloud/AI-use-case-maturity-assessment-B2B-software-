# B2B Software AI Use Case Maturity Assessment

Single-page interactive webform for self-rating AI use-case maturity across common B2B software functions.

## Features
- Function-based tab navigation (Marketing, Sales, Customer Success, Product/Engineering, Finance, HR, Legal, Executive)
- 0–5 maturity scoring per use case
- Auto-updating summary (rated count, total count, average score)
- Submit button compiles results and opens a pre-filled email to **brandon@korza.com**

## Run locally
Because this is a static HTML app, any local static server works.

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.
