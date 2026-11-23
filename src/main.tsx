import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Alamat seperti /cari-art.html atau /index.html dirapikan menjadi /cari-art dan /
if (/\.html$/.test(location.pathname)) {
  const clean = location.pathname.replace(/(index)?\.html$/, "");
  history.replaceState(null, "", clean + location.search + location.hash);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
