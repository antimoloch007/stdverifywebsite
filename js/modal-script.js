// Simple Modal Functionality
(function() {
    function initModal() {
        const modal = document.getElementById('contact-modal');
        if (!modal) return;

        const closeButton = modal.querySelector('.close-modal');
        const openButtons = document.querySelectorAll('#contact-button, #footer-beta-button');
        const betaButton = modal.querySelector('.beta-button');

        // Open modal function
        function openModal(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        // Close modal function
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Event listener for open buttons
        openButtons.forEach(button => {
            button.removeEventListener('click', openModal);
            button.addEventListener('click', openModal);
        });

        // Event listener for close button
        if (closeButton) {
            closeButton.onclick = function(e) {
                e.stopPropagation();
                closeModal();
            };
        }

        // Close when clicking outside modal
        modal.onclick = function(e) {
            if (e.target === modal) {
                closeModal();
            }
        };

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        // Style beta button
        if (betaButton) {
            betaButton.style.background = 'linear-gradient(135deg, #ff0000, #ff9900, #ffff00, #33cc33, #3399ff, #9966ff, #ff00ff)';
            betaButton.style.color = 'white';
            betaButton.style.border = 'none';
            betaButton.style.padding = '12px 30px';
            betaButton.style.borderRadius = '30px';
            betaButton.style.fontWeight = '600';
            betaButton.style.textDecoration = 'none';
            betaButton.style.display = 'inline-block';
            betaButton.style.margin = '15px 0';
            
            // Set beta form URL if available
            if (window.siteConfig && window.siteConfig.urls && window.siteConfig.urls.betaFormUrl) {
                betaButton.href = window.siteConfig.urls.betaFormUrl;
            }
        }
    }

    // Run initialization on DOM content loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModal);
    } else {
        initModal();
    }
})();