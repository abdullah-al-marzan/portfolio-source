document.addEventListener('DOMContentLoaded', function() {

    // --- AUTOMATED CERTIFICATE GALLERY SCRIPT ---

    const grid = document.getElementById('certificate-grid');
    const pagination = document.getElementById('pagination-container');
    const itemsPerPage = 8;
    let currentPage = 1;
    let allCertificates = []; // This will be filled by the GitHub API

    // --- GitHub API Configuration ---
    const username = 'abdullah-al-marzan';
    const repo = 'abdullah-al-marzan.github.io';
    const imageFolderPath = 'media/certifications/image';
    const pdfFolderPath = 'media/certifications/pdf';

    const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${imageFolderPath}`;

    // Function to fetch the list of files from your GitHub repository
    async function fetchCertificates() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            const files = await response.json();
            
            // Filter for image files and create the certificate list
            allCertificates = files
                .filter(file => file.type === 'file' && /\.(png|jpg|jpeg)$/i.test(file.name))
                .map(file => {
                    const filenameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
                    return {
                        pdf: `${pdfFolderPath}/${filenameWithoutExt}.pdf`,
                        thumb: file.download_url // Use the direct download URL from GitHub
                    };
                });

            if (allCertificates.length > 0) {
                displayCertificates(currentPage);
                setupPagination();
            } else {
                grid.innerHTML = '<p>No certificates found in the repository.</p>';
            }

        } catch (error) {
            console.error('Failed to fetch certificates:', error);
            if (grid) {
                grid.innerHTML = '<p>Error loading certificates. Please check the repository path and API limits.</p>';
            }
        }
    }

    function displayCertificates(page) {
        if (!grid) return;
        grid.innerHTML = '';
        page--; // Adjust for zero-based index

        const startIndex = itemsPerPage * page;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = allCertificates.slice(startIndex, endIndex);

        for (const item of paginatedItems) {
            const certElement = document.createElement('div');
            certElement.className = 'certificate-item';
            certElement.innerHTML = `
                <a href="${item.pdf}" target="_blank">
                    <img src="${item.thumb}" alt="Certificate Thumbnail">
                </a>
            `;
            grid.appendChild(certElement);
        }
    }

    function setupPagination() {
        if (!pagination) return;
        pagination.innerHTML = '';
        const pageCount = Math.ceil(allCertificates.length / itemsPerPage);

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

    // Start the process
    if (grid && pagination) {
        fetchCertificates();
    }
});