document.addEventListener('DOMContentLoaded', () => {

    // --- HERO IMAGE SLIDER ---
    // UPDATED with your new image files
    const sliderData = [
        { image: 'media/home/slider/Research Activities of Abdullah Al Marzan.jpg', caption: 'Research Activities of Abdullah Al Marzan' },
        { image: 'media/home/slider/Poster Presentation of Abdullah Al Marzan.jpg', caption: 'Poster Presentation' },
        { image: 'media/home/slider/Biochemical Assay.jpg', caption: 'Biochemical Assay' },
        { image: 'media/home/slider/Antimicrobial Resistance.png', caption: 'Antimicrobial Resistance Research' },
        { image: 'media/home/slider/Bacterial growth in Blood Agard Media.jpg', caption: 'Bacterial Growth in Blood Agar Media' },
        { image: 'media/home/slider/Elisa.jpg', caption: 'ELISA Assay' },
        { image: 'media/home/slider/Python Plot.jpg', caption: 'Data Analysis with Python' },
        { image: 'media/home/slider/Mutant Protein.jpg', caption: 'Mutant Protein Analysis' },
        { image: 'media/home/slider/Anaerobic Culture.jpg', caption: 'Anaerobic Culture' }
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

    // --- RESPONSIVE HAMBURGER MENU ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    const hasSubmenu = document.querySelectorAll('.has-submenu > a');
    const body = document.body;

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // This prevents the main page from scrolling when the menu is open
            body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    hasSubmenu.forEach(menuItem => {
        menuItem.addEventListener('click', function(e) {
            // This logic now only applies when the hamburger menu is visible
            if (window.innerWidth <= 1100) {
                e.preventDefault();
                this.parentElement.classList.toggle('open');
            }
        });
    });

    // --- VIDEO PLAYER (Handles YouTube and LinkedIn) ---
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    videoWrappers.forEach(wrapper => {
        const youtubeSrc = wrapper.getAttribute('data-youtube-embed-src');
        const linkedinSrc = wrapper.getAttribute('data-linkedin-embed-src');
        const playButton = document.createElement('div');
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playButton.className = 'video-play-button';
        
        // Add a thumbnail if one is present in the HTML
        const thumbnail = wrapper.querySelector('.video-thumbnail');
        if (!thumbnail) { // If no manual thumbnail, add play button directly
            wrapper.appendChild(playButton);
        } else { // If thumbnail exists, put play button on top of it
            const container = document.createElement('div');
            container.style.position = 'relative';
            container.appendChild(thumbnail);
            container.appendChild(playButton);
            wrapper.appendChild(container);
        }

        wrapper.addEventListener('click', () => {
            let iframe;

            if (youtubeSrc) {
                iframe = document.createElement('iframe');
                iframe.setAttribute('src', `${youtubeSrc}?autoplay=1`);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            } else if (linkedinSrc) {
                iframe = document.createElement('iframe');
                iframe.setAttribute('src', linkedinSrc);
                iframe.setAttribute('height', '100%');
                iframe.setAttribute('width', '100%');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('title', 'Embedded post');
            }

            if (iframe) {
                wrapper.innerHTML = '';
                wrapper.appendChild(iframe);
            }
        }, { once: true });
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