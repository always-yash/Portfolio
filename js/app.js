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
    } else {
        document.querySelectorAll(".fade-up").forEach((element) => {
            element.style.opacity = "1";
            element.style.transform = "none";
        });
    }

    if (window.VanillaTilt && !prefersReducedMotion) {
        VanillaTilt.init(document.querySelectorAll("[data-tilt-card]"), {
            max: 7,
            speed: 700,
            glare: true,
            "max-glare": 0.12
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
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "LINKING...";
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
                submitBtn.innerText = "RETRY";
            } else {
                submitBtn.innerText = "RECEIVED";
                contactForm.reset();
                
                // Add a small GSAP "Success" pop if you want
                if (window.gsap) {
                    gsap.fromTo(submitBtn, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: "back.out" });
                }
            }

            // Reset button text after 3 seconds
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = "1";
            }, 3000);
        });
    }
 // --- SUPABASE INTEGRATION END ---

})(); //
