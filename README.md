# Shared Bill Splitter

A small full-stack bill splitter using Hono on Cloudflare Workers, Cloudflare D1, React, Vite, TanStack Router, and TypeScript.

## Requirements

- Node.js 20+
- pnpm 10+

## Run locally

```bash
pnpm install
pnpm dev
```

The API runs at `http://localhost:8787` and the web app at `http://localhost:5173`. Wrangler applies local D1 migrations when starting the API.

## API

- `POST /api/homes` — create a home
- `POST /api/homes/:homeId/members` — add a member
- `POST /api/homes/:homeId/bills` — create a bill and split it
- `GET /api/homes/:homeId/bills` — list bills and shares for the web page
- `POST /api/bills/:billId/shares/:shareId/pay` — pay a share; requires `Idempotency-Key`
- `GET /api/homes/:homeId/balances` — outstanding balances
- `GET /api/health` — health check

Use the returned home ID in the web page's Home ID field or as `/?homeId=YOUR_HOME_ID`.

## Checks

```bash
pnpm test
pnpm check
pnpm typecheck
pnpm build
```

## Decisions

1. **Store money as integer cents.** This avoids floating-point rounding errors and makes the split deterministic.
2. **Use a conditional SQL update for payments.** `UPDATE ... WHERE paid_at IS NULL` ensures concurrent requests cannot both mark the same share as paid. The idempotency key lets a retry return the original payment result.
3. **Use database constraints as a final safety layer.** Foreign keys protect relationships, `CHECK` constraints reject invalid names and amounts, and `UNIQUE (bill_id, member_id)` prevents duplicate shares for one member on a bill.

## Notes

- Member order is the insertion order (`rowid`) and receives any remainder cents first.
- All API errors are JSON objects with an `error` property.
- The payment endpoint records a successful payment; this is a demo assignment and does not connect to a real payment processor.
- The browser page expects an existing home ID. Create a home and members through the API first.
- AI assistance disclosure: this starter implementation was prepared with ChatGPT assistance. Review, test, and understand all code before submitting.
