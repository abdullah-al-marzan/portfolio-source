document.addEventListener('DOMContentLoaded', function() {

    // ======================= IMAGE SLIDER =======================
    const slides = document.querySelectorAll('#hero-slider .slide');
    const dots = document.querySelectorAll('.slider-nav .nav-dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.dataset.slide));
        });
    });

    function nextSlide() {
        let newSlide = (currentSlide + 1) % slides.length;
        showSlide(newSlide);
    }

    // Auto-play the slider
    setInterval(nextSlide, slideInterval);


    // ======================= VIDEO PLAYER =======================
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');

    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            const videoSrc = placeholder.getAttribute('data-src');
            if (videoSrc) {
                const videoPlayer = document.createElement('div');
                videoPlayer.classList.add('video-player');
                videoPlayer.innerHTML = `
                    <iframe src="${videoSrc}?autoplay=1" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                `;
                placeholder.parentNode.replaceChild(videoPlayer, placeholder);
            }
        });
    });
    
    // ======================= MOBILE MENU (Optional) =======================
    // You can add functionality for a mobile hamburger menu here if needed
    
});