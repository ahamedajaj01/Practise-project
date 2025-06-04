document.addEventListener("DOMContentLoaded", async () => {
  try {
    const navbarPlace = document.querySelector(".nav-container");
    const footerPlace = document.querySelector(".footer-container");

    if (navbarPlace) {
      const navbarHTML = await fetch("navbar.html").then((res) => res.text());
      navbarPlace.innerHTML = navbarHTML;

      const menuButton = document.querySelector(".nav-toggle");
      const menuContent = document.querySelector(".nav-content");
      const mainContent = document.querySelector(".hero-content");

      if (menuButton && menuContent) {
        menuButton.addEventListener("click", () => {
          menuContent.classList.toggle("active");
          if (mainContent) {
            mainContent.style.marginTop = menuContent.classList.contains("active") ? "150px" : "0";
          }
        });
      }
    }

    if (footerPlace) {
      const footerHTML = await fetch("footer.html").then((res) => res.text());
      footerPlace.innerHTML = footerHTML;

      const yearSpan = document.getElementById("year");
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    }

  } catch (error) {
    console.error("Error loading navbar or footer:", error);
  }
});
