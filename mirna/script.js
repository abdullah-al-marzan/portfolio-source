// script.js

// Global variable to hold results for the download function
let predictionResults = [];

document.getElementById('prediction-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const loader = document.getElementById('loader');
    const resultsContainer = document.getElementById('results-container');
    
    loader.classList.remove('hidden');
    resultsContainer.innerHTML = '';
    predictionResults = []; // Clear previous results

    // Create a FormData object to hold all text and file data
    const formData = new FormData();

    // Append text and number values from the form
    formData.append('primary_molecules', document.getElementById('primary-seqs').value);
    formData.append('target_molecule', document.getElementById('target-seq').value);
    formData.append('competitor_molecule', document.getElementById('competitor-seq').value);
    formData.append('target_start', document.getElementById('target-start').value);
    formData.append('target_end', document.getElementById('target-end').value);
    
    // Get file objects from the inputs
    const mirnaFile = document.getElementById('mirna-file').files[0];
    const targetFile = document.getElementById('target-file').files[0];
    const competitorFile = document.getElementById('competitor-file').files[0];
    
    // Append files only if they have been selected by the user
    if (mirnaFile) formData.append('mirna_3d_file', mirnaFile);
    if (targetFile) formData.append('target_3d_file', targetFile);
    if (competitorFile) formData.append('competitor_3d_file', competitorFile);

    // --- IMPORTANT: Replace this with your actual Hugging Face API URL ---
    const API_URL = 'https://aamarzan-mirna-affinity.hf.space'; 

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            // NOTE: Do NOT set the 'Content-Type' header yourself when using FormData.
            // The browser automatically sets it to 'multipart/form-data' with the correct boundary.
            body: formData 
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'A server error occurred.');
        }

        const results = await response.json();
        predictionResults = results; // Save results for the download button
        displayResults(results);

    } catch (error) {
        resultsContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    } finally {
        loader.classList.add('hidden');
    }
});

function displayResults(results) {
    openTab('results-tab');
    const container = document.getElementById('results-container');
    if (!results || results.length === 0) {
        container.innerHTML = '<p>No results to display.</p>';
        return;
    }

    let table = '<table><thead><tr><th>miRNA ID</th><th>Score (with Competitor)</th><th>Baseline Score</th><th>Competitive Effect</th></tr></thead><tbody>';
    results.forEach(item => {
        table += `<tr>
            <td>${item.mirna_id}</td>
            <td>${item.score_with_competitor.toFixed(4)}</td>
            <td>${item.baseline_score.toFixed(4)}</td>
            <td>${item.competitive_effect.toFixed(4)}</td>
        </tr>`;
    });
    table += '</tbody></table>';

    const downloadButton = '<button id="download-btn">Download Results as CSV</button>';
    container.innerHTML = table + downloadButton;

    document.getElementById('download-btn').addEventListener('click', downloadCSV);
}

function downloadCSV() {
    if (predictionResults.length === 0) return;

    const headers = "miRNA_ID,Score_with_Competitor,Baseline_Score,Competitive_Effect";
    const csvRows = [headers];

    predictionResults.forEach(item => {
        const row = [
            item.mirna_id,
            item.score_with_competitor.toFixed(4),
            item.baseline_score.toFixed(4),
            item.competitive_effect.toFixed(4)
        ];
        csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'prediction_results.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Tabs function
function openTab(tabId) {
    document.querySelectorAll('.card').forEach(card => card.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// Auto-switch to results tab after prediction
function displayResults(results) {
    openTab('results-tab');
    const container = document.getElementById('results-container');
    if (!results || results.length === 0) {
        container.innerHTML = '<p>No results to display.</p>';
        return;
    }

    let table = '<table><thead><tr><th>miRNA ID</th><th>Score (with Competitor)</th><th>Baseline Score</th><th>Competitive Effect</th></tr></thead><tbody>';
    results.forEach(item => {
        table += `<tr>
            <td>${item.mirna_id}</td>
            <td>${item.score_with_competitor.toFixed(4)}</td>
            <td>${item.baseline_score.toFixed(4)}</td>
            <td>${item.competitive_effect.toFixed(4)}</td>
        </tr>`;
    });
    table += '</tbody></table>';

    const downloadButton = '<button id="download-btn">Download Results as CSV</button>';
    container.innerHTML = table + downloadButton;

    document.getElementById('download-btn').addEventListener('click', downloadCSV);
}
