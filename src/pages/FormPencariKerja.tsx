import { useState, type FormEvent } from "react";
import { FormLayout, PrivacyNotice, RequiredLegend } from "../components/FormLayout";
import { CheckboxGroup, SelectField, TextAreaField, TextField } from "../components/fields";
import { ConfirmDialog, OpenedPanel, useWhatsappSubmit } from "../components/SubmitFlow";
import { buildMessage, isValidPhone } from "../lib/whatsapp";

const KEAHLIAN = ["Membersihkan rumah", "Memasak", "Mengurus anak", "Mengurus lansia", "Mencuci dan menyetrika", "Lainnya"];
const USIA_MIN = 18;

const empty = { nama: "", wa: "", usia: "", kelamin: "", domisili: "", pengalaman: "", lama: "", jenis: "", gaji: "", mulai: "", catatan: "" };
type Data = typeof empty;
type Errors = Partial<Record<keyof Data, string>>;

export default function FormPencariKerja() {
  const [d, setD] = useState<Data>(empty);
  const [keahlian, setKeahlian] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const flow = useWhatsappSubmit();

  const set = (k: keyof Data) => (v: string) => { setD((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: undefined })); };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    const usia = Number(d.usia);
    if (!d.nama.trim()) er.nama = "Nama lengkap wajib diisi.";
    if (!d.wa.trim()) er.wa = "Nomor WhatsApp wajib diisi.";
    else if (!isValidPhone(d.wa)) er.wa = "Nomor belum benar. Contoh: 081234567890.";
    if (!d.usia.trim()) er.usia = "Usia wajib diisi.";
    else if (!Number.isInteger(usia) || usia > 80) er.usia = "Isi usia dengan angka yang benar.";
    else if (usia < USIA_MIN) er.usia = `Usia minimum untuk mendaftar adalah ${USIA_MIN} tahun.`;
    if (!d.domisili.trim()) er.domisili = "Domisili wajib diisi.";
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) { document.getElementById(`p-${first}`)?.focus(); return; }

    flow.ask(buildMessage("Halo Admin AndalRumah, saya ingin mencari pekerjaan sebagai ART.", [
      ["Nama", d.nama], ["WhatsApp", d.wa], ["Usia", `${usia} tahun`], ["Jenis Kelamin", d.kelamin],
      ["Domisili", d.domisili], ["Pengalaman", d.pengalaman], ["Lama Pengalaman", d.lama], ["Keahlian", keahlian],
      ["Jenis Pekerjaan", d.jenis], ["Ekspektasi Gaji", d.gaji], ["Mulai Bekerja", d.mulai], ["Catatan", d.catatan],
    ]));
  };

  return (
    <FormLayout title="Formulir Pencari Kerja ART"
      highlight="Gratis. Anda tidak dipungut biaya apa pun, dan gaji Anda terima langsung dari majikan."
      subtitle="Isi data diri dan pengalaman kerja Anda untuk membantu AndalRumah menemukan pekerjaan yang sesuai.">
      {flow.opened ? <OpenedPanel flow={flow} /> : (
        <form noValidate onSubmit={submit} className="card flex flex-col gap-5 p-5 md:p-8">
          <RequiredLegend />
          <TextField id="p-nama" label="Nama Lengkap" required autoComplete="name" value={d.nama} onChange={set("nama")} error={errors.nama} />
          <TextField id="p-wa" label="Nomor WhatsApp" required type="tel" inputMode="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" value={d.wa} onChange={set("wa")} error={errors.wa} />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="p-usia" label="Usia" required type="number" inputMode="numeric" min={USIA_MIN} max={80} placeholder="Contoh: 28" value={d.usia} onChange={set("usia")} error={errors.usia} />
            <SelectField id="p-kelamin" label="Jenis Kelamin" options={["Perempuan", "Laki-laki"]} value={d.kelamin} onChange={set("kelamin")} />
          </div>
          <TextField id="p-domisili" label="Domisili" required placeholder="Contoh: Cirebon, Jawa Barat" value={d.domisili} onChange={set("domisili")} error={errors.domisili} />
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField id="p-pengalaman" label="Pengalaman Kerja" options={["Berpengalaman", "Belum Berpengalaman"]} value={d.pengalaman} onChange={set("pengalaman")} />
            <TextField id="p-lama" label="Lama Pengalaman" placeholder="Contoh: 2 tahun" value={d.lama} onChange={set("lama")} />
          </div>
          <CheckboxGroup id="p-keahlian" label="Keahlian" options={KEAHLIAN} values={keahlian} onChange={setKeahlian} />
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField id="p-jenis" label="Jenis Pekerjaan yang Dicari" options={["ART Menginap", "ART Pulang Pergi", "Keduanya"]} value={d.jenis} onChange={set("jenis")} />
            <TextField id="p-gaji" label="Ekspektasi Gaji" placeholder="Contoh: Rp2.500.000" value={d.gaji} onChange={set("gaji")} />
          </div>
          <SelectField id="p-mulai" label="Kapan Bisa Mulai Bekerja" options={["Segera", "1 minggu lagi", "2 minggu lagi", "Sesuai kesepakatan"]} value={d.mulai} onChange={set("mulai")} />
          <TextAreaField id="p-catatan" label="Catatan Tambahan" placeholder="Contoh: pernah mengasuh bayi kembar" value={d.catatan} onChange={set("catatan")} />
          <PrivacyNotice />
          <button type="submit" className="btn-primary w-full py-4 text-base">Kirim Data via WhatsApp</button>
        </form>
      )}
      <ConfirmDialog flow={flow} />
    </FormLayout>
  );
}
