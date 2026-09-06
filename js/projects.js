(function () {
    "use strict";

    const slidesData = [
        {
            tag: "Core system",
            title: "Artisaan",
            description: "Bridging the digital divide for India's 200+ million artisans through AI-powered marketplace solutions that preserve cultural heritage while enabling global reach.",
            image: "Assets/artisaan-thumbnail.png",
            link: "https://github.com/always-yash/Artisaan",
            linkText: "View on GitHub"
        },
        {
            tag: "Browser extension",
            title: "Intent-tab",
            description: "A purpose-driven new tab browser extension that replaces your default tab with intentional focus tools, productivity widgets and mindful browsing.",
            image: "Assets/intent-tab-thumbnail.png",
            link: "https://github.com/always-yash/Intent-tab",
            linkText: "View on GitHub"
        },
        {
            tag: "Telecom platform",
            title: "SkyTel Solutions",
            description: "A full-stack telecom solutions platform powering connectivity services with scalable infrastructure, customer management and service delivery systems.",
            image: "Assets/skytel-solutions-thumbnail.png",
            link: "https://github.com/always-yash/SkyTel-Solutions",
            linkText: "View on GitHub"
        },
        {
            tag: "TPMS Dashboard",
            title: "Fleeca Designs",
            description: "A Tyre Pressure Monitoring System dashboard for Fleeca - real-time fleet tracking, pressure analytics and predictive maintenance for vehicle fleets.",
            image: "Assets/fleeca-thumbnail.png",
            link: "https://github.com/always-yash/Fleeca-TPMS-Dashboard",
            linkText: "View on GitHub"
        },
        {
            tag: "Travel interface",
            title: "Pravasa Keralam",
            description: "An interactive travel guide to Keralam built with fluid navigation, discovery systems and modern visual storytelling for immersive trip planning.",
            image: "Assets/pravasa-keralam-thumbnail.png",
            link: "https://github.com/always-yash/pravasa-keralam-map",
            linkText: "View on GitHub"
        }
    ];

    function renderProjectCarousel(containerSelector, items) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            return null;
        }

        const wrapper = container.querySelector(".swiper-wrapper");
        if (!wrapper) {
            return null;
        }

        const extendedItems = [...items, ...items];

        wrapper.innerHTML = extendedItems.map((item) => `
            <div class="swiper-slide">
                <article class="card">
                    <div class="card-image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy" />
                    </div>
                    <div class="card-body">
                        ${item.tag ? `<span class="card-tag">${item.tag}</span>` : ""}
                        <h2 class="card-title">${item.title}</h2>
                        <p class="card-description">${item.description}</p>
                        ${item.link ? `<a href="${item.link}" class="card-link" target="_blank" rel="noopener noreferrer">${item.linkText || "View Project →"}</a>` : ""}
                    </div>
                </article>
            </div>
        `).join("");

        if (!window.Swiper) {
            return null;
        }

        return new Swiper(containerSelector, {
            effect: "cards",
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            initialSlide: items.length,
            speed: 850,
            preventInteractionOnTransition: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                waitForTransition: true,
                pauseOnMouseEnter: true
            },
            cardsEffect: {
                perSlideRotate: 8,
                perSlideOffset: 15,
                slideShadows: false
            },
            navigation: {
                nextEl: `${containerSelector} .swiper-button-next`,
                prevEl: `${containerSelector} .swiper-button-prev`
            }
        });
    }

    renderProjectCarousel("#fanned-swiper", slidesData);




    /* Ideal projectcarousel - commented for reference:
    const slidesData = [
      {
        tag: "Core system",
        title: "Artisaan",
        description: "Bridging the digital divide for India's 200+ million artisans through AI-powered marketplace solutions that preserve cultural heritage while enabling global reach.",
        image: "Assets/artisaan-thumbnail.png",
        link: "https://github.com/always-yash/Artisaan",
        linkText: "View on GitHub"
      },
      {
        tag: "Browser extension",
        title: "Intent-tab",
        description: "A purpose-driven new tab browser extension that replaces your default tab with intentional focus tools, productivity widgets and mindful browsing.",
        image: "Assets/intent-tab-thumbnail.png",
        link: "https://github.com/always-yash/Intent-tab",
        linkText: "View on GitHub"
      },
      {
        tag: "Telecom platform",
        title: "SkyTel Solutions",
        description: "A full-stack telecom solutions platform powering connectivity services with scalable infrastructure, customer management and service delivery systems.",
        image: "Assets/skytel-solutions-thumbnail.png",
        link: "https://github.com/always-yash/SkyTel-Solutions",
        linkText: "View on GitHub"
      },
      {
        tag: "TPMS Dashboard",
        title: "Fleeca Designs",
        description: "A Tyre Pressure Monitoring System dashboard for Fleeca - real-time fleet tracking, pressure analytics and predictive maintenance for vehicle fleets.",
        image: "Assets/fleeca-thumbnail.png",
        link: "https://github.com/always-yash/Fleeca-TPMS-Dashboard",
        linkText: "View on GitHub"
      },
      {
        tag: "Travel interface",
        title: "Pravasa Keralam",
        description: "An interactive travel guide to Keralam built with fluid navigation, discovery systems and modern visual storytelling for immersive trip planning.",
        image: "Assets/pravasa-keralam-thumbnail.png",
        link: "https://github.com/always-yash/pravasa-keralam-map",
        linkText: "View on GitHub"
      }
    ];

    function renderProjectCarousel(containerSelector, items) {
      const container = document.querySelector(containerSelector);
      if (!container) { return null; }

      const wrapper = container.querySelector(".swiper-wrapper");
      if (!wrapper) { return null; }

      const extendedItems = [...items, ...items];

      wrapper.innerHTML = extendedItems.map((item) => `
        <div class="swiper-slide">
          <article class="card">
            <div class="card-image">
              <img src="${item.image}" alt="${item.title}" loading="lazy" />
            </div>
            <div class="card-body">
              ${item.tag ? `<span class="card-tag">${item.tag}</span>` : ""}
              <h2 class="card-title">${item.title}</h2>
              <p class="card-description">${item.description}</p>
              ${item.link ? `<a href="${item.link}" class="card-link" target="_blank" rel="noopener noreferrer">${item.linkText || "View Project →"}</a>` : ""}
            </div>
          </article>
        </div>
      `).join("");

      if (!window.Swiper) { return null; }

      return new Swiper(containerSelector, {
        effect: "cards",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        initialSlide: items.length,
        speed: 850,
        preventInteractionOnTransition: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
          waitForTransition: true,
          pauseOnMouseEnter: true
        },
        cardsEffect: {
          perSlideRotate: 8,
          perSlideOffset: 15,
          slideShadows: false
        },
        navigation: {
          nextEl: `${containerSelector} .swiper-button-next`,
          prevEl: `${containerSelector} .swiper-button-prev`
        }
      });
    }
    */
})();

