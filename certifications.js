document.addEventListener('DOMContentLoaded', function() {

    // --- YOUR CERTIFICATE FILENAMES GO HERE ---
    // This list has been updated with all 43 of your files.
    const certificateFiles = [
        "Career Essentials in Cybersecurity by Microsoft and LinkedIn",
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

    const grid = document.getElementById('certificate-grid');
    const pagination = document.getElementById('pagination-container');
    const itemsPerPage = 8;
    let currentPage = 1;

    function displayCertificates(page) {
        if (!grid) return;
        grid.innerHTML = '';
        page--; // Adjust for zero-based index

        const startIndex = itemsPerPage * page;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = certificateFiles.slice(startIndex, endIndex);

        for (const filename of paginatedItems) {
            const certElement = document.createElement('div');
            certElement.className = 'certificate-item';
            
            // The code automatically builds the correct paths for the image and the PDF
            const imagePath = `media/certifications/image/${filename}.png`; // Assuming images are .png
            const pdfPath = `media/certifications/pdf/${filename}.pdf`;

            certElement.innerHTML = `
                <a href="${pdfPath}" target="_blank">
                    <img src="${imagePath}" alt="${filename} Certificate">
                </a>
            `;
            grid.appendChild(certElement);
        }
    }

    function setupPagination() {
        if (!pagination) return;
        pagination.innerHTML = '';
        const pageCount = Math.ceil(certificateFiles.length / itemsPerPage);

        if (pageCount <= 1) return;

        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement('button');
            btn.className = 'pagination-btn';
            btn.innerText = i;
            if (currentPage === i) {
                btn.classList.add('active');
            }
            btn.addEventListener('click', () => {
                currentPage = i;
                displayCertificates(currentPage);
                
                const currentActive = pagination.querySelector('.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                btn.classList.add('active');
            });
            pagination.appendChild(btn);
        }
    }

    if (grid && pagination) {
        displayCertificates(currentPage);
        setupPagination();
    }
});