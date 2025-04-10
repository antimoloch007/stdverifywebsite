/**
 * STD Verify - Core Functionality
 * Handles navigation, site configuration application, and core site setup
 * Updated to remove animation initializations
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded - initializing core functionality");
    
    // Make sure config is loaded before proceeding
    if (typeof window.siteConfig === 'undefined') {
        console.error("siteConfig not found! Adding a small delay to wait for config.js to load...");
        // Add a small delay to ensure config.js has loaded
        setTimeout(initCore, 100);
    } else {
        initCore();
    }
});

function initCore() {
    console.log("Initializing core functionality...");
    
    // Check if siteConfig exists
    if (!window.siteConfig) {
        console.error("siteConfig still not found after delay! Check if config.js is loaded before core.js");
        // Try to load a minimal default config to prevent total failure
        window.siteConfig = getDefaultConfig();
    }
    
    // Apply configuration
    applyConfig();
    
    // Set up navigation with desktop hamburger
    setupNavigation();
    
    // Apply footer
    setupFooter();
    
    // Enhance hero logo with circular border
    enhanceHeroLogo();
    
    // Initialize UI components if available
    if (typeof initComponents === 'function') {
        initComponents();
    } else {
        console.log("Components initialization function not found");
    }
    
    // NOTE: Background animation initialization removed for performance
}

/**
 * Fallback default configuration in case config.js fails to load
 */
function getDefaultConfig() {
    console.log("Using default configuration as fallback");
    return {
        siteName: "STD Verify",
        siteTagline: "Know Your Status – Because Confidence is the Ultimate Turn-On – More Loads, Less Shots 🏳️‍🌈",
        urls: {
            betaFormUrl: "#",
            supportEmail: "support@stdverify.org"
        },
        modal: {
            title: "Join Our Beta Program",
            text: "Sign up to be one of the first to try STD Verify.",
            buttonText: "Sign Up For The Beta"
        },
        copyright: {
            year: new Date().getFullYear(),
            companyName: "STD Verify"
        },
        socialMedia: {
            bluesky: "#",
            instagram: "#",
            linkedin: "#"
        },
        navigation: {
            leftLinks: [
                { text: "About", url: "index.html#about" },
                { text: "FAQ", url: "faq.html" }
            ],
            rightLinks: [
                { text: "Join Our Beta", url: "#", id: "contact-button" }
            ],
            mobileLinks: [
                { text: "About", url: "index.html#about" },
                { text: "FAQ", url: "faq.html" },
                { text: "Join Our Beta", url: "#", id: "mobile-contact-button" }
            ]
        },
        footer: {
            columns: [
                {
                    title: "STD Verify",
                    links: [
                        { text: "About Us", url: "index.html#about" },
                        { text: "Join Our Beta", url: "#", id: "footer-beta-button" }
                    ]
                },
                {
                    title: "Resources",
                    links: [
                        { text: "FAQ", url: "faq.html" }
                    ]
                },
                {
                    title: "Contact",
                    links: [
                        { text: "support@stdverify.org", url: "mailto:support@stdverify.org" }
                    ],
                    hasSocialIcons: true
                }
            ]
        }
    };
}

/**
 * Apply site configuration from config.js to the HTML
 */
function applyConfig() {
    console.log("Applying configuration values");
    
    // Ensure siteConfig exists
    if (!window.siteConfig) {
        console.error("siteConfig not found in applyConfig");
        return;
    }
    
    // Apply form URL to all beta buttons
    const betaButtons = document.querySelectorAll('.beta-button');
    betaButtons.forEach(button => {
        if (!button.closest('.modal')) {
            button.href = window.siteConfig.urls.betaFormUrl || "#";
        }
    });
    
    // Apply site name
    const siteNameElements = document.querySelectorAll('.nav-logo');
    siteNameElements.forEach(element => {
        element.textContent = window.siteConfig.siteName || "STD Verify";
    });
    
    // Apply tagline if it exists
    const taglineElement = document.querySelector('.tagline');
    if (taglineElement) {
        taglineElement.textContent = window.siteConfig.siteTagline || "Know Your Status – Because Confidence is the Ultimate Turn-On – More Loads, Less Shots 🏳️‍🌈";
    } else {
        console.warn("Tagline element not found");
    }
    
    // Apply copyright information
    updateCopyright();
    
    // Apply support email
    const supportEmailLinks = document.querySelectorAll('a[href^="mailto:support"]');
    supportEmailLinks.forEach(link => {
        link.href = `mailto:${window.siteConfig.urls.supportEmail || "support@stdverify.org"}`;
        link.textContent = window.siteConfig.urls.supportEmail || "support@stdverify.org";
    });
    
    // Apply social media links
    const blueskyLink = document.querySelector('.social-icon:nth-child(1)');
    const instagramLink = document.querySelector('.social-icon:nth-child(2)');
    const linkedinLink = document.querySelector('.social-icon:nth-child(3)');
    
    if (blueskyLink) blueskyLink.href = window.siteConfig.socialMedia.bluesky || "#";
    if (instagramLink) instagramLink.href = window.siteConfig.socialMedia.instagram || "#";
    if (linkedinLink) linkedinLink.href = window.siteConfig.socialMedia.linkedin || "#";
}

/**
 * Updates the copyright information
 */
function updateCopyright() {
    console.log("Updating copyright information");
    
    if (!window.siteConfig) return;
    
    const copyright = document.querySelector('.copyright p');
    if (!copyright) {
        // Create copyright paragraph if it doesn't exist
        const copyrightDiv = document.querySelector('.copyright');
        if (copyrightDiv) {
            const p = document.createElement('p');
            p.textContent = `© ${window.siteConfig.copyright.year || new Date().getFullYear()} ${window.siteConfig.copyright.companyName || "STD Verify"}. All rights reserved.`;
            copyrightDiv.appendChild(p);
        } else {
            console.warn("Copyright div not found");
        }
    } else {
        copyright.textContent = `© ${window.siteConfig.copyright.year || new Date().getFullYear()} ${window.siteConfig.copyright.companyName || "STD Verify"}. All rights reserved.`;
    }
}

/**
 * Function to enhance the hero logo with a circular border
 */
function enhanceHeroLogo() {
    // Find the hero logo container
    const heroLogoContainer = document.querySelector('.hero-logo-container');
    if (!heroLogoContainer) return;
    
    // Add circular border class
    heroLogoContainer.classList.add('main-logo-circle');
    
    // Enhance the appearance with circular glow
    const img = heroLogoContainer.querySelector('img');
    if (img) {
        img.style.borderRadius = '50%';
        img.style.position = 'relative';
        img.style.zIndex = '2';
        
        // Create outer glow element
        const outerGlow = document.createElement('div');
        outerGlow.style.position = 'absolute';
        outerGlow.style.top = '-5px';
        outerGlow.style.left = '-5px';
        outerGlow.style.right = '-5px';
        outerGlow.style.bottom = '-5px';
        outerGlow.style.borderRadius = '50%';
        outerGlow.style.border = '2px solid rgba(255, 255, 255, 0.8)';
        outerGlow.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
        outerGlow.style.pointerEvents = 'none';
        outerGlow.style.zIndex = '3';
        
        // Insert before the image for proper z-index
        heroLogoContainer.insertBefore(outerGlow, img);
    }
}

/**
 * Set up the navigation bar with logo
 */
function setupNavigation() {
    console.log("Setting up unified navigation");
    
    // Only initialize if siteConfig exists
    if (!window.siteConfig) {
        console.error("siteConfig not found in setupNavigation");
        return;
    }
    
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) {
        console.error("Navigation container not found");
        return;
    }
    
    // Clear existing navigation
    navContainer.innerHTML = '';

    // Create logo container with link - ALWAYS SHOW LOGO
    const logoContainer = document.createElement('a');
    logoContainer.href = 'index.html';
    logoContainer.className = 'nav-logo-container';
    
    // Create logo icon container with proper structure
    const logoIconContainer = document.createElement('div');
    logoIconContainer.className = 'nav-logo-icon';
    
    // Add the rainbow background to logo icon
    const logoAura = document.createElement('div');
    logoAura.className = 'hero-aura';
    
    const auraFlow = document.createElement('div');
    auraFlow.className = 'aura-flow';
    
    logoAura.appendChild(auraFlow);
    logoIconContainer.appendChild(logoAura);
    
    // Create logo image - ensure it's properly structured
    const logoImg = document.createElement('img');
    logoImg.src = './assets/logo.png';
    logoImg.alt = 'STD Verify Logo';
    logoImg.style.width = '80%';
    logoImg.style.height = '80%';
    logoImg.style.objectFit = 'contain';
    logoImg.style.position = 'relative';
    logoImg.style.zIndex = '2';
    
    logoIconContainer.appendChild(logoImg);
    logoContainer.appendChild(logoIconContainer);
    
    // Add logo text
    const logoText = document.createElement('span');
    logoText.className = 'nav-logo';
    logoText.textContent = window.siteConfig.siteName || "STD Verify";
    logoContainer.appendChild(logoText);
    
    // Create nav links container 
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links desktop-nav';
    
    // Left links
    const leftLinks = document.createElement('div');
    leftLinks.className = 'left-links';
    
    if (window.siteConfig.navigation.leftLinks) {
        window.siteConfig.navigation.leftLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url || "#";
            a.textContent = link.text || "";
            if (link.id) a.id = link.id;
            
            // Check if this is an external link that should open in a new tab
            // Don't open internal navigation in new tabs
            if (!link.url.startsWith('#') && 
                !link.url.includes('index.html') && 
                !link.url.includes('mission.html') && 
                !link.url.includes('faq.html') && 
                !link.url.includes('privacy-policy.html')) {
                
                a.target = "_blank";
                a.rel = "noopener noreferrer";
            }
            
            leftLinks.appendChild(a);
        });
    }
    
    // Right links
    const rightLinks = document.createElement('div');
    rightLinks.className = 'right-links';
    
    if (window.siteConfig.navigation.rightLinks) {
        window.siteConfig.navigation.rightLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url || "#";
            a.textContent = link.text || "";
            if (link.id) a.id = link.id;
            
            // Check if this is an external link that should open in a new tab
            // Specifically open newsletter in a new tab and any external URLs
            // Don't open beta button or other modals in new tabs
            if ((link.id && link.id.includes('newsletter')) ||
                (link.url.startsWith('http') && !link.id?.includes('contact') && !link.id?.includes('beta'))) {
                a.target = "_blank";
                a.rel = "noopener noreferrer";
            }
            
            rightLinks.appendChild(a);
        });
    }
    
    navLinks.appendChild(leftLinks);
    navLinks.appendChild(rightLinks);
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Add hamburger icon spans
    for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');
        hamburger.appendChild(span);
    }
    
    // Add elements to navigation
    navContainer.appendChild(logoContainer);
    navContainer.appendChild(navLinks);
    navContainer.appendChild(hamburger);
    
    // Set up mobile navigation with the same logo
    setupMobileNavigation();
}

/**
 * Set up the mobile navigation menu
 */
function setupMobileNavigation() {
    console.log("Setting up mobile navigation with consistent logo");
    
    // Check if mobile nav already exists
    let existingMobileMenu = document.querySelector('.mobile-menu');
    if (existingMobileMenu) {
        existingMobileMenu.remove();
    }
    
    // Create mobile navigation elements
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.setAttribute('aria-hidden', 'true');
    
    // Create mobile menu content with proper structure
    const menuBackdrop = document.createElement('div');
    menuBackdrop.className = 'menu-backdrop';
    
    const menuContent = document.createElement('div');
    menuContent.className = 'menu-content';
    
    // Create mobile header with logo - SAME STRUCTURE AS DESKTOP
    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'mobile-header';
    
    // Create logo icon container with exact same structure as desktop
    const logoIconContainer = document.createElement('div');
    logoIconContainer.className = 'nav-logo-icon';
    
    // Add the rainbow background - same as desktop
    const logoAura = document.createElement('div');
    logoAura.className = 'hero-aura';
    
    const auraFlow = document.createElement('div');
    auraFlow.className = 'aura-flow';
    
    logoAura.appendChild(auraFlow);
    logoIconContainer.appendChild(logoAura);
    
    // Create logo image - IDENTICAL TO DESKTOP
    const logoImg = document.createElement('img');
    logoImg.src = './assets/logo.png';
    logoImg.alt = 'STD Verify Logo';
    logoImg.style.width = '80%';
    logoImg.style.height = '80%';
    logoImg.style.objectFit = 'contain';
    logoImg.style.position = 'relative';
    logoImg.style.zIndex = '2';
    
    logoIconContainer.appendChild(logoImg);
    
    // Create logo text
    const logoText = document.createElement('span');
    logoText.className = 'nav-logo';
    logoText.textContent = window.siteConfig.siteName || "STD Verify";
    logoText.style.fontSize = '1.4rem';
    logoText.style.fontWeight = '700';
    
    mobileHeader.appendChild(logoIconContainer);
    mobileHeader.appendChild(logoText);
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'menu-close-button';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close menu');
    
    // Create mobile nav list
    const navList = document.createElement('ul');
    navList.className = 'mobile-nav-list';
    
    // Add links to mobile menu
    const mobileLinks = window.siteConfig.navigation.mobileLinks || 
                        [...(window.siteConfig.navigation.leftLinks || []), ...(window.siteConfig.navigation.rightLinks || [])];
    
    mobileLinks.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        link.href = item.url || "#";
        link.textContent = item.text || "";
        
        if (item.id) {
            const mobileId = item.id + '-mobile';
            link.id = mobileId;
            
            if (item.id === 'contact-button' || item.id.includes('beta')) {
                link.className = 'beta-button';
            }
        }
        
        // Check if this is an external link that should open in a new tab
        // Specifically open newsletter in a new tab and any external URLs
        // Don't open beta button or other modals in new tabs
        if ((item.id && item.id.includes('newsletter')) ||
            (item.url.startsWith('http') && !item.url.startsWith('#') && 
             !item.id?.includes('contact') && !item.id?.includes('beta') &&
             !item.url.includes('index.html') && 
             !item.url.includes('mission.html') && 
             !item.url.includes('faq.html') && 
             !item.url.includes('privacy-policy.html'))) {
            
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }
        
        listItem.appendChild(link);
        navList.appendChild(listItem);
    });
    
    // Assemble mobile menu
    menuContent.appendChild(closeButton);
    menuContent.appendChild(mobileHeader);
    menuContent.appendChild(navList);
    mobileMenu.appendChild(menuBackdrop);
    mobileMenu.appendChild(menuContent);
    
    // Add mobile menu to body
    document.body.appendChild(mobileMenu);
    
    // Set up mobile menu event listeners
    setupMobileMenuEvents();
}

/**
 * Set up event listeners for mobile menu
 */
function setupMobileMenuEvents() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeButton = document.querySelector('.menu-close-button');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    
    if (!hamburger || !mobileMenu || !closeButton || !menuBackdrop) {
        console.warn("Mobile menu elements not found");
        return;
    }
    
    // Remove existing event listeners by cloning and replacing elements
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    
    const newCloseButton = closeButton.cloneNode(true);
    closeButton.parentNode.replaceChild(newCloseButton, closeButton);
    
    const newMenuBackdrop = menuBackdrop.cloneNode(true);
    menuBackdrop.parentNode.replaceChild(newMenuBackdrop, menuBackdrop);
    
    // Toggle menu when clicking hamburger
    newHamburger.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close when clicking close button
    newCloseButton.addEventListener('click', function() {
        closeMobileMenu();
    });
    
    // Close when clicking backdrop
    newMenuBackdrop.addEventListener('click', function() {
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
        newHamburger.classList.add('open');
        mobileMenu.classList.add('open');
        document.body.classList.add('menu-open');
        mobileMenu.setAttribute('aria-hidden', 'false');
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        newHamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
    }
}

/**
 * Set up the footer
 */
function setupFooter() {
    console.log("Setting up footer");
    
    // Only initialize if siteConfig exists
    if (!window.siteConfig) {
        console.error("siteConfig not found in setupFooter");
        return;
    }
    
    const footerContainer = document.querySelector('.footer-container');
    if (!footerContainer) {
        console.error("Footer container not found");
        return;
    }
    
    // Clear existing footer content
    footerContainer.innerHTML = '';
    
    // Ensure footer columns exist
    if (!window.siteConfig.footer || !window.siteConfig.footer.columns) {
        console.error("Footer configuration not found");
        return;
    }
    
    // Generate footer columns from config
    window.siteConfig.footer.columns.forEach(column => {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'footer-column';
        
        // Add column title
        const title = document.createElement('h3');
        title.textContent = column.title || "";
        columnDiv.appendChild(title);
        
        // Add links
        const linksList = document.createElement('ul');
        if (column.links && Array.isArray(column.links)) {
            column.links.forEach(link => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = link.url || "#";
                a.textContent = link.text || "";
                if (link.id) a.id = link.id;
                
                // Add target="_blank" for external links, but not for internal navigation
                // Don't add for beta button that should open modal
                if (!link.url.startsWith('#') && 
                    !link.url.includes('index.html') && 
                    !link.url.includes('mission.html') && 
                    !link.url.includes('faq.html') && 
                    !link.url.includes('privacy-policy.html') && 
                    !link.id?.includes('beta-button')) {
                    a.target = "_blank";
                    // For security, also add rel attribute for external links
                    a.rel = "noopener noreferrer";
                }
                
                li.appendChild(a);
                linksList.appendChild(li);
            });
        }
        columnDiv.appendChild(linksList);
        
        // Add social icons if needed
        if (column.hasSocialIcons) {
            const socialDiv = document.createElement('div');
            socialDiv.className = 'social-icons';
            
            // Bluesky icon
            if (window.siteConfig.socialMedia && window.siteConfig.socialMedia.bluesky) {
                // Create a link element for Bluesky
                const blueskyLink = document.createElement('a');
                blueskyLink.href = window.siteConfig.socialMedia.bluesky || "#";
                blueskyLink.className = 'social-icon';
                blueskyLink.target = '_blank';
                blueskyLink.rel = 'noopener noreferrer';
                
                // Create image element for Bluesky butterfly logo
                const img = document.createElement('img');
                img.src = './assets/bluesky_butterfly-logo.svg';
                img.alt = 'Bluesky';
                img.style.width = '18px';
                img.style.height = '18px';
                
                // Append the image to the link
                blueskyLink.appendChild(img);
                socialDiv.appendChild(blueskyLink);
            }
            
            // Instagram icon
            if (window.siteConfig.socialMedia && window.siteConfig.socialMedia.instagram) {
                const instagramLink = createSocialIcon(
                    window.siteConfig.socialMedia.instagram,
                    '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>'
                );
                socialDiv.appendChild(instagramLink);
            }
            
            // LinkedIn icon
            if (window.siteConfig.socialMedia && window.siteConfig.socialMedia.linkedin) {
                const linkedinLink = createSocialIcon(
                    window.siteConfig.socialMedia.linkedin,
                    '<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>'
                );
                socialDiv.appendChild(linkedinLink);
            }
            
            // GitHub icon
            if (window.siteConfig.socialMedia && window.siteConfig.socialMedia.github) {
                const githubLink = createSocialIcon(
                    window.siteConfig.socialMedia.github,
                    '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>'
                );
                socialDiv.appendChild(githubLink);
            }

            // Medium icon
            if (window.siteConfig.socialMedia && window.siteConfig.socialMedia.medium) {
                const mediumLink = createSocialIcon(
                    window.siteConfig.socialMedia.medium,
                    '<path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404h-7.148v-.404l2.521-3.058c.27-.279.39-.67.325-1.052v-10.608z"/>'
                );
                socialDiv.appendChild(mediumLink);
            }
            
            columnDiv.appendChild(socialDiv);
        }
        
        footerContainer.appendChild(columnDiv);
    });
}

/**
 * Helper function to create social media icons
 */
function createSocialIcon(url, svgPath) {
    const link = document.createElement('a');
    link.href = url || "#";
    link.className = 'social-icon';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.innerHTML = svgPath || "";
    
    link.appendChild(svg);
    return link;
}