(function () {
    "use strict";

    const SELECTORS = {
        swiperEl: ".project-swiper",
        nextBtn: ".side-right",
        prevBtn: ".side-left",
    };

    let resizeObserver = null;
    let autoplayTimer = null;
    let isHovered = false;
    let isInteracting = false;

    function getSwiper() {
        const el = document.querySelector(SELECTORS.swiperEl);
        return el && el.swiper ? el.swiper : null;
    }

    function getVisibleSlides(swiper) {
        return Array.from(swiper.slides).filter((slide) => {
            const style = window.getComputedStyle(slide);
            return style.display !== "none" && !slide.classList.contains("swiper-slide-duplicate");
        });
    }

    function goNext() {
        const swiper = getSwiper();
        if (!swiper) return;
        swiper.slideNext();
        restartAutoplayTimer();
    }

    function goPrev() {
        const swiper = getSwiper();
        if (!swiper) return;
        swiper.slidePrev();
        restartAutoplayTimer();
    }

    function startAutoplayTimer() {
        stopAutoplayTimer();
        if (isHovered || isInteracting) return;
        autoplayTimer = setInterval(() => {
            const swiper = getSwiper();
            if (!swiper || isHovered || isInteracting) return;
            swiper.slideNext();
        }, 3000);
    }

    function stopAutoplayTimer() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function restartAutoplayTimer() {
        stopAutoplayTimer();
        isInteracting = false;
        startAutoplayTimer();
    }

    function bindEvents() {
        const nextBtn = document.querySelector(SELECTORS.nextBtn);
        const prevBtn = document.querySelector(SELECTORS.prevBtn);
        const swiperEl = document.querySelector(SELECTORS.swiperEl);

        if (nextBtn) {
            nextBtn.addEventListener("click", goNext);
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", goPrev);
        }

        if (swiperEl) {
            swiperEl.addEventListener("mouseenter", () => {
                isHovered = true;
            });
            swiperEl.addEventListener("mouseleave", () => {
                isHovered = false;
            });
            swiperEl.addEventListener("touchstart", () => {
                isInteracting = true;
            }, { passive: true });
            swiperEl.addEventListener("touchend", () => {
                setTimeout(() => {
                    isInteracting = false;
                    restartAutoplayTimer();
                }, 300);
            }, { passive: true });
        }
    }

    function init() {
        const swiper = getSwiper();
        if (!swiper) {
            setTimeout(init, 100);
            return;
        }
        bindEvents();
        startAutoplayTimer();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
