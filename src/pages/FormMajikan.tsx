import { useState, type FormEvent } from "react";
import { FormLayout, PrivacyNotice, RequiredLegend } from "../components/FormLayout";
import { CheckboxGroup, SelectField, TextAreaField, TextField } from "../components/fields";
import { ConfirmDialog, OpenedPanel, useWhatsappSubmit } from "../components/SubmitFlow";
import { buildMessage, formatDate, isValidPhone } from "../lib/whatsapp";

const TUGAS = ["Membersihkan rumah", "Memasak", "Mengurus anak", "Mengurus lansia", "Mencuci dan menyetrika", "Lainnya"];

const empty = { nama: "", wa: "", lokasi: "", jenis: "", kelamin: "", usia: "", pengalaman: "", gaji: "", mulai: "", catatan: "" };
type Data = typeof empty;
type Errors = Partial<Record<keyof Data, string>>;

export default function FormMajikan() {
  const [d, setD] = useState<Data>(empty);
  const [tugas, setTugas] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const flow = useWhatsappSubmit();

  const set = (k: keyof Data) => (v: string) => { setD((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: undefined })); };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (!d.nama.trim()) er.nama = "Nama majikan wajib diisi.";
    if (!d.wa.trim()) er.wa = "Nomor WhatsApp wajib diisi.";
    else if (!isValidPhone(d.wa)) er.wa = "Nomor belum benar. Contoh: 081234567890.";
    if (!d.lokasi.trim()) er.lokasi = "Lokasi pekerjaan wajib diisi.";
    if (!d.jenis) er.jenis = "Pilih jenis ART.";
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) { document.getElementById(`m-${first}`)?.focus(); return; }

    flow.ask(buildMessage("Halo Admin AndalRumah, saya ingin mencari ART.", [
      ["Nama Majikan", d.nama], ["WhatsApp", d.wa], ["Lokasi", d.lokasi], ["Jenis ART", d.jenis],
      ["Jenis Kelamin", d.kelamin], ["Usia", d.usia], ["Pengalaman", d.pengalaman], ["Tugas", tugas],
      ["Gaji", d.gaji], ["Mulai Bekerja", formatDate(d.mulai)], ["Catatan", d.catatan],
    ]));
  };

  return (
    <FormLayout title="Formulir Kebutuhan ART"
      highlight="Biaya admin terjangkau: Rp1.500.000 (harga normal Rp2.000.000) untuk 50 majikan pertama, dibayar setelah ART mulai bekerja. Gaji Anda bayarkan langsung kepada ART."
      subtitle="Isi kebutuhan ART yang Anda cari. AndalRumah akan membantu menghubungkan Anda dengan kandidat yang sesuai.">
      {flow.opened ? <OpenedPanel flow={flow} /> : (
        <form noValidate onSubmit={submit} className="card flex flex-col gap-5 p-5 md:p-8">
          <RequiredLegend />
          <TextField id="m-nama" label="Nama Majikan" required autoComplete="name" value={d.nama} onChange={set("nama")} error={errors.nama} />
          <TextField id="m-wa" label="Nomor WhatsApp Majikan" required type="tel" inputMode="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" value={d.wa} onChange={set("wa")} error={errors.wa} />
          <TextField id="m-lokasi" label="Lokasi Pekerjaan" required placeholder="Contoh: Bekasi, Jawa Barat" value={d.lokasi} onChange={set("lokasi")} error={errors.lokasi} />
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField id="m-jenis" label="Jenis ART" required options={["ART Menginap", "ART Pulang Pergi"]} value={d.jenis} onChange={set("jenis")} error={errors.jenis} />
            <SelectField id="m-kelamin" label="Jenis Kelamin ART" options={["Perempuan", "Laki-laki", "Tidak ada preferensi"]} value={d.kelamin} onChange={set("kelamin")} />
            <TextField id="m-usia" label="Rentang Usia ART" placeholder="Contoh: 20–35 tahun" value={d.usia} onChange={set("usia")} />
            <SelectField id="m-pengalaman" label="Pengalaman Kerja" options={["Berpengalaman", "Tanpa pengalaman", "Tidak ada preferensi"]} value={d.pengalaman} onChange={set("pengalaman")} />
          </div>
          <CheckboxGroup id="m-tugas" label="Tugas Utama" options={TUGAS} values={tugas} onChange={setTugas} />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="m-gaji" label="Gaji yang Ditawarkan" placeholder="Contoh: Rp2.000.000–Rp3.000.000" value={d.gaji} onChange={set("gaji")} />
            <TextField id="m-mulai" label="Tanggal Mulai Bekerja" type="date" value={d.mulai} onChange={set("mulai")} />
          </div>
          <TextAreaField id="m-catatan" label="Catatan Tambahan" placeholder="Contoh: ada bayi 8 bulan, ada hewan peliharaan" value={d.catatan} onChange={set("catatan")} />
          <PrivacyNotice />
          <button type="submit" className="btn-primary w-full py-4 text-base">Kirim Permintaan via WhatsApp</button>
        </form>
      )}
      <ConfirmDialog flow={flow} />
    </FormLayout>
  );
}
