(function () {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksWrap = document.querySelector(".nav-links");
    const cursorGlow = document.querySelector(".cursor-glow");
    let smoothScroller = null;
    let activeNavIndex = navLinks.findIndex((link) => link.classList.contains("active"));

    function animateNavSelection(link, direction) {
        navLinks.forEach((navLink) => {
            navLink.classList.remove("is-switching", "nav-forward", "nav-backward");
        });

        if (!navLinks.includes(link)) {
            return;
        }

        link.classList.add("is-switching", direction === "backward" ? "nav-backward" : "nav-forward");
        link.addEventListener("animationend", () => {
            link.classList.remove("is-switching", "nav-forward", "nav-backward");
        }, { once: true });
    }

    function scrollToSection(id) {
        const target = document.getElementById(id);

        if (!target) {
            return;
        }

        const offset = 92;

        if (smoothScroller) {
            smoothScroller.scrollTo(target, {
                offset: -offset,
                duration: 1.45,
                easing: (progress) => 1 - Math.pow(1 - progress, 4)
            });
            return;
        }

        window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    }

    document.querySelectorAll("[data-scroll-target]").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            document.body.classList.remove("menu-open");
            menuToggle?.setAttribute("aria-expanded", "false");
            const targetIndex = navLinks.indexOf(link);
            const direction = targetIndex < activeNavIndex ? "backward" : "forward";

            if (targetIndex >= 0) {
                activeNavIndex = targetIndex;
            }

            animateNavSelection(link, direction);
            scrollToSection(link.dataset.scrollTarget);
        });
    });

    menuToggle?.addEventListener("click", () => {
        const isOpen = document.body.classList.toggle("menu-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinksWrap?.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            document.body.classList.remove("menu-open");
            menuToggle?.setAttribute("aria-expanded", "false");
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const nextNavIndex = navLinks.findIndex((link) => link.getAttribute("href") === `#${entry.target.id}`);

            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });

            const activeLink = navLinks.find((link) => link.classList.contains("active"));

            if (activeLink && nextNavIndex !== activeNavIndex) {
                const direction = nextNavIndex < activeNavIndex ? "backward" : "forward";
                activeNavIndex = nextNavIndex;
                animateNavSelection(activeLink, direction);
            }
        });
    }, {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0.01
    });

    document.querySelectorAll(".section-observed").forEach((section) => observer.observe(section));

    document.addEventListener("pointermove", (event) => {
        document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);

        if (cursorGlow) {
            cursorGlow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
        }
    });

    document.querySelectorAll(".magnetic").forEach((element) => {
        element.addEventListener("pointermove", (event) => {
            if (prefersReducedMotion) {
                return;
            }

            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            element.style.transform = `translate(${x * 0.14}px, ${y * 0.18}px)`;
        });

        element.addEventListener("pointerleave", () => {
            element.style.transform = "";
        });
    });

    document.querySelectorAll(".ripple").forEach((element) => {
        element.addEventListener("click", (event) => {
            const rect = element.getBoundingClientRect();
            const ripple = document.createElement("span");

            ripple.className = "ripple-span";
            ripple.style.left = `${event.clientX - rect.left}px`;
            ripple.style.top = `${event.clientY - rect.top}px`;
            element.appendChild(ripple);
            ripple.addEventListener("animationend", () => ripple.remove());
        });
    });

    const liveClock = document.getElementById("liveClock");

    function updateClock() {
        if (!liveClock) {
            return;
        }

        liveClock.textContent = new Intl.DateTimeFormat("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Kolkata"
        }).format(new Date());
    }

    updateClock();
    setInterval(updateClock, 30000);

    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
    });

    if (window.Lenis && !prefersReducedMotion) {
        smoothScroller = new Lenis({
            duration: 1.15,
            smoothWheel: true
        });

        function raf(time) {
            smoothScroller.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }

    if (window.SplitType && !prefersReducedMotion) {
        new SplitType("[data-split]", { types: "words, chars" });
    }

    function revealFallback() {
        document.querySelectorAll(".fade-up").forEach((element) => {
            element.style.opacity = "1";
            element.style.transform = "none";
        });
    }

    if (window.gsap && !prefersReducedMotion) {
        gsap.registerPlugin(window.ScrollTrigger);

        gsap.from(".hero-title .char", {
            yPercent: 110,
            rotate: 8,
            opacity: 0,
            stagger: 0.014,
            duration: 1.1,
            ease: "power4.out"
        });

        document.querySelectorAll("section").forEach((section) => {
            gsap.to(section.querySelectorAll(".fade-up"), {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 1.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 72%"
                }
            });
        });

        gsap.to(".hero-visual", {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                scrub: true,
                start: "top top",
                end: "bottom top"
            }
        });

        gsap.to(".sphere", {
            rotate: 26,
            scale: 0.94,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                scrub: true,
                start: "top top",
                end: "bottom top"
            }
        });

        const chapterMotion = document.querySelector("#about .chapter-motion");

        if (chapterMotion) {
            gsap.to(chapterMotion, {
                y: () => {
                    const section = document.getElementById("about");

                    if (!section) {
                        return 0;
                    }

                    const available = section.offsetHeight - chapterMotion.offsetHeight - 180;
                    return Math.max(0, Math.min(available, window.innerHeight * 0.42));
                },
                ease: "none",
                scrollTrigger: {
                    trigger: "#about",
                    start: "top top+=96",
                    end: "bottom bottom",
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        }
    } else {
        revealFallback();
    }

    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
            document.querySelectorAll(".fade-up").forEach((el) => {
                if (getComputedStyle(el).opacity === "0") {
                    el.style.opacity = "1";
                    el.style.transform = "none";
                }
            });
        }, 2000);
    });

    if (window.VanillaTilt && !prefersReducedMotion) {
        document.querySelectorAll("[data-tilt-card]").forEach((el) => {
            VanillaTilt.init(el, {
                max: 7,
                speed: 700,
                glare: true,
                "max-glare": 0.12
            });
        });
    }

    const contactForm = document.getElementById("contact-form");
    const contactStatus = document.querySelector(".form-status");

    if (contactForm && contactStatus) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const label = submitBtn?.querySelector(".button-label");
            const originalText = label ? label.textContent : submitBtn?.textContent || "Send Message";

            if (submitBtn) {
                submitBtn.disabled = true;
            }

            if (label) {
                label.textContent = "SENT";
            } else if (submitBtn) {
                submitBtn.textContent = "SENT";
            }

            contactStatus.textContent = "Message captured. Please use email or phone for the quickest reply.";
            contactForm.reset();

            window.setTimeout(() => {
                if (label) {
                    label.textContent = originalText;
                } else if (submitBtn) {
                    submitBtn.textContent = originalText;
                }

                if (submitBtn) {
                    submitBtn.disabled = false;
                }

                contactStatus.textContent = "";
            }, 3000);
        });
    }
})();
