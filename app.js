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
        // Init slider after short delay for visibility
        setTimeout(() => initVisibleSliders(), 100);
      } else {
        product.classList.remove("visible");
      }
    });
  });
});

// Initial sliders
initVisibleSliders();

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

// Slider swipe functionality
function initSlider(slider) {
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const track = slider.querySelector('.image-track');

  const handleStart = (e) => {
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    isDragging = true;
    slider.style.scrollBehavior = 'auto';
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diff = startX - currentX;
    track.style.transform = `translateX(${-diff}px)`;
  };

  const handleEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    const slideWidth = slider.offsetWidth;
    const translateX = parseFloat(track.style.transform?.match(/-?[\d.]+/) || 0) || 0;
    const slideIndex = Math.round(-translateX / slideWidth);
    track.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
    slider.scrollTo({ left: slideIndex * slideWidth, behavior: 'smooth' });
  };


  slider.addEventListener('mousedown', handleStart);
  slider.addEventListener('mousemove', handleMove);
  slider.addEventListener('mouseup', handleEnd);
  slider.addEventListener('mouseleave', handleEnd);

  slider.addEventListener('touchstart', handleStart);
  slider.addEventListener('touchmove', handleMove);
  slider.addEventListener('touchend', handleEnd);
}

// Init sliders when visible
function initVisibleSliders() {
  document.querySelectorAll('.product-card.visible .image-slider').forEach(initSlider);
}

// Hide outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.product-card')) {
    document.querySelectorAll('.colors-list.show').forEach(list => list.classList.remove('show'));
  }
});




