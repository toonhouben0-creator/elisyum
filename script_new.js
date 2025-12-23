// Mobile menu (robust)
const menuBtn = document.querySelector("[data-menu-btn]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");

function setMenu(open) {
  if (!nav || !menuBtn) return;
  nav.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
}

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"));
  });

  // Close menu on link click (mobile)
  nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.tagName === "A") setMenu(false);
  });

  // Close menu on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
}

// Header shadow on scroll (polish)
window.addEventListener("scroll", () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 8 ? "0 12px 30px rgba(0,0,0,.25)" : "none";
});

// Year in footer
const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Toast helper
const toast = document.querySelector("[data-toast]");
const toastText = document.querySelector("[data-toast-text]");

function showToast(text) {
  if (!toast || !toastText) return;
  toastText.textContent = text;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

// Contact form: mailto fallback (static)
const form = document.getElementById("contactForm");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const company = (data.get("company") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  // TODO: vervang dit door je echte e-mailadres
  const to = "info@elysiumagency.nl";

  const subject = encodeURIComponent("Kennismaking — Elysium Agency");
  const body = encodeURIComponent(
`Naam: ${name}
Email: ${email}
Bedrijf: ${company || "-"}
---
Bericht:
${message}`
  );

  showToast("Dankjewel! Je mailapp opent nu…");
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  form.reset();
});
