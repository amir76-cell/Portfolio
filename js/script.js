// ======================================================
// HAMBURGER MENU
// ======================================================

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Fermer menu après clic
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Fermer menu si clic extérieur
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-container")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// ======================================================
// ACTIVE NAV LINK
// ======================================================

function setActiveLink() {
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    link.classList.remove("active");

    if (
      currentPage === linkPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", setActiveLink);

// ======================================================
// PROJECT DETAILS TOGGLE
// ======================================================

document.querySelectorAll(".project-detail").forEach((project) => {
  const header = project.querySelector(".project-header");
  const content = project.querySelector(".project-content");

  if (!header || !content) return;

  const title = header.querySelector("h2")?.textContent.trim() || "projet";
  const button = document.createElement("button");

  button.className = "project-toggle";
  button.type = "button";
  button.setAttribute("aria-label", `Afficher les détails du ${title}`);
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = '<i class="fas fa-chevron-down"></i>';

  header.appendChild(button);
  content.hidden = true;

  const toggleProject = () => {
    const isOpen = project.classList.toggle("open");

    content.hidden = !isOpen;
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute(
      "aria-label",
      `${isOpen ? "Masquer" : "Afficher"} les détails du ${title}`
    );
  };

  header.addEventListener("click", toggleProject);
});

if (window.location.hash) {
  const selectedProject = document.querySelector(window.location.hash);
  const selectedHeader = selectedProject?.querySelector(".project-header");

  if (selectedProject?.classList.contains("project-detail") && selectedHeader) {
    selectedHeader.click();
  }
}

// ======================================================
// CONTACT FORM
// ======================================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();

    // Vérification champs

    if (!name || !email || !subject || !message) {
      showMessage(
        "Veuillez remplir tous les champs.",
        "error"
      );

      return;
    }

    // Vérification email

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showMessage(
        "Veuillez entrer une adresse email valide.",
        "error"
      );

      return;
    }

    // Succès

    showMessage(
      "Message envoyé avec succès 🚀",
      "success"
    );

    // Console

    console.log({
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleString(),
    });

    // Reset

    contactForm.reset();

    // Hide message

    setTimeout(() => {
      formMessage.style.display = "none";
    }, 5000);
  });
}

// ======================================================
// SHOW MESSAGE
// ======================================================

function showMessage(text, type) {
  if (!formMessage) return;

  formMessage.textContent = text;

  formMessage.className =
    `form-message ${type}`;

  formMessage.style.display = "block";
}

// ======================================================
// SMOOTH SCROLL
// ======================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (
      href !== "#" &&
      document.querySelector(href)
    ) {
      e.preventDefault();

      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// ======================================================
// SCROLL ANIMATIONS
// ======================================================

const animatedElements = document.querySelectorAll(
  ".project-card, .skill-category, .timeline-item, .project-detail, .stat-card"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";

        entry.target.style.transform =
          "translateY(0)";

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

animatedElements.forEach((element) => {
  element.style.opacity = "0";

  element.style.transform =
    "translateY(30px)";

  element.style.transition =
    "all 0.6s ease";

  observer.observe(element);
});

// ======================================================
// SKILLS PROGRESS ANIMATION
// ======================================================

const progressBars =
  document.querySelectorAll(".progress");

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = entry.target;

        const width =
          progress.getAttribute("style");

        progress.style.width = "0";

        setTimeout(() => {
          progress.style.width =
            width.replace("width:", "");
        }, 200);

        progressObserver.unobserve(progress);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

progressBars.forEach((bar) => {
  progressObserver.observe(bar);
});

// ======================================================
// NAVBAR SHADOW ON SCROLL
// ======================================================

window.addEventListener("scroll", () => {
  const navbar =
    document.querySelector(".navbar");

  if (window.scrollY > 20) {
    navbar.style.boxShadow =
      "0 5px 20px rgba(0,0,0,0.08)";
  } else {
    navbar.style.boxShadow =
      "0 2px 10px rgba(0,0,0,0.05)";
  }
});

// ======================================================
// CONSOLE MESSAGE
// ======================================================

console.log(
  "Portfolio Amir Riazi chargé avec succès 🚀"
);

const cards = document.querySelectorAll(".skill-category");

window.addEventListener("scroll", () => {
  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < window.innerHeight - 100) {
      card.style.opacity = "1";

      card.style.transform = "translateY(0)";
    }
  });
});

cards.forEach((card) => {
  card.style.opacity = "0";

  card.style.transform = "translateY(40px)";

  card.style.transition = "0.8s ease";
});