(function () {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksWrap = document.querySelector(".nav-links");
    const cursorGlow = document.querySelector(".cursor-glow");
    const projectGrid = document.querySelector(".project-grid");
    const worksSection = document.querySelector(".works");

    const projectSwiper = new Swiper(".project-swiper", {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 700,
        loop: true,
        loopAdditionalSlides: 2,
        effect: "slide",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
        },
        on: {
            init: function () {
                this.slides.forEach((slide, idx) => {
                    slide.style.transitionDelay = `${idx * 80}ms`;
                });
            },
            slideChange: function () {
                this.slides.forEach((slide) => {
                    slide.style.transitionDelay = "0ms";
                });
            },
        },
    });

    document.querySelectorAll(".filter-button").forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            const slides = projectSwiper.slides;
            slides.forEach((slide) => {
                const category = slide.dataset.category;
                const match = filter === "all" || category === filter;
                slide.style.display = match ? "" : "none";
            });

            projectSwiper.update();
            projectSwiper.slideTo(0);
        });
    });

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

    const modal = document.getElementById("projectModal");
    const modalVisual = document.getElementById("modalVisual");
    const modalThumbs = document.getElementById("modalThumbs");
    const modalKicker = document.getElementById("modalKicker");
    const modalTitle = document.getElementById("modalTitle");
    const modalRole = document.getElementById("modalRole");
    const modalDuration = document.getElementById("modalDuration");
    const modalChallenge = document.getElementById("modalChallenge");
    const modalProblem = document.getElementById("modalProblem");
    const modalSolution = document.getElementById("modalSolution");
    const modalSystem = document.getElementById("modalSystem");
    const modalReflection = document.getElementById("modalReflection");
    const modalGithub = document.getElementById("modalGithub");
    const modalNext = document.getElementById("modalNext");

    function closeModal() {
        modal?.classList.remove("is-open");
        modal?.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    document.querySelector(".project-swiper")?.addEventListener("click", (event) => {
        const card = event.target.closest(".project-card[data-open-project]");
        if (!card || event.target.closest("a")) return;
        const project = window.portfolioProjects?.[card.dataset.openProject];
        if (!project || !modal) return;

        modalKicker.textContent = project.kicker;
        modalTitle.textContent = project.title;
        modalRole.innerHTML = project.role;
        modalDuration.textContent = project.duration;
        modalChallenge.textContent = project.challenge;
        modalProblem.textContent = project.problem;
        modalSolution.textContent = project.solution;
        modalReflection.textContent = project.reflection;
        modalVisual.className = `modal-visual ${project.visualClass}`;
        const modalImage = document.getElementById("modalImage");
        if (modalImage) {
            modalImage.src = project.image || "";
            modalImage.alt = project.title;
        }
        modalGithub.href = project.github;

        modalSystem.innerHTML = project.system.map(([title, desc]) =>
            `<div class="system-card"><span>${title}</span><p>${desc}</p></div>`
        ).join("");

        const order = window.projectOrder || [];
        const currentIdx = order.indexOf(card.dataset.openProject);
        const nextIdx = (currentIdx + 1) % order.length;
        const nextKey = order[nextIdx];
        const nextProject = window.portfolioProjects?.[nextKey];
        if (nextProject && modalNext) {
            modalNext.innerHTML = `<span>Next: ${nextProject.title}</span><span class="next-arrow" aria-hidden="true">&rarr;</span>`;
            modalNext.dataset.nextProject = nextKey;
        }

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });

    modalNext?.addEventListener("click", (event) => {
        event.preventDefault();
        const nextKey = modalNext.dataset.nextProject;
        if (nextKey) {
            const btn = document.querySelector(`[data-open-project="${nextKey}"]`);
            btn?.click();
        }
    });

    document.querySelectorAll("[data-close-modal]").forEach((button) => {
        button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
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
