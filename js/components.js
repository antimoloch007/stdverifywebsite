/**
 * STD Verify - UI Components
 * Handles interactive UI components: modal, FAQ, beta buttons
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initComponents();
    
    // Highlight the active navigation link after a small delay
    // to ensure navigation is fully set up
    setTimeout(highlightActiveNavLink, 300);
});

function initComponents() {
    // Initialize modal system
    initModalSystem();
    
    // Initialize FAQ accordion if on FAQ page
    if (document.querySelector('.faq-container')) {
        initFaqAccordion();
    }
    
    // Set up active navigation highlighting
    highlightActiveNavLink();
}

/**
 * Modal System
 */
function initModalSystem() {
    // Get or create the modal
    let modal = document.getElementById('contact-modal');
    
    if (!modal) {
        // Create modal if it doesn't exist
        modal = createModal();
        document.body.appendChild(modal);
    }
    
    // Apply configuration to modal content
    updateModalContent(modal);
    
    // Find all beta/contact buttons across the site
    setupBetaButtons(modal);
    
    // Set up modal close functionality
    setupModalClose(modal);
}

function createModal() {
    // Create the modal container
    const modal = document.createElement('div');
    modal.id = 'contact-modal';
    modal.className = 'modal';
    
    // Create the modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Create close button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close');
    
    // Create modal title
    const title = document.createElement('h2');
    title.className = 'modal-title';
    title.textContent = 'Join Our Beta Program';
    
    // Create modal text
    const text = document.createElement('p');
    text.className = 'modal-text';
    text.textContent = 'Sign up to be one of the first to try STD Verify and help us shape the future of sexual health verification.';
    
    // Create beta button
    const button = document.createElement('a');
    button.href = 'https://form.typeform.com/to/Ii3HSlEH';
    button.className = 'beta-button';
    button.textContent = 'Sign Up For The Beta';
    button.target = '_blank';
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(text);
    modalContent.appendChild(button);
    modal.appendChild(modalContent);
    
    return modal;
}

function updateModalContent(modal) {
    // Get elements
    const modalTitle = modal.querySelector('.modal-title');
    const modalText = modal.querySelector('.modal-text');
    const modalButton = modal.querySelector('.beta-button');
    
    // Update content from siteConfig if available
    if (window.siteConfig && window.siteConfig.modal) {
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
}

function setupBetaButtons(modal) {
    // Get all potential beta buttons
    const betaButtonSelectors = [
        '#contact-button', 
        '#contact-button-mobile',
        '#footer-beta-button',
        '.nav-links a[href="#"]',
        '.mobile-nav-list a[href="#"]',
        'a:contains("Join Our Beta")',
        'a[id*="beta"]',
        'a[id*="contact"]'
    ];
    
    // Find all matching buttons
    const betaButtons = [];
    betaButtonSelectors.forEach(selector => {
        try {
            document.querySelectorAll(selector).forEach(button => {
                if (!button.closest('.modal')) {
                    betaButtons.push(button);
                }
            });
        } catch (e) {
            // Ignore errors for non-matching selectors
        }
    });
    
    // Additional check for buttons by text content
    document.querySelectorAll('a').forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        if ((text.includes('join our beta') || text.includes('beta program')) && 
            !link.closest('.modal') && 
            !betaButtons.includes(link)) {
            betaButtons.push(link);
        }
    });
    
    // Remove duplicates
    const uniqueButtons = [...new Set(betaButtons)];
    
    // Add click handler to each button
    uniqueButtons.forEach(button => {
        // Remove existing handlers by cloning
        const newButton = button.cloneNode(true);
        if (button.parentNode) {
            button.parentNode.replaceChild(newButton, button);
        }
        
        // Add new click handler
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(modal);
        });
    });
}

function setupModalClose(modal) {
    // Close button click handler
    const closeButton = modal.querySelector('.close-modal');
    if (closeButton) {
        closeButton.onclick = function(e) {
            e.stopPropagation();
            closeModal(modal);
        };
    }
    
    // Close when clicking outside modal
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    };
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal(modal);
        }
    });
}

function openModal(modal) {
    // Show the modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Set cursor style to auto for the entire document
    document.body.style.cursor = 'auto';
    
    // Disable custom cursor during modal display
    const customCursor = document.querySelector('.custom-cursor');
    if (customCursor) {
        customCursor.style.display = 'none';
    }
    
    // Hide cursor trails if they exist
    const trailContainer = document.querySelector('.trail-container');
    if (trailContainer) {
        trailContainer.style.display = 'none';
    }
    
    // Make sure clickable elements have the pointer cursor
    modal.querySelectorAll('a, button, .close-modal').forEach(element => {
        element.style.cursor = 'pointer';
    });
}

function closeModal(modal) {
    // Hide the modal
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Restore custom cursor if needed (check if body has the custom-cursor-active class)
    if (document.body.classList.contains('custom-cursor-active')) {
        document.body.style.cursor = 'none';
        
        // Show the custom cursor again
        const customCursor = document.querySelector('.custom-cursor');
        if (customCursor) {
            customCursor.style.display = '';
        }
        
        // Show cursor trails again
        const trailContainer = document.querySelector('.trail-container');
        if (trailContainer) {
            trailContainer.style.display = '';
        }
    }
}

/**
 * Navigation Active Link Highlighting
 */
function highlightActiveNavLink() {
    // Get the current page path
    const currentPath = window.location.pathname;
    
    // Extract the page filename from the path
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    // Handle the case where URL doesn't include .html
    const pageIdentifier = pageName.includes('.') ? pageName : pageName + '.html';
    
    // Special case for the index page / home
    const isHome = pageIdentifier === 'index.html' || pageIdentifier === '/' || pageIdentifier === '';
    
    // Find all navigation links
    const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-nav-list a');
    
    // Loop through links and highlight the active one
    allNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Check if this link points to the current page
        if ((isHome && (linkHref === 'index.html' || linkHref === '/')) || 
            (!isHome && linkHref && linkHref.includes(pageIdentifier))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
    console.log("Initializing FAQ Accordion");
    
    // Get all FAQ question elements
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Ensure we have questions to process
    if (faqQuestions.length === 0) {
        console.warn("No FAQ questions found");
        return;
    }
    
    // Add click event listener to each question
    faqQuestions.forEach(question => {
        // Remove existing event listeners by cloning
        const newQuestion = question.cloneNode(true);
        question.parentNode.replaceChild(newQuestion, question);
        
        newQuestion.addEventListener('click', function() {
            // Toggle active class on the question
            this.classList.toggle('active');
            
            // Get the answer associated with this question
            const answer = this.nextElementSibling;
            
            // Toggle the show class on the answer
            if (answer && answer.classList.contains('faq-answer')) {
                // If this answer is already open, close it
                const isCurrentlyOpen = answer.classList.contains('show');
                
                // Close all other FAQs first
                const allAnswers = document.querySelectorAll('.faq-answer');
                const allQuestions = document.querySelectorAll('.faq-question');
                
                allAnswers.forEach((otherAnswer, index) => {
                    otherAnswer.classList.remove('show');
                    allQuestions[index].classList.remove('active');
                });
                
                // If the clicked FAQ wasn't already open, open it
                if (!isCurrentlyOpen) {
                    answer.classList.add('show');
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Always open the first FAQ on page load
    // Use a direct access approach rather than triggering click events
    // Defer this to happen after the page is fully loaded
    if (faqQuestions.length > 0) {
        const firstQuestion = faqQuestions[0];
        const firstAnswer = firstQuestion.nextElementSibling;
        
        if (firstAnswer && firstAnswer.classList.contains('faq-answer')) {
            firstQuestion.classList.add('active');
            firstAnswer.classList.add('show');
        }
    }
}