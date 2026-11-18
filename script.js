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
    watchFilmButton?.focus();
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
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
const toast = document.querySelector(".toast");
let toastTimeout;
const showToast = (message) => {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 3600);
};

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        if (link.href.includes(".example")) {
            event.preventDefault();
            showToast("Contact details are demo placeholders. Please use the contact page.");
        }
    });
});

document.querySelectorAll("[data-demo-message]").forEach((button) => {
    button.addEventListener("click", () => {
        showToast(button.dataset.demoMessage);
    });
});