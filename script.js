document.addEventListener('DOMContentLoaded', () => {

    // --- HERO IMAGE SLIDER ---
    const sliderData = [
        { image: 'media/slider/image1.jpg', caption: 'Advancing Diagnostics Through Molecular & Computational Biology', link: '#section-2-id' },
        { image: 'media/slider/image2.jpg', caption: 'Modeling RNA Biology and Multi-Omics Integration', link: '#section-3-id' },
        { image: 'media/slider/image3.jpg', caption: 'Translating Complex Data into Clinical Insights', link: '#section-4-id' }
    ];
    const sliderContainer = document.getElementById('hero-slider');
    let currentSlide = 0;
    function buildSlider() {
        if (!sliderContainer) return;
        sliderData.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'slide' + (index === 0 ? ' active' : '');
            slideElement.style.backgroundImage = `url('${slide.image}')`;
            const slideLink = document.createElement('a');
            slideLink.href = slide.link;
            const captionElement = document.createElement('div');
            captionElement.className = 'slide-caption';
            captionElement.textContent = slide.caption;
            slideLink.appendChild(captionElement);
            slideElement.appendChild(slideLink);
            sliderContainer.appendChild(slideElement);
        });
    }
    function showNextSlide() {
        if (!sliderContainer) return;
        const slides = sliderContainer.querySelectorAll('.slide');
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    buildSlider();
    setInterval(showNextSlide, 5000);

    // --- RESPONSIVE HAMBURGER MENU ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    const hasSubmenu = document.querySelectorAll('.has-submenu > a');
    const body = document.body;

    if (mainNav) {
        const mobileFooter = document.createElement('div');
        mobileFooter.className = 'mobile-footer';
        mobileFooter.innerHTML = '© 2025 Abdullah Al Marzan. All Rights Reserved.';
        mainNav.querySelector('ul').appendChild(mobileFooter);
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    hasSubmenu.forEach(menuItem => {
        menuItem.addEventListener('click', function(e) {
            if (window.innerWidth <= 1100) {
                e.preventDefault();
                this.parentElement.classList.toggle('open');
            }
        });
    });

    // --- VIDEO PLAYER ---
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    videoWrappers.forEach(wrapper => {
        const videoSrc = wrapper.getAttribute('data-video-src');
        if (videoSrc) {
            const playButton = document.createElement('div');
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.className = 'video-play-button';
            wrapper.appendChild(playButton);
            wrapper.addEventListener('click', () => {
                const videoElement = document.createElement('video');
                videoElement.src = videoSrc;
                videoElement.controls = true;
                videoElement.autoplay = true;
                wrapper.innerHTML = '';
                wrapper.appendChild(videoElement);
            }, { once: true });
        }
    });

    // --- NEWSLETTER FORM ---
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (newsletterMessage) {
                newsletterMessage.textContent = 'Thank you! (Demo only)';
                newsletterMessage.style.color = '#4CAF50';
            }
            newsletterForm.reset();
        });
    }
});