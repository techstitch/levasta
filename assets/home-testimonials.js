function initSwiper() {
  if (typeof Swiper === 'undefined') {
    // Swiper not loaded yet, try again
    setTimeout(initSwiper, 100);
    return;
  }

  const swiper = new Swiper('.testimonials-swiper', {
    // Slide configuration
    slidesPerView: 'auto',
    spaceBetween: 20,
    
    // Navigation buttons
    navigation: {
      nextEl: '#slider-next',
      prevEl: '#slider-prev',
    },
    
    // Pagination (dots)
    pagination: {
      el: '#testimonials-pagination',
      clickable: true,
      dynamicBullets: false,
      renderBullet: function() {
        return '<button class="slider-dot"></button>';
      },
    },
    
    // Touch and mouse drag
    grabCursor: true,
    touchRatio: 1.2,
    touchAngle: 45,
    simulateTouch: true,
    
    // Smooth animations
    speed: 500,
    effect: 'slide',
    
    // Momentum and swipe
    momentum: true,
    momentumBounce: true,
    momentumVelocityRatio: 0.85,
    momentumRatio: 1,
    freeMode: false,
    
    // Responsive breakpoints
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
    
    // Accessibility
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    
    // Loop disabled to prevent infinite scroll
    loop: false,
    rewind: true,
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSwiper);
} else {
  initSwiper();
}


