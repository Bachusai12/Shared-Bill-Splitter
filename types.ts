export type Env = {
  DB: D1Database;
};

export type HomeRow = { id: string; name: string };
export type MemberRow = { id: string; home_id: string; name: string };
export type BillRow = {
  id: string;
  home_id: string;
  title: string;
  total_cents: number;
};
export type ShareRow = {
  id: string;
  bill_id: string;
  member_id: string;
  amount_cents: number;
  paid_at: string | null;
  payment_key: string | null;
};