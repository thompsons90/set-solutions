/* ============================================================
   SET SOLUTIONS — script.js
   Vanilla JS only. No libraries. No dependencies.
============================================================ */

/* --- Nav scroll state ---
   Adds/removes .scrolled class on #nav as user scrolls.
   Controls background, shadow, and text colour transitions in CSS.
------------------------------------------------------------ */
const nav = document.getElementById("nav");

const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll(); /* Run once on load in case page is already scrolled */

/* --- Scroll reveal ---
   Observes .reveal elements. Adds .visible when they enter
   the viewport. One-shot — stops observing once revealed.
   CSS handles the opacity/transform transition.
   prefers-reduced-motion users get opacity:1 / transform:none via CSS.
------------------------------------------------------------ */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  },
);

reveals.forEach((el) => revealObserver.observe(el));

/* --- FAQ accordion ---
   One item open at a time. Toggles .open class and aria-expanded.
   CSS handles the max-height animation for smooth open/close.
------------------------------------------------------------ */
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("open");

    /* Close all open items */
    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      openItem
        .querySelector(".faq-question")
        .setAttribute("aria-expanded", "false");
    });

    /* Open clicked item if it was closed */
    if (!isOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

/* --- Contact form → Google Forms background submit ---
   The form targets a hidden <iframe> so the Google Forms
   redirect happens silently. Required fields are validated
   client-side first, then a success message is shown.

   TO CONNECT YOUR GOOGLE FORM:
   1. Create your Google Form.
   2. In the form action attribute (index.html), replace
      YOUR_GOOGLE_FORM_ID with your actual form ID.
   3. Get entry IDs: Form menu → Get pre-filled link →
      fill all fields → Get link → copy entry.XXXXXXX params.
   4. Replace each entry.XXXXXXXXX in index.html with the
      correct entry ID for that field.
------------------------------------------------------------ */
const form = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

form.addEventListener("submit", (e) => {
  const requiredFields = form.querySelectorAll("[required]");
  let valid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "rgba(255,100,100,0.8)";
      valid = false;
    } else {
      field.style.borderColor = "";
    }
  });

  if (!valid) {
    e.preventDefault();
    return;
  }

  /* Valid — submit to hidden iframe, show success after buffer */
  setTimeout(() => {
    form.style.display = "none";
    formSuccess.style.display = "block";
  }, 800);
});

/* --- Footer copyright year ---
   Auto-updates — no manual edits needed each year.
------------------------------------------------------------ */
document.getElementById("footer-year").textContent = new Date().getFullYear();
