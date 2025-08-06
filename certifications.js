document.addEventListener('DOMContentLoaded', function() {

    // --- YOUR CERTIFICATE FILENAMES GO HERE ---
    // Just add the name of each file (without .jpg or .pdf) to this list.
    const certificateFiles = [
        "Certificate Name 1", // Example
        "Another Certificate Name",
        "Data Science with Python",
        "Bioinformatics Workshop",
        "Advanced PCR Techniques",
        "Clinical Research Principles",
        "Statistical Analysis in R",
        "Machine Learning Foundations",
        "Genomic Data Visualization"
        // ... continue adding all 50+ of your certificate filenames here
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
            const imagePath = `media/certifications/image/${filename}.jpg`; // Assuming images are .jpg
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

        // Don't show pagination if there's only one page
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