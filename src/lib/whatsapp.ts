import { ADMIN_WHATSAPP } from "../config";

export type Row = [label: string, value: string | string[]];

const show = (v: string | string[]) => {
  const s = Array.isArray(v) ? v.join(", ") : v.trim();
  return s || "-";
};

/** Menyusun pesan WhatsApp yang rapi dari isi formulir. */
export function buildMessage(opening: string, rows: Row[]): string {
  return opening + "\n\n" + rows.map(([label, value]) => `${label}: ${show(value)}`).join("\n");
}

/** Tautan wa.me ke admin dengan pesan yang sudah di-encode. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export const adminChatUrl = `https://wa.me/${ADMIN_WHATSAPP}`;
export const adminDisplay = `+${ADMIN_WHATSAPP}`;

export function isValidPhone(value: string): boolean {
  return /^(\+?62|0)8\d{7,12}$/.test(value.replace(/[\s-]/g, ""));
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}
