document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    const banner = document.querySelector(".hero-banner");
    const sections = document.querySelectorAll(".hero, .section");
    const projectsSection = document.querySelector(".projects-section");
    const navLinks = document.querySelectorAll(".nav-links a");

    const isMobile = window.matchMedia("(max-width: 860px)").matches;

    if (hero) {
        hero.classList.add("is-visible");
    }

    function updateHeroBanner() {
        if (!hero || !banner) return;

        const rect = hero.getBoundingClientRect();
        const heroHeight = hero.offsetHeight || 1;
        const scrolled = Math.min(Math.max(-rect.top / heroHeight, 0), 1);

        const opacity = 0.16 - scrolled * 0.12;
        const scale = 1.08 + scrolled * 0.05;
        const translateY = scrolled * 34;

        banner.style.opacity = opacity.toFixed(3);
        banner.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    }

    function setActiveSection(id) {
        navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            link.classList.toggle("active-link", href === `#${id}`);
        });
    }

    const observer = new IntersectionObserver(
        (entries) => {
            let visibleEntry = null;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (!visibleEntry || entry.intersectionRatio > visibleEntry.intersectionRatio) {
                        visibleEntry = entry;
                    }
                }
            });

            if (visibleEntry) {
                sections.forEach((section) => section.classList.remove("is-visible"));
                visibleEntry.target.classList.add("is-visible");

                if (visibleEntry.target.id) {
                    setActiveSection(visibleEntry.target.id);
                } else {
                    navLinks.forEach((link) => link.classList.remove("active-link"));
                }
            }
        },
        isMobile
            ? {
                threshold: [0.01],
                rootMargin: "0px 0px -5% 0px"
            }
            : {
                threshold: [0.08],
                rootMargin: "0px 0px -8% 0px"
            }
    );

    sections.forEach((section) => observer.observe(section));

    if (projectsSection && isMobile) {
        projectsSection.classList.add("is-visible");
    }

    updateHeroBanner();
    window.addEventListener("scroll", updateHeroBanner, { passive: true });
    window.addEventListener("resize", updateHeroBanner);
});