(function () {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
    });

    if (window.Lenis && !prefersReducedMotion) {
        const lenis = new Lenis({
            duration: 1.15,
            smoothWheel: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }

    if (window.SplitType && !prefersReducedMotion) {
        new SplitType("[data-split]", { types: "words, chars" });
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
        document.querySelectorAll(".fade-up").forEach((element) => {
            element.style.opacity = "1";
            element.style.transform = "none";
        });
    }

    // Safety: ensure .fade-up elements are visible even if GSAP fails
    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(function () {
            document.querySelectorAll(".fade-up").forEach(function (el) {
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

// 1. Initializing Supabase
    const supabaseUrl = 'https://lnusbmtztiegustygzrh.supabase.co';
    const supabaseKey = 'sb_publishable_TsstCVoZVMgtViL8Rq-1RA_pyFIhC4i'; 
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Visual feedback matching your GSAP aesthetic
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const submitLabel = submitBtn.querySelector('.button-label');
            const originalText = submitLabel ? submitLabel.textContent : submitBtn.textContent;
            if (submitLabel) {
                submitLabel.textContent = "LINKING...";
            } else {
                submitBtn.textContent = "LINKING...";
            }
            submitBtn.style.opacity = "0.7";

            const formData = new FormData(contactForm);
            const { data, error } = await supabase
                .from('contact_messages')
                .insert([
                    { 
                        name: formData.get('name'), 
                        email: formData.get('email'), 
                        message: formData.get('message') 
                    }
                ]);

            if (error) {
                console.error("Connection Error:", error.message);
                if (submitLabel) {
                    submitLabel.textContent = "RETRY";
                } else {
                    submitBtn.textContent = "RETRY";
                }
            } else {
                if (submitLabel) {
                    submitLabel.textContent = "RECEIVED";
                } else {
                    submitBtn.textContent = "RECEIVED";
                }
                contactForm.reset();
                
                // Add a small GSAP "Success" pop if you want
                if (window.gsap) {
                    gsap.fromTo(submitBtn, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: "back.out" });
                }
            }

            // Reset button text after 3 seconds
            setTimeout(() => {
                if (submitLabel) {
                    submitLabel.textContent = originalText;
                } else {
                    submitBtn.textContent = originalText;
                }
                submitBtn.style.opacity = "1";
            }, 3000);
        });
    }
 // --- SUPABASE INTEGRATION END ---

})(); //
