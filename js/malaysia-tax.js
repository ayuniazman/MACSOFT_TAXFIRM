(() => {
  "use strict";

  // Switch between the two tax categories.
  const tabs = document.querySelectorAll(".mt-type-tab");
  const panels = document.querySelectorAll(".mt-type-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.panel;
      tabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-selected", String(selected));
      });
      panels.forEach((panel) => {
        const selected = panel.id === targetId;
        panel.classList.toggle("active", selected);
        panel.hidden = !selected;
      });
    });

    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = Array.from(tabs).indexOf(tab);
      const nextIndex =
        event.key === "ArrowRight"
          ? (currentIndex + 1) % tabs.length
          : (currentIndex - 1 + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    });
  });

  // Expand/collapse detailed information.
  document.querySelectorAll(".mt-accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      const body = trigger.nextElementSibling;
      trigger.setAttribute("aria-expanded", String(!expanded));
      body.hidden = expanded;
    });
  });

  // Keep the year current without changing the shared site script.
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
