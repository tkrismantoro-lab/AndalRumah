import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { adminChatUrl } from "../lib/whatsapp";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/cari-art", label: "Cari ART" },
  { to: "/cari-pekerjaan", label: "Cari Pekerjaan" },
  { to: "/tentang", label: "Tentang Kami" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // "Daftar / Isi Form" membawa pengunjung ke dua pilihan formulir di beranda
  const goChoose = () => {
    setOpen(false);
    navigate("/");
    setTimeout(() => document.getElementById("pilih")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-btn px-3 py-2 text-[15px] font-semibold transition-colors ${isActive ? "text-brand" : "text-slate-600 hover:bg-soft hover:text-navy"}`;

  return (
    <header className="sticky z-20 border-b border-line bg-white/95 backdrop-blur" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <div className="container-x flex min-h-[68px] items-center gap-4">
        <Logo />
        <nav className="ml-4 mr-auto hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end className={linkCls}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a className="btn-outline" href={adminChatUrl} target="_blank" rel="noopener noreferrer">WhatsApp Admin</a>
          <button type="button" className="btn-primary" onClick={goChoose}>Daftar / Isi Form</button>
        </div>
        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line text-navy lg:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="menu-hp"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div id="menu-hp" className="border-t border-line lg:hidden">
          <div className="container-x flex flex-col py-3">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end onClick={() => setOpen(false)}
                className={({ isActive }) => `border-b border-line px-1 py-3 text-base font-semibold ${isActive ? "text-brand" : "text-navy"}`}>
                {l.label}
              </NavLink>
            ))}
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a className="btn-outline" href={adminChatUrl} target="_blank" rel="noopener noreferrer">WhatsApp Admin</a>
              <button type="button" className="btn-primary" onClick={goChoose}>Daftar / Isi Form</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
