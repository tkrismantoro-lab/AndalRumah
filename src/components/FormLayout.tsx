import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function FormLayout({ title, subtitle, highlight, children }: { title: string; subtitle: string; highlight?: string; children: ReactNode }) {
  return (
    <div className="bg-soft">
      <div className="container-x py-8 md:py-12">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <Link to="/" className="inline-flex items-center gap-2 self-start text-[15px] font-semibold text-slate-600 hover:text-brand">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
            Kembali ke Beranda
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">{title}</h1>
            <p className="text-base text-slate-600 md:text-lg">{subtitle}</p>
          </div>
          {highlight && (
            <p className="flex gap-3 rounded-card border border-success/30 bg-success/10 p-4 text-[15px] font-semibold text-navy">
              <svg className="mt-0.5 flex-none text-success" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              {highlight}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export function PrivacyNotice() {
  return (
    <p className="rounded-btn border border-line bg-soft p-4 text-sm text-slate-600">
      <strong className="text-navy">Catatan privasi:</strong> data yang Anda isi tidak disimpan di situs ini. Data dikirim
      sebagai pesan WhatsApp ke admin AndalRumah dan dipakai hanya untuk membantu proses pencocokan.{" "}
      <Link to="/privasi" className="font-semibold text-brand underline">Baca Kebijakan Privasi</Link>.
    </p>
  );
}

export function RequiredLegend() {
  return <p className="text-sm text-slate-500">Kolom bertanda <span className="font-bold text-brand">*</span> wajib diisi.</p>;
}
