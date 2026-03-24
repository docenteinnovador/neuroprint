const buttons = document.querySelectorAll(".cat-btn");
const products = document.querySelectorAll(".product-card");

// mostrar todos al inicio
products.forEach(p => p.classList.add("visible"));

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;

    products.forEach(product => {
      if (category === "all" || product.dataset.category === category) {
        product.classList.add("visible");
      } else {
        product.classList.remove("visible");
      }
    });

  });
});