# AndalRumah

Situs AndalRumah: beranda, formulir majikan (`/cari-art`), dan formulir pencari kerja (`/cari-pekerjaan`).
Isi formulir diteruskan ke admin lewat WhatsApp; tidak ada server.

## Menjalankan

```bash
npm install
npm run dev
```

## Pengaturan

- Nomor WhatsApp admin: `src/config.ts`
- Judul, deskripsi, alamat situs, dan pertanyaan umum untuk SEO: `src/seo.json`

## Build

- Domain sendiri: `npm run build` lalu unggah folder `dist`.
- GitHub Pages di sub-folder `/andalrumah/`:

```bash
BASE_PATH=/andalrumah/ VITE_SITE_URL=https://tkrismantoro-lab.github.io/andalrumah npx vite build --outDir dist-gh
OUT_DIR=dist-gh VITE_SITE_URL=https://tkrismantoro-lab.github.io/andalrumah node scripts/postbuild.mjs
```
