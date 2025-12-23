// Mobile menu
const menuBtn = document.querySelector("[data-menu-btn]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
}

menuBtn?.addEventListener("click", () => {
  const isOpen = nav.classList.contains("is-open");
  setMenu(!isOpen);
});

// Close menu when clicking a nav link (mobile)
nav?.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "A") setMenu(false);
});

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// Sticky header shadow on scroll (subtle)
window.addEventListener("scroll", () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 8 ? "0 12px 30px rgba(0,0,0,.25)" : "none";
});

// Year in footer
document.querySelector("[data-year]")?.textContent = new Date().getFullYear();

// Contact form (frontend demo): shows toast and opens mail client as fallback
const form = document.getElementById("contactForm");
const toast = document.querySelector("[data-toast]");
const toastText = document.querySelector("[data-toast-text]");

function showToast(text) {
  if (!toast || !toastText) return;
  toastText.textContent = text;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = data.get("name")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  const company = data.get("company")?.toString().trim();
  const message = data.get("message")?.toString().trim();

  // Replace with your real email:
  const to = "jouwemail@elysiumagency.nl";

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
