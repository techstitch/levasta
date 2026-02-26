function initProductCarousels() {
  if (typeof Swiper === 'undefined') {
    setTimeout(initProductCarousels, 100);
    return;
  }

  document.querySelectorAll('.product-carousel-swiper').forEach((container) => {
    // avoid double-init
    if (container.dataset.swiperInitialized) return;
    container.dataset.swiperInitialized = 'true';

    const swiper = new Swiper(container, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      navigation: {
        nextEl: container.querySelector('.swiper-button-next'),
        prevEl: container.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: container.querySelector('.swiper-pagination'),
        clickable: true,
      },
      grabCursor: true,
      speed: 500,
      effect: 'slide',
      freeMode: false,
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 15 },
        768: { slidesPerView: 2, spaceBetween: 15 },
        1024: { slidesPerView: 3, spaceBetween: 20 },
      },
      keyboard: { enabled: true, onlyInViewport: true },
      loop: false,
      rewind: true,
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductCarousels);
} else {
  initProductCarousels();
}
