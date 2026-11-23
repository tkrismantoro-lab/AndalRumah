import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminDisplay, whatsappUrl } from "../lib/whatsapp";

/** Menyimpan pesan yang menunggu konfirmasi, dan apakah WhatsApp sudah dibuka. */
export function useWhatsappSubmit() {
  const [message, setMessage] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [opened, setOpened] = useState(false);
  return {
    message, confirming, opened,
    ask: (m: string) => { setMessage(m); setConfirming(true); setOpened(false); },
    cancel: () => setConfirming(false),
    markOpened: () => { setConfirming(false); setOpened(true); },
    reset: () => { setMessage(null); setOpened(false); },
  };
}

type Flow = ReturnType<typeof useWhatsappSubmit>;

export function ConfirmDialog({ flow }: { flow: Flow }) {
  useEffect(() => {
    if (!flow.confirming) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") flow.cancel(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flow.confirming]); // eslint-disable-line

  if (!flow.confirming || !flow.message) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-navy/60 p-4 sm:items-center" onClick={flow.cancel}>
      <div role="dialog" aria-modal="true" aria-labelledby="konfirmasi-judul"
        className="card flex max-h-[90vh] w-full max-w-lg flex-col gap-4 overflow-hidden p-6" onClick={(e) => e.stopPropagation()}>
        <h2 id="konfirmasi-judul" className="text-xl font-extrabold text-navy">Periksa sebelum dikirim</h2>
        <p className="text-[15px] text-slate-600">
          Kami akan membuka WhatsApp dengan pesan di bawah ini. Pesan <strong>belum terkirim</strong> sampai Anda menekan tombol Kirim di WhatsApp.
        </p>
        <pre className="min-h-0 flex-1 overflow-auto whitespace-pre-wrap break-words rounded-btn border border-line bg-soft p-4 font-sans text-sm text-navy">{flow.message}</pre>
        <div className="flex flex-col gap-2 sm:flex-row">
          {/* Tautan asli (bukan window.open) supaya tidak diblokir peramban */}
          <a className="btn-primary flex-1" href={whatsappUrl(flow.message)} target="_blank" rel="noopener noreferrer" onClick={flow.markOpened}>
            Buka WhatsApp
          </a>
          <button type="button" className="btn-outline flex-1" onClick={flow.cancel}>Periksa Lagi</button>
        </div>
      </div>
    </div>
  );
}

export function OpenedPanel({ flow }: { flow: Flow }) {
  const [copied, setCopied] = useState(false);
  if (!flow.opened || !flow.message) return null;
  const copy = async () => {
    try { await navigator.clipboard.writeText(flow.message ?? ""); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* biarkan pengguna menyalin manual */ }
  };
  return (
    <div role="status" className="card flex flex-col gap-4 border-success/40 p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-success/10 text-success">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <h2 className="text-xl font-extrabold text-navy">WhatsApp sudah dibuka</h2>
      </div>
      <p className="text-[15px] text-slate-600">
        Satu langkah lagi: tekan tombol <strong>Kirim</strong> di WhatsApp supaya pesan sampai ke admin AndalRumah.
        Kalau WhatsApp tidak terbuka, salin pesan di bawah dan kirim ke <strong>{adminDisplay}</strong>.
      </p>
      <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-btn border border-line bg-soft p-4 font-sans text-sm text-navy">{flow.message}</pre>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <a className="btn-primary" href={whatsappUrl(flow.message)} target="_blank" rel="noopener noreferrer">Buka WhatsApp Lagi</a>
        <button type="button" className="btn-outline" onClick={copy}>{copied ? "Tersalin" : "Salin Pesan"}</button>
        <button type="button" className="btn-outline" onClick={flow.reset}>Ubah Isian</button>
        <Link className="btn-outline" to="/">Kembali ke Beranda</Link>
      </div>
    </div>
  );
}
