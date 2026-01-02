document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("langToggle");
  let isArabic = false;

  /* ---------- LANGUAGE TOGGLE ---------- */
  toggleBtn.classList.remove("clicked");
void toggleBtn.offsetWidth;
toggleBtn.classList.add("clicked");


  toggleBtn.addEventListener("click", () => {
    isArabic = !isArabic;

    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    toggleBtn.textContent = isArabic ? "EN" : "AR";

    document.querySelectorAll("[data-en]").forEach(el => {
      el.textContent = isArabic
        ? el.getAttribute("data-ar")
        : el.getAttribute("data-en");
    });

    renderProducts(); // 🔥 re-render products on language switch
  });

  /* ---------- LOAD DATA ---------- */
  const data = JSON.parse(localStorage.getItem("areenData")) || { products: [] };

  /* ---------- RENDER PRODUCTS ---------- */
  function renderProducts() {
    const container = document.getElementById("productsGrid");
    if (!container) return;

    container.innerHTML = "";

    const categories = {
      food: {
        en: "Food Supplies",
        ar: "المواد الغذائية"
      },
      workshop: {
        en: "Workshop Materials",
        ar: "مواد الورش"
      },
      cleaning: {
        en: "Cleaning Items",
        ar: "مواد التنظيف"
      }
    };

    Object.keys(categories).forEach(catId => {
      const products = data.products.filter(p => p.category === catId);
      if (products.length === 0) return;

      const section = document.createElement("div");

      section.innerHTML = `
        <h3 class="category">
          ${isArabic ? categories[catId].ar : categories[catId].en}
        </h3>

        <div class="grid">
          ${products.map(p => `
            <div class="card">
              <img src="${p.image}" alt="${p.name_en}">
              <p>${isArabic ? p.name_ar : p.name_en}</p>
            </div>
          `).join("")}
        </div>
      `;

      container.appendChild(section);
    });
  }

  renderProducts();
});
