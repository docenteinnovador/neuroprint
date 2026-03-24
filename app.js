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

// Colores disponibles - FIX toggle
function showColors(btn) {
  const card = btn.closest('.product-card');
  const colorsList = card.querySelector('.colors-list');
  const colorsData = card.dataset.colors.split(',');
  
  // Close others
  document.querySelectorAll('.colors-list.show').forEach(list => {
    if (list !== colorsList) list.classList.remove('show');
  });
  
  // Toggle
  colorsList.classList.toggle('show');
  
  if (colorsList.classList.contains('show')) {
    colorsList.innerHTML = colorsData.map(color => `<span class="color-option">${color.trim()}</span>`).join(' ');
  }
}


// Hide outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.product-card')) {
    document.querySelectorAll('.colors-list.show').forEach(list => list.classList.remove('show'));
  }
});



