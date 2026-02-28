(function () {
  // AOS
  if (window.AOS) {
    AOS.init({
      duration: 900,
      once: true,
      offset: 90,
      easing: "ease-out-cubic",
    });
  }

  // Navbar scroll
  const navbar = document.querySelector(".navbar");
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 80) navbar.classList.add("navbar-scrolled");
    else navbar.classList.remove("navbar-scrolled");
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Back to top
  const toTop = document.getElementById("toTop");
  const onTop = () => {
    if (!toTop) return;
    if (window.scrollY > 500) toTop.classList.add("show");
    else toTop.classList.remove("show");
  };
  window.addEventListener("scroll", onTop);
  onTop();
  if (toTop) {
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ✅ Toast "Message envoyé" si URL contient ?sent=1
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") === "1") {
      const toastEl = document.getElementById("successToast");
      if (toastEl && window.bootstrap?.Toast) {
        const t = new bootstrap.Toast(toastEl, { delay: 4500 });
        t.show();
      }
      // Nettoyer l'URL (enlever ?sent=1)
      params.delete("sent");
      const newQuery = params.toString();
      const newUrl = window.location.pathname + (newQuery ? `?${newQuery}` : "") + window.location.hash;
      window.history.replaceState({}, "", newUrl);
    }
  } catch (e) {}
})();