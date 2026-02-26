document.addEventListener('DOMContentLoaded', function() {
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slider = document.getElementById('testimonials-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const indicators = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  
  if (!slider || !sliderWrapper) return;
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  const slidesToShow = 3;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);
  
  // Drag variables
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let dragOffset = 0;
  
  function updateSliderPosition(animate = true) {
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    
    const translateValue = -currentIndex * (100 / slidesToShow);
    
    if (animate) {
      slider.classList.remove('dragging');
    } else {
      slider.classList.add('dragging');
    }
    
    slider.style.transform = `translateX(${translateValue}%)`;
    
    // Update indicators
    const indicatorIndex = Math.min(currentIndex, indicators.length - 1);
    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === indicatorIndex);
    });
  }
  
  function nextSlide() {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSliderPosition();
    }
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  }
  
  function handleDragStart(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    currentX = startX;
  }
  
  function handleDragMove(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    
    currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const diffX = currentX - startX;
    
    const containerWidth = sliderWrapper.offsetWidth;
    const slideWidth = containerWidth / slidesToShow;
    
    dragOffset = (diffX / slideWidth) * (100 / slidesToShow);
    
    const translateValue = (-currentIndex * (100 / slidesToShow)) + dragOffset;
    slider.classList.add('dragging');
    slider.style.transform = `translateX(${translateValue}%)`;
  }
  
  function handleDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    
    const diffX = currentX - startX;
    const threshold = 50; // pixels
    
    if (diffX > threshold) {
      prevSlide();
    } else if (diffX < -threshold) {
      nextSlide();
    } else {
      updateSliderPosition();
    }
  }
  
  // Button event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }
  
  // Indicator event listeners
  indicators.forEach((dot) => {
    dot.addEventListener('click', function() {
      currentIndex = parseInt(this.getAttribute('data-index'));
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      updateSliderPosition();
    });
  });
  
  // Mouse drag events
  slider.addEventListener('mousedown', handleDragStart);
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('mouseup', handleDragEnd);
  
  // Touch drag events
  slider.addEventListener('touchstart', handleDragStart, false);
  document.addEventListener('touchmove', handleDragMove, { passive: false });
  document.addEventListener('touchend', handleDragEnd);
  
  // Initialize
  updateSliderPosition();
});

