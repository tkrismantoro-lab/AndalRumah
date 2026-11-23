import { Link } from "react-router-dom";
import seo from "../seo.json";

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

const Check = () => (
  <svg className="mt-0.5 flex-none text-success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

function ChoiceCard({ to, title, text, button, icon, badge, points }: { to: string; title: string; text: string; button: string; icon: "home" | "work"; badge: string; points: string[] }) {
  return (
    <div className="card flex flex-col gap-3 p-6">
      <div className="flex items-center justify-between gap-3">
      <span className="grid h-12 w-12 flex-none place-items-center rounded-card bg-brand-soft text-brand">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {icon === "home"
            ? <><path d="M3 11l9-7 9 7v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><path d="M9 20v-6h6v6" /></>
            : <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></>}
        </svg>
      </span>
      <span className="rounded-full bg-success/10 px-3 py-1 text-[13px] font-bold text-success">{badge}</span>
      </div>
      <h2 className="text-xl font-extrabold text-navy">{title}</h2>
      <p className="text-[15px] text-slate-600">{text}</p>
      <ul className="m-0 flex flex-1 list-none flex-col gap-2 p-0 text-[15px] text-navy">
        {points.map((pt) => <li key={pt} className="flex gap-2"><Check />{pt}</li>)}
      </ul>
      <Link to={to} className="btn-primary mt-1 w-full">{button} <Arrow /></Link>
    </div>
  );
}

const steps = [
  { n: 1, title: "Isi Formulir", text: "Lengkapi kebutuhan ART atau data diri Anda." },
  { n: 2, title: "Kirim ke Admin", text: "Data Anda diteruskan melalui WhatsApp." },
  { n: 3, title: "Proses Pencocokan", text: "Admin AndalRumah membantu mempertemukan kedua pihak." },
];

export default function Home() {
  return (
    <>
      <section className="container-x grid items-center gap-10 py-10 md:py-16 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-lg font-extrabold tracking-tight text-navy">Andal<span className="text-brand">Rumah</span></p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-navy md:text-5xl">
              Temukan ART atau Pekerjaan dengan Mudah
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              Butuh ART yang bisa diandalkan, atau sedang mencari pekerjaan di rumah keluarga yang baik? Isi formulir singkat, lalu admin AndalRumah membantu mempertemukan Anda dengan yang cocok.
            </p>
          </div>
          <div id="pilih" className="grid gap-4 sm:grid-cols-2">
            <ChoiceCard to="/cari-art" icon="home" title="Saya Mencari ART"
              text="Ceritakan kebutuhan keluarga Anda, kami bantu carikan ART yang sesuai." button="Isi Formulir Majikan"
              badge="Promo Rp1.500.000"
              points={["Biaya admin terjangkau, bayar setelah ART mulai bekerja", "Garansi 3 bulan, sampai 2 kali ganti ART", "Gaji Anda bayarkan langsung ke ART"]} />
            <ChoiceCard to="/cari-pekerjaan" icon="work" title="Saya Mencari Pekerjaan"
              text="Daftarkan diri Anda dan dapatkan kesempatan bekerja di rumah keluarga yang tepat." button="Isi Formulir Pencari Kerja"
              badge="Gratis untuk ART"
              points={["Tidak dipungut biaya apa pun", "Gaji diterima langsung dari majikan", "Daftar dari HP, hanya beberapa menit"]} />
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          <img src={`${import.meta.env.BASE_URL}hero.webp`} width={1024} height={1536}
            alt="Asisten rumah tangga (ART) tersenyum membawa alat kebersihan di rumah keluarga"
            className="aspect-[4/5] w-full rounded-[24px] object-cover object-top shadow-soft" />
        </div>
      </section>

      <section className="container-x pb-12" aria-label="Keuntungan">
        <ul className="m-0 grid list-none gap-3 rounded-card border border-line bg-white p-4 shadow-soft md:grid-cols-3 md:p-5">
          {[
            ["Biaya admin terjangkau", "Rp1.500.000 sekali bayar, setelah ART mulai bekerja."],
            ["Gratis untuk ART", "Pencari kerja tidak dipungut biaya apa pun."],
            ["Gaji langsung dari majikan", "Dibayarkan majikan kepada ART, bukan lewat kami."],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-3 rounded-btn bg-soft p-4">
              <Check />
              <span className="flex flex-col"><strong className="text-navy">{t}</strong><span className="text-[15px] text-slate-600">{d}</span></span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-x pb-14" aria-labelledby="percaya-judul">
        <div className="flex flex-col gap-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-2 text-center">
            <h2 id="percaya-judul" className="text-3xl font-extrabold tracking-tight text-navy">Kenapa AndalRumah Bisa Dipercaya</h2>
            <p className="text-[17px] text-slate-600">Kami menuliskan apa yang kami kerjakan dan berapa biayanya, supaya Anda tahu sejak awal.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="card flex flex-col gap-4 p-6">
              <h3 className="text-xl font-extrabold text-navy">Untuk Majikan</h3>
              <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[15px] text-navy">
                {[
                  ["Identitas ART diperiksa", "KTP dicocokkan dengan wajah saat ART mendaftar."],
                  ["SKCK sebelum mulai bekerja", "ART menunjukkan SKCK yang masih berlaku sebelum ditempatkan."],
                  ["Referensi kerja ditanyakan", "Bila ART pernah bekerja, admin menghubungi majikan sebelumnya."],
                  ["Garansi 3 bulan", "Bila tidak cocok, kami carikan pengganti sampai 2 kali tanpa biaya admin baru."],
                  ["Perjanjian kerja tertulis", "Ditandatangani majikan dan ART sebelum mulai bekerja."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-3"><Check /><span><strong>{t}.</strong> <span className="text-slate-600">{d}</span></span></li>
                ))}
              </ul>
            </div>
            <div className="card flex flex-col gap-4 p-6">
              <h3 className="text-xl font-extrabold text-navy">Untuk Pencari Kerja (ART)</h3>
              <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[15px] text-navy">
                {[
                  ["Gratis sepenuhnya", "Tidak ada biaya pendaftaran, biaya penempatan, atau potongan gaji."],
                  ["Gaji langsung dari majikan", "Dibayarkan kepada Anda, tidak lewat AndalRumah."],
                  ["Dokumen asli tetap di tangan Anda", "KTP dan ijazah asli tidak kami tahan."],
                  ["Majikan juga diperiksa", "Identitas dan alamat majikan kami catat sebelum Anda ditempatkan."],
                  ["Admin bisa dihubungi", "Bila ada masalah di tempat kerja, sampaikan ke admin lewat WhatsApp."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-3"><Check /><span><strong>{t}.</strong> <span className="text-slate-600">{d}</span></span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card flex flex-col gap-4 border-brand/30 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1">
              <span className="self-start rounded-full bg-brand-soft px-3 py-1 text-[13px] font-bold text-brand">Promo untuk 50 majikan pertama</span>
              <p className="text-3xl font-extrabold tracking-tight text-navy">
                Rp1.500.000 <s className="text-lg font-semibold text-slate-400">Rp2.000.000</s>
              </p>
              <p className="text-[15px] text-slate-600">Biaya admin sekali bayar per penempatan, dibayar setelah ART mulai bekerja. Pencari kerja tidak dipungut biaya apa pun.</p>
            </div>
            <Link to="/cari-art" className="btn-primary flex-none">Cari ART Sekarang <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="bg-soft py-14">
        <div className="container-x flex flex-col gap-9">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy">Cara Menggunakan AndalRumah</h2>
          <ol className="grid list-none gap-4 p-0 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="card flex flex-col gap-2 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-base font-extrabold text-white">{s.n}</span>
                <h3 className="mt-1 text-lg font-bold text-navy">{s.title}</h3>
                <p className="text-[15px] text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x pt-14" aria-labelledby="faq-judul">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <h2 id="faq-judul" className="text-center text-3xl font-extrabold tracking-tight text-navy">Pertanyaan Seputar Cari ART dan Lowongan ART</h2>
          <div className="flex flex-col">
            {seo.faq.map((f) => (
              <details key={f.q} className="border-b border-line py-4">
                <summary className="cursor-pointer text-[17px] font-bold text-navy">{f.q}</summary>
                <p className="mt-2 text-[15px] text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="flex flex-col items-center gap-6 rounded-[24px] bg-brand-soft px-6 py-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy">Mulai Temukan Kecocokan Anda</h2>
          <p className="max-w-xl text-[17px] text-slate-600">Mengisi formulir hanya butuh beberapa menit. Setelah itu, admin AndalRumah yang menindaklanjuti lewat WhatsApp.</p>
          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link to="/cari-art" className="btn-primary">Cari ART</Link>
            <Link to="/cari-pekerjaan" className="btn-outline">Cari Pekerjaan</Link>
          </div>
        </div>
      </section>
    </>
  );
}
