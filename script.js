// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "×" : "☰";
    });
    navLinks.querySelectorAll("a").forEach((link) =>
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        }),
    );
}

// Video modal
const videoModal = document.getElementById("videoModal");
const watchFilmButton = document.querySelector(".video-cta-btn");
const modalVideo = document.getElementById("watchFilmVideo");
const closeVideoModalButton = document.querySelector(".video-modal-close");
const closeVideoBackdrop = document.querySelector("[data-close-video]");

const closeVideoModal = () => {
    if (!videoModal) return;

    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }

    videoModal.classList.remove("open");
    videoModal.setAttribute("aria-hidden", "true");
};

if (watchFilmButton && videoModal && modalVideo) {
    watchFilmButton.addEventListener("click", () => {
        videoModal.classList.add("open");
        videoModal.setAttribute("aria-hidden", "false");
        modalVideo.currentTime = 0;
        modalVideo.play();
    });
}

closeVideoModalButton?.addEventListener("click", closeVideoModal);
closeVideoBackdrop?.addEventListener("click", closeVideoModal);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && videoModal?.classList.contains("open")) {
        closeVideoModal();
    }
});

// Reveal content as it enters the viewport
const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Footer year and demo contact feedback
document.getElementById("year").textContent = new Date().getFullYear();
const toast = document.querySelector(".toast");
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        if (link.href.includes(".example")) {
            event.preventDefault();
            toast.classList.add("show");
            window.setTimeout(() => toast.classList.remove("show"), 3600);
        }
    });
});

// Service dropdown on homepage
const serviceCards = document.querySelectorAll('.service-dropdown');
serviceCards.forEach((card) => {
    const toggle = card.querySelector('.service-toggle');
    const menu = card.querySelector('.service-dropdown-menu');

    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = card.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        menu.hidden = !isOpen;
    });
});

document.addEventListener('click', (event) => {
    serviceCards.forEach((card) => {
        const toggle = card.querySelector('.service-toggle');
        const menu = card.querySelector('.service-dropdown-menu');
        if (!card.contains(event.target)) {
            card.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            menu.hidden = true;
        }
    });
});