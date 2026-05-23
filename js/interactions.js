(function () {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksWrap = document.querySelector(".nav-links");
    const cursorGlow = document.querySelector(".cursor-glow");
    const projectGrid = document.querySelector(".project-grid");
    const worksSection = document.querySelector(".works");
    let projectLoopEnabled = false;

    if (projectGrid) {
        const originalCards = Array.from(projectGrid.children);
        const cloneCards = [];

        originalCards.slice().reverse().forEach((card) => {
            const clone = card.cloneNode(true);
            clone.classList.remove("fade-up");
            clone.dataset.clone = "true";
            cloneCards.push({ clone, position: "prepend" });
        });

        originalCards.forEach((card) => {
            const clone = card.cloneNode(true);
            clone.classList.remove("fade-up");
            clone.dataset.clone = "true";
            cloneCards.push({ clone, position: "append" });
        });

        const centerProjectTrack = () => {
            projectGrid.scrollLeft = projectGrid.scrollWidth / 3;
        };

        const enableProjectLoop = () => {
            if (projectLoopEnabled) {
                return;
            }

            cloneCards.filter(({ position }) => position === "prepend").forEach(({ clone }) => {
                projectGrid.prepend(clone);
            });

            cloneCards.filter(({ position }) => position === "append").forEach(({ clone }) => {
                projectGrid.appendChild(clone);
            });

            projectLoopEnabled = true;
            worksSection?.classList.remove("is-filtered");
            requestAnimationFrame(centerProjectTrack);
        };

        const disableProjectLoop = () => {
            cloneCards.forEach(({ clone }) => clone.remove());
            projectLoopEnabled = false;
            worksSection?.classList.add("is-filtered");
            projectGrid.scrollLeft = 0;
        };

        projectGrid.projectLoopControls = {
            enable: enableProjectLoop,
            disable: disableProjectLoop
        };

        enableProjectLoop();

        projectGrid.addEventListener("scroll", () => {
            if (!projectLoopEnabled) {
                return;
            }

            const loopWidth = projectGrid.scrollWidth / 3;

            if (projectGrid.scrollLeft < loopWidth * 0.45) {
                projectGrid.scrollLeft += loopWidth;
            }

            if (projectGrid.scrollLeft > loopWidth * 1.55) {
                projectGrid.scrollLeft -= loopWidth;
            }
        });
    }

    function scrollToSection(id) {
        const target = document.getElementById(id);
        if (!target) {
            return;
        }

        const offset = 92;
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    }

    document.querySelectorAll("[data-scroll-target]").forEach((link) => {
        link.addEventListener("click", (event) => {
            const id = link.dataset.scrollTarget;
            event.preventDefault();
            document.body.classList.remove("menu-open");
            menuToggle?.setAttribute("aria-expanded", "false");
            scrollToSection(id);
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

            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });

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

    document.querySelectorAll(".filter-button").forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            if (filter === "all") {
                projectGrid?.projectLoopControls?.enable();
            } else {
                projectGrid?.projectLoopControls?.disable();
            }

            document.querySelectorAll(".project-card").forEach((card) => {
                const show = filter === "all" || card.dataset.category === filter;
                card.classList.toggle("is-hidden", !show);
            });

            if (projectGrid && filter === "all") {
                requestAnimationFrame(() => {
                    projectGrid.scrollTo({ left: projectGrid.scrollWidth / 3, behavior: "smooth" });
                });
            }
        });
    });

    document.querySelectorAll("[data-carousel]").forEach((button) => {
        button.addEventListener("click", () => {
            const carousel = projectGrid;
            const visibleCard = carousel?.querySelector(".project-card:not(.is-hidden)");
            if (!carousel || !visibleCard || !projectLoopEnabled) {
                return;
            }

            const direction = button.dataset.carousel === "next" ? 1 : -1;
            const gap = parseFloat(getComputedStyle(carousel).gap) || 16;
            const step = visibleCard.getBoundingClientRect().width + gap;
            carousel.scrollBy({ left: step * direction, behavior: "smooth" });
        });
    });

    const modal = document.getElementById("projectModal");
    const modalVisual = document.getElementById("modalVisual");
    const modalKicker = document.getElementById("modalKicker");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalMetrics = document.getElementById("modalMetrics");

    function closeModal() {
        modal?.classList.remove("is-open");
        modal?.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-open-project]").forEach((button) => {
        button.addEventListener("click", () => {
            const project = window.portfolioProjects?.[button.dataset.openProject];
            if (!project || !modal) {
                return;
            }

            modalKicker.textContent = project.kicker;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalVisual.className = `modal-visual ${project.visualClass}`;
            modalMetrics.innerHTML = project.metrics.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("");
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        });
    });

    document.querySelectorAll("[data-close-modal]").forEach((button) => {
        button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    const form = document.getElementById("contactForm");
    const formStatus = document.querySelector(".form-status");

    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        formStatus.textContent = "Message staged. Yash will get back to you soon.";
        form.reset();
    });

    function updateClock() {
        const clock = document.getElementById("liveClock");
        if (!clock) {
            return;
        }

        clock.textContent = new Intl.DateTimeFormat("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Kolkata"
        }).format(new Date());
    }

    updateClock();
    setInterval(updateClock, 30000);
})();
