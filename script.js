document.addEventListener('DOMContentLoaded', () => {

    // --- HERO IMAGE SLIDER ---
    const sliderData = [
        { image: 'media/home/slider/Research Activities of Abdullah Al Marzan.jpg', caption: 'Research Activities' },
        { image: 'media/home/slider/Poster Presentation of Abdullah Al Marzan.jpg', caption: 'Poster Presentation' },
        { image: 'media/home/slider/Biochemical Assay.jpg', caption: 'Biochemical Assay' },
        { image: 'media/home/slider/Antimicrobial Resistance.png', caption: 'Antimicrobial Resistance Research' },
        { image: 'media/home/slider/Bacterial growth in Blood Agard Media.jpg', caption: 'Bacterial Culture' },
        { image: 'media/home/slider/Elisa.jpg', caption: 'ELISA Assay' },
        { image: 'media/home/slider/Python Plot.jpg', caption: 'Data Analysis with Python' },
        { image: 'media/home/slider/Mutant Protein.jpg', caption: 'Mutant Protein Analysis' },
        { image: 'media/home/slider/Anaerobic Culture.jpg', caption: 'Anaerobic Culture' }
    ];
    const sliderContainer = document.getElementById('hero-slider');
    let currentSlide = 0;
    let slideInterval;

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

    function showSlide(index) {
        const slides = sliderContainer.querySelectorAll('.slide');
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length; // Loop correctly
        slides[currentSlide].classList.add('active');
    }
    
    // CORRECTED #3: Arrow functionality
    function startSlider() {
        clearInterval(slideInterval); // Clear previous interval
        slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    buildSlider();
    startSlider(); // Start the automatic sliding

    const prevButton = document.getElementById('slider-prev');
    const nextButton = document.getElementById('slider-next');

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            startSlider(); // Reset the timer
        });
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            startSlider(); // Reset the timer
        });
    }


    // --- RESPONSIVE HAMBURGER MENU (Unchanged and Correct) ---
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

    // --- VIDEO PLAYER (Unchanged and Correct) ---
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    videoWrappers.forEach(wrapper => {
        const youtubeSrc = wrapper.getAttribute('data-youtube-embed-src');
        const linkedinSrc = wrapper.getAttribute('data-linkedin-embed-src');

        if (youtubeSrc || linkedinSrc) {
            // Check if there's a thumbnail, if not, add a play button directly
            if (!wrapper.querySelector('.video-thumbnail')) {
                const playButton = document.createElement('div');
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                playButton.className = 'video-play-button';
                wrapper.appendChild(playButton);
            } else {
                 // If there IS a thumbnail, just add the play button on top
                const playButton = document.createElement('div');
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                playButton.className = 'video-play-button';
                wrapper.appendChild(playButton);
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
        }
    });

    // --- NEWSLETTER FORM (Unchanged and Correct) ---
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