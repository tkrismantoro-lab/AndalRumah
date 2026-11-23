import { useEffect } from "react";
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PageMeta } from "./components/PageMeta";
import Home from "./pages/Home";
import FormMajikan from "./pages/FormMajikan";
import FormPencariKerja from "./pages/FormPencariKerja";
import { Privasi, Tentang, TidakDitemukan } from "./pages/Info";

// Pratinjau memakai HashRouter; situs di domain sendiri memakai alamat biasa (/cari-art).
const Router = import.meta.env.MODE === "preview" ? HashRouter : BrowserRouter;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router basename={import.meta.env.MODE === "preview" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}>
      <ScrollToTop />
      <PageMeta />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cari-art" element={<FormMajikan />} />
            <Route path="/cari-pekerjaan" element={<FormPencariKerja />} />
            <Route path="/tentang" element={<Tentang />} />
            <Route path="/privasi" element={<Privasi />} />
            <Route path="*" element={<TidakDitemukan />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
