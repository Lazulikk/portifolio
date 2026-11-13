(() => {
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const marks = s => esc(s).replace(/\[\[(.+?)\]\]/g, "<mark>$1</mark>");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- letras de recorte ----------
  function rng(seed) { let s = seed >>> 0 || 1; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }
  function hash(str) { let h = 2166136261; for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h; }
  function ransom(el, text, seed = hash(text)) {
    const r = rng(seed);
    el.setAttribute("aria-label", text.replace(/\n/g, " "));
    el.innerHTML = text.split(/[\n ]+/).map(word =>
      `<span class="w" aria-hidden="true">${[...word].map((ch, i) => {
        const pick = r();
        const s = i === 0 && r() < .6 ? (r() < .5 ? 1 : 2) : pick < .42 ? 0 : pick < .58 ? 1 : pick < .7 ? 2 : pick < .82 ? 3 : pick < .94 ? 4 : 5;
        const rot = ((r() - .5) * 12).toFixed(1), y = ((r() - .5) * 6).toFixed(1), sz = (.86 + r() * .28).toFixed(2);
        return `<span class="l s${s}" style="transform:translateY(${y}%) rotate(${rot}deg);font-size:${sz}em;--r2:${-rot}deg">${esc(ch)}</span>`;
      }).join("")}</span>`).join("");
  }

  // ---------- preencher conteúdo ----------
  $("#tagLeft").textContent = `PORTFÓLIO // ${D.nomeCurto}`;
  $("#tagRight").textContent = D.local;
  $("#tagline").textContent = D.tagline;
  ransom($("#nome"), D.nome);
  $("#bio").textContent = D.bio;
  $$(".menu a, [data-word]").forEach(el => ransom(el, el.dataset.word));

  const card = (p, light) => {
    const [first, ...rest] = String(p.titulo).split(" ");
    // sem url = card sem link (ex.: repositório privado)
    const tagName = p.url ? "a" : "div";
    const attrs = p.url ? ` href="${esc(p.url)}" target="_blank" rel="noopener"` : "";
    return `<${tagName} class="card${light ? " light" : ""}"${attrs}>
      ${p.tag ? `<span class="badge">${esc(p.tag)}</span>` : ""}
      <h4><b>${esc(first)}</b> ${esc(rest.join(" "))}</h4>
      <p>${esc(p.desc || "Sem descrição ainda — o código fala por si.")}</p>
      <div class="foot"><span>${esc(p.status ?? "")}</span>${p.url ? `<span class="go">${esc(p.acao || "VER NO GITHUB")} →</span>` : ""}</div></${tagName}>`;
  };
  $("#destaques").innerHTML = D.destaques.map(p => card(p, false)).join("");

  const renderRepos = (list, live) => {
    $("#repos").innerHTML = list.map(r => card({ titulo: r.titulo.replace(/[-_]/g, " "), desc: r.desc, tag: r.lang || "REPO", status: `★ ${r.estrelas}`, url: r.url }, true)).join("");
    $("#repoMeta").textContent = `${list.length} REPOSITÓRIOS${live ? " · AO VIVO DO GITHUB" : ""}`;
  };
  renderRepos(D.repositorios, false);
  if (D.githubUser) {
    fetch(`https://api.github.com/users/${encodeURIComponent(D.githubUser)}/repos?sort=updated&per_page=12`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(rs => rs.filter(r => !r.fork).length && renderRepos(rs.filter(r => !r.fork).map(r => ({
        titulo: r.name, desc: r.description, lang: r.language, estrelas: r.stargazers_count, url: r.html_url })), true))
      .catch(() => {});
  }

  $("#skillGroups").innerHTML = D.skills.map(g => `<div class="group"><h3>${esc(g.grupo)}</h3>${g.itens.map(([n, v]) =>
    `<div class="row"><span>${esc(n)}</span><div class="bar" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}" aria-label="${esc(n)}"><i data-v="${v}"></i></div><output>0</output></div>`).join("")}</div>`).join("");

  const ini = D.nomeCurto.split(/\s+/).map(w => w[0]).join("").slice(0, 2);
  $("#foto").innerHTML = D.foto ? `<img src="${esc(D.foto)}" alt="Foto de ${esc(D.nomeCurto)}">` : esc(ini);
  $("#sobreTexto").innerHTML = D.sobre.map(p => `<p>${marks(p)}</p>`).join("");
  if (D.citacao?.texto) $("#citacao").innerHTML = `<q>${esc(D.citacao.texto)}</q><cite>— ${esc(D.citacao.autor)}</cite>`;
  else $("#citacao").remove();

  $("#contatoTexto").innerHTML = marks(D.contatoTexto);
  $("#links").innerHTML = [{ rotulo: "E-MAIL", url: `mailto:${D.email}`, icone: "✉" }, ...D.links]
    .map(l => `<a href="${esc(l.url)}"${l.url.startsWith("mailto") ? "" : ' target="_blank" rel="noopener"'}>${esc(l.rotulo)} ${esc(l.icone)}</a>`).join("");

  $("#form").addEventListener("submit", async e => {
    e.preventDefault();
    const f = e.target, st = $("#formStatus"), data = Object.fromEntries(new FormData(f));
    if (!D.formspree) {
      location.href = `mailto:${D.email}?subject=${encodeURIComponent("Contato pelo portfólio — " + data.nome)}&body=${encodeURIComponent(data.mensagem + "\n\n" + data.nome + " <" + data.email + ">")}`;
      return;
    }
    st.textContent = "ENVIANDO…";
    try {
      const r = await fetch(D.formspree, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(f) });
      if (!r.ok) throw 0;
      f.reset(); st.textContent = "MENSAGEM ENVIADA! ✦";
    } catch { st.textContent = `NÃO FOI DESSA VEZ — ME ESCREVE EM ${D.email}`; }
  });

  // ---------- relógio ----------
  const tick = () => $("#clock").textContent = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) + " · BRT";
  tick(); setInterval(tick, 15000);

  // ---------- efeitos de canvas ----------
  function canvasFx(canvas, make, draw, count) {
    const ctx = canvas.getContext("2d"); let W, H, items = [], running = false, raf;
    const size = () => { const dpr = Math.min(devicePixelRatio, 2); W = canvas.width = innerWidth * dpr; H = canvas.height = innerHeight * dpr; items = Array.from({ length: count() }, () => make(W, H, true)); };
    addEventListener("resize", size); size();
    const loop = () => { ctx.clearRect(0, 0, W, H); items.forEach((p, i) => { if (draw(ctx, p, W, H)) items[i] = make(W, H, false); }); if (running) raf = requestAnimationFrame(loop); };
    return { start() { if (!running && !reduced) { running = true; loop(); } }, stop() { running = false; cancelAnimationFrame(raf); } };
  }
  const bubbles = canvasFx($("#bubbles"),
    (W, H, init) => ({ x: Math.random() * W, y: init ? Math.random() * H : H + 40, r: 3 + Math.random() ** 2 * 26, v: .4 + Math.random() * 1.4, a: Math.random() * 6.28, fill: Math.random() < .35 }),
    (c, p, W, H) => {
      p.y -= p.v * 1.4; p.a += .02; const x = p.x + Math.sin(p.a) * 14;
      c.beginPath(); c.arc(x, p.y, p.r, 0, 6.283);
      if (p.fill) { c.fillStyle = "rgba(180,240,255,.28)"; c.fill(); }
      c.lineWidth = 2; c.strokeStyle = "rgba(255,255,255,.75)"; c.stroke();
      c.beginPath(); c.arc(x - p.r * .35, p.y - p.r * .35, p.r * .22, 0, 6.283); c.fillStyle = "rgba(255,255,255,.85)"; c.fill();
      return p.y < -p.r * 2;
    }, () => Math.round(innerWidth / 28));
  const shards = canvasFx($("#shards"),
    (W, H, init) => ({ x: Math.random() * W, y: init ? Math.random() * H : -40, s: 6 + Math.random() * 22, v: .3 + Math.random() * .9, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .03, col: ["#1fc4f0", "#ffffff", "#0a0d14", "#1747e0"][Math.random() * 4 | 0] }),
    (c, p, W, H) => {
      p.y += p.v; p.x -= p.v * .5; p.rot += p.vr;
      c.save(); c.translate(p.x, p.y); c.rotate(p.rot); c.globalAlpha = .8;
      c.beginPath(); c.moveTo(0, -p.s); c.lineTo(p.s * .8, p.s * .6); c.lineTo(-p.s * .7, p.s * .4); c.closePath(); c.fillStyle = p.col; c.fill(); c.restore();
      return p.y > H + 40 || p.x < -40;
    }, () => Math.round(innerWidth / 70));

  // ---------- navegação ----------
  const screens = ["home", "projetos", "skills", "sobre", "contato"];
  const inner = screens.slice(1);
  const LABEL = { home: "INÍCIO", projetos: "PROJETOS", skills: "SKILLS", sobre: "SOBRE", contato: "CONTATO" };
  // combinação de efeitos de cada tela
  const FX = {
    home:     ["tint", "halftone", "bubbles"],
    projetos: ["tint", "dots", "streaks", "bubbles"],
    skills:   ["tint", "halftone", "scan", "shards"],
    sobre:    ["tint", "halftone", "streaks", "shards"],
    contato:  ["tint", "halftone", "streaks", "scan", "shards"]
  };
  const go = name => { location.hash = "#" + name; };
  const neighbor = (name, d) => inner[(inner.indexOf(name) + d + inner.length) % inner.length];
  let current = null;

  function renderKeys(name) {
    const btn = (act, key, label, cls = "") => `<button type="button" class="${cls}" data-act="${act}"><kbd>${key}</kbd><span>${label}</span></button>`;
    $("#keys").innerHTML = name === "home"
      ? btn("up", "↑", "ACIMA") + btn("down", "↓", "ABAIXO") + btn("enter", "ENTER", "CONFIRMAR", "main")
      : btn("prev", "←", "◀ " + LABEL[neighbor(name, -1)]) + btn("next", "→", LABEL[neighbor(name, 1)] + " ▶") + btn("back", "ESC", "VOLTAR AO INÍCIO", "main");
  }
  $("#keys").addEventListener("click", e => {
    const act = e.target.closest("button")?.dataset.act;
    if (act === "up") setSel(sel - 1);
    else if (act === "down") setSel(sel + 1);
    else if (act === "enter") location.hash = items[sel].hash;
    else if (act === "prev") go(neighbor(current, -1));
    else if (act === "next") go(neighbor(current, 1));
    else if (act === "back") go("home");
  });
  function show(name, animate) {
    if (!screens.includes(name)) name = "home";
    if (name === current) return;
    const swap = () => {
      $$(".screen").forEach(s => { s.hidden = s.id !== name; s.classList.remove("enter"); });
      const el = $("#" + name); void el.offsetWidth; el.classList.add("enter"); el.scrollTop = 0;
      $$(".bg").forEach(v => {
        const on = v.dataset.screen === name; v.classList.toggle("on", on);
        if (on) { if (v.preload === "none") v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
      });
      document.body.dataset.screen = name;
      const fx = FX[name];
      $$(".fx-l").forEach(l => l.classList.toggle("on", fx.some(k => l.classList.contains(k) || l.id === k)));
      fx.includes("bubbles") ? bubbles.start() : bubbles.stop();
      fx.includes("shards") ? shards.start() : shards.stop();
      renderKeys(name);
      $("#backTop").hidden = name === "home";
      $$(".bar i").forEach(b => b.style.transform = "scaleX(0)");
      if (name === "skills") setTimeout(fillBars, 250);
      if (name === "home") setSel(sel);
      current = name;
    };
    if (animate && !reduced) {
      const w = $("#wipe"); w.classList.remove("go"); void w.offsetWidth; w.classList.add("go");
      setTimeout(swap, 300);
    } else swap();
  }
  function fillBars() {
    $$(".bar i").forEach((b, i) => {
      const v = +b.dataset.v, out = b.closest(".row").querySelector("output");
      setTimeout(() => {
        b.style.transform = `scaleX(${v / 100})`;
        const t0 = performance.now();
        const step = t => { const k = Math.max(0, Math.min(1, (t - t0) / 1100)); out.textContent = Math.round(v * (1 - (1 - k) ** 3)); if (k < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }, i * 45);
    });
  }

  const items = $$("#menu a");
  let sel = 0;
  function setSel(i) {
    sel = (i + items.length) % items.length;
    items.forEach((a, k) => a.classList.toggle("sel", k === sel));
  }
  items.forEach((a, i) => {
    a.addEventListener("mouseenter", () => { if (sel !== i) { setSel(i); ransom(a, a.dataset.word, Math.random() * 1e9); } });
    a.addEventListener("focus", () => setSel(i));
  });
  setSel(0);

  addEventListener("keydown", e => {
    if (e.target.closest("input, textarea")) { if (e.key === "Escape") e.target.blur(); return; }
    if (e.key === "p" || e.key === "P") { music.toggle(); return; }
    if (e.key === "m" || e.key === "M") { music.mute(); return; }
    if (e.key === "+" || e.key === "=") { music.nudge(10); return; }
    if (e.key === "-" || e.key === "_") { music.nudge(-10); return; }
    if (e.target.closest(".sound-box")) return;
    if (e.key === "Escape" && !$("#player").hidden) { music.close(); return; }
    if (current === "home") {
      if (e.key === "ArrowDown") { e.preventDefault(); setSel(sel + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSel(sel - 1); }
      else if (e.key === "Enter" && !e.target.closest("a, button")) location.hash = items[sel].hash;
    } else if (e.key === "Escape" || e.key === "Backspace") go("home");
    else if (e.key === "ArrowLeft") go(neighbor(current, -1));
    else if (e.key === "ArrowRight") go(neighbor(current, 1));
  });

  // ---------- trilha sonora ----------
  const music = (() => {
    const list = D.musicas || [], audio = $("#audio"), panel = $("#player"), btn = $("#musicBtn");
    const store = { get(k) { try { return localStorage.getItem("p3-" + k); } catch { return null; } },
                    set(k, v) { try { localStorage.setItem("p3-" + k, v); } catch {} } };
    let idx = Math.min(+store.get("faixa") || 0, Math.max(list.length - 1, 0)), seeking = false;
    const fmt = s => isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00";
    if (!list.length) { btn.hidden = true; return { toggle() {}, close() {} }; }

    $("#tracks").innerHTML = list.map((m, i) => `<li><button type="button" data-i="${i}">${esc(m.titulo)}<small>${esc(m.artista || "")}</small></button></li>`).join("");
    // ---- volume / mudo (caixa de som) ----
    const box = $(".sound-box"), range = $("#vol");
    function setVol(v) {
      v = Math.max(0, Math.min(100, Math.round(v)));
      range.value = v; range.style.setProperty("--p", v + "%");
      $("#volOut").textContent = v;
      audio.volume = v / 100; store.set("volume", v);
      if (v > 0 && audio.muted) setMute(false);
    }
    function setMute(m) {
      audio.muted = m; store.set("mudo", m ? "1" : "0");
      box.classList.toggle("muted", m);
      $("#mute").setAttribute("aria-pressed", m);
      $("#mute").setAttribute("aria-label", m ? "Ativar som" : "Silenciar");
    }
    setVol(+(store.get("volume") ?? 60));
    setMute(store.get("mudo") === "1");
    range.addEventListener("input", () => setVol(+range.value));
    $("#volDown").addEventListener("click", () => setVol(+range.value - 10));
    $("#volUp").addEventListener("click", () => setVol(+range.value + 10));
    $("#mute").addEventListener("click", () => { setMute(!audio.muted); if (!audio.muted && audio.paused) toggle(); });

    function load(i, play) {
      idx = (i + list.length) % list.length; store.set("faixa", idx);
      audio.src = list[idx].arquivo;
      $("#npTitle").textContent = list[idx].titulo;
      $("#npArtist").textContent = list[idx].artista || "";
      $$("#tracks button").forEach((b, k) => { b.classList.toggle("cur", k === idx); b.setAttribute("aria-current", k === idx); });
      if (play) { started = true; audio.play().catch(() => {}); }
    }
    const sync = () => {
      const on = !audio.paused;
      document.body.classList.toggle("playing", on);
      $("#play").textContent = on ? "❚❚" : "▶";
      $("#play").setAttribute("aria-label", on ? "Pausar" : "Tocar");
    };
    let started = false;
    const toggle = () => {
      started = true;
      if (audio.paused) audio.play().catch(() => {});
      else { audio.pause(); store.set("pausado", "1"); }
    };
    const open = () => { panel.hidden = false; btn.setAttribute("aria-expanded", "true"); };
    const close = () => { panel.hidden = true; btn.setAttribute("aria-expanded", "false"); btn.focus(); };

    // primeiro clique no ícone abre o painel e já começa a tocar
    btn.addEventListener("click", () => { if (panel.hidden) { open(); if (!started) toggle(); } else close(); });
    $("#playerClose").addEventListener("click", close);
    $("#play").addEventListener("click", toggle);
    $("#prev").addEventListener("click", () => audio.currentTime > 3 ? (audio.currentTime = 0) : load(idx - 1, true));
    $("#next").addEventListener("click", () => load(idx + 1, true));
    $("#tracks").addEventListener("click", e => { const b = e.target.closest("button"); if (b) load(+b.dataset.i, true); });
    $("#seek").addEventListener("input", e => { seeking = true; $("#tCur").textContent = fmt(audio.duration * e.target.value / 1000); });
    $("#seek").addEventListener("change", e => { if (isFinite(audio.duration)) audio.currentTime = audio.duration * e.target.value / 1000; seeking = false; });
    audio.addEventListener("timeupdate", () => {
      if (seeking) return;
      $("#tCur").textContent = fmt(audio.currentTime);
      $("#seek").value = audio.duration ? audio.currentTime / audio.duration * 1000 : 0;
    });
    audio.addEventListener("loadedmetadata", () => $("#tDur").textContent = fmt(audio.duration));
    audio.addEventListener("ended", () => load(idx + 1, true));
    audio.addEventListener("play", sync); audio.addEventListener("pause", sync);
    document.addEventListener("click", e => { if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) { panel.hidden = true; btn.setAttribute("aria-expanded", "false"); } });

    load(idx, false);

    // Navegadores bloqueiam som antes de a pessoa interagir com a página.
    // Então: tenta tocar já; se for bloqueado, começa no primeiro clique/tecla/toque em qualquer lugar.
    // Quem pausou de propósito na visita anterior não é surpreendido.
    if (store.get("pausado") !== "1") {
      started = true;
      audio.play().catch(() => {
        started = false;
        const kick = e => {
          if (started || e.target.closest?.(".mute, .music-btn, #player")) return off();
          started = true; audio.play().catch(() => {}); off();
        };
        const off = () => ["pointerdown", "keydown", "touchstart"].forEach(t => removeEventListener(t, kick, true));
        ["pointerdown", "keydown", "touchstart"].forEach(t => addEventListener(t, kick, true));
      });
    }
    audio.addEventListener("playing", () => store.set("pausado", "0"));

    const nudge = d => setVol(+range.value + d);
    return { toggle, close, mute: () => setMute(!audio.muted), nudge };
  })();

  addEventListener("hashchange", () => show(location.hash.slice(1), true));
  show(location.hash.slice(1) || "home", false);
})();
