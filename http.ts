import type { Context } from "hono";
import type { Env } from "./types";

export function jsonError(c: Context<{ Bindings: Env }>, status: 400 | 404 | 409 | 422 | 500, message: string) {
  return c.json({ error: message }, status);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validName(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}