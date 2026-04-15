document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("js-enabled");

    const hero = document.querySelector(".hero");
    const banner = document.querySelector(".hero-banner");
    const revealSections = document.querySelectorAll(".reveal");

    function updateHeroBanner() {
        if (!hero || !banner) return;

        const rect = hero.getBoundingClientRect();
        const heroHeight = hero.offsetHeight || 1;
        const scrolled = Math.min(Math.max(-rect.top / heroHeight, 0), 1);

        const opacity = 0.22 - scrolled * 0.18;
        const scale = 1.08 + scrolled * 0.06;
        const translateY = scrolled * 40;

        banner.style.opacity = opacity.toFixed(3);
        banner.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    }

    updateHeroBanner();
    window.addEventListener("scroll", updateHeroBanner, { passive: true });
    window.addEventListener("resize", updateHeroBanner);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    revealSections.forEach((section) => {
        observer.observe(section);
    });
});