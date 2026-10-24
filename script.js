/* ---------- Data: edit these lists to change the dropdowns ---------- */
const STAFF = [
  "Jaber Ali", "Aman", "Jafor", "Mohammed", "Sazzad",
  "Farid", "Raja", "Ihsan", "Rahim", "Karim",
  "Hasan", "Rubel", "Sohel", "Nayeem", "Rafi",
  "Imran", "Mizan", "Salman", "Arif", "Shakil"
];
const STORES = ["3239", "3240", "3241", "3242", "3243"]; // replace with your real store numbers
const SHIFTS = ["day", "afternoon", "night"];
const ADDRESS = "Sunrise Hwy, Islip Terrace, NY 11752";

/* ---------- Translations ---------- */
const T = {
  en: { name:"Name", store:"Store", report:"Report", upload:"Upload", allNames:"All names", day:"Day", afternoon:"Afternoon", night:"Night",
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
  en: { sno:"S.No", amount:"Amount", dayReport:"Day Report", time:"Time", total:"Total:", bkDiff:"B.K. Diff:", refund:"Refund:", grandTotal:"Grand Total:", clear:"Clear Entries", confirmClear:"Clear all rows and reset B.K. Diff and Refund?" },
  es: { sno:"N.º", amount:"Monto", dayReport:"Reporte del día", time:"Hora", total:"Total:", bkDiff:"Dif. B.K.:", refund:"Reembolso:", grandTotal:"Total general:", clear:"Borrar entradas", confirmClear:"¿Borrar todas las filas y reiniciar Dif. B.K. y Reembolso?" },
  hi: { sno:"क्र.सं.", amount:"राशि", dayReport:"दिन की रिपोर्ट", time:"समय", total:"कुल:", bkDiff:"B.K. अंतर:", refund:"रिफंड:", grandTotal:"कुल योग:", clear:"एंट्री साफ़ करें", confirmClear:"सभी पंक्तियाँ साफ़ करें और B.K. अंतर व रिफंड रीसेट करें?" },
  ur: { sno:"نمبر شمار", amount:"رقم", dayReport:"دن کی رپورٹ", time:"وقت", total:"کل:", bkDiff:"B.K. فرق:", refund:"واپسی:", grandTotal:"مجموعی کل:", clear:"اندراجات صاف کریں", confirmClear:"تمام قطاریں صاف کریں اور B.K. فرق و واپسی ری سیٹ کریں؟" },
  bn: { sno:"ক্রমিক", amount:"পরিমাণ", dayReport:"দিনের রিপোর্ট", time:"সময়", total:"মোট:", bkDiff:"B.K. পার্থক্য:", refund:"রিফান্ড:", grandTotal:"সর্বমোট:", clear:"এন্ট্রি মুছুন", confirmClear:"সব সারি মুছে B.K. পার্থক্য ও রিফান্ড রিসেট করবেন?" }
};
const LABELS2 = {
  en: { storeLabel:"Store:", nameLabel:"Name:" }, es: { storeLabel:"Tienda:", nameLabel:"Nombre:" },
  hi: { storeLabel:"स्टोर:", nameLabel:"नाम:" }, ur: { storeLabel:"اسٹور:", nameLabel:"نام:" },
  bn: { storeLabel:"স্টোর:", nameLabel:"নাম:" }
};
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
Object.keys(EXTRA).forEach(l => Object.assign(T[l], EXTRA[l]));

/* ---------- Helpers ---------- */
function load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; } }
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch (_) { const w = document.getElementById("storageWarn"); if (w) w.hidden = false; }   // storage blocked or full
}
function localDateISO(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ---------- State ---------- */
let lang = load("lang", "en");
let selName = load("name", STAFF[0]);   // each name has its own sheet
let selStore = load("store", STORES[0]);
let selShift = load("shift", "day");    // default Day Report value for new entries
let sheets = load("sheets", {});        // one paper sheet per date + store
let labels = load("labels", {});        // edited labels, per language
const attDate = document.getElementById("attDate");
attDate.value = localDateISO();
const t = key => (T[lang] && T[lang][key]) || T.en[key] || key;
const lbl = key => labels[`${lang}:${key}`] ?? t(key);

const ROWS = 17;                        // 16 numbered rows + 1 spare row, like the paper
const sheetKey = () => `${attDate.value}|${selStore}|${selName}`;   // sheet = date + store + name
const blankSheet = () => ({
  rows: Array.from({ length: ROWS }, (_, i) => ({ serial: i < 16 ? String(i + 1) : "", amount: "", day: "", time: "", name: "" })),
  bk: "0", refund: "0", total: "0.00", grand: "0.00"
});
const sheet = () => sheets[sheetKey()] || (sheets[sheetKey()] = blankSheet());

/* ---------- Dropdown menu items (Name, Store, Report) ---------- */
const dropdowns = {
  ddName:   { label: () => t("name"),   items: () => STAFF.map(n => ({ v: n, l: n })),
              get: () => selName,   set: v => { selName = v; save("name", v); }, shown: () => selName },
  ddStore:  { label: () => t("store"),  items: () => STORES.map(s => ({ v: s, l: s })),
              get: () => selStore,  set: v => { selStore = v; save("store", v); }, shown: () => selStore },
  ddReport: { label: () => t("report"), items: () => SHIFTS.map(s => ({ v: s, l: t(s) })),
              get: () => selShift,  set: v => { selShift = v; save("shift", v); }, shown: () => t(selShift) }
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
    const o = document.createElement("button");
    o.type = "button"; o.textContent = item.l;
    if (item.v === cfg.get()) o.classList.add("sel");
    o.addEventListener("click", () => { cfg.set(item.v); closeDropdowns(); showMain(); renderAll(); });
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
  const matches = [
    ...STAFF.filter(name => name.toLowerCase().includes(query)).map(value => ({ value, type: "name", label: value, hint: "Name" })),
    ...STORES.filter(store => store.toLowerCase().includes(query)).map(value => ({ value, type: "store", label: value, hint: "Store" }))
  ].slice(0, 12);
  if (!matches.length) {
    const empty = document.createElement("div");
    empty.textContent = "No matching name or store";
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
        if (match.type === "name") { selName = match.value; save("name", selName); }
        else { selStore = match.value; save("store", selStore); }
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
function showMain() {
  document.getElementById("tab-main").classList.add("active");
  document.getElementById("tab-upload").classList.remove("active");
  document.getElementById("uploadTab").classList.remove("active");
}
document.getElementById("uploadTab").addEventListener("click", () => {
  document.getElementById("tab-main").classList.remove("active");
  document.getElementById("tab-upload").classList.add("active");
  document.getElementById("uploadTab").classList.add("active");
});

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
  s.bk = $("bkDiff").value; s.refund = $("refund").value;
  s.total = $("total").value; s.grand = $("grandTotal").value;
  save("sheets", sheets);
}
function recalc(s) {
  const total = [...document.querySelectorAll(".amount")].reduce((sum, el) => sum + (parseFloat(el.value) || 0), 0);
  $("total").value = toMoney(total);
  $("grandTotal").value = toMoney(total + (parseFloat($("bkDiff").value) || 0) - (parseFloat($("refund").value) || 0));
  persist(s);
}

function renderAll() {
  Object.keys(dropdowns).forEach(renderDropdown);
  $("sheetStore").textContent = selStore;
  $("sheetName").textContent = selName;
  $("shiftList").replaceChildren(...SHIFTS.map(k => Object.assign(document.createElement("option"), { value: t(k) })));
  const s = sheet();
  const body = $("entryRows");
  body.replaceChildren();
  s.rows.forEach((r, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><input class="c serial" type="text" aria-label="S.No ${i + 1}"></td>
      <td><div class="amount-wrap"><span class="currency">$</span><input class="c amount" type="number" min="0" step="0.01" inputmode="decimal" aria-label="Amount ${i + 1}"></div></td>
      <td><input class="c day" list="shiftList" aria-label="Day Report ${i + 1}"></td>
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
  renderFiles();
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

$("clearBtn").addEventListener("click", () => {
  if (!confirm(t("confirmClear"))) return;
  sheets[sheetKey()] = blankSheet();
  save("sheets", sheets);
  renderAll();
});

/* Print-safe text values: some browsers clip number inputs in print preview. */
window.addEventListener("beforeprint", () => {
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
  document.querySelectorAll("#entryRows tr").forEach(tr => {
    tr.dataset.print = "yes";
    tr.querySelector(".print-amount-text")?.remove();
  });
  document.querySelectorAll(".print-money-text").forEach(el => el.remove());
});
$("printBtn").addEventListener("click", () => window.print());

/* ---------- Download PDF (one page, automatically downloaded) ---------- */
function buildSinglePagePdfFromCanvas(canvas) {
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
    ascii("3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>\nendobj\n"),
    ascii(`4 0 obj\n<< /Length ${ascii(content).length} >>\nstream\n${content}endstream\nendobj\n`)
  ];
  objects.forEach((obj, i) => { offsets[i + 1] = length; push(obj); });
  offsets[5] = length;
  push(ascii(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`));
  push(jpeg);
  push(ascii("\nendstream\nendobj\n"));
  const xrefOffset = length;
  let xref = "xref\n0 6\n0000000000 65535 f \n";
  for (let i = 1; i <= 5; i++) xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  push(ascii(xref));
  return new Blob(chunks, { type: "application/pdf" });
}

$("pngBtn").addEventListener("click", async () => {
  const btn = $("pngBtn");
  if (typeof html2canvas !== "function") { alert("html2canvas.min.js must be in the same folder as index.html."); return; }
  btn.disabled = true;
  try {
    const canvas = await html2canvas($("tab-main"), {
      scale: 2, backgroundColor: "#ffffff", useCORS: true,
      onclone: doc => {
        // Force the text watermark into the cloned export DOM so it appears in PDF too.
        const watermark = doc.querySelector("#tab-main > .report-watermark");
        if (watermark) {
          watermark.textContent = "Bolla Market";
          Object.assign(watermark.style, {
            display: "block", position: "absolute", top: "43%", left: "0", width: "100%",
            textAlign: "center", whiteSpace: "nowrap", overflow: "visible",
            color: "#d94a55", opacity: "0.075", fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: "800", fontSize: "11vw", lineHeight: "1", letterSpacing: "-0.04em",
            transform: "rotate(-16deg)", transformOrigin: "center", zIndex: "0", pointerEvents: "none"
          });
        }
        // Opaque white table cells would cover the watermark in html2canvas.
        doc.querySelectorAll("#tab-main .form-table, #tab-main .form-table tbody, #tab-main .form-table tr, #tab-main .form-table td, #tab-main .form-table tbody tr:nth-child(even) td, #tab-main .totals, #tab-main .total-line").forEach(el => {
          el.style.setProperty("background", "transparent", "important");
          el.style.setProperty("background-color", "transparent", "important");
        });
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
        const dateInput = doc.getElementById("attDate");
        if (dateInput) {
          const dateText = doc.createElement("span");
          dateText.className = "date-export";
          dateText.textContent = dateInput.value;
          dateInput.replaceWith(dateText);
        }
      },
      ignoreElements: el => el.classList && el.classList.contains("no-print")
    });
    const blob = buildSinglePagePdfFromCanvas(canvas);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `Bolla_${selStore}_${selName}_${attDate.value}.pdf`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  } catch (err) {
    alert("PDF could not be created: " + err.message);
  } finally {
    btn.disabled = false;
  }
});

/* ---------- Excel ---------- */
$("excelBtn").addEventListener("click", () => {
  const s = sheet();
  const th = [...document.querySelectorAll(".form-table th")].map(x => x.textContent);
  const rows = [[document.querySelector(".paper-date span").textContent, attDate.value],
    [document.querySelector(".sheet-info [data-i18n=storeLabel]").textContent, selStore, document.querySelector(".sheet-info [data-i18n=nameLabel]").textContent, selName], th];
  s.rows.forEach(r => rows.push([r.serial, r.amount === "" ? "" : Number(r.amount), r.day, r.time]));
  rows.push([]);
  document.querySelectorAll(".totals .total-line").forEach(line => rows.push([line.firstElementChild.textContent, Number(line.querySelector("input").value) || 0]));
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

/* ---------- Upload ---------- */
const files = [];
const fileList = document.getElementById("fileList");
const dropZone = document.getElementById("dropZone");
function renderFiles() {
  fileList.replaceChildren();
  files.forEach((file, i) => {
    const item = document.createElement("div");
    item.className = "file-item";
    const info = document.createElement("div");
    info.className = "file-info";
    if (file.type && file.type.startsWith("image/")) {
      const preview = document.createElement("img");
      preview.className = "file-preview";
      preview.alt = `Preview of ${file.name}`;
      preview.src = URL.createObjectURL(file);
      preview.onload = () => URL.revokeObjectURL(preview.src);
      info.appendChild(preview);
    }
    const label = document.createElement("span");
    label.className = "file-name";
    label.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    info.appendChild(label);
    const rm = document.createElement("button");
    rm.type = "button"; rm.className = "remove"; rm.textContent = t("remove");
    rm.addEventListener("click", () => { files.splice(i, 1); renderFiles(); });
    item.append(info, rm);
    fileList.appendChild(item);
  });
}
function addFiles(list) {
  for (const f of list) {
    if (!files.some(x => x.name === f.name && x.size === f.size && x.lastModified === f.lastModified)) files.push(f);
  }
  renderFiles();
}
document.getElementById("fileInput").addEventListener("change", e => { addFiles(e.target.files); e.target.value = ""; });
["dragenter", "dragover"].forEach(ev => dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.add("drag-active"); }));
["dragleave", "drop"].forEach(ev => dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.remove("drag-active"); }));
dropZone.addEventListener("drop", e => addFiles(e.dataTransfer.files));

document.getElementById("submitBtn").addEventListener("click", () => {
  const pack = {
    store: selStore, name: selName, shift: selShift, date: attDate.value,
    entries: sheet().rows, total: sheet().total, bkDiff: sheet().bk, refund: sheet().refund, grandTotal: sheet().grand,
    note: document.getElementById("note").value,
    attachedFiles: files.map(f => ({ name: f.name, size: f.size, type: f.type || "unknown" })),
    preparedAt: new Date().toISOString()
  };
  const subject = `Bolla submission - Store ${pack.store} - ${pack.name} - ${pack.date}`;
  const body = [
    "Bolla Market submission", `Store: ${pack.store}`, `Name: ${pack.name}`, `Shift: ${pack.shift}`, `Date: ${pack.date}`,
    `Total: $${Number(pack.total || 0).toFixed(2)}`, `B.K. Diff: $${Number(pack.bkDiff || 0).toFixed(2)}`,
    `Refund: $${Number(pack.refund || 0).toFixed(2)}`, `Grand Total: $${Number(pack.grandTotal || 0).toFixed(2)}`,
    `Note: ${pack.note || "—"}`, "", "Files to attach:",
    ...(pack.attachedFiles.length ? pack.attachedFiles.map(f => `- ${f.name} (${(f.size/1024).toFixed(1)} KB)`) : ["- No files selected"]),
    "", "Please attach the listed files in this email before sending."
  ].join("\n");
  const mailto = `mailto:jaber2024@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const status = document.getElementById("status");
  status.textContent = "Submission ready — email draft opened. Attach the selected files and press Send in your email app to complete submission.";
  status.classList.add("submission-pending");
  window.location.href = mailto;
});

/* ---------- Keep data safe ---------- */
// Save the open sheet whenever the page is hidden, closed or refreshed.
window.addEventListener("pagehide", () => persist(sheet()));
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") persist(sheet()); });
// Ask the browser not to clear this site's data when the device runs low on space.
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

const BACKUP_KEYS = ["lang", "name", "store", "shift", "sheets", "labels"];
$("backupBtn").addEventListener("click", () => {
  const data = {};
  BACKUP_KEYS.forEach(k => { data[k] = load(k, null); });
  const url = URL.createObjectURL(new Blob([JSON.stringify({ app: "bolla-attendance", version: 1, savedAt: new Date().toISOString(), data }, null, 2)], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url; a.download = `Bolla_Backup_${localDateISO()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
});
$("restoreBtn").addEventListener("click", () => $("restoreInput").click());
$("restoreInput").addEventListener("change", async e => {
  const file = e.target.files[0];
  e.target.value = "";
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    if (parsed.app !== "bolla-attendance" || typeof parsed.data !== "object") throw new Error("bad");
    if (!confirm(t("confirmRestore"))) return;
    BACKUP_KEYS.forEach(k => { if (parsed.data[k] != null) save(k, parsed.data[k]); });
    location.reload();
  } catch (_) { alert(t("backupBad")); }
});

applyLang();

// Footer year stays current automatically.
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
