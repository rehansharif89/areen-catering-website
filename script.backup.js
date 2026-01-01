document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("langToggle");
  let isArabic = false;

  toggleBtn.addEventListener("click", () => {
    isArabic = !isArabic;

    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    toggleBtn.textContent = isArabic ? "EN" : "AR";

    document.querySelectorAll("[data-en]").forEach(el => {
      el.textContent = isArabic
        ? el.getAttribute("data-ar")
        : el.getAttribute("data-en");
    });
  });
});
