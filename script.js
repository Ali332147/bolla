/* ---------- Data: edit these lists to change the dropdowns ---------- */
let STAFF = [
  "Jaber Ali", "Aman", "Jafor", "Mohammed", "Sazzad",
  "Farid", "Raja", "Ihsan", "Rahim", "Karim",
  "Hasan", "Rubel", "Sohel", "Nayeem", "Rafi",
  "Imran", "Mizan", "Salman", "Arif", "Shakil", "Nasir"
];
// Name dropdown shows names A to Z.
let STAFF_SORTED = [...STAFF].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
const STORES = ["3239", "3309", "109", "2300", "170","211","236","400","450","525","540","542","750","1050","1490"].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));   // Store dropdown: smallest number first
const SHIFTS = ["day", "afternoon", "night"];
const ADDRESS = "Sunrise Hwy, Islip Terrace, NY 11752";
const EMPLOYEE_PROFILE_URL = "https://ali332147.github.io/bollaempcard/";

/* ---------- Translations ---------- */
const T = {
  en: { name:"Name", store:"Store", report:"Report", upload:"Upload", allNames:"All names", day:"Morning", afternoon:"Afternoon", night:"Night",
    date:"Date:", status:"Status", checkIn:"Check-in", saveHint:"Saved automatically in this browser.",
    present:"Present", late:"Late", absent:"Absent", excel:"Download Excel", print:"Print",
    choose:"Choose files or drag them here", anyType:"Multiple files · Any file type", note:"Note (optional)",
    prepare:"Submit", remove:"Remove", localOnly:"Images preview here. Submit opens an email draft to jaber2024@gmail.com; press Send to deliver it.",
    done:"Submission ready — email draft opened. Press Send in your email app to complete submission." },
  es: { name:"Nombre", store:"Tienda", report:"Reporte", upload:"Subir", allNames:"Todos los nombres", day:"Día", afternoon:"Tarde", night:"Noche",
    date:"Fecha:", status:"Estado", checkIn:"Entrada", saveHint:"Se guarda automáticamente en este navegador.",
    present:"Presente", late:"Tarde", absent:"Ausente", excel:"Descargar Excel", print:"Imprimir",
    choose:"Elija archivos o arrástrelos aquí", anyType:"Varios archivos · Cualquier tipo", note:"Nota (opcional)",
    prepare:"Enviar", remove:"Quitar", localOnly:"Las imágenes se previsualizan aquí. Enviar abre un borrador a jaber2024@gmail.com; pulse Enviar para entregarlo.",
    done:"Envío preparado: borrador de correo abierto. Pulse Enviar para completar el envío." },
  hi: { name:"नाम", store:"स्टोर", report:"रिपोर्ट", upload:"अपलोड", allNames:"सभी नाम", day:"दिन", afternoon:"दोपहर", night:"रात",
    date:"तारीख:", status:"स्थिति", checkIn:"चेक-इन", saveHint:"इस ब्राउज़र में अपने-आप सेव होता है।",
    present:"उपस्थित", late:"देर से", absent:"अनुपस्थित", excel:"Excel डाउनलोड", print:"प्रिंट",
    choose:"फ़ाइलें चुनें या यहाँ खींचें", anyType:"कई फ़ाइलें · कोई भी प्रकार", note:"नोट (वैकल्पिक)",
    prepare:"सबमिट करें", remove:"हटाएँ", localOnly:"चित्रों का पूर्वावलोकन यहाँ दिखेगा। यह jaber2024@gmail.com पर ईमेल ड्राफ़्ट खोलेगा; भेजने के लिए Send दबाएँ।",
    done:"सबमिशन तैयार है—ईमेल ड्राफ़्ट खुल गया। पूरा करने के लिए Send दबाएँ।" },
  ur: { name:"نام", store:"اسٹور", report:"رپورٹ", upload:"اپ لوڈ", allNames:"تمام نام", day:"دن", afternoon:"دوپہر", night:"رات",
    date:"تاریخ:", status:"حالت", checkIn:"آمد", saveHint:"اس براؤزر میں خود بخود محفوظ ہوتا ہے۔",
    present:"حاضر", late:"دیر سے", absent:"غیر حاضر", excel:"Excel ڈاؤن لوڈ", print:"پرنٹ",
    choose:"فائلیں منتخب کریں یا یہاں گھسیٹیں", anyType:"کئی فائلیں · کوئی بھی قسم", note:"نوٹ (اختیاری)",
    prepare:"جمع کریں", remove:"ہٹائیں", localOnly:"تصاویر کا پیش منظر یہاں دکھے گا۔ یہ jaber2024@gmail.com کے لیے ای میل ڈرافٹ کھولے گا؛ بھیجنے کے لیے Send دبائیں۔",
    done:"جمع کرانے کی تیاری مکمل—ای میل ڈرافٹ کھل گیا۔ مکمل کرنے کے لیے Send دبائیں۔" },
  bn: { name:"নাম", store:"স্টোর", report:"রিপোর্ট", upload:"আপলোড", allNames:"সব নাম", day:"দিন", afternoon:"বিকাল", night:"রাত",
    date:"তারিখ:", status:"অবস্থা", checkIn:"চেক-ইন", saveHint:"এই ব্রাউজারে স্বয়ংক্রিয়ভাবে সেভ হয়।",
    present:"উপস্থিত", late:"দেরিতে", absent:"অনুপস্থিত", excel:"Excel ডাউনলোড", print:"প্রিন্ট",
    choose:"ফাইল বেছে নিন বা এখানে টেনে আনুন", anyType:"একাধিক ফাইল · যেকোনো ধরন", note:"নোট (ঐচ্ছিক)",
    prepare:"Submit", remove:"মুছুন", localOnly:"ছবির preview এখানে দেখা যাবে। Submit চাপলে jaber2024@gmail.com-এর জন্য email draft খুলবে; পাঠাতে Send চাপুন।",
    done:"Submission ready — email draft opened. সম্পূর্ণ করতে email app-এ Send চাপুন।" }
};

const EXTRA = {
  en: { sno:"S.No", amount:"Amount", dayReport:"Shift", time:"Time", total:"Total:", bkDiff:"B.K. Diff:", refund:"Refund:", grandTotal:"Grand Total:", clear:"Clear Entries", confirmClear:"Clear all rows and reset B.K. Diff and Refund?" },
  es: { sno:"N.º", amount:"Monto", dayReport:"Turno", time:"Hora", total:"Total:", bkDiff:"Dif. B.K.:", refund:"Reembolso:", grandTotal:"Total general:", clear:"Borrar entradas", confirmClear:"¿Borrar todas las filas y reiniciar Dif. B.K. y Reembolso?" },
  hi: { sno:"क्र.सं.", amount:"राशि", dayReport:"शिफ्ट", time:"समय", total:"कुल:", bkDiff:"B.K. अंतर:", refund:"रिफंड:", grandTotal:"कुल योग:", clear:"एंट्री साफ़ करें", confirmClear:"सभी पंक्तियाँ साफ़ करें और B.K. अंतर व रिफंड रीसेट करें?" },
  ur: { sno:"نمبر شمار", amount:"رقم", dayReport:"شفٹ", time:"وقت", total:"کل:", bkDiff:"B.K. فرق:", refund:"واپسی:", grandTotal:"مجموعی کل:", clear:"اندراجات صاف کریں", confirmClear:"تمام قطاریں صاف کریں اور B.K. فرق و واپسی ری سیٹ کریں؟" },
  bn: { sno:"ক্রমিক", amount:"পরিমাণ", dayReport:"শিফট", time:"সময়", total:"মোট:", bkDiff:"B.K. পার্থক্য:", refund:"রিফান্ড:", grandTotal:"সর্বমোট:", clear:"এন্ট্রি মুছুন", confirmClear:"সব সারি মুছে B.K. পার্থক্য ও রিফান্ড রিসেট করবেন?" }
};
const LABELS2 = {
  en: { storeLabel:"Store:", nameLabel:"Name:" }, es: { storeLabel:"Tienda:", nameLabel:"Nombre:" },
  hi: { storeLabel:"स्टोर:", nameLabel:"नाम:" }, ur: { storeLabel:"اسٹور:", nameLabel:"نام:" },
  bn: { storeLabel:"স্টোর:", nameLabel:"নাম:" }
};
const MENU_LABELS = {
  en: { shift:"Shift", attLabel:"Attendance:" }, es: { shift:"Turno", attLabel:"Asistencia:" },
  hi: { shift:"शिफ्ट", attLabel:"उपस्थिति:" }, ur: { shift:"شفٹ", attLabel:"حاضری:" }, bn: { shift:"শিফট", attLabel:"উপস্থিতি:" }
};
Object.keys(MENU_LABELS).forEach(l => Object.assign(EXTRA[l], MENU_LABELS[l]));
const USERS_LABELS = {
  en: { active:"Active", inactive:"Inactive", mobile:"Mobile number", email:"Email", regTitle:"Registered Users", regList:"Registered List", back:"Back" },
  es: { active:"Activo", inactive:"Inactivo", mobile:"Número de móvil", email:"Correo", regTitle:"Usuarios registrados", regList:"Lista registrada", back:"Atrás" },
  hi: { active:"सक्रिय", inactive:"निष्क्रिय", mobile:"मोबाइल नंबर", email:"ईमेल", regTitle:"पंजीकृत उपयोगकर्ता", regList:"पंजीकृत सूची", back:"वापस" },
  ur: { active:"فعال", inactive:"غیر فعال", mobile:"موبائل نمبر", email:"ای میل", regTitle:"رجسٹرڈ صارفین", regList:"رجسٹرڈ فہرست", back:"واپس" },
  bn: { active:"সক্রিয়", inactive:"নিষ্ক্রিয়", mobile:"মোবাইল নম্বর", email:"ইমেল", regTitle:"নিবন্ধিত ব্যবহারকারী", regList:"নিবন্ধিত তালিকা", back:"ফিরে যান" }
};
Object.keys(USERS_LABELS).forEach(l => Object.assign(EXTRA[l], USERS_LABELS[l]));
const AUTH_LABELS = {
  en: { logout:"Logout", confirmLogout:"Log out of this account?", nb:"N.B:" },
  es: { logout:"Salir", confirmLogout:"¿Cerrar sesión en esta cuenta?" },
  hi: { logout:"लॉगआउट", confirmLogout:"इस खाते से लॉगआउट करें?" },
  ur: { logout:"لاگ آؤٹ", confirmLogout:"اس اکاؤنٹ سے لاگ آؤٹ کریں؟" },
  bn: { logout:"লগআউট", confirmLogout:"এই অ্যাকাউন্ট থেকে লগআউট করবেন?" }
};
Object.keys(AUTH_LABELS).forEach(l => Object.assign(EXTRA[l], AUTH_LABELS[l]));
const PNG_LABEL = { en:"Download PDF", es:"Descargar PDF", hi:"PDF डाउनलोड", ur:"PDF ڈاؤن لوڈ", bn:"PDF ডাউনলোڈ" };
const BACKUP = {
  en: { storageWarn:"Warning: this browser is blocking storage, so entries will be lost on refresh. Turn off private mode and use Download backup often.", backupTitle:"Backup", backupDown:"Download backup", backupRestore:"Restore backup", backupBad:"This is not a valid Bolla backup file.", confirmRestore:"Replace everything on this device with the backup?" },
  es: { storageWarn:"Aviso: este navegador bloquea el almacenamiento y los datos se perderán al recargar. Desactive el modo privado y descargue copias de seguridad.", backupTitle:"Copia de seguridad", backupDown:"Descargar copia", backupRestore:"Restaurar copia", backupBad:"Este archivo no es una copia válida de Bolla.", confirmRestore:"¿Reemplazar todo en este dispositivo con la copia?" },
  hi: { storageWarn:"चेतावनी: यह ब्राउज़र स्टोरेज रोक रहा है, इसलिए रिफ्रेश करने पर डेटा मिट जाएगा। प्राइवेट मोड बंद करें और बैकअप डाउनलोड करते रहें।", backupTitle:"बैकअप", backupDown:"बैकअप डाउनलोड", backupRestore:"बैकअप रीस्टोर", backupBad:"यह वैध Bolla बैकअप फ़ाइल नहीं है।", confirmRestore:"इस डिवाइस का सारा डेटा बैकअप से बदल दें?" },
  ur: { storageWarn:"انتباہ: یہ براؤزر اسٹوریج روک رہا ہے، اس لیے ریفریش پر ڈیٹا ختم ہو جائے گا۔ پرائیویٹ موڈ بند کریں اور بیک اپ ڈاؤن لوڈ کرتے رہیں۔", backupTitle:"بیک اپ", backupDown:"بیک اپ ڈاؤن لوڈ", backupRestore:"بیک اپ بحال کریں", backupBad:"یہ درست Bolla بیک اپ فائل نہیں ہے۔", confirmRestore:"اس ڈیوائس کا تمام ڈیٹا بیک اپ سے بدل دیں؟" },
  bn: { storageWarn:"সতর্কতা: এই ব্রাউজার স্টোরেজ আটকাচ্ছে, তাই রিফ্রেশ দিলে ডেটা হারিয়ে যাবে। প্রাইভেট মোড বন্ধ করুন এবং নিয়মিত ব্যাকআপ ডাউনলোড করুন।", backupTitle:"ব্যাকআপ", backupDown:"ব্যাকআপ ডাউনলোড", backupRestore:"ব্যাকআপ রিস্টোর", backupBad:"এটি বৈধ Bolla ব্যাকআপ ফাইল নয়।", confirmRestore:"এই ডিভাইসের সব ডেটা ব্যাকআপ দিয়ে বদলাবেন?" }
};
Object.keys(BACKUP).forEach(l => Object.assign(EXTRA[l], BACKUP[l]));
Object.keys(PNG_LABEL).forEach(l => { EXTRA[l].png = PNG_LABEL[l]; EXTRA[l].pdf = PNG_LABEL[l]; });
Object.keys(LABELS2).forEach(l => Object.assign(EXTRA[l], LABELS2[l]));
const RPT_LABELS = {
  en: { addRow:"+ Add row", rptSub:"Attendance & Shift Report", rptPrepared:"Prepared by", rptVerified:"Verified by" },
  es: { addRow:"+ Añadir fila", rptSub:"Informe de asistencia y turnos", rptPrepared:"Preparado por", rptVerified:"Verificado por" },
  hi: { addRow:"+ पंक्ति जोड़ें", rptSub:"उपस्थिति और शिफ्ट रिपोर्ट", rptPrepared:"तैयार करने वाले", rptVerified:"सत्यापित करने वाले" },
  ur: { addRow:"+ قطار شامل کریں", rptSub:"حاضری اور شفٹ رپورٹ", rptPrepared:"تیار کنندہ", rptVerified:"تصدیق کنندہ" },
  bn: { addRow:"+ সারি যোগ করুন", rptSub:"উপস্থিতি ও শিফট রিপোর্ট", rptPrepared:"প্রস্তুতকারী", rptVerified:"যাচাইকারী" }
};
Object.keys(RPT_LABELS).forEach(l => Object.assign(EXTRA[l], RPT_LABELS[l]));
Object.keys(EXTRA).forEach(l => Object.assign(T[l], EXTRA[l]));

/* ---------- Helpers ---------- */
let NS = "";   // per-account storage prefix, set after login (nothing is read or written before that)
function load(key, fallback) {
  if (!NS) return fallback;
  try { return JSON.parse(localStorage.getItem(NS + key)) ?? fallback; } catch (_) { return fallback; }
}
function save(key, value) {
  if (!NS) return;
  try { localStorage.setItem(NS + key, JSON.stringify(value)); }
  catch (_) { const w = document.getElementById("storageWarn"); if (w) w.hidden = false; }   // storage blocked or full
}
function localDateISO(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ---------- State (filled in by initState() after login) ---------- */
let currentUser = null;
let adminUnlocked = false;
let lang = "en", selName = "", selStore = "", selShift = "day", sheets = {}, labels = {};
function initState() {
  lang = load("lang", "en");
  selName = load("name", STAFF_SORTED[0]);
  selStore = load("store", STORES[0]);
  selShift = load("shift", "day");     // default Shift value for new entries
  sheets = load("sheets", {});         // one paper sheet per date + store + name
  labels = load("labels", {});         // edited labels, per language
}
const attDate = document.getElementById("attDate");
attDate.value = localDateISO();
const t = key => (T[lang] && T[lang][key]) || T.en[key] || key;
const lbl = key => labels[`${lang}:${key}`] ?? t(key);

const ROWS = 5;                         // sheets start with 5 rows; the Add button appends more
const sheetKey = () => `${attDate.value}|${selStore}|${selName}`;   // sheet = date + store + name
const blankSheet = () => ({
  rows: Array.from({ length: ROWS }, (_, i) => ({ serial: String(i + 1), amount: "", day: "", time: "", name: "" })),
  bk: "0", refund: "0", total: "0.00", grand: "0.00", nb: "", att: ""
});
const sheet = () => sheets[sheetKey()] || (sheets[sheetKey()] = blankSheet());

/* ---------- Dropdown menu items (Name, Store, Report) ---------- */
const dropdowns = {
  ddStore:  { label: () => t("store"),  items: () => STORES.map(s => ({ v: s, l: s })),
              get: () => selStore,  set: v => { selStore = v; save("store", v); }, shown: () => selStore },
  ddReport: { label: () => t("shift"), items: () => SHIFTS.map(s => ({ v: s, l: t(s) })),
              get: () => selShift,  set: v => { selShift = v; save("shift", v); }, shown: () => t(selShift) },
  // Present / Late / Absent for the selected Name on the selected Date and Store
  ddPresent: { label: () => t("present"), items: () => [{ v: "", l: "—" }, ...["present", "late", "absent"].map(k => ({ v: k, l: t(k) })), ...(isAdmin() ? [{ v: "__list", l: t("regList"), sep: true }] : [])],
              get: () => sheet().att || "", set: v => { if (v === "__list") { showUsers(); return true; } sheet().att = v; save("sheets", sheets); }, shown: () => (sheet().att ? t(sheet().att) : "") }
};

function renderDropdown(id) {
  const cfg = dropdowns[id], root = document.getElementById(id);
  root.replaceChildren();
  const btn = document.createElement("button");
  btn.className = "tab"; btn.type = "button";
  btn.setAttribute("aria-haspopup", "listbox");
  btn.append(cfg.label() + " ▾");
  if (cfg.shown()) { const b = document.createElement("small"); b.textContent = cfg.shown(); btn.append(b); }
  const list = document.createElement("ul");
  list.className = "dd-list"; list.setAttribute("role", "listbox");
  cfg.items().forEach(item => {
    const li = document.createElement("li");
    if (item.sep) li.className = "sep";
    const o = document.createElement("button");
    o.type = "button"; o.textContent = item.l;
    if (item.v === cfg.get()) o.classList.add("sel");
    o.addEventListener("click", () => { const keepPage = cfg.set(item.v); closeDropdowns(); if (!keepPage) showMain(); renderAll(); });
    li.appendChild(o); list.appendChild(li);
  });
  btn.addEventListener("click", e => {
    e.stopPropagation();
    const wasOpen = root.classList.contains("open");
    closeDropdowns();
    root.classList.toggle("open", !wasOpen);
  });
  root.append(btn, list);
}
function closeDropdowns() { document.querySelectorAll(".dd.open").forEach(d => d.classList.remove("open")); }
document.addEventListener("click", closeDropdowns);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDropdowns(); });

/* ---------- Quick search: find a staff member or store ---------- */
const globalSearch = document.getElementById("globalSearch");
const globalSearchResults = document.getElementById("globalSearchResults");
function renderGlobalSearchResults() {
  const query = (globalSearch.value || "").trim().toLowerCase();
  globalSearchResults.replaceChildren();
  if (!query) { globalSearchResults.hidden = true; return; }
  const matches = STORES.filter(store => store.toLowerCase().includes(query))
    .map(value => ({ value, type: "store", label: value, hint: "Store" })).slice(0, 12);
  if (!matches.length) {
    const empty = document.createElement("div");
    empty.textContent = "No matching store";
    empty.style.padding = "12px 14px";
    globalSearchResults.appendChild(empty);
  } else {
    matches.forEach(match => {
      const button = document.createElement("button");
      button.type = "button";
      const label = document.createElement("span"); label.textContent = match.label;
      const hint = document.createElement("small"); hint.textContent = match.hint;
      button.append(label, hint);
      button.addEventListener("click", () => {
        selStore = match.value; save("store", selStore);
        globalSearch.value = ""; globalSearchResults.hidden = true; showMain(); renderAll();
      });
      globalSearchResults.appendChild(button);
    });
  }
  globalSearchResults.hidden = false;
}
if (globalSearch) {
  globalSearch.addEventListener("input", renderGlobalSearchResults);
  globalSearch.addEventListener("keydown", e => {
    if (e.key === "Escape") globalSearchResults.hidden = true;
    if (e.key === "Enter") { const first = globalSearchResults.querySelector("button"); if (first) { e.preventDefault(); first.click(); } }
  });
  document.addEventListener("click", e => { if (!e.target.closest(".global-search")) globalSearchResults.hidden = true; });
}

/* ---------- Panels ---------- */
// Single page now (Upload removed); kept so the menu and search handlers can still call it.
function syncAdminMenu() {
  const adminPage = $("tab-admin").classList.contains("active");
  ["ddStore", "ddReport", "ddPresent"].forEach(id => { $(id).hidden = adminPage; });
  $("registeredListTab").hidden = !adminPage || !isAdmin();
  document.body.classList.toggle("admin-view", adminPage);
}
function showMain() { $("tab-main").classList.add("active"); $("tab-users").classList.remove("active"); $("tab-admin").classList.remove("active"); syncAdminMenu(); window.scrollTo(0, 0); }
function requireAdminPassword() {
  // Admin accounts are already verified at login. Team members must enter the shared Admin Panel password once.
  if (isAdmin()) return true;
  const entered = prompt("Enter Admin Control Panel password:");
  if (entered !== "bolla321") {
    if (entered !== null) alert("Incorrect Admin password.");
    return false;
  }
  adminUnlocked = true;
  syncAdminMenu();
  return true;
}
function showUsers() { if (!requireAdminPassword()) return; $("tab-main").classList.remove("active"); $("tab-admin").classList.remove("active"); $("tab-users").classList.add("active"); syncAdminMenu(); renderUsers(); window.scrollTo(0, 0); }
function isAdmin() { return !!currentUser && (currentUser.role === "admin" || adminUnlocked); }
function employeeProfileMatches(name) {
  const normalize = value => String(value || "").trim().replace(/\s+/g, " ").toLocaleLowerCase();
  const loggedInName = normalize(currentUser?.name);
  return !!loggedInName && normalize(name) === loggedInName;
}
function makeEmployeeNameLink(name, className = "employee-profile-link") {
  const label = String(name || "");
  if (!employeeProfileMatches(label)) return document.createTextNode(label);
  const a = document.createElement("a");
  a.href = EMPLOYEE_PROFILE_URL;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.className = className;
  a.textContent = label;
  a.title = "Open matching employee profile";
  return a;
}
function showAdmin() { if (!requireAdminPassword()) return; persist(sheet()); $("tab-main").classList.remove("active"); $("tab-users").classList.remove("active"); $("tab-admin").classList.add("active"); syncAdminMenu(); renderAdmin(); window.scrollTo(0, 0); }

/* ---------- Language + RTL ---------- */
function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = "ltr";   // Urdu changes the words only, not the layout
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = lbl(el.dataset.i18n));
  document.getElementById("lang").value = lang;
  renderAll();
}
document.getElementById("lang").addEventListener("change", e => { lang = e.target.value; save("lang", lang); applyLang(); });

/* ---------- Paper form ---------- */
const $ = id => document.getElementById(id);
const nowHHMM = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; };
const toMoney = n => (Number.isFinite(n) ? n : 0).toFixed(2);

function persist(s) {
  if (!currentUser) return;
  s.nb = $("nbText").value;
  s.bk = $("bkDiff").value; s.refund = $("refund").value;
  s.total = $("total").value; s.grand = $("grandTotal").value;
  save("sheets", sheets);
}
function autosize(el) { el.style.height = "auto"; el.style.height = Math.max(84, el.scrollHeight + 2) + "px"; }
$("nbText").addEventListener("input", e => { autosize(e.target); sheet().nb = e.target.value; save("sheets", sheets); });
function recalc(s) {
  const total = [...document.querySelectorAll(".amount")].reduce((sum, el) => sum + (parseFloat(el.value) || 0), 0);
  $("total").value = toMoney(total);
  $("grandTotal").value = toMoney(total + (parseFloat($("bkDiff").value) || 0) - (parseFloat($("refund").value) || 0));
  persist(s);
}

function renderAll() {
  Object.keys(dropdowns).forEach(renderDropdown);
  $("sheetStore").textContent = selStore;
  $("sheetName").textContent = currentUser ? (currentUser.name || currentUser.username) : selName;
  $("sheetAtt").textContent = sheet().att ? t(sheet().att) : "—";
  $("shiftList").replaceChildren(...SHIFTS.map(k => Object.assign(document.createElement("option"), { value: t(k) })));
  const s = sheet();
  const body = $("entryRows");
  body.replaceChildren();
  s.rows.forEach((r, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><input class="c serial" type="text" aria-label="S.No ${i + 1}"></td>
      <td><div class="amount-wrap"><span class="currency">$</span><input class="c amount" type="number" min="0" step="0.01" inputmode="decimal" aria-label="Amount ${i + 1}"></div></td>
      <td><input class="c day" list="shiftList" aria-label="Shift ${i + 1}"></td>
      <td><input class="c time" type="time" step="60" aria-label="Time ${i + 1}"></td>`;
    const q = c => tr.querySelector(c);
    q(".serial").value = r.serial; q(".amount").value = r.amount; q(".day").value = r.day;
    q(".time").value = r.time;
    const fitAmount = () => {
      const amountInput = q(".amount");
      // Keep the dollar sign and amount as one centered group, sized to the entered value.
      amountInput.style.width = `${Math.max(4, (amountInput.value || "").length + 2)}ch`;
    };
    fitAmount();
    tr.addEventListener("input", e => {
      // First amount typed in a row fills Day Report, Time and Name from the menu choices.
      if (e.target === q(".amount")) fitAmount();
      if (e.target === q(".amount") && e.target.value !== "") {
        if (!q(".day").value) q(".day").value = t(selShift);
        if (!q(".time").value) q(".time").value = nowHHMM();
      }
      r.serial = q(".serial").value; r.amount = q(".amount").value; r.day = q(".day").value;
      r.time = q(".time").value;
      recalc(s);
    });
    tr.dataset.print = "yes";
    body.appendChild(tr);
  });
  $("bkDiff").value = s.bk; $("refund").value = s.refund;
  $("total").value = s.total; $("grandTotal").value = s.grand;
  $("nbText").value = s.nb || "";
  autosize($("nbText"));
}
attDate.addEventListener("change", () => { if (!attDate.value) attDate.value = localDateISO(); renderAll(); });
["bkDiff", "refund"].forEach(id => $(id).addEventListener("input", () => recalc(sheet())));
["total", "grandTotal"].forEach(id => $(id).addEventListener("input", () => persist(sheet())));

/* Everything with contenteditable (title + labels) saves what you type. */
document.addEventListener("input", e => {
  if (e.target.matches("[data-i18n][contenteditable]")) {
    labels[`${lang}:${e.target.dataset.i18n}`] = e.target.textContent; save("labels", labels);
  }
});
document.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.matches("[contenteditable]")) { e.preventDefault(); e.target.blur(); } });

/* Add button: appends the next numbered row to this sheet */
$("addRowBtn").addEventListener("click", () => {
  const s = sheet();
  s.rows.push({ serial: String(s.rows.length + 1), amount: "", day: "", time: "", name: "" });
  save("sheets", sheets);
  renderAll();
  const inputs = document.querySelectorAll("#entryRows .amount");
  const last = inputs[inputs.length - 1];
  if (last) { last.scrollIntoView({ block: "center", behavior: "smooth" }); last.focus({ preventScroll: true }); }
});

$("clearBtn").addEventListener("click", () => {
  if (!confirm(t("confirmClear"))) return;
  const keepNote = sheet().nb, keepAtt = sheet().att;   // Clear Entries keeps your N.B notes and attendance mark
  sheets[sheetKey()] = blankSheet();
  sheets[sheetKey()].nb = keepNote || "";
  sheets[sheetKey()].att = keepAtt || "";
  save("sheets", sheets);
  renderAll();
});

/* ---------- Professional report mode (used by Print and Download PDF) ---------- */
const niceDate = iso => {
  const [y, m, d] = (iso || "").split("-").map(Number);
  if (!y) return iso || "";
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
function enterReportMode() {
  const tab = $("tab-main");
  tab.classList.add("rpt-mode");
  document.documentElement.classList.add("rpt-print");
  $("rptTitle").textContent = ($("marqueeText").textContent || "Bolla Market").trim();
  // Readable date ("Oct 25, 2026") instead of the browser's date input
  const pd = tab.querySelector(".paper-date");
  pd.querySelector(".rpt-date-text")?.remove();
  const dt = document.createElement("span");
  dt.className = "rpt-date-text"; dt.textContent = niceDate($("attDate").value);
  pd.appendChild(dt);
  // Plain-text cells (S.No, Shift, Time as "2:48 AM") so print and PDF render identically
  tab.querySelectorAll("#entryRows tr").forEach(tr => {
    tr.querySelectorAll(".rpt-cell-text").forEach(n => n.remove());
    [".serial", ".day", ".time"].forEach(sel => {
      const input = tr.querySelector(sel); if (!input) return;
      let v = input.value || "";
      if (sel === ".time" && /^\d{1,2}:\d{2}/.test(v)) {
        const [hh, mm] = v.split(":").map(Number);
        v = `${hh % 12 || 12}:${String(mm).padStart(2, "0")} ${hh < 12 ? "AM" : "PM"}`;
      }
      const span = document.createElement("span");
      span.className = "rpt-cell-text"; span.textContent = v;
      input.after(span);
    });
  });
  document.activeElement?.blur?.();
  // Hide the Attendance item when no status is chosen
  const attBox = $("sheetAtt").parentElement;
  if (attBox) attBox.dataset.empty = sheet().att ? "no" : "yes";
  const now = new Date();
  $("rptStamp").textContent = "Printed " + now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    ", " + now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}
function leaveReportMode() {
  const tab = $("tab-main");
  tab.classList.remove("rpt-mode");
  document.documentElement.classList.remove("rpt-print");
  tab.querySelector(".rpt-date-text")?.remove();
  tab.querySelectorAll(".rpt-cell-text").forEach(n => n.remove());
  const attBox = $("sheetAtt").parentElement;
  if (attBox) delete attBox.dataset.empty;
}

/* Print-safe text values: some browsers clip number inputs in print preview. */
window.addEventListener("beforeprint", () => {
  enterReportMode();
  $("nbBox").dataset.empty = $("nbText").value.trim() ? "no" : "yes";
  document.querySelectorAll("#entryRows tr").forEach(tr => {
    const amount = tr.querySelector(".amount");
    tr.dataset.print = amount.value.trim() ? "yes" : "no";
    tr.querySelector(".print-amount-text")?.remove();
    const text = document.createElement("span");
    text.className = "print-amount-text";
    text.textContent = amount.value.trim();
    tr.querySelector(".amount-wrap").appendChild(text);
  });
  ["total", "bkDiff", "refund", "grandTotal"].forEach(id => {
    const input = $(id), money = input.closest(".money");
    money.querySelector(".print-money-text")?.remove();
    const text = document.createElement("span");
    text.className = "print-money-text";
    text.textContent = input.value;
    money.appendChild(text);
  });
});
window.addEventListener("afterprint", () => {
  leaveReportMode();
  delete $("nbBox").dataset.empty;
  document.querySelectorAll("#entryRows tr").forEach(tr => {
    tr.dataset.print = "yes";
    tr.querySelector(".print-amount-text")?.remove();
  });
  document.querySelectorAll(".print-money-text").forEach(el => el.remove());
});
$("printBtn").addEventListener("click", () => window.print());

/* ---------- Download PDF (one page, automatically downloaded) ---------- */
function buildSinglePagePdfFromCanvas(canvas, linkRect = null, sourceCssWidth = null) {
  const jpegData = canvas.toDataURL("image/jpeg", 0.96).split(",")[1];
  const binary = atob(jpegData);
  const jpeg = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) jpeg[i] = binary.charCodeAt(i);

  // US Letter page in points. Fit the complete report inside one page without cropping.
  const pageW = 612, pageH = 792, margin = 18;
  const scale = Math.min((pageW - margin * 2) / canvas.width, (pageH - margin * 2) / canvas.height);
  const drawW = canvas.width * scale, drawH = canvas.height * scale;
  const x = (pageW - drawW) / 2, y = (pageH - drawH) / 2;
  const content = `q\n${drawW.toFixed(3)} 0 0 ${drawH.toFixed(3)} ${x.toFixed(3)} ${y.toFixed(3)} cm\n/Im0 Do\nQ\n`;
  // Add a real PDF link annotation over the QR image + caption. The QR pixels
  // remain unchanged, so camera scanning still works in the downloaded PDF.
  let linkAnnotation = null;
  if (linkRect && sourceCssWidth && sourceCssWidth > 0) {
    const cssToPdf = (canvas.width / sourceCssWidth) * scale;
    const left = x + linkRect.x * cssToPdf;
    const right = x + (linkRect.x + linkRect.width) * cssToPdf;
    const top = y + drawH - linkRect.y * cssToPdf;
    const bottom = y + drawH - (linkRect.y + linkRect.height) * cssToPdf;
    if (right > left && top > bottom) {
      linkAnnotation = `6 0 obj\n<< /Type /Annot /Subtype /Link /Rect [${left.toFixed(3)} ${bottom.toFixed(3)} ${right.toFixed(3)} ${top.toFixed(3)}] /Border [0 0 0] /A << /S /URI /URI () >> >>\nendobj\n`;
    }
  }
  const enc = new TextEncoder();
  const ascii = v => enc.encode(v);
  const chunks = [];
  const offsets = [0];
  let length = 0;
  const push = bytes => { chunks.push(bytes); length += bytes.length; };
  push(ascii("%PDF-1.4\n"));
  const objects = [
    ascii("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"),
    ascii("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"),
    ascii(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R${linkAnnotation ? " /Annots [6 0 R]" : ""} >>\nendobj\n`),
    ascii(`4 0 obj\n<< /Length ${ascii(content).length} >>\nstream\n${content}endstream\nendobj\n`)
  ];
  objects.forEach((obj, i) => { offsets[i + 1] = length; push(obj); });
  offsets[5] = length;
  push(ascii(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`));
  push(jpeg);
  push(ascii("\nendstream\nendobj\n"));
  if (linkAnnotation) {
    offsets[6] = length;
    push(ascii(linkAnnotation));
  }
  const xrefOffset = length;
  const size = linkAnnotation ? 7 : 6;
  let xref = `xref\n0 ${size}\n0000000000 65535 f \n`;
  for (let i = 1; i < size; i++) xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  xref += `trailer\n<< /Size ${size} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  push(ascii(xref));
  return new Blob(chunks, { type: "application/pdf" });
}

$("pngBtn").addEventListener("click", async () => {
  const btn = $("pngBtn");
  if (typeof html2canvas !== "function") { alert("html2canvas.min.js must be in the same folder as index.html."); return; }
  btn.disabled = true;
  // Cover the page while the report layout is applied, so nothing visibly jumps.
  const cover = document.createElement("div");
  cover.className = "no-print";
  cover.style.cssText = "position:fixed;inset:0;z-index:99999;background:#fff;display:grid;place-items:center;font:700 16px Arial,sans-serif;color:#174b30";
  cover.textContent = "Creating PDF…";
  document.body.appendChild(cover);
  const tabEl = $("tab-main");
  enterReportMode();
  tabEl.style.cssText += ";width:760px;max-width:none;flex:none;min-height:980px";
  try {
    await new Promise(r => setTimeout(r, 60));   // let the browser lay out the report view
    const tabBounds = tabEl.getBoundingClientRect();
    const qrLinkEl = tabEl.querySelector(".rpt-qr-link");
    const qrBounds = qrLinkEl ? qrLinkEl.getBoundingClientRect() : null;
    const qrLinkRect = qrBounds ? {
      x: qrBounds.left - tabBounds.left,
      y: qrBounds.top - tabBounds.top,
      width: qrBounds.width,
      height: qrBounds.height
    } : null;
    const sourceCssWidth = tabEl.clientWidth;
    const canvas = await html2canvas(tabEl, {
      scale: 2, backgroundColor: "#ffffff", useCORS: true, windowWidth: 1200,
      onclone: doc => {
        // Force the text watermark into the cloned export DOM so it appears in PDF too.
        const watermark = doc.querySelector("#tab-main > .report-watermark");
        if (watermark) {
          watermark.textContent = "Bolla Market";
          Object.assign(watermark.style, {
            display: "block", position: "absolute", top: "43%", left: "0", width: "100%",
            textAlign: "center", whiteSpace: "nowrap", overflow: "visible",
            color: "#d94a55", opacity: "0.075", fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: "800", lineHeight: "1", letterSpacing: "-0.04em",
            transform: "rotate(-16deg)", transformOrigin: "center", zIndex: "0", pointerEvents: "none"
          });
        }
        // Opaque white table cells would cover the watermark in html2canvas.
        doc.querySelectorAll("#tab-main .form-table, #tab-main .form-table tbody, #tab-main .form-table tr, #tab-main .form-table td, #tab-main .form-table tbody tr:nth-child(even) td").forEach(el => {
          if (el.matches("tbody tr:nth-child(even) td")) return;   // keep the light zebra tint
          el.style.setProperty("background", "transparent", "important");
          el.style.setProperty("background-color", "transparent", "important");
        });
        const nbText = doc.getElementById("nbText");
        if (nbText) {
          if (!nbText.value.trim()) doc.getElementById("nbBox").remove();
          else { const note = doc.createElement("div"); note.className = "nb-export"; note.textContent = nbText.value; nbText.replaceWith(note); }
        }
        const m = doc.getElementById("marqueeText");
        if (m) m.classList.add("still");

        // Replace native inputs with text spans so exported currency values never clip.
        doc.querySelectorAll("#entryRows tr").forEach(tr => {
          const amount = tr.querySelector(".amount");
          if (amount && !amount.value.trim()) {
            tr.style.display = "none";
            return;
          }
          if (amount) {
            const value = doc.createElement("span");
            value.className = "c amount-export";
            value.textContent = amount.value;
            value.style.width = `${Math.max(5, (amount.value || "").length + 1.5)}ch`;
            value.style.minWidth = value.style.width;
            value.style.maxWidth = "none";
            value.style.textAlign = "center";
            amount.replaceWith(value);
          }
        });
        doc.querySelectorAll(".money input").forEach(input => {
          const value = doc.createElement("span");
          value.className = "money-export";
          value.textContent = input.value;
          input.replaceWith(value);
        });
      },
      ignoreElements: el => el.classList && el.classList.contains("no-print")
    });
    const blob = buildSinglePagePdfFromCanvas(canvas, qrLinkRect, sourceCssWidth);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `Bolla_${selStore}_${selName}_${attDate.value}.pdf`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  } catch (err) {
    alert("PDF could not be created: " + err.message);
  } finally {
    tabEl.style.width = tabEl.style.maxWidth = tabEl.style.flex = tabEl.style.minHeight = "";
    leaveReportMode();
    cover.remove();
    btn.disabled = false;
  }
});

/* ---------- Excel ---------- */
$("excelBtn").addEventListener("click", () => {
  const s = sheet();
  const th = [...document.querySelectorAll(".form-table th")].map(x => x.textContent);
  const rows = [[document.querySelector(".paper-date span").textContent, attDate.value],
    [document.querySelector(".sheet-info [data-i18n=storeLabel]").textContent, selStore, document.querySelector(".sheet-info [data-i18n=nameLabel]").textContent, selName,
      document.querySelector(".sheet-info [data-i18n=attLabel]").textContent, s.att ? t(s.att) : ""], th];
  s.rows.forEach(r => rows.push([r.serial, r.amount === "" ? "" : Number(r.amount), r.day, r.time]));
  rows.push([]);
  document.querySelectorAll(".totals .total-line").forEach(line => rows.push([line.firstElementChild.textContent, Number(line.querySelector("input").value) || 0]));
  if ((s.nb || "").trim()) rows.push([], [document.querySelector("#nbBox [data-i18n=nb]").textContent, s.nb]);
  const esc = v => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cell = v => `<Cell><Data ss:Type="${typeof v === "number" ? "Number" : "String"}">${esc(v)}</Data></Cell>`;
  const xml = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="${esc(selStore)} Daily Report"><Table>${rows.map(r => "<Row>" + r.map(cell).join("") + "</Row>").join("")}</Table></Worksheet></Workbook>`;
  const url = URL.createObjectURL(new Blob([xml], { type: "application/vnd.ms-excel;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url; a.download = `Bolla_${selStore}_${selName}_Daily_Report_${attDate.value}.xls`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
});

/* ---------- Registered users list: Active (signed in) first, then Inactive ---------- */
function renderUsers() {
  const presence = rawGet(localStorage, PRESENCE_KEY, {});
  const rows = getUsers().map(u => ({ ...u, active: Date.now() - (presence[u.id] || 0) < PRESENCE_TTL }));
  rows.sort((a, b) => (b.active - a.active) || String(a.name).localeCompare(String(b.name), undefined, { sensitivity: "base" }));
  const body = $("usersRows");
  body.replaceChildren();
  rows.forEach((u, i) => {
    const tr = document.createElement("tr");
    const cells = [String(i + 1), u.name || "—", u.mobile || "—", u.store || "—", u.username || "—", u.role === "admin" ? "Admin" : "Team member"];
    const mobileLabels = ["S.No", "Name", "Mobile number", "Store", "Email", "Role"];
    cells.forEach((text, c) => { const td = document.createElement("td"); td.dataset.label = mobileLabels[c]; if (c === 1) td.appendChild(makeEmployeeNameLink(u.name || "—", "employee-profile-link registered-employee-link")); else td.textContent = text; if (c) td.className = "left"; tr.appendChild(td); });
    const st = document.createElement("td");
    st.dataset.label = "Status";
    st.textContent = t(u.active ? "active" : "inactive");
    st.className = u.active ? "st-active" : "st-inactive";
    tr.appendChild(st);
    const actions = document.createElement("td");
    actions.dataset.label = "Admin actions";
    if (isAdmin()) {
      let roleBtn = null;
      // The Make Team action is intentionally removed. Team accounts can still be promoted to Admin.
      if (u.role !== "admin") {
        roleBtn = document.createElement("button"); roleBtn.type = "button"; roleBtn.className = "secondary admin-small"; roleBtn.textContent = "Make Admin";
        roleBtn.addEventListener("click", () => { const all = getUsers(); const target = all.find(x => x.id === u.id); if (!target) return; target.role = "admin"; rawSet(localStorage, USERS_KEY, all); renderUsers(); renderAdmin(); });
      }
      const editBtn = document.createElement("button"); editBtn.type = "button"; editBtn.className = "secondary admin-small"; editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => openEditUser(u));
      const delBtn = document.createElement("button"); delBtn.type = "button"; delBtn.className = "remove admin-small"; delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => { if (u.id === currentUser.id) return alert("You cannot delete the account you are currently using."); const all = getUsers(); if (u.role === "admin" && all.filter(x => x.role === "admin").length <= 1) return alert("Keep at least one Admin account."); if (!confirm(`Delete account for ${u.name || u.username}?`)) return; rawSet(localStorage, USERS_KEY, all.filter(x => x.id !== u.id)); renderUsers(); renderAdmin(); });
      actions.append(editBtn); if (roleBtn) actions.append(roleBtn); actions.append(delBtn);
    }
    tr.appendChild(actions);
    body.appendChild(tr);
  });
  const active = rows.filter(r => r.active).length;
  $("usersDate").textContent = `${localDateISO()} ${nowHHMM()}`;
  $("usersCounts").textContent = `${t("active")}: ${active} · ${t("inactive")}: ${rows.length - active} · ${rows.length}`;
}
let editingUserId = null;
function openEditUser(user) {
  editingUserId = user.id;
  $("editUserName").value = user.name || "";
  $("editUserMobile").value = user.mobile || "";
  $("editUserStore").value = user.store || "";
  $("editUserEmail").value = user.username || "";
  $("editUserRole").value = user.role === "admin" ? "admin" : "team";
  $("editUserError").hidden = true; $("editUserError").textContent = "";
  $("editUserModal").hidden = false; $("editUserName").focus();
}
function closeEditUser() { $("editUserModal").hidden = true; editingUserId = null; }
$("editUserCancel").addEventListener("click", closeEditUser);
$("editUserModal").addEventListener("click", e => { if (e.target === $("editUserModal")) closeEditUser(); });
$("editUserForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!isAdmin() || !editingUserId) return;
  const name = $("editUserName").value.trim().replace(/\s+/g, " ");
  const mobile = $("editUserMobile").value.trim().replace(/\s+/g, " ");
  const digits = mobile.replace(/\D/g, "");
  const store = $("editUserStore").value.trim();
  const email = $("editUserEmail").value.trim().toLowerCase();
  const role = $("editUserRole").value;
  const error = $("editUserError");
  const fail = msg => { error.textContent = msg; error.hidden = false; };
  error.hidden = true;
  if (name.length < 2 || name.length > 50) return fail("Enter a valid full name (2–50 characters).");
  if (!/^\+?[0-9 ()-]{7,20}$/.test(mobile) || digits.length < 7 || digits.length > 15) return fail("Enter a valid mobile number.");
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail("Enter a valid email address.");
  const all = getUsers();
  if (all.some(x => x.id !== editingUserId && x.username.toLowerCase() === email)) return fail("That email is already in use.");
  const target = all.find(x => x.id === editingUserId); if (!target) return closeEditUser();
  if (target.role === "admin" && role !== "admin" && all.filter(x => x.role === "admin").length <= 1) return fail("Keep at least one Admin account.");
  target.name = name; target.mobile = mobile; target.store = store; target.username = email; target.role = role;
  if (!rawSet(localStorage, USERS_KEY, all)) return fail("Could not save changes in this browser.");
  if (currentUser && currentUser.id === target.id) { currentUser = target; }
  closeEditUser(); renderUsers(); renderAdmin(); renderAll();
});

$("usersBack").addEventListener("click", () => { showMain(); renderAll(); });
$("usersPrint").addEventListener("click", () => { renderUsers(); document.body.classList.add("print-users-only"); window.print(); });
window.addEventListener("afterprint", () => document.body.classList.remove("print-users-only"));

// Multi-page PDF from page images (pages: [{ jpeg: Uint8Array, pxW, pxH, ptW, ptH }]).
function assemblePdf(pages) {
  const pageW = 612, pageH = 792, margin = 28, enc = new TextEncoder();
  const chunks = [], offsets = {};
  let length = 0;
  const push = b => { chunks.push(b); length += b.length; };
  const str = v => enc.encode(v);
  const obj = (n, body) => { offsets[n] = length; push(str(`${n} 0 obj\n${body}\nendobj\n`)); };
  push(str("%PDF-1.4\n"));
  obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
  obj(2, `<< /Type /Pages /Kids [${pages.map((_, i) => `${3 + 3 * i} 0 R`).join(" ")}] /Count ${pages.length} >>`);
  pages.forEach((p, i) => {
    const content = `q\n${p.ptW.toFixed(2)} 0 0 ${p.ptH.toFixed(2)} ${((pageW - p.ptW) / 2).toFixed(2)} ${(pageH - margin - p.ptH).toFixed(2)} cm\n/Im0 Do\nQ\n`;
    obj(3 + 3 * i, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /XObject << /Im0 ${5 + 3 * i} 0 R >> >> /Contents ${4 + 3 * i} 0 R >>`);
    obj(4 + 3 * i, `<< /Length ${str(content).length} >>\nstream\n${content}endstream`);
    offsets[5 + 3 * i] = length;
    push(str(`${5 + 3 * i} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${p.pxW} /Height ${p.pxH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.jpeg.length} >>\nstream\n`));
    push(p.jpeg);
    push(str("\nendstream\nendobj\n"));
  });
  const last = 2 + 3 * pages.length, xrefAt = length;
  let xref = `xref\n0 ${last + 1}\n0000000000 65535 f \n`;
  for (let n = 1; n <= last; n++) xref += `${String(offsets[n]).padStart(10, "0")} 00000 n \n`;
  push(str(`${xref}trailer\n<< /Size ${last + 1} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF`));
  return new Blob(chunks, { type: "application/pdf" });
}
$("usersPdf").addEventListener("click", async () => {
  if (typeof html2canvas !== "function") { alert("html2canvas.min.js must be in the same folder as index.html."); return; }
  const btn = $("usersPdf"), panel = $("tab-users");
  btn.disabled = true;
  try {
    renderUsers();
    const scale = 2, top = panel.getBoundingClientRect().top;
    const rowEnds = [...panel.querySelectorAll("#usersRows tr")].map(tr => (tr.getBoundingClientRect().bottom - top) * scale);
    const canvas = await html2canvas(panel, { scale, backgroundColor: "#ffffff", ignoreElements: el => el.classList && el.classList.contains("no-print") });
    const contentH = Math.min(canvas.height, Math.ceil((rowEnds.length ? rowEnds[rowEnds.length - 1] : canvas.height) + 24 * scale));
    const pageW = 612, pageH = 792, margin = 28, k = (pageW - margin * 2) / canvas.width, maxSlice = Math.floor((pageH - margin * 2) / k);
    const pages = [];
    for (let start = 0; start < contentH;) {
      let end = Math.min(start + maxSlice, contentH);
      if (end < contentH) {   // end each page on a whole row, never through the middle of one
        const fit = rowEnds.filter(b => b > start + 40 && b <= end);
        if (fit.length) end = Math.floor(fit[fit.length - 1]);
      }
      const slice = document.createElement("canvas");
      slice.width = canvas.width; slice.height = end - start;
      const ctx = slice.getContext("2d");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, slice.width, slice.height);
      ctx.drawImage(canvas, 0, start, canvas.width, end - start, 0, 0, canvas.width, end - start);
      const bin = atob(slice.toDataURL("image/jpeg", 0.95).split(",")[1]);
      const jpeg = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) jpeg[i] = bin.charCodeAt(i);
      pages.push({ jpeg, pxW: slice.width, pxH: slice.height, ptW: slice.width * k, ptH: slice.height * k });
      start = end;
    }
    const url = URL.createObjectURL(assemblePdf(pages));
    const a = document.createElement("a");
    a.href = url; a.download = `Bolla_Registered_Users_${localDateISO()}.pdf`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  } catch (err) {
    alert("PDF could not be created: " + err.message);
  } finally {
    btn.disabled = false;
  }
});

/* ---------- Keep data safe ---------- */
// Save the open sheet whenever the page is hidden, closed or refreshed.
window.addEventListener("pagehide", () => persist(sheet()));
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") persist(sheet()); });
// Ask the browser not to clear this site's data when the device runs low on space.
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

const BACKUP_KEYS = ["lang", "name", "store", "shift", "sheets", "labels"];
/* ---------- Admin controls: staff list and registered accounts ---------- */
function renderAdmin() {
  if (!isAdmin()) return;
  const list = $("adminStaffList"); list.replaceChildren();
  const searchValue = ($("adminStaffSearch")?.value || "").trim().toLocaleLowerCase();
  const filteredStaff = STAFF_SORTED.filter(name => name.toLocaleLowerCase().includes(searchValue));
  filteredStaff.forEach((name, idx) => {
    const row = document.createElement("div"); row.className = "admin-staff-row";
    const input = document.createElement("input"); input.type = "text"; input.maxLength = 60; input.value = name; input.setAttribute("aria-label", `Staff name ${idx + 1}`);
    const saveBtn = document.createElement("button"); saveBtn.type = "button"; saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", () => { const value = input.value.trim().replace(/\s+/g, " "); if (value.length < 2) return alert("Enter a valid staff name."); if (STAFF_SORTED.some(n => n.toLowerCase() === value.toLowerCase() && n !== name)) return alert("That name already exists."); STAFF = STAFF.map(n => n === name ? value : n); STAFF_SORTED = [...new Set(STAFF)].sort((a,b)=>a.localeCompare(b, undefined, {sensitivity:"base"})); rawSet(localStorage, STAFF_KEY, STAFF); renderAdmin(); renderAll(); });
    const delBtn = document.createElement("button"); delBtn.type = "button"; delBtn.className = "remove"; delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => { if (!confirm(`Delete staff name ${name}?`)) return; STAFF = STAFF.filter(n => n !== name); STAFF_SORTED = [...new Set(STAFF)].sort((a,b)=>a.localeCompare(b, undefined, {sensitivity:"base"})); rawSet(localStorage, STAFF_KEY, STAFF); if (selName === name) { selName = STAFF_SORTED[0] || currentUser.name; save("name", selName); } renderAdmin(); renderAll(); });
    if (employeeProfileMatches(name)) {
      // Show the matching name only once. Edit switches the link to the editable input.
      const profileLink = makeEmployeeNameLink(name, "employee-profile-link admin-profile-link");
      profileLink.title = "Open matching employee profile";
      const editBtn = document.createElement("button"); editBtn.type = "button"; editBtn.className = "secondary"; editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => { row.replaceChildren(input, saveBtn, delBtn); input.focus(); });
      row.append(profileLink, editBtn, delBtn);
    } else {
      row.append(input, saveBtn, delBtn);
    }
    list.appendChild(row);
  });
  if (!filteredStaff.length) { const empty = document.createElement("p"); empty.className = "hint"; empty.textContent = searchValue ? "No matching names found." : "No names added yet."; list.appendChild(empty); }
  $("adminUserCount").textContent = `${getUsers().length} registered account(s)`;
}
$("adminStaffSearch").addEventListener("input", renderAdmin);
$("adminAddStaff").addEventListener("click", () => { if (!isAdmin()) return; const input = $("adminNewStaff"); const name = input.value.trim().replace(/\s+/g, " "); if (name.length < 2) return alert("Enter a staff name."); if (STAFF_SORTED.some(n => n.toLowerCase() === name.toLowerCase())) return alert("That name already exists."); STAFF.push(name); STAFF_SORTED = [...new Set(STAFF)].sort((a,b)=>a.localeCompare(b, undefined, {sensitivity:"base"})); rawSet(localStorage, STAFF_KEY, STAFF); input.value = ""; renderAdmin(); renderAll(); });
$("adminUsers").addEventListener("click", showUsers);
$("adminBack").addEventListener("click", () => { showMain(); renderAll(); });
$("adminTab").addEventListener("click", showAdmin);
$("registeredListTab").addEventListener("click", showUsers);

/* ---------- Accounts: register, login, logout ---------- */
// Note: this site has no server, so accounts live in this browser only. Passwords are never stored
// as text (salted PBKDF2 hashes), and each account keeps its own separate data.
const USERS_KEY = "bolla_users", SESSION_KEY = "bolla_session", LOCK_KEY = "bolla_lock", STAFF_KEY = "bolla_staff_list";
const SESSION_DAYS = 30, MAX_TRIES = 5;
const textEnc = new TextEncoder();
const toHex = bytes => [...bytes].map(b => b.toString(16).padStart(2, "0")).join("");
const fromHex = hex => new Uint8Array((hex.match(/../g) || []).map(h => parseInt(h, 16)));
const concat = (a, b) => { const o = new Uint8Array(a.length + b.length); o.set(a); o.set(b, a.length); return o; };
const sameHash = (a, b) => { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0; };
const hasSubtle = () => !!(window.crypto && window.crypto.subtle);
const randomHex = n => toHex(crypto.getRandomValues(new Uint8Array(n)));

function rawGet(store, key, fallback) { try { return JSON.parse(store.getItem(key)) ?? fallback; } catch (_) { return fallback; } }
function rawSet(store, key, value) { try { store.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; } }
const getUsers = () => { const u = rawGet(localStorage, USERS_KEY, []); return Array.isArray(u) ? u : []; };
function normalizeRoles() {
  const users = getUsers();
  if (users.length && !users.some(u => u.role === "admin")) users[0].role = "admin"; // migrate older local demo accounts
  users.forEach(u => { if (!u.role) u.role = "team"; });
  rawSet(localStorage, USERS_KEY, users);
  const savedStaff = rawGet(localStorage, STAFF_KEY, null);
  if (Array.isArray(savedStaff)) STAFF = savedStaff;
  STAFF_SORTED = [...new Set(STAFF)].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

// Plain-JS SHA-256, used only when the page is opened over plain http (no WebCrypto).
const SHA = (() => {
  const K = [], H0 = [];
  for (let c = 2, n = 0; n < 64; c++) {
    let prime = true;
    for (let d = 2; d * d <= c; d++) if (c % d === 0) { prime = false; break; }
    if (!prime) continue;
    if (n < 8) H0[n] = Math.floor((Math.pow(c, 1 / 2) % 1) * 4294967296) | 0;
    K[n++] = Math.floor((Math.pow(c, 1 / 3) % 1) * 4294967296) | 0;
  }
  return { K, H0 };
})();
function sha256(bytes) {
  const rotr = (x, n) => (x >>> n) | (x << (32 - n));
  const { K } = SHA, H = SHA.H0.slice();
  const len = bytes.length, total = ((len + 9 + 63) >> 6) << 6;
  const buf = new Uint8Array(total);
  buf.set(bytes); buf[len] = 0x80;
  const dv = new DataView(buf.buffer);
  dv.setUint32(total - 8, Math.floor(len / 536870912));
  dv.setUint32(total - 4, (len * 8) >>> 0);
  const w = new Int32Array(64);
  for (let off = 0; off < total; off += 64) {
    for (let i = 0; i < 16; i++) w[i] = dv.getInt32(off + i * 4);
    for (let i = 16; i < 64; i++) {
      const x = w[i - 15], y = w[i - 2];
      w[i] = (w[i - 16] + (rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3)) + w[i - 7] + (rotr(y, 17) ^ rotr(y, 19) ^ (y >>> 10))) | 0;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let i = 0; i < 64; i++) {
      const t1 = (h + (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) | 0;
      const t2 = ((rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    [a, b, c, d, e, f, g, h].forEach((v, i) => { H[i] = (H[i] + v) | 0; });
  }
  const out = new Uint8Array(32), o = new DataView(out.buffer);
  H.forEach((v, i) => o.setInt32(i * 4, v));
  return out;
}
async function hashPassword(password, saltHex, alg) {
  if (alg === "pbkdf2") {
    const key = await crypto.subtle.importKey("raw", textEnc.encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: fromHex(saltHex), iterations: 150000 }, key, 256);
    return toHex(new Uint8Array(bits));
  }
  const salt = fromHex(saltHex);
  let h = sha256(concat(salt, textEnc.encode(password)));
  for (let i = 0; i < 20000; i++) h = sha256(concat(h, salt));
  return toHex(h);
}

// The first account on a device adopts any data saved before accounts existed (originals are left untouched).
function migrateLegacyData(userId) {
  BACKUP_KEYS.forEach(k => {
    try {
      const v = localStorage.getItem(k);
      if (v !== null && localStorage.getItem(`bolla:${userId}:${k}`) === null) localStorage.setItem(`bolla:${userId}:${k}`, v);
    } catch (_) {}
  });
}
async function registerUser(name, username, password, mobile, store) {
  const users = getUsers();
  if (users.some(u => u.username === username)) return { ok: false, error: "That email is already registered. Try logging in." };
  const alg = hasSubtle() ? "pbkdf2" : "sha256x";
  const salt = randomHex(16);
  const first = users.length === 0;
  const user = { id: randomHex(6), username, name, mobile, store: store || "", role: first ? "admin" : "team", alg, salt, hash: await hashPassword(password, salt, alg), created: new Date().toISOString() };
  users.push(user);
  if (!rawSet(localStorage, USERS_KEY, users)) return { ok: false, error: "This browser is blocking storage (private mode?), so the account could not be saved." };
  if (first) migrateLegacyData(user.id);
  return { ok: true, user };
}
async function loginUser(username, password) {
  const locks = rawGet(localStorage, LOCK_KEY, {});
  const rec = locks[username] || { n: 0, until: 0 };
  if (rec.until > Date.now()) return { ok: false, error: `Too many attempts. Try again in ${Math.ceil((rec.until - Date.now()) / 1000)} seconds.` };
  const user = getUsers().find(u => u.username === username);
  if (user && user.alg === "pbkdf2" && !hasSubtle()) return { ok: false, error: "This account needs a secure page (https or localhost) to sign in." };
  const hash = await hashPassword(password, user ? user.salt : "00".repeat(16), user ? user.alg : (hasSubtle() ? "pbkdf2" : "sha256x"));
  if (user && sameHash(hash, user.hash)) {
    delete locks[username]; rawSet(localStorage, LOCK_KEY, locks);
    return { ok: true, user };
  }
  rec.n += 1;
  if (rec.n >= MAX_TRIES) rec.until = Date.now() + Math.min(300000, 30000 * 2 ** (rec.n - MAX_TRIES));
  locks[username] = rec; rawSet(localStorage, LOCK_KEY, locks);
  return { ok: false, error: "Incorrect username or password." };
}

function setSession(user, remember) {
  const rec = { uid: user.id, exp: remember ? Date.now() + SESSION_DAYS * 864e5 : 0 };
  rawSet(remember ? localStorage : sessionStorage, SESSION_KEY, rec);
  try { (remember ? sessionStorage : localStorage).removeItem(SESSION_KEY); } catch (_) {}
}
function clearSession() { try { sessionStorage.removeItem(SESSION_KEY); localStorage.removeItem(SESSION_KEY); } catch (_) {} }
function getSessionUser() {
  for (const store of [sessionStorage, localStorage]) {
    const rec = rawGet(store, SESSION_KEY, null);
    if (!rec || !rec.uid) continue;
    if (rec.exp && rec.exp < Date.now()) { try { store.removeItem(SESSION_KEY); } catch (_) {} continue; }
    const user = getUsers().find(u => u.id === rec.uid);
    if (user) return user;
  }
  return null;
}

const PRESENCE_KEY = "bolla_presence", PRESENCE_TTL = 60000;
let beatTimer = null;
function beat() {
  if (!currentUser) return;
  const p = rawGet(localStorage, PRESENCE_KEY, {});
  p[currentUser.id] = Date.now();
  rawSet(localStorage, PRESENCE_KEY, p);
}
function leave() {
  if (!currentUser) return;
  const p = rawGet(localStorage, PRESENCE_KEY, {});
  delete p[currentUser.id];
  rawSet(localStorage, PRESENCE_KEY, p);
}
window.addEventListener("pagehide", leave);

function startApp(user) {
  currentUser = getUsers().find(u => u.id === user.id) || user;
  adminUnlocked = false;
  NS = `bolla:${user.id}:`;
  normalizeRoles();
  currentUser = getUsers().find(u => u.id === user.id) || user;
  initState();
  selName = currentUser.name || currentUser.username;
  save("name", selName);
  attDate.value = localDateISO();
  // Name is intentionally not displayed in the main menu for Admin or Team Member.
  $("logoutTab").title = `${currentUser.name} (${currentUser.username})`;
  $("adminTab").hidden = false;
  $("ddPresent").hidden = false;
  $("registeredListTab").hidden = true;
  // Always initialize the signed-in user on the main dashboard. Login/boot routes Admin accounts afterward.
  showMain();
  document.body.classList.remove("locked");
  applyLang();
  beat();
  clearInterval(beatTimer);
  beatTimer = setInterval(() => { beat(); if ($("tab-users").classList.contains("active")) renderUsers(); }, 20000);
}
$("logoutTab").addEventListener("click", () => {
  if (!confirm(t("confirmLogout"))) return;
  persist(sheet());
  leave();
  clearSession();
  location.reload();
});

/* Login / Register screen */
function setAuthError(id, msg) { const el = $(id); el.textContent = msg; el.hidden = !msg; }
function showAuthTab(which, focus = true) {
  const login = which === "login";
  $("loginForm").hidden = !login; $("registerForm").hidden = login;
  $("tabLogin").classList.toggle("active", login); $("tabRegister").classList.toggle("active", !login);
  $("tabLogin").setAttribute("aria-selected", String(login)); $("tabRegister").setAttribute("aria-selected", String(!login));
  setAuthError("loginError", ""); setAuthError("registerError", "");
  if (focus) $(login ? "loginUser" : "regName").focus();
}
$("tabLogin").addEventListener("click", () => showAuthTab("login"));
$("tabRegister").addEventListener("click", () => showAuthTab("register"));
document.querySelectorAll(".show-pass").forEach(btn => btn.addEventListener("click", () => {
  const input = $(btn.dataset.target), show = input.type === "password";
  input.type = show ? "text" : "password";
  btn.textContent = show ? "Hide" : "Show";
  btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
}));

async function runAuth(form, errorId, busyText, idleText, work) {
  const btn = form.querySelector(".auth-submit");
  setAuthError(errorId, "");
  btn.disabled = true; btn.textContent = busyText;
  try { await work(); }
  catch (err) { setAuthError(errorId, "Something went wrong. Please try again."); }
  finally { btn.disabled = false; btn.textContent = idleText; }
}
$("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  runAuth(e.target, "loginError", "Signing in…", "Login", async () => {
    const username = $("loginUser").value.trim().toLowerCase(), password = $("loginPass").value;
    if (!username || !password) return setAuthError("loginError", "Enter your email and password.");
    const res = await loginUser(username, password);
    if (!res.ok) return setAuthError("loginError", res.error);
    normalizeRoles();
    // Always use the freshly stored role after normalization; never route by a stale login result.
    const loggedInUser = getUsers().find(u => u.id === res.user.id) || res.user;
    setSession(loggedInUser, $("loginRemember").checked);
    $("loginPass").value = "";
    startApp(loggedInUser);
    if (loggedInUser.role === "admin") showAdmin();
    else { adminUnlocked = false; showMain(); renderAll(); }
  });
});
// Store is optional in registration and must never block account creation.
const registrationStoreField = $("regStore");
if (registrationStoreField) {
  registrationStoreField.required = false;
  registrationStoreField.removeAttribute("required");
  registrationStoreField.setCustomValidity("");
}

$("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  runAuth(e.target, "registerError", "Creating account…", "Create account", async () => {
    const name = $("regName").value.trim().replace(/\s+/g, " "), username = $("regUser").value.trim().toLowerCase();
    const pass = $("regPass").value, pass2 = $("regPass2").value;
    const mobile = $("regMobile").value.trim().replace(/\s+/g, " "), digits = mobile.replace(/\D/g, "");
    const store = String($("regStore").value || "").trim();
    if (name.length < 2 || name.length > 50) return setAuthError("registerError", "Enter your full name (2–50 characters).");
    if (!/^\+?[0-9 ()-]{7,20}$/.test(mobile) || digits.length < 7 || digits.length > 15) return setAuthError("registerError", "Enter a valid mobile number, like +1 917 435 2695.");
    if (username.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(username)) return setAuthError("registerError", "Enter a valid email address, like name@example.com.");
    if (pass.length < 8 || !/[A-Za-z]/.test(pass) || !/\d/.test(pass)) return setAuthError("registerError", "Password needs at least 8 characters, with a letter and a number.");
    if (pass !== pass2) return setAuthError("registerError", "Passwords do not match.");
    const res = await registerUser(name, username, pass, mobile, store);
    if (!res.ok) return setAuthError("registerError", res.error);
    normalizeRoles();
    setSession(getUsers().find(u => u.id === res.user.id) || res.user, true);
    $("regPass").value = ""; $("regPass2").value = "";
    startApp(res.user);
  });
});

// Ensure the fixed Admin account exists on this browser before showing the login screen.
// NOTE: This is browser-local demo authentication, not server-side account provisioning.
async function ensureDefaultAdmin() {
  const username = "admin@gmail.com", password = "bolla321";
  const users = getUsers();
  let admin = users.find(u => String(u.username || "").toLowerCase() === username);
  const alg = hasSubtle() ? "pbkdf2" : "sha256x";
  const salt = randomHex(16);
  const hash = await hashPassword(password, salt, alg);
  if (admin) {
    admin.username = username;
    admin.name = admin.name || "Bolla Admin";
    admin.role = "admin";
    admin.alg = alg; admin.salt = salt; admin.hash = hash;
  } else {
    admin = { id: randomHex(6), username, name: "Bolla Admin", mobile: "", store: "", role: "admin", alg, salt, hash, created: new Date().toISOString() };
    users.push(admin);
  }
  if (!rawSet(localStorage, USERS_KEY, users)) throw new Error("Unable to save Admin account in this browser.");
  normalizeRoles();
  return admin;
}

// Start: ensure Admin is registered, then restore an existing session or show Login.
(async function boot() {
  try {
    await ensureDefaultAdmin();
    const sessionUser = getSessionUser();
    if (sessionUser) {
      const user = getUsers().find(u => u.id === sessionUser.id) || sessionUser;
      startApp(user);
      if (user.role === "admin") showAdmin();
      else { adminUnlocked = false; showMain(); renderAll(); }
      return;
    }
    showAuthTab("login", false);
  } catch (err) {
    showAuthTab("login", false);
    setAuthError("loginError", "Could not initialize the Admin account. Please allow browser storage and reload.");
  }
})();

// Footer year stays current automatically.
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
