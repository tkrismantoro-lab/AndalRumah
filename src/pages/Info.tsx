import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { adminChatUrl, adminDisplay } from "../lib/whatsapp";

function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="container-x py-10 md:py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-5 text-[17px] leading-relaxed text-slate-700">
        <h1 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">{title}</h1>
        {children}
        <Link to="/" className="btn-outline mt-2 self-start">Kembali ke Beranda</Link>
      </div>
    </div>
  );
}

const H = ({ children }: { children: ReactNode }) => <h2 className="mt-2 text-xl font-bold text-navy">{children}</h2>;

export function Tentang() {
  return (
    <Page title="Tentang Kami">
      <p>AndalRumah adalah media pencari kerja ART. Kami membantu mempertemukan keluarga yang membutuhkan asisten rumah tangga dengan orang yang mencari pekerjaan sebagai ART.</p>
      <p>Caranya sederhana: Anda mengisi formulir, data diteruskan ke admin AndalRumah melalui WhatsApp, lalu admin membantu proses pencocokan dan menghubungi Anda kembali.</p>
      <p>Ada pertanyaan? Hubungi admin di <a className="font-semibold text-brand underline" href={adminChatUrl} target="_blank" rel="noopener noreferrer">WhatsApp {adminDisplay}</a>.</p>
    </Page>
  );
}

export function Privasi() {
  return (
    <Page title="Kebijakan Privasi">
      <p>Halaman ini menjelaskan data apa yang Anda berikan lewat formulir AndalRumah dan bagaimana data itu dipakai.</p>
      <H>Data yang Anda isi</H>
      <p>Nama, nomor WhatsApp, lokasi atau domisili, usia, pengalaman, keahlian, gaji, dan catatan yang Anda tulis sendiri di formulir.</p>
      <H>Bagaimana data dikirim</H>
      <p>Situs ini tidak menyimpan isi formulir. Saat Anda menekan tombol kirim, isi formulir disusun menjadi pesan dan dibuka di aplikasi WhatsApp Anda. Pesan baru terkirim ke admin AndalRumah setelah Anda sendiri menekan Kirim di WhatsApp.</p>
      <H>Untuk apa data dipakai</H>
      <p>Hanya untuk membantu mempertemukan majikan dan pencari kerja. Admin dapat membagikan data yang relevan kepada pihak yang dicocokkan dengan Anda, misalnya nama dan pengalaman pencari kerja kepada calon majikan.</p>
      <H>Permintaan penghapusan</H>
      <p>Anda dapat meminta admin menghapus data Anda kapan saja melalui <a className="font-semibold text-brand underline" href={adminChatUrl} target="_blank" rel="noopener noreferrer">WhatsApp {adminDisplay}</a>.</p>
    </Page>
  );
}

export function TidakDitemukan() {
  return (
    <Page title="Halaman tidak ditemukan">
      <p>Alamat yang Anda buka tidak ada. Silakan kembali ke beranda dan pilih formulir yang sesuai.</p>
    </Page>
  );
}
