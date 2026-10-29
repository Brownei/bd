/* ANGEL — THE BIRTHDAY TAPE : motion controller */
(() => {
  "use strict";

  /* resilience: no GSAP (CDN blocked) → show the page statically */
  if (!window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.add("no-motion");
    document.body.classList.remove("locked");
    const pre = document.getElementById("preloader");
    if (pre) pre.remove();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const R = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pre = document.getElementById("preloader");
  const countEl = document.getElementById("preCount");
  const barEl = document.getElementById("preBar");
  const wipeA = document.querySelector(".wipe--a");
  const wipeB = document.querySelector(".wipe--b");
  const railStrip = document.getElementById("railStrip");
  const railLine = document.getElementById("railLine");
  const hudTime = document.getElementById("hudTime");
  const railTc = document.getElementById("railTc");

  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  document.body.classList.add("locked");

  /* — geometry of the intro / exit gestures — */
  gsap.set([wipeA, wipeB], { yPercent: 106, y: 0 });

  /* ————————————————— media wiring: real files when present,
     honest "SIGNAL LOST" placeholders until then ———————— */
  const stills = [...document.querySelectorAll(".still")];
  const imgLoads = [];

  stills.forEach((still) => {
    const src = still.dataset.photo;
    if (!src) return;
    const img = still.querySelector("img");
    const video = still.querySelector("video");
    const media = img || video;
    if (!media) return;
    if (img) {
      imgLoads.push(
        new Promise((resolve) => {
          img.addEventListener("load", () => {
            img.classList.add("is-loaded");
            still.classList.add("is-openable");
            resolve();
          }, { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        })
      );
      img.src = src;
    } else {
      media.addEventListener("loadeddata", () => {
        media.classList.add("is-loaded");
        still.classList.add("is-openable");
      }, { once: true });
      media.src = src;
    }
  });

  /* ————————————————— preloader: 0 → 100 at the bottom edge ————— */
  const D = (n) => (R ? 0.001 : n);

  function runCounter(seconds, onDone) {
    const state = { n: 0 };
    gsap.to(state, {
      n: 100,
      duration: seconds,
      ease: "power2.inOut",
      onUpdate() {
        countEl.textContent = String(Math.round(state.n)).padStart(3, "0");
        barEl.style.transform = `scaleX(${state.n / 100})`;
      },
      onComplete: onDone,
    });
  }

  function hidePreloader() {
    document.body.classList.remove("locked");
    gsap.set(pre, { display: "none" });
  }

  function entrance() {
    const heroLetters = gsap.utils.toArray(".hero-name .n__in");
    const heroCards = gsap.utils.toArray(".hero-cards .still");

    return gsap.timeline({ defaults: { ease: "expo.out" } })
      .to([".pre-title", ".pre-bottom", ".pre-osd", "#preBar"], {
        opacity: 0, y: -26, duration: D(0.35), ease: "power2.in", stagger: 0.04,
      })
      .to(wipeA, { yPercent: -114, duration: D(0.55), ease: "power3.in" }, ">")
      .to(wipeB, { yPercent: -114, duration: D(0.55), ease: "power3.in" }, "<0.13")
      .add(hidePreloader, "+=0.05")
      .from(heroCards, {
        opacity: 0, y: 90, scale: 0.92, duration: D(1.05), stagger: 0.09,
        clearProps: "opacity,scale",
      }, "-=0.25")
      .to(heroLetters, {
        y: 0, duration: D(1.15), stagger: { each: 0.07, from: "start" },
      }, "<0.1")
      .from(".hero-osd", { opacity: 0, y: 14, duration: D(0.7) }, "-=0.5")
      .from(".hud", { opacity: 0, duration: D(0.8) }, "<");
  }

  const waitFonts = (document.fonts && document.fonts.ready) || Promise.resolve();
  const capped = Promise.race([
    Promise.allSettled(imgLoads),
    new Promise((resolve) => setTimeout(resolve, 2800)),
  ]);

  runCounter(D(2.6), () => {
    capped.then(() => waitFonts).then(() => {
      if (R) { hidePreloader(); return; }
      entrance();
      startBelowTheFold();
    });
  });

  if (R) { capped.then(() => { hidePreloader(); startBelowTheFoldStatic(); }); }

  /* ————————————————— hero collage: plaster that shifts on its own — */
  let heroAwake = true;

  function startCollage() {
    const cards = gsap.utils.toArray(".hero-cards .still");

    if (R) return;

    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      onToggle(self) { heroAwake = self.isActive; },
    });

    // scroll drift — deeper cards travel further
    cards.forEach((card) => {
      gsap.to(card, {
        y: -(90 * (parseFloat(getComputedStyle(card).getPropertyValue("--depth")) || 1)),
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
      });
    });

    // pointer parallax on x only (y belongs to the scroll)
    const movers = cards.map((card) => ({
      x: gsap.quickTo(card, "x", { duration: 0.9, ease: "power3.out" }),
      depth: parseFloat(getComputedStyle(card).getPropertyValue("--depth")) || 1,
    }));
    window.addEventListener("pointermove", (e) => {
      const dx = e.clientX / window.innerWidth - 0.5;
      movers.forEach((m) => m.x(dx * -34 * m.depth));
    }, { passive: true });

    // the shuffle: every beat, a card dips and returns as a “new” plastering
    setInterval(() => {
      if (!heroAwake || document.hidden) return;
      const card = cards[Math.floor(Math.random() * cards.length)];
      const tilt = gsap.utils.random(-9, 9, 1);
      gsap.timeline()
        .to(card, { opacity: 0.22, scale: 0.93, duration: 0.5, ease: "power2.in" })
        .add(() => gsap.set(card, { rotation: tilt }))
        .to(card, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" });
    }, 1700);
  }

  /* ————————————————— memory chunks: rail names the chapter —————————— */
  const chunkSpans = [...railStrip.children];
  let currentChunk = null;

  function setChunk(raw) {
    const name = (raw || "").trim();
    if (!name || name === currentChunk) return;
    currentChunk = name;
    const i = chunkSpans.findIndex((s) => s.textContent.trim() === name);
    if (i < 0) return;
    // re-measure on every change: webfont metrics can shift after first load
    const step = chunkSpans[0].offsetHeight || chunkSpans[0].getBoundingClientRect().height;
    gsap.to(railStrip, {
      y: -i * step,
      duration: R ? 0.001 : 0.55,
      ease: "power4.out",
      overwrite: "auto",
    });
    if (!R) gsap.fromTo(railStrip, { skewY: 2 }, { skewY: 0, duration: 0.55, ease: "power3.out", overwrite: false });
  }

  function startReel() {
    const panels = gsap.utils.toArray(".panel");

    panels.forEach((panel) => {
      if (R) return;

      // reveal: opacity/scale/clip only — the scrub tween owns y below
      gsap.from(panel.querySelectorAll(".still"), {
        opacity: 0,
        scale: 0.94,
        clipPath: "inset(46% 16% 46% 16% round var(--radius))",
        duration: 1.15,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: panel, start: "top 68%" },
      });

      // tape-paced parallax; the larger frames drift deeper
      panel.querySelectorAll(".still").forEach((still) => {
        const deep = still.classList.contains("pv-lg") ? 70 : 34;
        gsap.fromTo(still, { y: deep }, {
          y: -deep,
          ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // the 2025 video frame scales up as it takes the stage
      const tape = panel.querySelector(".tape-video");
      if (tape) {
        gsap.fromTo(tape, { scale: 0.82, y: 50 }, {
          scale: 1, y: 0,
          ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "center center", scrub: true },
        });
      }
    });
  }

  /* ————————————————— transport: timecode + tape progress ————————— */
  function fmtTimecode(p) {
    const total = Math.round(p * 27 * 60 * 25); // 27 min at 25 fps of personal footage
    const f = total % 25;
    const s = Math.floor(total / 25) % 60;
    const m = Math.floor(total / (25 * 60)) % 60;
    const h = Math.floor(total / (25 * 3600));
    const two = (n) => String(n).padStart(2, "0");
    return `${two(h)}:${two(m)}:${two(s)}:${two(f)}`;
  }

  function startTransport() {
    ScrollTrigger.create({
      trigger: ".panels",
      start: "top 65%",
      end: "bottom 65%",
      onUpdate(self) {
        const p = self.progress;
        const tc = fmtTimecode(p);
        hudTime.textContent = tc;
        railTc.textContent = tc;
        railLine.style.transform = `scaleX(${p})`;
        // the chunk name tracks the tape itself: one panel = one memory chunk
        const idx = Math.min(chunkSpans.length - 1, Math.round(p * (chunkSpans.length - 1)));
        setChunk(chunkSpans[idx].textContent);
      },
    });

    const video = document.querySelector(".tape-video video");
    if (video && video.dataset) {
      ScrollTrigger.create({
        trigger: ".tape-video",
        start: "top 92%",
        end: "bottom 8%",
        onEnter: () => video.play().catch(() => {}),
        onEnterBack: () => video.play().catch(() => {}),
        onLeaveBack: () => video.pause(),
        onLeave: () => video.pause(),
      });
    }
  }

  /* ————————————————— epilogue + signature ————————————————————————— */
  function startClosing() {
    gsap.to(".epi-line span", {
      y: 0,
      duration: R ? 0.001 : 1.0,
      stagger: R ? 0 : 0.085,
      ease: "expo.out",
      scrollTrigger: { trigger: ".epilogue", start: "top 72%" },
    });

    gsap.to(".flourish path", {
      strokeDashoffset: 0,
      duration: R ? 0.001 : 1.5,
      ease: "power2.inOut",
      scrollTrigger: { trigger: ".signoff", start: "top 78%" },
    });

    gsap.from(".signature, .signoff-osd", {
      opacity: 0, y: 26, duration: R ? 0.001 : 1.1, ease: "expo.out", stagger: 0.12,
      scrollTrigger: { trigger: ".signoff", start: "top 75%" },
    });
  }

  /* ————————————————— lightbox: a frame called up full-screen ———————— */
  function startLightbox() {
    const lb = document.getElementById("lightbox");
    const bg = document.getElementById("lightboxBg");
    const stage = document.getElementById("lightboxStage");
    const img = document.getElementById("lbImg");
    const video = document.getElementById("lbVideo");
    const label = document.getElementById("lbLabel");
    const tc = document.getElementById("lbTc");
    const sound = document.getElementById("lbSound");
    const closeBtn = document.getElementById("lbClose");
    if (!lb) return;

    let lastFocus = null;
    let openMedia = null; // "img" | "video"

    function mediaReady(still) {
      return still.querySelector("img.is-loaded") || still.querySelector("video.is-loaded");
    }

    function stampOf(still) {
      const videoOsd = still.querySelector(".tape-video__osd");
      if (videoOsd) return ["ARCHIVE REEL", "VIDEO · AUTOPLAY"];
      const cap = still.querySelector(".stamp");
      if (!cap) return ["FR 00", "PLAYBACK"];
      return [...cap.querySelectorAll("span")].map((s) => s.textContent);
    }

    function open(still) {
      lastFocus = document.activeElement;
      const ready = mediaReady(still);
      const isVideo = ready === video;
      const src = still.dataset.photo;
      openMedia = isVideo ? "video" : "img";
      img.hidden = isVideo;
      video.hidden = !isVideo;
      sound.hidden = !isVideo;
      if (isVideo) {
        video.src = (still.querySelector("video").currentSrc) || src;
        video.muted = true;
        sound.textContent = "♪ SOUND OFF";
        video.play().catch(() => {});
      } else {
        img.removeAttribute("hidden");
        img.src = src;
        video.pause();
      }
      const [code, time] = stampOf(still);
      label.textContent = `PLAYBACK · ${code}`;
      tc.textContent = `LARGE FRAME · ${time}`;

      document.body.classList.add("locked");
      lb.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add("open")));
      closeBtn.focus({ preventScroll: true });
    }

    function close() {
      lb.classList.remove("open");
      const finish = () => {
        lb.hidden = true;
        if (openMedia === "video") video.pause();
        document.body.classList.remove("locked");
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
        openMedia = null;
      };
      R ? finish() : setTimeout(finish, 380);
    }

    stills.forEach((still) => {
      still.classList.add("is-openable");
      still.addEventListener("click", (e) => {
        if (!mediaReady(still)) return;
        e.preventDefault();
        open(still);
      });
    });

    closeBtn.addEventListener("click", close);
    bg.addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lb.hidden) close();
    });

    sound.addEventListener("click", () => {
      if (!video.hidden) {
        video.muted = !video.muted;
        sound.textContent = video.muted ? "♪ SOUND OFF" : "♪ SOUND ON";
      }
    });

    stage.addEventListener("click", (e) => {
      if (e.target === stage || e.target.classList.contains("lb-frame")) close();
    });
  }

  /* ————————————————— boot ordering ————————————————————————————————— */
  function startBelowTheFold() {
    startCollage();
    startReel();
    startTransport();
    startClosing();
    startLightbox();
  }
  function startBelowTheFoldStatic() {
    startReel();
    startTransport();
    startClosing();
    startLightbox();
  }

  /* ————————————————— replay — the tape rewinds with a fresh load ———— */
  document.getElementById("replayBtn").addEventListener("click", () => {
    location.reload();
  });
})();
