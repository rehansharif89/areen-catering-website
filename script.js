document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     LANGUAGE TOGGLE
  =============================== */

  const toggleBtn = document.getElementById("langToggle");
  let isArabic = false;

  /* ===============================
     DEFAULT DATA (ADMIN STYLE)
  =============================== */

  const defaultData = {
    categories: [
      { id: "wheel", name_en: "Wheel Weights", name_ar: "أوزان العجلات" },
      { id: "tools", name_en: "Tools", name_ar: "أدوات" },
      { id: "safety", name_en: "Safety Items", name_ar: "معدات السلامة" }
    ],
    products: [
      {
        id: "p1",
        category: "wheel",
        name_en: "Steel Stick-on Wheel Weight",
        name_ar: "وزن عجلة لاصق فولاذي",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
      },
      {
        id: "p2",
        category: "tools",
        name_en: "Air Ratchet Wrench",
        name_ar: "مفتاح هوائي",
        image: "https://images.unsplash.com/photo-1581147036324-c1c1e1a3e9c0?w=400"
      },
      {
        id: "p3",
        category: "safety",
        name_en: "Safety Mask",
        name_ar: "قناع أمان",
        image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400"
      }
    ]
  };

  if (!localStorage.getItem("areenData")) {
    localStorage.setItem("areenData", JSON.stringify(defaultData));
  }

  const siteData = JSON.parse(localStorage.getItem("areenData"));

  /* ===============================
     RENDER PRODUCTS
  =============================== */

  function renderProducts() {
    const container = document.getElementById("productsGrid");
    if (!container) return;

    container.innerHTML = "";

    siteData.categories.forEach(cat => {
      const catProducts = siteData.products.filter(
        p => p.category === cat.id
      );

      if (catProducts.length === 0) return;

      const section = document.createElement("div");

      section.innerHTML = `
        <h3 class="category-title">
          ${isArabic ? cat.name_ar : cat.name_en}
        </h3>

        <div class="grid">
          ${catProducts.map(p => `
            <div class="card">
              <img src="${p.image}" alt="">
              <p>${isArabic ? p.name_ar : p.name_en}</p>
            </div>
          `).join("")}
        </div>
      `;

      container.appendChild(section);
    });
  }

  /* ===============================
     TOGGLE CLICK
  =============================== */

  toggleBtn.addEventListener("click", () => {
    isArabic = !isArabic;

    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    toggleBtn.textContent = isArabic ? "EN" : "AR";

    document.querySelectorAll("[data-en]").forEach(el => {
      el.textContent = isArabic
        ? el.getAttribute("data-ar")
        : el.getAttribute("data-en");
    });

    renderProducts(); // 🔥 THIS IS THE FIX
  });

  /* ===============================
     INITIAL LOAD
  =============================== */

  renderProducts();

});
