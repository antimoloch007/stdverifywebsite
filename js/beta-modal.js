/**
 * STD Verify - Direct Modal Handler
 * A simple, direct approach to handling the beta modal
 * With improved close button handling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Function to directly create and show a modal
    function createAndShowModal() {
        // Check if a modal already exists
        let modal = document.getElementById('contact-modal');
        
        // If no modal exists, create one
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'contact-modal';
            modal.className = 'modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            // Create close button with better positioning
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-modal';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close');
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            };
            
            const title = document.createElement('h2');
            title.className = 'modal-title';
            title.textContent = 'Join Our Beta Program';
            
            const text = document.createElement('p');
            text.className = 'modal-text';
            text.textContent = 'Sign up to be one of the first to try STD Verify and help us shape the future of sexual health verification.';
            
            const button = document.createElement('a');
            button.href = 'https://form.typeform.com/to/Ii3HSlEH'; // Default URL
            button.className = 'beta-button';
            button.textContent = 'Sign Up For The Beta';
            button.target = '_blank';
            
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(title);
            modalContent.appendChild(text);
            modalContent.appendChild(button);
            modal.appendChild(modalContent);
            
            document.body.appendChild(modal);
        }
        
        // Update modal content if site config exists
        if (window.siteConfig && window.siteConfig.modal) {
            const modalTitle = modal.querySelector('.modal-title');
            const modalText = modal.querySelector('.modal-text');
            const modalButton = modal.querySelector('.beta-button');
            
            if (modalTitle) modalTitle.textContent = window.siteConfig.modal.title || 'Join Our Beta Program';
            if (modalText) modalText.textContent = window.siteConfig.modal.text || 'Sign up to be one of the first to try STD Verify.';
            if (modalButton) {
                modalButton.textContent = window.siteConfig.modal.buttonText || 'Sign Up For The Beta';
                
                // Set button URL
                if (window.siteConfig.urls && window.siteConfig.urls.betaFormUrl) {
                    modalButton.href = window.siteConfig.urls.betaFormUrl;
                }
            }
        }
        
        // Show the modal
        modal.style.display = 'block';
        
        // Ensure proper mobile display
        setTimeout(function() {
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) {
                // Add extra click area for better mobile touchability
                closeBtn.style.padding = window.innerWidth < 768 ? '10px' : '0';
            }
        }, 100);
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
        
        // Close modal on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
    
    // Function to find and set up all beta buttons
    function setupBetaButtons() {
        // Get all elements with the text "Join Our Beta" or class "beta-button"
        const betaButtons = [];
        
        // Find by ID
        const contactButton = document.getElementById('contact-button');
        if (contactButton) betaButtons.push(contactButton);
        
        // Find by mobile ID
        const contactButtonMobile = document.getElementById('contact-button-mobile');
        if (contactButtonMobile) betaButtons.push(contactButtonMobile);
        
        // Find by text content (for links)
        document.querySelectorAll('a').forEach(function(link) {
            if (link.textContent.includes('Join Our Beta') || link.textContent.includes('Beta Program')) {
                betaButtons.push(link);
            }
        });
        
        // Find hamburger menu items
        document.querySelectorAll('.mobile-nav-list a, .mobile-menu a').forEach(function(link) {
            if (link.textContent.includes('Join Our Beta') || link.textContent.includes('Beta Program')) {
                betaButtons.push(link);
            }
        });
        
        // Add click event to all found buttons
        betaButtons.forEach(function(button) {
            // Remove existing click events by cloning the node
            const newButton = button.cloneNode(true);
            if (button.parentNode) {
                button.parentNode.replaceChild(newButton, button);
            }
            
            // Add new click event
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                createAndShowModal();
            });
        });
    }
    
    // Wait a bit for the DOM to be fully ready with all scripts
    setTimeout(function() {
        setupBetaButtons();
        
        // Custom event listener to hook into DOM changes (for dynamically added buttons)
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    setupBetaButtons();
                }
            });
        });
        
        // Start observing the document with the configured parameters
        observer.observe(document.body, { childList: true, subtree: true });
    }, 500); // 500ms delay to ensure other scripts have run
});