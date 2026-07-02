const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");

if (navToggle && nav && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && window.gsap) {
  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const heroTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.9
    }
  });

  gsap.set(".site-header", { y: -16, opacity: 0 });
  gsap.set(".hero-media", {
    clipPath: "inset(0 0 100% 0)",
    filter: "saturate(0.92) brightness(0.96)",
    scale: 1.035,
    transformOrigin: "center center"
  });
  gsap.set(".hero-edge", {
    scaleX: 0,
    transformOrigin: "left center"
  });
  gsap.set(".hero-sweep", {
    xPercent: -160,
    opacity: 0,
    rotate: 10
  });
  gsap.set([".eyebrow", ".hero h1", ".hero-lead", ".hero-actions"], {
    y: 22,
    opacity: 0
  });

  heroTimeline
    .to(".site-header", { y: 0, opacity: 1, duration: 0.55 })
    .to(
      ".hero-media",
      {
        clipPath: "inset(0 0 0% 0)",
        filter: "saturate(1) brightness(1)",
        scale: 1,
        duration: 1.15
      },
      "-=0.18"
    )
    .to(
      ".hero-edge-cyan",
      {
        scaleX: 1,
        duration: 0.85,
        ease: "power2.out"
      },
      "-=0.95"
    )
    .to(
      ".hero-edge-magenta",
      {
        scaleX: 1,
        duration: 0.85,
        ease: "power2.out"
      },
      "-=0.76"
    )
    .to(
      ".hero-sweep",
      {
        xPercent: 640,
        opacity: 1,
        duration: 0.92,
        ease: "power2.inOut"
      },
      "-=0.88"
    )
    .to(
      ".hero-sweep",
      {
        opacity: 0,
        duration: 0.24
      },
      "-=0.2"
    )
    .to(
      [".eyebrow", ".hero h1", ".hero-lead", ".hero-actions"],
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.72
      },
      "-=0.58"
    );

  if (window.ScrollTrigger) {
    const revealGroups = [
      ".intro-section .section-kicker",
      ".intro-grid > *",
      ".priority-band > .section-kicker",
      ".priority-grid article",
      ".updates-heading > *",
      ".updates-grid .update-card",
      ".contact-section > *",
      ".site-footer > *"
    ];

    revealGroups.forEach((selector) => {
      gsap.utils.toArray(selector).forEach((element, index) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 34,
          duration: 0.72,
          delay: Math.min(index * 0.07, 0.21),
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true
          }
        });
      });
    });

    gsap.utils.toArray(".profile-facts div").forEach((row, index) => {
      gsap.from(row, {
        autoAlpha: 0,
        x: 22,
        duration: 0.56,
        delay: index * 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".profile-facts",
          start: "top 84%",
          once: true
        }
      });
    });
  }
}
