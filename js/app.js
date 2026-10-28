const { useState, useEffect, useRef } = React;
const PHOTO = "assets/photo.webp";
const L = (en, id) => ({ en, id });
const num = (v, lang) => String(v).replace(".", lang === "id" ? "," : ".");

const NAV = [["about", L("About", "Tentang")], ["experience", L("Experience", "Pengalaman")], ["work", L("Work", "Karya")], ["education", L("Education", "Pendidikan")], ["contact", L("Contact", "Kontak")]];
const TICK = [[L("GPA", "IPK"), L("3.85 / 4.00", "3,85 / 4,00"), 0], ["UNVR NPM", L("16.7% → 9.6%", "16,7% → 9,6%"), -1], ["LEAF IT IRR", L("8.57%", "8,57%"), 0], ["HRTA + KPIG", L("+1.73%", "+1,73%"), 1], [L("Journal articles", "Artikel jurnal"), "2", 0], [L("Business competition", "Kompetisi bisnis"), "2nd Runner-Up", 0], ["UNVR current ratio", L("0.45x", "0,45x"), -1]];
const SK = [[L("Analysis", "Analisis"), ["Financial statement analysis", "15-ratio analysis", "Cash budgeting", "Forecasting"]], [L("Modeling", "Pemodelan"), ["5-year financial projections", "NPV, IRR, payback, ROI", "WACC with CAPM", "Investment feasibility"]], [L("Tools", "Alat"), ["Excel: PivotTables, dashboards", "Google Sheets", "Word and PowerPoint", "Canva and Photoshop"]]];
const EXP = [
{ y: "2026", cur: 1, t: L("Revitalization Staff, Financial Analyst", "Staf Revitalisasi, Financial Analyst"), o: L("Ministry of Cooperatives of the Republic of Indonesia", "Kementerian Koperasi Republik Indonesia"), d: L("2026 to present", "2026 sampai sekarang"), b: [L("Supports financial analysis in the revitalization team.", "Mendukung analisis keuangan di tim revitalisasi.")] },
{ y: "2025", t: L("Administration Intern, then Part-Time Staff", "Administration Intern, lalu Staf Part-Time"), o: "Kantor PPAT Vania Laksana Putri, S.H., M.Kn.", d: L("Intern Jul 2025 to Jan 2026, part-time Jan 2026 to present", "Magang Jul 2025 sampai Jan 2026, part-time Jan 2026 sampai sekarang"), b: [L("Verified deeds and land certificates: drafted 12+ deeds, validated 20+ certificates in INTAN.", "Memverifikasi akta dan sertipikat: menyusun 12+ akta, memvalidasi 20+ sertipikat di INTAN."), L("Built monthly Excel reports for BPN, Kanwil BPN and KPP.", "Menyusun laporan bulanan Excel untuk BPN, Kanwil BPN, dan KPP."), L("Promoted from intern to part-time for accuracy and reliability.", "Naik dari magang ke part-time berkat ketelitian dan keandalan.")] },
{ y: "2025", t: L("Data Entry Assistant (Freelance)", "Data Entry Assistant (Freelance)"), o: "PT Catur Global Logistik", d: L("Mar to May 2025", "Mar sampai Mei 2025"), b: [L("Accurate data entry and record keeping.", "Input data dan pencatatan yang akurat.")] },
{ y: "2024", t: L("Assistant Lecturer, Finance Management", "Asisten Dosen Manajemen Keuangan"), o: "Universitas Trisakti", d: L("Jul 2024 to Nov 2025", "Jul 2024 sampai Nov 2025"), b: [L("Supported 2 classes (40+ students) on financial statements, time value of money, cash and capital budgeting.", "Mendampingi 2 kelas (40+ mahasiswa): laporan keuangan, time value of money, cash dan capital budgeting."), L("Prepared materials, graded work, mentored students one-on-one.", "Menyusun materi, menilai tugas, membimbing mahasiswa secara individual.")] },
{ y: "2022", t: L("Data Entry Assistant (Freelance)", "Data Entry Assistant (Freelance)"), o: "Amanah Group", d: L("Jul 2022 to Jul 2023", "Jul 2022 sampai Jul 2023"), b: [L("Data entry and administrative support.", "Input data dan dukungan administrasi.")] }];

const W = [
{ id: "unvr", c: "fin", tg: L("Individual", "Individu"), t: "PT Unilever Indonesia Tbk", s: L("Financial performance 2020–2024", "Kinerja keuangan 2020–2024"), fg: L("NPM 16.7% → 9.6%", "NPM 16,7% → 9,6%"), d: L("Five years of audited reports turned into a 15-ratio Excel model and a KPI dashboard.", "Lima tahun laporan audited saya olah menjadi model Excel 15 rasio dan dashboard KPI."), b: [L("Profitability weakened while leverage climbed.", "Profitabilitas melemah sementara leverage naik."), L("Current ratio of 0.45x is below the safe threshold.", "Current ratio 0,45x di bawah ambang aman."), L("ROE rose because equity shrank, not because earnings improved.", "ROE naik karena ekuitas menyusut, bukan karena laba membaik.")] },
{ id: "leaf", c: "fin", tg: "2nd Runner-Up", t: "LEAF IT", s: L("Projection and feasibility, banana-leaf packaging", "Proyeksi dan kelayakan, kemasan daun pisang"), fg: L("IRR 8.57%", "IRR 8,57%"), d: L("As Finance Lead I built the integrated 5-year model for 4 product lines and the capital budgeting analysis.", "Sebagai Finance Lead, saya menyusun model 5 tahun terintegrasi untuk 4 lini produk dan analisis capital budgeting."), b: [L("Discount rate from CAPM and WACC, plus a loan amortization schedule.", "Discount rate dari CAPM dan WACC, serta tabel amortisasi pinjaman."), L("NPV was negative at WACC, so I proposed funding and pricing scenarios to improve feasibility.", "NPV negatif pada WACC, sehingga saya mengusulkan skenario pendanaan dan harga untuk memperbaiki kelayakan.")], k: [["NPV @ WACC", L("-Rp 42 mn", "-Rp 42 jt")], ["IRR", L("8.57%", "8,57%")], ["Payback", L("4.04 years", "4,04 tahun")], ["ROI (5y)", L("28.88%", "28,88%")]] },
{ id: "hrta", c: "fin", tg: L("Group", "Kelompok"), t: "HRTA and KPIG", s: L("Fundamental and technical portfolio", "Portofolio fundamental dan teknikal"), fg: L("+1.73%", "+1,73%"), d: L("A two-stock portfolio using Fibonacci retracement, chart patterns and order blocks, funded with personal money.", "Portofolio dua saham dengan Fibonacci retracement, chart pattern, dan order block, memakai dana pribadi."), b: [L("Invested Rp 74,900 and closed with Rp 1,300 net profit.", "Investasi Rp 74.900, ditutup dengan keuntungan bersih Rp 1.300."), L("Analyzed macro news and the fundamentals of both issuers.", "Menganalisis berita makro dan fundamental kedua emiten.")] },
{ id: "mm", c: "biz", tg: L("Business case", "Kasus bisnis"), t: "Money Matters", s: L("Financial literacy for Gen Z and Millennials", "Literasi keuangan untuk Gen Z dan Milenial"), fg: L("SOM Rp 12.6 bn", "SOM Rp 12,6 M"), d: L("Sized the market with TAM/SAM/SOM, benchmarked 4 competitors and designed a subscription and transaction-fee revenue model.", "Menghitung pasar dengan TAM/SAM/SOM, membandingkan 4 kompetitor, dan merancang model pendapatan langganan dan biaya transaksi."), b: [] },
{ id: "pkm", c: "com", tg: L("Community", "Pengabdian"), t: "Zero Waste Citaringgul", s: L("PKM-PM Circular Economy, Bogor", "PKM-PM Circular Economy, Bogor"), fg: L("3 study programs", "3 program studi"), d: L("A cross-disciplinary program with Management, Architecture and Mechanical Engineering.", "Program lintas disiplin Manajemen, Arsitektur, dan Teknik Mesin."), b: [L("Coordinated the youth organization and the university team.", "Mengoordinasikan Karang Taruna dan tim universitas."), L("Drafted the collection plan and ran Waste-to-Value education.", "Menyusun rencana pengambilan sampah dan edukasi Waste to Value.")] },
{ id: "oth", c: "biz", tg: L("Academic", "Akademik"), t: L("Three more case studies", "Tiga studi kasus lain"), s: "Mie Gacoan, Yoerin, SIGMUND", fg: L("3 projects", "3 proyek"), d: L("Service management with SERVQUAL, ISO 31000:2018 risk analysis, and a mental-health startup plan.", "Manajemen layanan dengan SERVQUAL, analisis risiko ISO 31000:2018, dan rencana startup kesehatan mental."), b: [] }];

const CATS = [["all", L("All", "Semua")], ["fin", L("Finance", "Keuangan")], ["biz", L("Business", "Bisnis")], ["com", L("Community", "Komunitas")]];
const ACH = [[L("Cum Laude, Finance Management, Universitas Trisakti", "Cum Laude, Manajemen Keuangan, Universitas Trisakti"), L("GPA 3.85/4.00, 2022 to 2026", "IPK 3,85/4,00, 2022 sampai 2026")], [L("2nd Runner-Up, Annual Business Competition", "2nd Runner-Up, Annual Business Competition"), L("Universitas Trisakti", "Universitas Trisakti")], [L("Top 10 Finalist, International Youthpreneur Competition", "Top 10 Finalis, International Youthpreneur Competition"), "ITB"], [L("Academic Merit Scholarship", "Beasiswa Prestasi Akademik"), "2024/2025"], [L("Sociotechnopreneurship in Eurasia Community Program", "Sociotechnopreneurship in Eurasia Community Program"), L("Participant, 2024–2025", "Peserta, 2024–2025")], [L("Certificates in Excel and ratio analysis", "Sertifikat Excel dan analisis rasio"), "MySkill, Coursera"], [L("4 copyright registration letters", "4 Surat Pencatatan Ciptaan"), ""]];
const PUB = [[L("Determinants of Consumer Goods Stock Prices on the IDX", "Faktor Penentu Harga Saham Perusahaan Barang Konsumsi di BEI"), "Paradoks: Jurnal Ilmu Ekonomi, Vol. 8 No. 3, 2025"], [L("Zero-Waste Management to Support Circular Economy in Citaringgul, Bogor", "Pengelolaan Sampah Tanpa Sisa untuk Mendukung Circular Economy di Citaringgul, Bogor"), "Jurnal AKAL: Abdimas dan Kearifan Lokal, 2025"], [L("Thesis: Financial Factors, Corporate Governance and Financial Performance in Consumer Cyclicals", "Skripsi: Financial Factors, Corporate Governance, dan Financial Performance Sektor Consumer Cyclicals"), "Universitas Trisakti, 2026"]];
const MET = { npm: { a: 16.7, b: 9.6, max: 20, u: "%" }, der: { a: 3.16, b: 6.47, max: 7, u: "x" } };

function Hero({ t }) {
  const r = useRef(null);
  const mv = (e) => {const b = r.current.getBoundingClientRect();r.current.style.setProperty("--mx", ((e.clientX - b.left) / b.width - .5) * 2);};
  const name = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "Albarr"), " ", /*#__PURE__*/React.createElement("span", null, "Khairan"));
  return /*#__PURE__*/React.createElement("div", { className: "hero", ref: r, onMouseMove: mv }, /*#__PURE__*/
  React.createElement("h1", { className: "nm" }, name), /*#__PURE__*/
  React.createElement("div", { className: "ph" }, /*#__PURE__*/React.createElement("img", { src: PHOTO, alt: "Muhamad Albarr Khairan" })), /*#__PURE__*/
  React.createElement("div", { className: "nm f", "aria-hidden": "true" }, name), /*#__PURE__*/
  React.createElement("div", { className: "cap l" }, t(L("Financial Analyst, Financial Management graduate", "Financial Analyst, lulusan Manajemen Keuangan"))), /*#__PURE__*/
  React.createElement("div", { className: "cap r" }, "Universitas Trisakti", /*#__PURE__*/React.createElement("br", null), t(L("GPA 3.85/4.00, Cum Laude", "IPK 3,85/4,00, Cum Laude")))
  );
}
function Ticker({ t }) {
  const items = /*#__PURE__*/React.createElement("div", null, TICK.map(([k, v, d], i) => /*#__PURE__*/React.createElement("span", { key: i }, /*#__PURE__*/React.createElement("b", null, typeof k === "string" ? k : t(k)), typeof v === "string" ? v : t(v), " ", d > 0 && /*#__PURE__*/React.createElement("span", { className: "up" }, "▲"), d < 0 && /*#__PURE__*/React.createElement("span", { className: "dn" }, "▼"))));
  return /*#__PURE__*/React.createElement("div", { className: "tk", "aria-hidden": "true" }, /*#__PURE__*/React.createElement("div", { className: "track" }, items, items));
}
function Timeline({ t }) {
  const ref = useRef(null),[p, setP] = useState(0);
  useEffect(() => {const f = () => {const r = ref.current.getBoundingClientRect();setP(Math.max(0, Math.min(1, (innerHeight * .6 - r.top) / r.height)));};f();addEventListener("scroll", f, { passive: true });return () => removeEventListener("scroll", f);}, []);
  return /*#__PURE__*/React.createElement("div", { className: "tl", ref: ref }, /*#__PURE__*/React.createElement("div", { className: "spine" }, /*#__PURE__*/React.createElement("i", { style: { height: p * 100 + "%" } })),
  EXP.map((e, i) => /*#__PURE__*/React.createElement("div", { className: "ex", key: i }, /*#__PURE__*/React.createElement("div", { className: "yr" }, e.y), /*#__PURE__*/
  React.createElement("div", { className: e.cur ? "now" : "" }, e.cur && /*#__PURE__*/React.createElement("b", null, t(L("Current role", "Posisi saat ini"))), /*#__PURE__*/React.createElement("h3", null, t(e.t)), /*#__PURE__*/React.createElement("div", { className: "mt" }, typeof e.o === "string" ? e.o : t(e.o), /*#__PURE__*/React.createElement("br", null), t(e.d)), /*#__PURE__*/React.createElement("ul", null, e.b.map((b, j) => /*#__PURE__*/React.createElement("li", { key: j }, t(b)))))))
  );
}
function Viz({ w, m, setM, lang, t }) {
  if (w.id === "unvr") {const x = MET[m];return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { className: "tabs" }, ["npm", "der"].map((k) => /*#__PURE__*/React.createElement("button", { key: k, className: m === k ? "on" : "", onClick: () => setM(k) }, k.toUpperCase()))),
    [["2020", x.a], ["2024", x.b]].map(([y, v]) => /*#__PURE__*/React.createElement("div", { className: "br", key: y }, /*#__PURE__*/React.createElement("span", null, y), /*#__PURE__*/React.createElement("div", { className: "bar" }, /*#__PURE__*/React.createElement("i", { style: { width: v / x.max * 100 + "%" } })), /*#__PURE__*/React.createElement("b", null, num(v, lang) + x.u))), /*#__PURE__*/
    React.createElement("div", { className: "mt" }, t(L("Net profit margin and debt to equity, 2020 vs 2024", "Net profit margin dan debt to equity, 2020 vs 2024"))));}
  if (w.id === "leaf") return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/
  React.createElement("div", { className: "split" }, /*#__PURE__*/React.createElement("i", { style: { width: "40%" } }, t(L("Bank loan 40%", "Pinjaman bank 40%"))), /*#__PURE__*/React.createElement("i", { style: { width: "60%" } }, t(L("Own capital 60%", "Modal sendiri 60%")))), /*#__PURE__*/
  React.createElement("div", { className: "mt", style: { marginTop: 6 } }, t(L("Rp 497.8 mn initial investment: Rp 199.1 mn loan, Rp 298.7 mn equity", "Investasi awal Rp 497,8 jt: pinjaman Rp 199,1 jt, modal Rp 298,7 jt"))), /*#__PURE__*/
  React.createElement("div", { className: "kv" }, w.k.map(([a, v]) => /*#__PURE__*/React.createElement("div", { key: a }, /*#__PURE__*/React.createElement("b", null, t(v)), a))));
  return null;
}
const DOCS = {
  unvr: "https://drive.google.com/file/d/1BmQfaHv8YkxeY44dFZbqEUWqsw3Yo_ix/view?usp=sharing",
  leaf: "https://drive.google.com/file/d/1R1mnTYzIvUq6gTDPnWy_sakNXNxY7U7m/view?usp=sharing",
  hrta: "https://drive.google.com/file/d/1byEEtow9xPny633qR3AJjiDgPENm_EOV/view?usp=sharing",
  mm: "https://drive.google.com/file/d/1DdjIZ75rKujXdOYqOigCBImyz6FPSbIH/view?usp=sharing",
  pkm: "https://drive.google.com/file/d/10CGEpISVWJgFZ732FhhS_M4M6zk_7oWo/view?usp=sharing"
};
function Work({ t, lang }) {
  const [cat, setCat] = useState("all"),[open, setOpen] = useState("unvr"),[m, setM] = useState("npm");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
  React.createElement("div", { className: "tabs" }, CATS.map(([k, l]) => /*#__PURE__*/React.createElement("button", { key: k, className: cat === k ? "on" : "", onClick: () => setCat(k) }, t(l)))), /*#__PURE__*/
  React.createElement("div", null, W.filter((w) => cat === "all" || w.c === cat).map((w) => {const o = open === w.id;return /*#__PURE__*/React.createElement("div", { key: w.id, className: "row" + (o ? " open" : "") }, /*#__PURE__*/
    React.createElement("button", { className: "hd", "aria-expanded": o, onClick: () => setOpen(o ? null : w.id) }, /*#__PURE__*/
    React.createElement("span", { className: "tg" }, typeof w.tg === "string" ? w.tg : t(w.tg)), /*#__PURE__*/
    React.createElement("h3", null, typeof w.t === "string" ? w.t : t(w.t), /*#__PURE__*/React.createElement("small", null, typeof w.s === "string" ? w.s : t(w.s))), /*#__PURE__*/
    React.createElement("span", { className: "fg" }, t(w.fg)), /*#__PURE__*/React.createElement("span", { className: "pl", "aria-hidden": "true" }, "+")
    ), /*#__PURE__*/
    React.createElement("div", { className: "pn" }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", { className: "pi" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("p", { style: { margin: 0 } }, t(w.d)), w.b.length > 0 && /*#__PURE__*/React.createElement("ul", null, w.b.map((b, i) => /*#__PURE__*/React.createElement("li", { key: i }, t(b)))),
    DOCS[w.id] && /*#__PURE__*/React.createElement("a", { className: "vd", href: DOCS[w.id], target: "_blank", rel: "noopener noreferrer", tabIndex: o ? 0 : -1 }, t(L("View document", "Lihat dokumen")), " ↗")), /*#__PURE__*/
    React.createElement(Viz, { w: w, m: m, setM: setM, lang: lang, t: t })
    )))
    );}))
  );
}
const DRIVE = "https://drive.google.com/drive/folders/14AbAA3VukXx0d033HDEPWcPsurrviZUZ?usp=drive_link";
function App() {
  const [lang, setLang] = useState(() => {try {return localStorage.getItem("lang") || "en";} catch (e) {return "en";}});
  const [theme, setTheme] = useState(null),[active, setActive] = useState("about"),[copied, setCopied] = useState(false);
  const LOOKS = ["bold", "soft", "butter"];
  const [look, setLook] = useState(() => {try {return localStorage.getItem("look2") || "bold";} catch (e) {return "bold";}});
  const t = (o) => o[lang];
  useEffect(() => {document.documentElement.lang = lang;try {localStorage.setItem("lang", lang);} catch (e) {}}, [lang]);
  useEffect(() => {if (theme) document.documentElement.dataset.theme = theme;}, [theme]);
  useEffect(() => {document.documentElement.dataset.look = look;try {localStorage.setItem("look2", look);} catch (e) {}}, [look]);
  useEffect(() => {const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });NAV.forEach(([i]) => {const el = document.getElementById(i);el && io.observe(el);});return () => io.disconnect();}, []);
  const dark = theme ? theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const copy = () => {try {navigator.clipboard.writeText("albarrkhairan@gmail.com").then(() => {setCopied(true);setTimeout(() => setCopied(false), 2000);});} catch (e) {}};
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
  React.createElement("header", null, /*#__PURE__*/React.createElement("div", { className: "wrap" }, /*#__PURE__*/React.createElement("span", { className: "brand" }, "Albarr Khairan"),
  NAV.map(([id, l]) => /*#__PURE__*/React.createElement("a", { key: id, href: "#" + id, className: active === id ? "on" : "" }, t(l))), /*#__PURE__*/
  React.createElement("button", { onClick: () => setLook(LOOKS[(LOOKS.indexOf(look) + 1) % 3]) }, t(L("Look", "Tampilan")), ": ", look[0].toUpperCase() + look.slice(1)), /*#__PURE__*/
  React.createElement("button", { onClick: () => setTheme(dark ? "light" : "dark") }, dark ? t(L("Light", "Terang")) : t(L("Dark", "Gelap"))),
  ["en", "id"].map((l) => /*#__PURE__*/React.createElement("button", { key: l, className: lang === l ? "on" : "", onClick: () => setLang(l) }, l.toUpperCase()))
  )), /*#__PURE__*/
  React.createElement("main", null, /*#__PURE__*/
  React.createElement("section", { id: "about" }, /*#__PURE__*/React.createElement(Hero, { t: t }), /*#__PURE__*/React.createElement(Ticker, { t: t }), /*#__PURE__*/
  React.createElement("div", { className: "wrap s" }, /*#__PURE__*/React.createElement("div", { className: "about" }, /*#__PURE__*/
  React.createElement("p", { className: "big" }, t(L("Attention to detail from a land deed office, applied to financial statements.", "Ketelitian dari kantor PPAT, saya terapkan ke laporan keuangan."))), /*#__PURE__*/
  React.createElement("p", null, t(L("I’m a Financial Management graduate who builds ratio analyses, 5-year projections and investment feasibility models. I also verify land certificates and deeds at a PPAT office, which keeps every figure traceable and every file audit-ready.", "Saya lulusan Manajemen Keuangan yang membuat analisis rasio, proyeksi 5 tahun, dan model kelayakan investasi. Saya juga memverifikasi sertipikat dan akta tanah di kantor PPAT, sehingga setiap angka bisa ditelusuri dan setiap berkas siap diaudit.")))
  ), /*#__PURE__*/
  React.createElement("div", { className: "sk" }, SK.map(([h, li]) => /*#__PURE__*/React.createElement("div", { key: h.en }, /*#__PURE__*/React.createElement("h3", null, t(h)), /*#__PURE__*/React.createElement("ul", null, li.map((x) => /*#__PURE__*/React.createElement("li", { key: x }, x)))))))
  ), /*#__PURE__*/
  React.createElement("section", { id: "experience", className: "s" }, /*#__PURE__*/React.createElement("div", { className: "wrap" }, /*#__PURE__*/React.createElement("h2", null, t(L("Experience", "Pengalaman"))), /*#__PURE__*/React.createElement(Timeline, { t: t }))), /*#__PURE__*/
  React.createElement("section", { id: "work", className: "s", style: { paddingTop: 0 } }, /*#__PURE__*/React.createElement("div", { className: "wrap" }, /*#__PURE__*/React.createElement("h2", null, t(L("Selected work", "Karya pilihan"))), /*#__PURE__*/React.createElement(Work, { t: t, lang: lang }))), /*#__PURE__*/
  React.createElement("section", { id: "education", className: "s", style: { paddingTop: 0 } }, /*#__PURE__*/React.createElement("div", { className: "wrap" }, /*#__PURE__*/React.createElement("div", { className: "two" }, /*#__PURE__*/
  React.createElement("div", null, /*#__PURE__*/React.createElement("h2", { style: { fontSize: "clamp(44px,6vw,80px)" } }, t(L("Achievements", "Pencapaian"))), /*#__PURE__*/React.createElement("ul", { className: "ls" }, ACH.map(([a, b], i) => /*#__PURE__*/React.createElement("li", { key: i }, t(a), /*#__PURE__*/React.createElement("small", null, typeof b === "string" ? b : t(b)))))), /*#__PURE__*/
  React.createElement("div", null, /*#__PURE__*/React.createElement("h2", { style: { fontSize: "clamp(44px,6vw,80px)" } }, t(L("Research", "Riset"))), /*#__PURE__*/React.createElement("ul", { className: "ls" }, PUB.map(([a, b], i) => /*#__PURE__*/React.createElement("li", { key: i }, t(a), /*#__PURE__*/React.createElement("small", null, b)))))
  ))), /*#__PURE__*/
  React.createElement("section", { id: "contact", className: "ct s" }, /*#__PURE__*/React.createElement("div", { className: "wrap" }, /*#__PURE__*/
  React.createElement("h2", null, t(L("Let’s connect", "Mari terhubung"))), /*#__PURE__*/
  React.createElement("a", { className: "em", href: "mailto:albarrkhairan@gmail.com" }, "albarrkhairan@gmail.com"), /*#__PURE__*/
  React.createElement("div", { className: "cv" }, /*#__PURE__*/React.createElement("a", { href: DRIVE, target: "_blank", rel: "noopener noreferrer" }, t(L("View CV", "Lihat CV")), " ↗"), /*#__PURE__*/React.createElement("a", { href: DRIVE, target: "_blank", rel: "noopener noreferrer" }, t(L("View portfolio", "Lihat portofolio")), " ↗")), /*#__PURE__*/
  React.createElement("div", { className: "cb" }, /*#__PURE__*/React.createElement("button", { onClick: copy }, copied ? t(L("Email copied", "Email disalin")) : t(L("Copy email", "Salin email"))), /*#__PURE__*/React.createElement("a", { href: "tel:+6287874367786" }, "+62 878-7436-7786"), /*#__PURE__*/React.createElement("a", { href: "https://linkedin.com/in/albarrkhairan", target: "_blank", rel: "noopener" }, "LinkedIn"))
  ))
  ), /*#__PURE__*/
  React.createElement("footer", null, /*#__PURE__*/React.createElement("div", { className: "wrap" }, "© 2026 Muhamad Albarr Khairan"))
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
