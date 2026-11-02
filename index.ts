import { Hono } from "hono";
import { cors } from "hono/cors";
import homes from "./routes/homes";
import bills from "./routes/bills";
import payments from "./routes/payments";
import balances from "./routes/balances";
import type { Env } from "./types";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors({ origin: ["http://localhost:5173"], allowHeaders: ["Content-Type", "Idempotency-Key"], allowMethods: ["GET", "POST", "OPTIONS"] }));

app.get("/api/health", (c) => c.json({ status: "ok" }));
app.route("/api/homes", homes);
app.route("/api", bills);
app.route("/api", payments);
app.route("/api", balances);

app.notFound((c) => c.json({ error: "Not found" }, 404));
app.onError((error, c) => {
  console.error(error);
  return c.json({ error: "Internal server error" }, 500);
});

export default app;