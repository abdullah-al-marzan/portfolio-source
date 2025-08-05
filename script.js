document.addEventListener('DOMContentLoaded', () => {

    // --- HERO IMAGE SLIDER ---
    const sliderData = [
        { image: 'media/home/slider/Research Activities of Abdullah Al Marzan.jpg', caption: 'Research Activities of Abdullah Al Marzan' },
        { image: 'media/home/slider/Poster Presentation of Abdullah Al Marzan.jpg', caption: 'Poster Presentation' },
        { image: 'media/home/slider/Biochemical Assay.jpg', caption: 'Biochemical Assay' },
        { image: 'media/home/slider/Antimicrobial Resistance.png', caption: 'Antimicrobial Resistance Research' },
        { image: 'media/home/slider/Bacterial growth in Blood Agard Media.jpg', caption: 'Bacterial Growth in Blood Agar Media' },
        { image: 'media/home/slider/Elisa.jpg', caption: 'ELISA Assay' },
        { image: 'media/home/slider/Python Plot.jpg', caption: 'Data Analysis with Python' }
    ];
    const sliderContainer = document.getElementById('hero-slider');
    let currentSlide = 0;
    function buildSlider() {
        if (!sliderContainer) return;
        sliderData.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'slide' + (index === 0 ? ' active' : '');
            slideElement.style.backgroundImage = `url("${slide.image}")`;
            const captionElement = document.createElement('div');
            captionElement.className = 'slide-caption';
            captionElement.textContent = slide.caption;
            slideElement.appendChild(captionElement);
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

    // --- RESPONSIVE HAMBURGER MENU (Unchanged) ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    const hasSubmenu = document.querySelectorAll('.has-submenu > a');
    const body = document.body;
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

    // --- UPDATED: VIDEO PLAYER (Handles BOTH YouTube and LinkedIn) ---
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    videoWrappers.forEach(wrapper => {
        const youtubeID = wrapper.getAttribute('data-youtube-id');
        const linkedinSrc = wrapper.getAttribute('data-linkedin-embed-src');

        // Add a play button to all video wrappers
        const playButton = document.createElement('div');
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playButton.className = 'video-play-button';
        wrapper.appendChild(playButton);

        wrapper.addEventListener('click', () => {
            let iframe;

            // If it's a YouTube video
            if (youtubeID) {
                iframe = document.createElement('iframe');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${youtubeID}?rel=0&showinfo=0&autoplay=1`);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            }
            // If it's a LinkedIn video
            else if (linkedinSrc) {
                iframe = document.createElement('iframe');
                iframe.setAttribute('src', linkedinSrc);
                iframe.setAttribute('height', '399');
                iframe.setAttribute('width', '504');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('title', 'Embedded post');
            }

            if (iframe) {
                wrapper.innerHTML = ''; // Clear the wrapper (removes play button)
                wrapper.appendChild(iframe);
            }
        }, { once: true });
    });

    // --- NEWSLETTER FORM (Unchanged) ---
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