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

const toast = document.querySelector(".toast");
let toastTimeout;
const showToast = (message) => {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 3600);
};

// Video modal
const videoModal = document.getElementById("videoModal");
const watchFilmButton = document.querySelector(".video-cta-btn");
const modalVideo = document.getElementById("watchFilmVideo");
const closeVideoModalButton = document.querySelector(".video-modal-close");
const closeVideoBackdrop = document.querySelector("[data-close-video]");
let videoPlaybackCheck;
const showVideoPlaybackError = () => {
    showToast("The film could not be played. Try opening the site through a local web server.");
};

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
        modalVideo.play().catch(showVideoPlaybackError);
        window.clearTimeout(videoPlaybackCheck);
        videoPlaybackCheck = window.setTimeout(() => {
            if (modalVideo.error || modalVideo.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
                showVideoPlaybackError();
            }
        }, 3000);
    });
}

modalVideo?.addEventListener("playing", () => window.clearTimeout(videoPlaybackCheck));
modalVideo?.addEventListener("error", showVideoPlaybackError);
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

// Transfer pricing method explorer
const methodInfo = {
    cup: {
        name: "Comparable Uncontrolled Price (CUP)",
        type: "Traditional transaction method",
        description: "Compares the price charged in a controlled transaction with the price charged in a comparable transaction between independent parties. It is most useful where reliable product or service price comparisons are available.",
        example: "A company sells the same product to a related company and an independent customer. The independent-party price may be a direct comparable, subject to adjustments for differences."
    },
    rpm: {
        name: "Resale Price Method (RPM)",
        type: "Traditional transaction method",
        description: "Starts with the price at which a product purchased from an associated enterprise is resold to an independent customer. An appropriate gross resale margin is deducted to determine an arm’s length purchase price.",
        example: "A related distributor buys goods from its group company and resells them to external customers. The distributor’s gross margin is compared with margins earned by independent distributors."
    },
    cpm: {
        name: "Cost Plus Method (CPM)",
        type: "Traditional transaction method",
        description: "Starts with the supplier’s costs of providing goods or services in a controlled transaction. An appropriate mark-up is added to those costs to determine an arm’s length price.",
        example: "A related manufacturer supplies products to a group company. Its relevant production costs are identified and an appropriate comparable mark-up is applied."
    },
    psm: {
        name: "Profit Split Method",
        type: "Transactional profit method",
        description: "Identifies the combined operating profit from the controlled transactions and splits that profit between the associated enterprises on an economically valid basis that reflects their respective contributions.",
        example: "Two group companies jointly develop and exploit valuable intangibles. Their combined profit may be divided based on each company’s functions, assets, risks and contributions."
    },
    tnmm: {
        name: "Transactional Net Margin Method (TNMM)",
        type: "Transactional profit method",
        description: "Examines the net profit margin earned by a taxpayer from a controlled transaction relative to an appropriate base, such as costs, sales or assets, and compares it with comparable independent businesses or transactions.",
        example: "A related service provider’s operating margin on its costs is compared with the margins earned by independent service providers performing similar functions."
    }
};

const methodDetail = document.getElementById("method-detail");
if (methodDetail) {
    document.querySelectorAll(".method-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".method-tab").forEach(other => {
                other.classList.remove("active");
                other.setAttribute("aria-selected", "false");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            const method = methodInfo[tab.dataset.method];
            methodDetail.querySelector(".method-type").textContent = method.type;
            methodDetail.querySelector("h3").textContent = method.name;
            methodDetail.querySelector("p").textContent = method.description;
            const example = methodDetail.querySelector(".method-example");
            example.querySelector("span").textContent = method.example;
        });
    });
}

document.querySelectorAll(".faq-q").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        const isOpen = item.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));
    });
});

// Withholding tax payment category controls
document.querySelectorAll(".expand-btn").forEach(button => {
    button.addEventListener("click", () => {
        const detail = button.nextElementSibling;
        const expanded = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!expanded));
        detail.hidden = expanded;

        button.querySelector("span:first-child").textContent =
            expanded ? "Explore category" : "Close details";
    });
});

const searchInput = document.getElementById("paymentSearch");
const cards = [...document.querySelectorAll(".payment-card")];
const resultCount = document.getElementById("resultCount");
const paymentGrid = document.getElementById("paymentGrid");

if (searchInput && resultCount && paymentGrid) {
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.textContent =
        "No matching categories found. Try another search term.";
    noResults.hidden = true;
    paymentGrid.appendChild(noResults);

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        let visible = 0;

        cards.forEach(card => {
            const searchableText =
                (card.innerText + " " + (card.dataset.search || "")).toLowerCase();

            const matches = searchableText.includes(query);
            card.hidden = !matches;

            if (matches) visible++;
        });

        resultCount.textContent =
            `${visible} categor${visible === 1 ? "y" : "ies"}`;

        noResults.hidden = visible !== 0;
    });
}