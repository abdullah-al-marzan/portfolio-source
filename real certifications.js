document.addEventListener('DOMContentLoaded', function() {

    // --- YOUR CERTIFICATE FILENAMES GO HERE ---
    // This list has been updated with all 43 of your files.
    const certificateFiles = [
        "Career Essentials in Cybersecurity by Microsoft and LinkedIn.png",
        "Career Essentials in Data Analysis by Microsoft and LinkedIn",
        "Career Essentials in GitHub Professional Certificate",
        "Career Essentials in Project Management by Microsoft and LinkedIn",
        "Certificate_ABST_Recognised",
        "Certificate_CRMICR_Recognised",
        "Certificate_GENE_Recognised",
        "Certificate_STOTEN_Recognised",
        "Computer Aided Drug & Peptide Design by RGRC",
        "Create a Virtual Machine and Deploy a Web by Azure",
        "Create Charts and Dashboards Using Microsoft Excel",
        "Custom Reports in Google Analytics",
        "Cybersecurity Awareness Cybersecurity Terminology (CPE)",
        "Cybersecurity Awareness Cybersecurity Terminology (PMI)",
        "Cybersecurity Awareness Cybersecurity Terminology",
        "Cybersecurity Foundations (CPE)",
        "Cybersecurity Foundations (PMI)",
        "Cybersecurity Foundations",
        "Deep Learning with PyTorch & Generative Advarsarial Network",
        "Deep Learning with PyTorch & Image Segmentation",
        "Exploratory Data Analysis with Seaborn",
        "GCP Refresher by NIH",
        "Good Clinical Practice by NIH",
        "Google Data Studio",
        "Introduction to Basic Game Development using Scratch",
        "Introduction to Career Skills in Data Analytics",
        "Introduction to Data Analysis using Microsoft Excel",
        "Learning Data Analytics Part 2 Extending and Applying Core Knowledge (CPE)",
        "Learning Data Analytics Part 2 Extending and Applying Core Knowledge",
        "Linear Regression with NumPy and Python",
        "Project Management Foundations (CPE)",
        "Project Management Foundations (PMI)",
        "Project Management Foundations Ethics (PMI)",
        "Project Management Foundations Ethics",
        "Project Management Foundations Requirements (CPE)",
        "Project Management Foundations Requirements (PMI)",
        "Project Management Foundations Requirements",
        "Project Management Foundations",
        "Python Programming",
        "The Cybersecurity Threat Landscape",
        "Training on Bioinformatics and Biotechnology Research",
        "Transfer Learning for NLP with TensorFlow Hub",
        "Whole Genome Sequencing of Bacterial Genomes"
    ];

    const track = document.getElementById('slider-track');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');
    let currentIndex = 0;

    // 1. Build the slides
    if (track) {
        certificateFiles.forEach(filename => {
            const slideElement = document.createElement('div');
            slideElement.className = 'slide';
            
            // This now uses the CORRECT relative paths
            const imagePath = `media/certifications/image/${filename}.png`;
            const pdfPath = `media/certifications/pdf/${filename}.pdf`;

            slideElement.innerHTML = `<a href="${pdfPath}" target="_blank"><img src="${imagePath}" alt="${filename}"></a>`;
            track.appendChild(slideElement);
        });
    }

    const slides = document.querySelectorAll('.slide');

    // 2. Function to update the slider's position and active state
    function updateSlider() {
        if (slides.length === 0) return;
        
        const slideWidth = slides[0].getBoundingClientRect().width;
        const offset = -currentIndex * slideWidth + (track.parentElement.offsetWidth / 2 - slideWidth / 2);
        
        track.style.transform = `translateX(${offset}px)`;

        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentIndex) {
                slide.classList.add('active');
            }
        });
    }

    // 3. Event Listeners for buttons
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });
    }
    
    // Initial setup
    if (slides.length > 0) {
        updateSlider();
    }
    
    // Update on resize to keep it centered
    window.addEventListener('resize', updateSlider);
});