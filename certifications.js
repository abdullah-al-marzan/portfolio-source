document.addEventListener('DOMContentLoaded', function() {

    // --- TEST SCRIPT FOR A SINGLE CERTIFICATE ---

    const grid = document.getElementById('certificate-grid');

    if (grid) {
        // The exact filename you provided
        const testFilename = "Career Essentials in Cybersecurity by Microsoft and LinkedIn";

        // The correct relative paths for the website
        const imagePath = `media/certifications/image/${testFilename}.png`;
        const pdfPath = `media/certifications/pdf/${testFilename}.pdf`;

        // Create the HTML for just this one certificate
        const certElement = document.createElement('div');
        certElement.className = 'certificate-item';
        certElement.innerHTML = `
            <a href="${pdfPath}" target="_blank">
                <img src="${imagePath}" alt="${testFilename} Certificate">
            </a>
        `;
        
        // Add the single certificate to the page
        grid.appendChild(certElement);
    }
});