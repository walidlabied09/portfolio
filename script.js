document.addEventListener("DOMContentLoaded", () => {

  // 1. BARRE DE PROGRESSION AU SCROLL
  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.width = progress + "%";
  });

  // 2. CURSEUR LUMINEUX SUIVEUR
  const cursorGlow = document.getElementById("cursorGlow");
  window.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  });

  // 3. EFFET 3D TILT SUR LES CARTES DE PROJETS
  const cards = document.querySelectorAll(".tilt-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });

  // 4. ANIMATION DES COMPTEURS (STATS)
  const statNumbers = document.querySelectorAll(".stat-number");
  let statsTriggered = false;

  const animateCounters = () => {
    statNumbers.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const speed = target / 40;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  window.addEventListener("scroll", () => {
    const statsBar = document.querySelector(".stats-bar");
    if (!statsBar) return;
    const rect = statsBar.getBoundingClientRect();
    if (rect.top < window.innerHeight && !statsTriggered) {
      animateCounters();
      statsTriggered = true;
    }
  });

  // 5. FILTRE DYNAMIQUE DES PROJETS
  const filterBtns = document.querySelectorAll(".filter-btn");
  const tiltCards = document.querySelectorAll(".tilt-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      tiltCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat.includes(filter)) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });

  // 6. ANIMATION APPARITION AU SCROLL (REVEAL)
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - 80) {
        el.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // 7. COPIER L'EMAIL DANS LE PRESSE-PAPIER AVEC TOAST
  const copyButtons = document.querySelectorAll(".btn-copy");
  const toast = document.getElementById("toastNotification");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = btn.getAttribute("data-email") || "walidlabied2002@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        toast.classList.add("show");
        setTimeout(() => {
          toast.classList.remove("show");
        }, 3000);
      });
    });
  });

});