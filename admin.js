/* =====================================================================
   Bolla Admin panel
   Loaded BEFORE script.js. It only uses helpers from script.js (rawGet, hashPassword,
   getUsers, registerUser ...) when a button is clicked, so the load order is safe.

   SECURITY NOTE: this site has no server. Everything (users, reports, admin password hash)
   lives in this browser's localStorage. The admin password stops casual access through the
   page, but it cannot stop someone who opens the browser's developer tools on this device.
   ===================================================================== */
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const ADMIN_KEY = "bolla_admin", ASESSION = "bolla_admin_session", ALOCK = "bolla_admin_lock", CONFIG_KEY = "bolla_config";
  const LS = window.localStorage;
  const get = (k, f) => rawGet(LS, k, f);
  const put = (k, v) => rawSet(LS, k, v);
  const num = v => parseFloat(v) || 0;
  const money = n => "$" + (Number.isFinite(n) ? n : 0).toFixed(2);
  const fix2 = n => (Number.isFinite(n) ? n : 0).toFixed(2);
  const pwOk = p => p.length >= 8 && /[A-Za-z]/.test(p) && /\d/.test(p);
  const PW_MSG = "Password needs at least 8 characters, with a letter and a number.";
  const ATT = { "": "—", present: "Present", late: "Late", absent: "Absent" };

  /* ---------- tiny DOM helper ---------- */
  function h(tag, props, ...kids) {
    const e = document.createElement(tag);
    if (props) for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === "class") e.className = v;
      else if (k === "text") e.textContent = v;
      else if (k === "value") e.value = v;
      else if (k === "checked") e.checked = !!v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? "" : v);
    }
    kids.flat().forEach(c => { if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(String(c))); });
    return e;
  }
  let toastTimer;
  function toast(msg, bad) {
    const t = $("admToast"); t.textContent = msg; t.className = "adm-toast show" + (bad ? " bad" : "");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.className = "adm-toast"; }, 3400);
  }
  const setErr = (el, msg) => { el.textContent = msg; el.hidden = !msg; return false; };
  const field = (label, input) => h("label", { class: "adm-field" }, h("span", { text: label }), input);
  const btn = (text, fn, cls) => h("button", { type: "button", class: "adm-btn " + (cls || ""), text, onclick: fn });

  function modal(title, content, actions, opts) {
    opts = opts || {};
    const back = h("div", { class: "adm-modal-back" });
    const onKey = e => { if (e.key === "Escape") close(); };
    const close = () => { back.remove(); document.removeEventListener("keydown", onKey); };
    const err = h("p", { class: "auth-error", hidden: true, role: "alert" });
    const bar = h("div", { class: "adm-modal-actions" }, h("button", { type: "button", class: "secondary", text: opts.cancel || "Cancel", onclick: close }));
    (actions || []).forEach(a => {
      const b = h("button", { type: "button", class: a.cls || "", text: a.label });
      b.addEventListener("click", async () => {
        b.disabled = true;
        try { const r = await a.fn(err); if (r !== false) close(); }
        catch (e) { console.error(e); setErr(err, "Something went wrong. Please try again."); }
        finally { b.disabled = false; }
      });
      bar.append(b);
    });
    const box = h("div", { class: "adm-modal" + (opts.wide ? " wide" : ""), role: "dialog", "aria-modal": "true", "aria-label": title }, h("h3", { text: title }), content, err, bar);
    back.append(box);
    back.addEventListener("mousedown", e => { if (e.target === back) close(); });
    document.addEventListener("keydown", onKey);
    document.body.append(back);
    const first = box.querySelector("input,select,textarea"); if (first) first.focus();
    return close;
  }
  function confirmBox(title, text, label, fn, danger) {
    modal(title, h("p", { class: "adm-p", text }), [{ label, cls: danger ? "danger" : "", fn }]);
  }
  function table(headers, rows, cls) {
    return h("div", { class: "adm-scroll" }, h("table", { class: "adm-table " + (cls || "") },
      h("thead", null, h("tr", null, headers.map(x => h("th", typeof x === "string" ? { text: x } : x.props, typeof x === "string" ? null : x.node)))),
      h("tbody", null, rows.length ? rows.map(r => h("tr", null, r.map(c => h("td", null, c)))) : h("tr", null, h("td", { colspan: headers.length, class: "adm-empty", text: "Nothing here yet." })))));
  }
  const actions = (...b) => h("div", { class: "adm-actions" }, b);

  /* ---------- data helpers ---------- */
  const userSheets = id => get(`bolla:${id}:sheets`, {});
  const saveSheets = (id, obj) => put(`bolla:${id}:sheets`, obj);
  const hasData = s => !!s && (((s.rows || []).some(r => String(r.amount).trim() !== "")) || String(s.nb || "").trim() !== "" || !!s.att);
  const entries = s => (s.rows || []).filter(r => String(r.amount).trim() !== "").length;
  const sumRows = s => (s.rows || []).reduce((a, r) => a + num(r.amount), 0);
  function parseKey(k) { const p = k.split("|"); return { date: p[0] || "", store: p[1] || "", name: p.slice(2).join("|") }; }
  function collect() {
    const out = [];
    getUsers().forEach(u => {
      const m = userSheets(u.id);
      Object.keys(m).forEach(k => out.push({ uid: u.id, owner: u.name || u.username, key: k, ...parseKey(k), s: m[k] || {} }));
    });
    return out;
  }
  const today = () => localDateISO();

  /* ---------- sign in / setup ---------- */
  const adminRec = () => get(ADMIN_KEY, null);
  const lockLeft = () => { const l = get(ALOCK, {}); return l.until > Date.now() ? Math.ceil((l.until - Date.now()) / 1000) : 0; };
  function refreshForm() {
    const setup = !adminRec();
    $("admConfirmWrap").hidden = !setup;
    $("admSubmit").textContent = setup ? "Create admin account" : "Admin login";
    $("admForgot").hidden = setup;
    $("admPass").autocomplete = setup ? "new-password" : "current-password";
    $("admIntro").textContent = setup
      ? "First time here? Create the admin password. It gives full control over every account and report on this device."
      : "Sign in with the admin password.";
  }
  function showAdminTab() {
    $("loginForm").hidden = true; $("registerForm").hidden = true; $("adminForm").hidden = false;
    ["tabLogin", "tabRegister"].forEach(id => { $(id).classList.remove("active"); $(id).setAttribute("aria-selected", "false"); });
    $("tabAdmin").classList.add("active"); $("tabAdmin").setAttribute("aria-selected", "true");
    setAuthError("adminError", ""); refreshForm(); $("admPass").focus();
  }
  $("tabAdmin").addEventListener("click", showAdminTab);

  const normCode = c => String(c || "").replace(/[^0-9a-f]/gi, "").toLowerCase();
  const prettyCode = hex => hex.toUpperCase().match(/.{4}/g).join("-");
  async function newCredentials(password) {
    const alg = hasSubtle() ? "pbkdf2" : "sha256x";
    const salt = randomHex(16), code = randomHex(8), rsalt = randomHex(16);
    return {
      code: prettyCode(code),
      rec: { alg, salt, hash: await hashPassword(password, salt, alg), rsalt, rhash: await hashPassword(code, rsalt, alg), created: new Date().toISOString() }
    };
  }
  function showRecovery(code, done) {
    const box = h("div", null,
      h("p", { class: "adm-p", text: "Save this recovery code somewhere safe. It is the only way to reset the admin password if you forget it, and it is shown only once." }),
      h("div", { class: "adm-code", text: code }));
    modal("Your recovery code", box, [
      { label: "Copy code", fn: () => { try { navigator.clipboard.writeText(code); toast("Code copied"); } catch (_) {} return false; } },
      { label: "I saved it — continue", cls: "primary", fn: () => { done && done(); } }
    ], { cancel: "Close" });
  }
  function startSession() { rawSet(sessionStorage, ASESSION, { t: Date.now() }); }

  $("adminForm").addEventListener("submit", async e => {
    e.preventDefault();
    const b = $("admSubmit"); b.disabled = true; setAuthError("adminError", "");
    try {
      const p = $("admPass").value;
      if (!adminRec()) {
        if (!pwOk(p)) return setAuthError("adminError", PW_MSG);
        if (p !== $("admPass2").value) return setAuthError("adminError", "Passwords do not match.");
        const { code, rec } = await newCredentials(p);
        if (!put(ADMIN_KEY, rec)) return setAuthError("adminError", "This browser is blocking storage, so the admin account could not be saved.");
        $("admPass").value = $("admPass2").value = "";
        showRecovery(code, () => { startSession(); enterPanel(); });
        return;
      }
      const wait = lockLeft();
      if (wait) return setAuthError("adminError", `Too many attempts. Try again in ${wait} seconds.`);
      const rec = adminRec();
      if (rec.alg === "pbkdf2" && !hasSubtle()) return setAuthError("adminError", "Admin login needs a secure page (https or localhost).");
      if (!p) return setAuthError("adminError", "Enter the admin password.");
      const hash = await hashPassword(p, rec.salt, rec.alg);
      if (sameHash(hash, rec.hash)) {
        put(ALOCK, {}); $("admPass").value = ""; startSession(); enterPanel();
      } else {
        const l = get(ALOCK, {}); l.n = (l.n || 0) + 1;
        if (l.n >= 5) { l.until = Date.now() + Math.min(300000, 30000 * 2 ** (l.n - 5)); }
        put(ALOCK, l);
        setAuthError("adminError", "Incorrect admin password.");
      }
    } catch (err) { console.error(err); setAuthError("adminError", "Something went wrong. Please try again."); }
    finally { b.disabled = false; }
  });

  $("admForgot").addEventListener("click", () => {
    const code = h("input", { type: "text", autocomplete: "off", placeholder: "XXXX-XXXX-XXXX-XXXX", maxlength: "40" });
    const p1 = h("input", { type: "password", autocomplete: "new-password", maxlength: "128" });
    const p2 = h("input", { type: "password", autocomplete: "new-password", maxlength: "128" });
    modal("Reset admin password", h("div", null, field("Recovery code", code), field("New password", p1), field("Confirm new password", p2)), [{
      label: "Reset password", cls: "primary", fn: async err => {
        const rec = adminRec(); if (!rec) return setErr(err, "No admin account found.");
        if (!pwOk(p1.value)) return setErr(err, PW_MSG);
        if (p1.value !== p2.value) return setErr(err, "Passwords do not match.");
        const ok = rec.rhash && sameHash(await hashPassword(normCode(code.value), rec.rsalt, rec.alg), rec.rhash);
        if (!ok) return setErr(err, "That recovery code is not correct.");
        const { code: fresh, rec: next } = await newCredentials(p1.value);
        put(ADMIN_KEY, { ...next, created: rec.created }); put(ALOCK, {});
        setTimeout(() => showRecovery(fresh, () => toast("Password reset. You can sign in now.")), 0);
      }
    }]);
  });

  /* ---------- panel shell ---------- */
  const TABS = [["dash", "Dashboard"], ["users", "Users"], ["reports", "Reports"], ["lists", "Staff & Stores"], ["backup", "Backup & Reset"], ["settings", "Settings"]];
  const RENDER = { dash, users, reports, lists, backup, settings };
  const st = { tab: "dash", q: "", from: "", to: "", store: "", uid: "", hideEmpty: true, sel: new Set() };

  function enterPanel() {
    document.body.classList.remove("locked"); document.body.classList.add("admin-on");
    $("adminScreen").hidden = false;
    $("admTabs").replaceChildren(...TABS.map(([id, label]) => h("button", { type: "button", "data-tab": id, text: label, onclick: () => go(id) })));
    go(st.tab);
  }
  function go(tab) {
    st.tab = tab;
    document.querySelectorAll("#admTabs button").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
    $("admBody").replaceChildren(RENDER[tab]());
    window.scrollTo(0, 0);
  }
  const refresh = () => go(st.tab);
  $("admLogout").addEventListener("click", () => { try { sessionStorage.removeItem(ASESSION); } catch (_) {} location.reload(); });
  window.Admin = {
    resume() {
      if (!adminRec() || !rawGet(sessionStorage, ASESSION, null)) return false;
      enterPanel(); return true;
    }
  };

  /* ---------- Dashboard ---------- */
  function card(label, value) { return h("div", { class: "adm-card" }, h("b", { text: value }), h("span", { text: label })); }
  function dash() {
    const users = getUsers(), items = collect().filter(i => hasData(i.s)), presence = get(PRESENCE_KEY, {});
    const active = users.filter(u => Date.now() - (presence[u.id] || 0) < PRESENCE_TTL).length;
    const td = items.filter(i => i.date === today());
    const byStore = {};
    td.forEach(i => { const r = byStore[i.store] || (byStore[i.store] = { n: 0, total: 0 }); r.n++; r.total += num(i.s.grand); });
    return h("div", null,
      h("h2", { text: "Dashboard" }),
      h("div", { class: "adm-cards" },
        card("Registered users", users.length), card("Signed in now", active),
        card("Saved reports", items.length), card("Reports today", td.length),
        card("Today's grand total", money(td.reduce((a, i) => a + num(i.s.grand), 0))),
        card("Staff names", STAFF.length), card("Stores", STORES.length)),
      h("h3", { text: `Today by store (${today()})` }),
      table(["Store", "Reports", "Grand total"], Object.keys(byStore).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).map(k => [k, String(byStore[k].n), money(byStore[k].total)])));
  }

  /* ---------- Users ---------- */
  function userForm(u) {
    const f = {
      name: h("input", { type: "text", maxlength: "50", value: u ? u.name : "" }),
      mobile: h("input", { type: "tel", maxlength: "20", value: u ? u.mobile : "" }),
      email: h("input", { type: "email", maxlength: "254", value: u ? u.username : "", autocapitalize: "none" })
    };
    return f;
  }
  function checkProfile(f, err, users, selfId) {
    const name = f.name.value.trim().replace(/\s+/g, " "), mobile = f.mobile.value.trim().replace(/\s+/g, " "), email = f.email.value.trim().toLowerCase();
    const digits = mobile.replace(/\D/g, "");
    if (name.length < 2 || name.length > 50) return setErr(err, "Enter the full name (2–50 characters).");
    if (!/^\+?[0-9 ()-]{7,20}$/.test(mobile) || digits.length < 7 || digits.length > 15) return setErr(err, "Enter a valid mobile number, like +1 917 435 2695.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setErr(err, "Enter a valid email address.");
    if (users.some(x => x.username === email && x.id !== selfId)) return setErr(err, "That email is already used by another account.");
    return { name, mobile, email };
  }
  function addUser() {
    const f = userForm(null), pw = h("input", { type: "password", autocomplete: "new-password", maxlength: "128" });
    modal("Add user", h("div", null, field("Full name", f.name), field("Mobile number", f.mobile), field("Email", f.email), field("Password", pw)), [{
      label: "Create user", cls: "primary", fn: async err => {
        const v = checkProfile(f, err, getUsers(), null); if (!v) return false;
        if (!pwOk(pw.value)) return setErr(err, PW_MSG);
        const res = await registerUser(v.name, v.email, pw.value, v.mobile);
        if (!res.ok) return setErr(err, res.error);
        toast("User created"); refresh();
      }
    }]);
  }
  function editUser(u) {
    const f = userForm(u);
    modal("Edit user", h("div", null, field("Full name", f.name), field("Mobile number", f.mobile), field("Email", f.email)), [{
      label: "Save changes", cls: "primary", fn: err => {
        const users = getUsers(), v = checkProfile(f, err, users, u.id); if (!v) return false;
        const rec = users.find(x => x.id === u.id); if (!rec) return setErr(err, "This user no longer exists.");
        const oldEmail = rec.username;
        rec.name = v.name; rec.mobile = v.mobile; rec.username = v.email;
        if (!put(USERS_KEY, users)) return setErr(err, "Could not save (storage blocked).");
        if (oldEmail !== v.email) { const l = get(LOCK_KEY, {}); delete l[oldEmail]; put(LOCK_KEY, l); }
        toast("User updated"); refresh();
      }
    }]);
  }
  function resetUserPassword(u) {
    const p1 = h("input", { type: "password", autocomplete: "new-password", maxlength: "128" });
    modal(`Reset password — ${u.name}`, h("div", null, field("New password", p1)), [{
      label: "Set new password", cls: "primary", fn: async err => {
        if (!pwOk(p1.value)) return setErr(err, PW_MSG);
        const users = getUsers(), rec = users.find(x => x.id === u.id); if (!rec) return setErr(err, "This user no longer exists.");
        rec.alg = hasSubtle() ? "pbkdf2" : "sha256x"; rec.salt = randomHex(16); rec.hash = await hashPassword(p1.value, rec.salt, rec.alg);
        put(USERS_KEY, users);
        const l = get(LOCK_KEY, {}); delete l[rec.username]; put(LOCK_KEY, l);
        toast("Password changed");
      }
    }]);
  }
  function wipeUserData(id) {
    const rm = [];
    for (let i = 0; i < LS.length; i++) { const k = LS.key(i); if (k && k.startsWith(`bolla:${id}:`)) rm.push(k); }
    rm.forEach(k => LS.removeItem(k));
  }
  function deleteUser(u) {
    const n = Object.keys(userSheets(u.id)).filter(k => hasData(userSheets(u.id)[k])).length;
    confirmBox("Delete user", `Delete ${u.name} (${u.username}) and ${n} saved report${n === 1 ? "" : "s"}? This cannot be undone.`, "Delete user", () => {
      put(USERS_KEY, getUsers().filter(x => x.id !== u.id));
      wipeUserData(u.id);
      const p = get(PRESENCE_KEY, {}); delete p[u.id]; put(PRESENCE_KEY, p);
      const sess = rawGet(LS, SESSION_KEY, null); if (sess && sess.uid === u.id) LS.removeItem(SESSION_KEY);
      toast("User deleted"); refresh();
    }, true);
  }
  function users() {
    const list = getUsers(), presence = get(PRESENCE_KEY, {});
    const rows = list.map((u, i) => {
      const sheets = userSheets(u.id), n = Object.keys(sheets).filter(k => hasData(sheets[k])).length;
      const on = Date.now() - (presence[u.id] || 0) < PRESENCE_TTL;
      return [String(i + 1), u.name || "—", u.mobile || "—", u.username || "—",
        h("span", { class: on ? "st-active" : "st-inactive", text: on ? "Active" : "Inactive" }),
        String(n), (u.created || "").slice(0, 10) || "—",
        actions(btn("Edit", () => editUser(u)), btn("Password", () => resetUserPassword(u)),
          btn("Reports", () => { st.uid = u.id; st.sel.clear(); go("reports"); }), btn("Delete", () => deleteUser(u), "danger"))];
    });
    return h("div", null,
      h("div", { class: "adm-bar" }, h("h2", { text: `Users (${list.length})` }), btn("+ Add user", addUser, "primary")),
      table(["#", "Name", "Mobile", "Email", "Status", "Reports", "Joined", "Actions"], rows));
  }

  /* ---------- Reports ---------- */
  const keyOf = i => i.uid + "§" + i.key;
  function filtered() {
    const q = st.q.trim().toLowerCase();
    return collect().filter(i =>
      (!st.hideEmpty || hasData(i.s)) && (!st.uid || i.uid === st.uid) && (!st.store || i.store === st.store) &&
      (!st.from || i.date >= st.from) && (!st.to || i.date <= st.to) &&
      (!q || `${i.name} ${i.store} ${i.owner} ${i.date}`.toLowerCase().includes(q))
    ).sort((a, b) => b.date.localeCompare(a.date) || a.store.localeCompare(b.store, undefined, { numeric: true }) || a.name.localeCompare(b.name));
  }
  function deleteSheets(items) {
    const by = {};
    items.forEach(i => { (by[i.uid] || (by[i.uid] = [])).push(i.key); });
    Object.keys(by).forEach(uid => { const m = userSheets(uid); by[uid].forEach(k => delete m[k]); saveSheets(uid, m); });
  }
  function exportCsv(items) {
    const q = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = [["Account", "Date", "Store", "Name", "Attendance", "Entries", "Total", "B.K. Diff", "Refund", "Grand Total", "Notes"]]
      .concat(items.map(i => [i.owner, i.date, i.store, i.name, ATT[i.s.att || ""], entries(i.s), i.s.total, i.s.bk, i.s.refund, i.s.grand, i.s.nb || ""]));
    download(`Bolla_reports_${today()}.csv`, "\ufeff" + rows.map(r => r.map(q).join(",")).join("\r\n"), "text/csv;charset=utf-8");
  }
  function download(name, text, type) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const a = h("a", { href: url, download: name }); document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  function reports() {
    const wrap = h("div"), listBox = h("div");
    const inp = (key, props) => h("input", { ...props, value: st[key], oninput: e => { st[key] = e.target.value; draw(); } });
    const users = getUsers();
    const uSel = h("select", { onchange: e => { st.uid = e.target.value; st.sel.clear(); draw(); } }, h("option", { value: "", text: "All accounts" }), users.map(u => h("option", { value: u.id, text: u.name || u.username })));
    uSel.value = st.uid;
    const sSel = h("select", { onchange: e => { st.store = e.target.value; draw(); } }, h("option", { value: "", text: "All stores" }), STORES.map(s => h("option", { value: s, text: "Store " + s })));
    sSel.value = st.store;
    const empty = h("input", { type: "checkbox", checked: st.hideEmpty, onchange: e => { st.hideEmpty = e.target.checked; draw(); } });
    function draw() {
      const items = filtered(); [...st.sel].forEach(k => { if (!items.some(i => keyOf(i) === k)) st.sel.delete(k); });
      const grand = items.reduce((a, i) => a + num(i.s.grand), 0);
      const all = h("input", { type: "checkbox", "aria-label": "Select all", checked: items.length && items.every(i => st.sel.has(keyOf(i))), onchange: e => { items.forEach(i => e.target.checked ? st.sel.add(keyOf(i)) : st.sel.delete(keyOf(i))); draw(); } });
      const rows = items.map(i => [
        h("input", { type: "checkbox", "aria-label": "Select report", checked: st.sel.has(keyOf(i)), onchange: e => { e.target.checked ? st.sel.add(keyOf(i)) : st.sel.delete(keyOf(i)); draw(); } }),
        i.date, i.store, i.name, i.owner, ATT[i.s.att || ""], String(entries(i.s)), money(num(i.s.total)), money(num(i.s.grand)),
        actions(btn("Edit", () => sheetEditor(i)), btn("Delete", () => confirmBox("Delete report", `Delete the report for ${i.name}, store ${i.store}, ${i.date}?`, "Delete report", () => { deleteSheets([i]); toast("Report deleted"); draw(); }, true), "danger"))]);
      const selected = items.filter(i => st.sel.has(keyOf(i)));
      listBox.replaceChildren(
        h("p", { class: "adm-sum", text: `${items.length} report${items.length === 1 ? "" : "s"} · Grand total ${money(grand)}` }),
        table([{ props: {}, node: all }, "Date", "Store", "Name", "Account", "Attendance", "Entries", "Total", "Grand total", "Actions"], rows),
        h("div", { class: "adm-bar" },
          btn(`Delete selected (${selected.length})`, () => selected.length && confirmBox("Delete reports", `Delete ${selected.length} selected report${selected.length === 1 ? "" : "s"}? This cannot be undone.`, "Delete", () => { deleteSheets(selected); st.sel.clear(); toast("Reports deleted"); draw(); }, true), "danger"),
          btn("Download CSV (shown rows)", () => exportCsv(items))));
    }
    wrap.append(
      h("div", { class: "adm-bar" }, h("h2", { text: "Reports" }), btn("+ New report", () => sheetEditor(null), "primary")),
      h("div", { class: "adm-filters" },
        inp("q", { type: "search", placeholder: "Search name, store, account…", "aria-label": "Search" }), uSel, sSel,
        h("label", { class: "adm-inline" }, "From", inp("from", { type: "date" })), h("label", { class: "adm-inline" }, "To", inp("to", { type: "date" })),
        h("label", { class: "adm-inline" }, empty, "Hide empty")),
      listBox);
    draw();
    return wrap;
  }

  function pickList(list, val) { const l = list.includes(val) || !val ? list : [val, ...list]; return l; }
  function selectOf(list, val) { const s = h("select", null, pickList(list, val).map(x => h("option", { value: x, text: x }))); s.value = val; return s; }

  function sheetEditor(item) {
    const users = getUsers();
    if (!users.length) return toast("Create a user first.", true);
    const s0 = item ? JSON.parse(JSON.stringify(item.s)) : { rows: Array.from({ length: 5 }, (_, i) => ({ serial: String(i + 1), amount: "", day: "", time: "", name: "" })), bk: "0", refund: "0", nb: "", att: "" };
    s0.rows = s0.rows || [];
    const rows = s0.rows;
    const f = {
      uid: h("select", null, users.map(u => h("option", { value: u.id, text: `${u.name} (${u.username})` }))),
      date: h("input", { type: "date", value: item ? item.date : today() }),
      store: selectOf(STORES, item ? item.store : STORES[0]),
      name: selectOf(STAFF_SORTED, item ? item.name : STAFF_SORTED[0]),
      att: h("select", null, Object.keys(ATT).map(k => h("option", { value: k, text: k ? ATT[k] : "Not set" }))),
      bk: h("input", { type: "number", step: "0.01", value: s0.bk ?? "0" }),
      refund: h("input", { type: "number", step: "0.01", min: "0", value: s0.refund ?? "0" }),
      nb: h("textarea", { rows: "2", value: s0.nb || "" })
    };
    f.uid.value = item ? item.uid : (st.uid || users[0].id); f.att.value = s0.att || "";
    const totalEl = h("b"), grandEl = h("b"), tbody = h("tbody"), shifts = h("datalist", { id: "admShifts" }, ["Day", "Afternoon", "Night"].map(x => h("option", { value: x })));
    const calc = () => { const t = rows.reduce((a, r) => a + num(r.amount), 0); totalEl.textContent = money(t); grandEl.textContent = money(t + num(f.bk.value) - num(f.refund.value)); return t; };
    f.bk.addEventListener("input", calc); f.refund.addEventListener("input", calc);
    function drawRows() {
      tbody.replaceChildren(...rows.map((r, i) => h("tr", null,
        h("td", null, h("input", { type: "text", value: r.serial, "aria-label": "S.No", oninput: e => { r.serial = e.target.value; } })),
        h("td", null, h("input", { type: "number", step: "0.01", min: "0", value: r.amount, "aria-label": "Amount", oninput: e => { r.amount = e.target.value; calc(); } })),
        h("td", null, h("input", { type: "text", list: "admShifts", value: r.day, "aria-label": "Shift", oninput: e => { r.day = e.target.value; } })),
        h("td", null, h("input", { type: "time", value: r.time, "aria-label": "Time", oninput: e => { r.time = e.target.value; } })),
        h("td", null, btn("✕", () => { rows.splice(i, 1); drawRows(); calc(); }, "danger")))));
    }
    drawRows(); calc();
    const body = h("div", null,
      h("div", { class: "adm-grid" }, field("Account", f.uid), field("Date", f.date), field("Store", f.store), field("Name", f.name), field("Attendance", f.att)),
      h("div", { class: "adm-scroll" }, h("table", { class: "adm-table tight" }, h("thead", null, h("tr", null, ["S.No", "Amount", "Shift", "Time", ""].map(x => h("th", { text: x })))), tbody)), shifts,
      btn("+ Add row", () => { rows.push({ serial: String(rows.length + 1), amount: "", day: "", time: "", name: "" }); drawRows(); }),
      h("div", { class: "adm-grid" }, field("B.K. Diff", f.bk), field("Refund", f.refund)),
      h("p", { class: "adm-sum" }, "Total ", totalEl, " · Grand total ", grandEl),
      field("N.B notes", f.nb));
    modal(item ? "Edit report" : "New report", body, [{
      label: "Save report", cls: "primary", fn: err => {
        if (!f.date.value) return setErr(err, "Choose a date.");
        const total = calc(), grand = total + num(f.bk.value) - num(f.refund.value);
        const s = { ...s0, rows, bk: String(f.bk.value || "0"), refund: String(f.refund.value || "0"), total: fix2(total), grand: fix2(grand), nb: f.nb.value, att: f.att.value };
        const newKey = `${f.date.value}|${f.store.value}|${f.name.value}`, uid = f.uid.value;
        const target = userSheets(uid), moved = item && (item.uid !== uid || item.key !== newKey);
        if (!item || moved) {
          if (target[newKey] && hasData(target[newKey]) && !confirm("A report with this date, store and name already exists for that account. Replace it?")) return false;
        }
        if (moved) { const old = userSheets(item.uid); delete old[item.key]; saveSheets(item.uid, old); }
        const fresh = userSheets(uid); fresh[newKey] = s;
        if (!saveSheets(uid, fresh)) return setErr(err, "Could not save (storage blocked or full).");
        toast("Report saved"); if (st.tab === "reports") refresh();
      }
    }], { wide: true });
  }

  /* ---------- Staff & Stores ---------- */
  function saveConfig(staff, stores) {
    const cfg = { staff, stores };
    if (!put(CONFIG_KEY, cfg)) return false;
    applyConfig(cfg); return true;
  }
  function renameEverywhere(kind, from, to) {
    getUsers().forEach(u => {
      const m = userSheets(u.id), out = {}; let changed = false;
      Object.keys(m).forEach(k => {
        const p = parseKey(k); let nk = k;
        if (kind === "store" && p.store === from) nk = `${p.date}|${to}|${p.name}`;
        if (kind === "name" && p.name === from) nk = `${p.date}|${p.store}|${to}`;
        if (nk !== k && (nk in m)) nk = k;           // never overwrite an existing report
        if (nk !== k) changed = true;
        out[nk] = m[k];
      });
      if (changed) saveSheets(u.id, out);
      const sk = `bolla:${u.id}:${kind}`; if (get(sk, null) === from) put(sk, to);
    });
  }
  function listCard(title, kind) {
    const isName = kind === "name";
    const read = () => isName ? [...STAFF_SORTED] : [...STORES];
    const write = arr => isName ? saveConfig(arr, [...STORES]) : saveConfig([...STAFF], arr);
    const box = h("div", { class: "adm-listbox" });
    const addIn = h("input", { type: "text", maxlength: "40", placeholder: isName ? "New staff name" : "New store number", "aria-label": title });
    function draw() {
      box.replaceChildren(...read().map(v => h("div", { class: "adm-li" }, h("span", { text: v }),
        actions(
          btn("Rename", () => {
            const nv = h("input", { type: "text", maxlength: "40", value: v });
            modal(`Rename ${v}`, h("div", null, field("New name", nv), h("p", { class: "adm-p", text: "Existing reports and saved selections are renamed too." })), [{
              label: "Rename", cls: "primary", fn: err => {
                const val = nv.value.trim(); if (!val) return setErr(err, "Enter a value.");
                if (val !== v && read().includes(val)) return setErr(err, "That already exists.");
                if (val === v || val.includes("|")) return val === v ? true : setErr(err, "The | character is not allowed.");
                write(read().map(x => x === v ? val : x)); renameEverywhere(kind, v, val); toast("Renamed"); refresh();
              }
            }]);
          }),
          btn("Delete", () => {
            if (read().length <= 1) return toast("Keep at least one entry.", true);
            confirmBox(`Remove ${v}`, `Remove "${v}" from the dropdown? Reports already saved for it are kept.`, "Remove", () => { write(read().filter(x => x !== v)); toast("Removed"); refresh(); }, true);
          }, "danger")))));
    }
    const add = () => {
      const val = addIn.value.trim();
      if (!val) return; if (val.includes("|")) return toast("The | character is not allowed.", true);
      if (read().some(x => x.toLowerCase() === val.toLowerCase())) return toast("That already exists.", true);
      write([...read(), val]); toast("Added"); refresh();
    };
    addIn.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); add(); } });
    draw();
    return h("section", { class: "adm-panel" }, h("h3", { text: `${title} (${read().length})` }), h("div", { class: "adm-addrow" }, addIn, btn("Add", add, "primary")), box);
  }
  function lists() {
    return h("div", null, h("h2", { text: "Staff & Stores" }),
      h("p", { class: "adm-p", text: "These lists feed the Name and Store dropdowns for every account on this device." }),
      h("div", { class: "adm-two" }, listCard("Staff names", "name"), listCard("Stores", "store")));
  }

  /* ---------- Backup & Reset ---------- */
  const backupKeys = () => { const k = []; for (let i = 0; i < LS.length; i++) { const x = LS.key(i); if (x && (x === USERS_KEY || x === CONFIG_KEY || x.startsWith("bolla:"))) k.push(x); } return k; };
  function backup() {
    const file = h("input", { type: "file", accept: "application/json,.json", "aria-label": "Backup file" });
    return h("div", null, h("h2", { text: "Backup & Reset" }),
      h("section", { class: "adm-panel" }, h("h3", { text: "Download backup" }),
        h("p", { class: "adm-p", text: "Saves all accounts, reports, staff and store lists in one file. It contains password hashes, so keep it private." }),
        btn("Download full backup", () => {
          const data = {}; backupKeys().forEach(k => { data[k] = LS.getItem(k); });
          download(`Bolla_backup_${today()}.json`, JSON.stringify({ app: "bolla", version: 1, exported: new Date().toISOString(), data }, null, 1), "application/json");
        }, "primary")),
      h("section", { class: "adm-panel" }, h("h3", { text: "Restore backup" }),
        h("p", { class: "adm-p", text: "Replaces matching accounts and reports with the ones in the file. Admin password is not changed." }), file,
        btn("Restore from file", async () => {
          const f = file.files[0]; if (!f) return toast("Choose a backup file first.", true);
          let j; try { j = JSON.parse(await f.text()); } catch (_) { return toast("That file is not a valid backup.", true); }
          if (!j || j.app !== "bolla" || !j.data || typeof j.data !== "object") return toast("That file is not a Bolla backup.", true);
          const keys = Object.keys(j.data).filter(k => (k === USERS_KEY || k === CONFIG_KEY || k.startsWith("bolla:")) && typeof j.data[k] === "string");
          confirmBox("Restore backup", `Restore ${keys.length} items from this backup? Existing data with the same keys will be overwritten.`, "Restore", () => {
            keys.forEach(k => LS.setItem(k, j.data[k])); applyConfig(); toast("Backup restored"); refresh();
          }, true);
        })),
      h("section", { class: "adm-panel danger-zone" }, h("h3", { text: "Danger zone" }),
        h("p", { class: "adm-p", text: "These cannot be undone. Download a backup first." }),
        actions(
          btn("Delete ALL reports", () => typed("Delete all reports", "Every saved report for every account will be deleted. Accounts stay.", () => {
            getUsers().forEach(u => saveSheets(u.id, {})); toast("All reports deleted"); refresh();
          }), "danger"),
          btn("Delete ALL users and data", () => typed("Delete all users", "Every account and every report will be deleted. Staff/store lists and the admin password stay.", () => {
            getUsers().forEach(u => wipeUserData(u.id));
            [USERS_KEY, PRESENCE_KEY, LOCK_KEY].forEach(k => LS.removeItem(k)); LS.removeItem(SESSION_KEY); toast("All users deleted"); refresh();
          }), "danger"))));
  }
  function typed(title, text, fn) {
    const t = h("input", { type: "text", autocomplete: "off", placeholder: "DELETE" });
    modal(title, h("div", null, h("p", { class: "adm-p", text }), field("Type DELETE to confirm", t)), [{ label: "Delete", cls: "danger", fn: err => t.value.trim() === "DELETE" ? fn() : setErr(err, "Type DELETE exactly.") }]);
  }

  /* ---------- Settings ---------- */
  function settings() {
    const cur = h("input", { type: "password", autocomplete: "current-password", maxlength: "128" });
    const n1 = h("input", { type: "password", autocomplete: "new-password", maxlength: "128" });
    const n2 = h("input", { type: "password", autocomplete: "new-password", maxlength: "128" });
    const msg = h("p", { class: "auth-error", hidden: true, role: "alert" });
    async function verifyCurrent() {
      const rec = adminRec(); return rec && sameHash(await hashPassword(cur.value, rec.salt, rec.alg), rec.hash) ? rec : null;
    }
    return h("div", null, h("h2", { text: "Settings" }),
      h("section", { class: "adm-panel narrow" }, h("h3", { text: "Change admin password" }),
        field("Current password", cur), field("New password", n1), field("Confirm new password", n2), msg,
        btn("Change password", async () => {
          setErr(msg, "");
          if (!(await verifyCurrent())) return setErr(msg, "Current password is not correct.");
          if (!pwOk(n1.value)) return setErr(msg, PW_MSG);
          if (n1.value !== n2.value) return setErr(msg, "Passwords do not match.");
          const rec = adminRec(), salt = randomHex(16);
          put(ADMIN_KEY, { ...rec, salt, hash: await hashPassword(n1.value, salt, rec.alg) });
          cur.value = n1.value = n2.value = ""; toast("Admin password changed");
        }, "primary"),
        btn("Make a new recovery code", async () => {
          setErr(msg, "");
          const rec = await verifyCurrent(); if (!rec) return setErr(msg, "Enter the current password above first.");
          const code = randomHex(8), rsalt = randomHex(16);
          put(ADMIN_KEY, { ...rec, rsalt, rhash: await hashPassword(code, rsalt, rec.alg) });
          showRecovery(prettyCode(code));
        })),
      h("section", { class: "adm-panel narrow" }, h("h3", { text: "About this panel" }),
        h("p", { class: "adm-p", text: "All data lives in this browser only. The admin password protects the page, but anyone who can open this browser's developer tools on this device can still reach the stored data. For real multi-device security, a server and database are needed." })));
  }
})();
