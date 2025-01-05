// Gallery slider functionality
export function initGallery() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Event listeners
    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);

    // Auto slide every 5 seconds
    const autoSlideInterval = setInterval(nextSlide, 5000);

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider?.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider?.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    });

    // Cleanup function
    return () => {
        clearInterval(autoSlideInterval);
    };
}