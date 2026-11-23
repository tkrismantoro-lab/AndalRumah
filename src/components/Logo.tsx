import { Link } from "react-router-dom";

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 5L35 18.5V32a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V18.5z" fill="#D71920" stroke="#D71920" strokeWidth="2" strokeLinejoin="round" />
      <path d="M13 23.5l5 5 9.5-10.5" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2 text-[21px] font-extrabold tracking-tight text-navy" aria-label="AndalRumah, ke beranda">
      <LogoMark />
      <span>Andal<span className="text-brand">Rumah</span></span>
    </Link>
  );
}
