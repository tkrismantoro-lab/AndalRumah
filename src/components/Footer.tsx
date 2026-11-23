import { Link } from "react-router-dom";
import { LogoMark } from "./Logo";
import { BRAND, TAGLINE } from "../config";
import { adminChatUrl } from "../lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-line bg-soft">
      <div className="container-x flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark size={36} />
          <div>
            <p className="font-extrabold text-navy">{BRAND}</p>
            <p className="text-sm text-slate-600">{TAGLINE}</p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-semibold" aria-label="Tautan bawah">
          <a className="text-navy hover:text-brand" href={adminChatUrl} target="_blank" rel="noopener noreferrer">Hubungi Admin</a>
          <Link className="text-navy hover:text-brand" to="/privasi">Kebijakan Privasi</Link>
        </nav>
      </div>
      <div className="container-x border-t border-line py-5 text-sm text-slate-500">
        © {new Date().getFullYear()} {BRAND}. Hak cipta dilindungi.
      </div>
    </footer>
  );
}
