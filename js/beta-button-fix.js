/**
 * Simple Beta Button Fix
 * This script directly applies the gradient styling to beta buttons
 */

document.addEventListener('DOMContentLoaded', function() {
    // Apply styling after a short delay to ensure everything has loaded
    setTimeout(function() {
        // Find all potential "Join Beta" buttons
        const betaButtonSelectors = [
            '.beta-button',
            '#contact-button',
            '#contact-button-mobile',
            '.mobile-menu a:nth-child(3)',
            '.mobile-menu a:contains("Join Our Beta")'
        ];
        
        // The rainbow gradient background
        const gradientBg = 'conic-gradient(#ff0000, #ff9900, #ffff00, #33cc33, #3399ff, #9966ff, #ff00ff, #ff0066, #ff0000)';
        
        // Apply to each selector
        betaButtonSelectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                
                elements.forEach(el => {
                    // Apply the gradient background
                    el.style.background = gradientBg;
                    
                    // Apply other essential styles
                    el.style.color = 'white';
                    el.style.borderRadius = '30px';
                    el.style.padding = '8px 20px';
                    el.style.fontWeight = '600';
                    el.style.textDecoration = 'none';
                    el.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
                    
                    // Add the beta-button class
                    el.classList.add('beta-button');
                    
                    // If in mobile menu, add specific styling
                    if (el.closest('.mobile-menu')) {
                        el.style.display = 'block';
                        el.style.textAlign = 'center';
                        el.style.margin = '20px auto';
                        el.style.maxWidth = '200px';
                    }
                });
            } catch (e) {
                // Ignore errors for non-matching selectors
            }
        });
        
        // Alternative approach - simple text content match
        document.querySelectorAll('a').forEach(link => {
            if (link.textContent.trim() === 'Join Our Beta') {
                link.style.background = gradientBg;
                link.style.color = 'white';
                link.style.borderRadius = '30px';
                link.style.padding = '8px 20px';
                link.style.fontWeight = '600';
                link.style.textDecoration = 'none';
                link.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
                link.classList.add('beta-button');
            }
        });
    }, 500); // 500ms delay to ensure DOM is ready
});