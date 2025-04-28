// Main.js - Memento Home Page Interactions

// Open and close the Recommendation Modal
document.addEventListener('DOMContentLoaded', function () {
    const openRecommendationButton = document.getElementById('open-recommendation');
    const recommendationModal = document.getElementById('recommendation-modal');
    const closeModalButton = document.getElementById('close-modal');
  
    // Open modal when clicking "Get a Book Recommendation"
    openRecommendationButton.addEventListener('click', () => {
      recommendationModal.style.display = 'block';
    });
  
    // Close modal when clicking on the close button
    closeModalButton.addEventListener('click', () => {
      recommendationModal.style.display = 'none';
    });
  
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
      if (event.target === recommendationModal) {
        recommendationModal.style.display = 'none';
      }
    });
  });
  