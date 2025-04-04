/**
 * STD Verify - Navigation Script
 * Handles navigation with clickable logo, without modal functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if siteConfig exists
    if (!window.siteConfig) return;
    
    const mobileBreakpoint = window.siteConfig.mobile?.breakpoint || 768;
    
    // Create and add navigation elements to the DOM
    function setupNavigation() {
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer) return;
        
        // First, clear any existing elements that might be leftover
        const existingElements = navContainer.querySelectorAll('.logo-container, .hamburger, .mobile-menu');
        existingElements.forEach(el => el.remove());
        
        // Create logo container - make it clickable
        const logoContainer = document.createElement('a');
        logoContainer.className = 'logo-container';
        logoContainer.href = 'index.html'; // Link to homepage
        logoContainer.setAttribute('title', 'Go to homepage');
        
        // Add logo to nav
        const logoMobile = document.createElement('img');
        logoMobile.src = window.siteConfig.mobile?.logoSmall || './assets/logo.png';
        logoMobile.alt = window.siteConfig.siteName || 'STD Verify';
        logoMobile.className = 'mobile-logo animated-logo';
        logoContainer.appendChild(logoMobile);
        
        // Add "STD Verify" text next to logo
        const stdVerifyText = document.createElement('div');
        stdVerifyText.className = 'std-verify-text';
        stdVerifyText.textContent = 'STD Verify';
        logoContainer.appendChild(stdVerifyText);
        
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Add hamburger icon spans
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            hamburger.appendChild(span);
        }
        
        // Create mobile menu container
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.setAttribute('aria-hidden', 'true');
        
        // Create backdrop for closing menu when clicking outside
        const menuBackdrop = document.createElement('div');
        menuBackdrop.className = 'menu-backdrop';
        
        // Create menu content container
        const menuContent = document.createElement('div');
        menuContent.className = 'menu-content';
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'menu-close-button';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('aria-label', 'Close menu');
        menuContent.appendChild(closeButton);
        
        // Create navigation list
        const navList = document.createElement('ul');
        navList.className = 'mobile-nav-list';
        
        // Combine left and right navigation links
        const leftLinks = window.siteConfig.navigation?.leftLinks || [];
        const rightLinks = window.siteConfig.navigation?.rightLinks || [];
        const mobileLinks = window.siteConfig.navigation?.mobileLinks || [...leftLinks, ...rightLinks];
        
        // Populate navigation
        mobileLinks.forEach(item => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            link.href = item.url || '#';
            link.textContent = item.text || '';
            
            // Add special class for beta button or contact button
            if (item.id) {
                // Create a unique mobile ID
                const mobileId = item.id + '-mobile';
                link.id = mobileId;
                
                // If this is the beta/contact button
                if (item.id === 'contact-button' || item.id.includes('beta')) {
                    link.className = 'beta-button';
                }
            }
            
            listItem.appendChild(link);
            navList.appendChild(listItem);
        });
        
        // Add menu list to menu content
        menuContent.appendChild(navList);
        
        // Add backdrop and content to menu
        mobileMenu.appendChild(menuBackdrop);
        mobileMenu.appendChild(menuContent);
        
        // Add elements to DOM
        navContainer.innerHTML = '';
        navContainer.appendChild(logoContainer);
        navContainer.appendChild(hamburger);
        
        // Remove any existing mobile menu from body
        const existingMenu = document.querySelector('.mobile-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Add mobile menu to body
        document.body.appendChild(mobileMenu);
        
        // Fix spacing for content
        fixContentSpacing();
        
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('open');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Close button event
        closeButton.addEventListener('click', function() {
            closeMobileMenu();
        });
        
        // Close when clicking backdrop
        menuBackdrop.addEventListener('click', function() {
            closeMobileMenu();
        });
        
        // Close when pressing escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });
        
        // Function to open mobile menu
        function openMobileMenu() {
            hamburger.classList.add('open');
            mobileMenu.classList.add('open');
            document.body.classList.add('menu-open');
            mobileMenu.setAttribute('aria-hidden', 'false');
        }
        
        // Function to close mobile menu
        function closeMobileMenu() {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
            mobileMenu.setAttribute('aria-hidden', 'true');
        }
        
        // Fix content spacing
        function fixContentSpacing() {
            // Fix main content spacing
            document.body.classList.add('nav-fixed');
            
            // Fix hero content spacing if it exists
            const heroContent = document.querySelector('header');
            if (heroContent) {
                heroContent.style.paddingTop = '20px';
            }
            
            // Fix FAQ spacing if it exists
            const faqContent = document.querySelector('.questions-container, .faq-container');
            if (faqContent) {
                faqContent.style.paddingTop = '20px';
            }
        }
    }
    
    // Initialize navigation
    setupNavigation();
    
    // Handle window resize to maintain consistency
    window.addEventListener('resize', function() {
        // Nothing specific needs to happen here as styles handle showing/hiding
    });
});