document.addEventListener('DOMContentLoaded', () => {

    // --- 1. HERO IMAGE SLIDER ---
    const sliderData = [
        {
            image: 'media/slider/image1.jpg',
            caption: 'Advancing Diagnostics Through Molecular & Computational Biology',
            link: '#section-2-id' // Link to your "About Me" section
        },
        {
            image: 'media/slider/image2.jpg',
            caption: 'Modeling RNA Biology and Multi-Omics Integration',
            link: '#section-3-id' // Link to "Research Interest"
        },
        {
            image: 'media/slider/image3.jpg',
            caption: 'Translating Complex Data into Clinical Insights',
            link: '#section-4-id' // Link to "Projects"
        }
    ];

    const sliderContainer = document.getElementById('hero-slider');
    let currentSlide = 0;

    function buildSlider() {
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
        const slides = sliderContainer.querySelectorAll('.slide');
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    if (sliderContainer) {
        buildSlider();
        setInterval(showNextSlide, 5000); // Change slide every 5 seconds
    }


    // --- 2. RESPONSIVE HAMBURGER MENU ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    const hasSubmenu = document.querySelectorAll('.has-submenu > a');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
    
    // Add click event for submenus on mobile
    hasSubmenu.forEach(menuItem => {
        menuItem.addEventListener('click', function(e) {
            if (window.innerWidth <= 1300) {
                e.preventDefault(); // Prevent page jump
                this.parentElement.classList.toggle('open');
            }
        });
    });


    // --- 3. VIDEO PLAYER ---
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    videoWrappers.forEach(wrapper => {
        const videoSrc = wrapper.getAttribute('data-video-src');
        if (videoSrc) {
            // Create a placeholder play button
            const playButton = document.createElement('div');
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.className = 'video-play-button';
            wrapper.appendChild(playButton);

            wrapper.addEventListener('click', () => {
                const videoElement = document.createElement('video');
                videoElement.src = videoSrc;
                videoElement.controls = true;
                videoElement.autoplay = true;
                wrapper.innerHTML = ''; // Clear the wrapper
                wrapper.appendChild(videoElement);
            }, { once: true }); // Ensure this only runs once
        }
    });

    // --- 4. NEWSLETTER FORM ---
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (newsletterMessage) {
                newsletterMessage.textContent = 'Thank you! (Note: This is a demo. Backend integration is required for a live newsletter.)';
                newsletterMessage.style.color = '#4CAF50';
            }
            newsletterForm.reset();
        });
    }

});