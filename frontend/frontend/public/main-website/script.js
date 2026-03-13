// AOS
AOS.init({
  duration: 650,
  easing: "ease-out-cubic",
  once: true,
  offset: 80,
});

// Navbar scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Swiper testimonials
const swiper = new Swiper(".swiper-testimonials", {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination-testimonials",
    clickable: true,
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

// ── Mobile Drawer ──────────────────────────────
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const drawer = document.getElementById("mobileDrawer");
const overlay = document.getElementById("mobileOverlay");

function openDrawer() {
  drawer.classList.add("is-open");
  overlay.classList.add("is-open");
  document.body.classList.add("drawer-open");
}

function closeDrawer() {
  drawer.classList.remove("is-open");
  overlay.classList.remove("is-open");
  document.body.classList.remove("drawer-open");
}

navToggle.addEventListener("click", openDrawer);
navClose.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

// Close drawer when any mobile link is clicked
document
  .querySelectorAll(
    ".mobile-nav-link, .mobile-drawer-btn-ghost, .mobile-drawer-btn-primary",
  )
  .forEach((el) => el.addEventListener("click", closeDrawer));

// Smooth counter animation for stats
function animateCounter(el, target, suffix = "") {
  const startTime = performance.now();
  const duration = 2000;
  const startVal = 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = startVal + (target - startVal) * eased;

    if (target % 1 !== 0) {
      el.textContent = current.toFixed(1) + suffix;
    } else {
      el.textContent = Math.floor(current) + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Trigger counters on scroll
const counters = [
  { selector: ".stat-num:nth-child(1)", target: 4.2, suffix: "K+" },
];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

document.querySelectorAll(".stat-num").forEach((el) => observer.observe(el));
