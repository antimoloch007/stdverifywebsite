/**
 * STD Verify - Dynamic Navigation Generator
 * This script applies the navigation structure from config.js to all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Apply site configuration values
    applyNavigation();
    applyFooter();
    updateCopyright();
    updateModalContent();
});

function applyNavigation() {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;
    
    // Clear existing navigation
    navContainer.innerHTML = '';
    
    // Create left links section
    const leftLinks = document.createElement('div');
    leftLinks.className = 'nav-links';
    
    siteConfig.navigation.leftLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        if (link.id) a.id = link.id;
        leftLinks.appendChild(a);
    });
    
    // Create center logo
    const logoLink = document.createElement('a');
    logoLink.href = 'index.html';
    logoLink.className = 'nav-logo';
    logoLink.textContent = siteConfig.siteName;
    
    // Create right links section
    const rightLinks = document.createElement('div');
    rightLinks.className = 'nav-links';
    
    siteConfig.navigation.rightLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        if (link.id) a.id = link.id;
        rightLinks.appendChild(a);
    });
    
    // Add all elements to navigation
    navContainer.appendChild(leftLinks);
    navContainer.appendChild(logoLink);
    navContainer.appendChild(rightLinks);
}

function createSocialIcon(url, svgPath) {
    const link = document.createElement('a');
    link.href = url;
    link.className = 'social-icon';
    link.target = '_blank';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.innerHTML = svgPath;
    
    link.appendChild(svg);
    return link;
}

function applyFooter() {
    const footerContainer = document.querySelector('.footer-container');
    if (!footerContainer) return;
    
    // Clear existing footer content
    footerContainer.innerHTML = '';
    
    // Generate footer columns from config
    siteConfig.footer.columns.forEach(column => {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'footer-column';
        
        // Add column title
        const title = document.createElement('h3');
        title.textContent = column.title;
        columnDiv.appendChild(title);
        
        // Add links
        const linksList = document.createElement('ul');
        column.links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.text;
            if (link.id) a.id = link.id;
            li.appendChild(a);
            linksList.appendChild(li);
        });
        columnDiv.appendChild(linksList);
        
        // Add social icons if needed
        if (column.hasSocialIcons) {
            const socialDiv = document.createElement('div');
            socialDiv.className = 'social-icons';
            
            // Twitter/X icon
            if (siteConfig.socialMedia.twitter) {
                const twitterLink = createSocialIcon(
                    siteConfig.socialMedia.twitter,
                    '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>'
                );
                socialDiv.appendChild(twitterLink);
            }
            
            // Instagram icon
            if (siteConfig.socialMedia.instagram) {
                const instagramLink = createSocialIcon(
                    siteConfig.socialMedia.instagram,
                    '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>'
                );
                socialDiv.appendChild(instagramLink);
            }
            
            // LinkedIn icon
            if (siteConfig.socialMedia.linkedin) {
                const linkedinLink = createSocialIcon(
                    siteConfig.socialMedia.linkedin,
                    '<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>'
                );
                socialDiv.appendChild(linkedinLink);
            }
            
            columnDiv.appendChild(socialDiv);
        }
        
        footerContainer.appendChild(columnDiv);
    });
}

function updateCopyright() {
    const copyright = document.querySelector('.copyright p');
    if (!copyright) {
        // Create copyright paragraph if it doesn't exist
        const copyrightDiv = document.querySelector('.copyright');
        if (copyrightDiv) {
            const p = document.createElement('p');
            p.textContent = `© ${siteConfig.copyright.year} ${siteConfig.copyright.companyName}. All rights reserved.`;
            copyrightDiv.appendChild(p);
        }
    } else {
        copyright.textContent = `© ${siteConfig.copyright.year} ${siteConfig.copyright.companyName}. All rights reserved.`;
    }
}

function updateModalContent() {
    const modal = document.getElementById('contact-modal');
    if (!modal) return;

    const modalTitle = modal.querySelector('.modal-title');
    const modalText = modal.querySelector('.modal-text');
    const betaButton = modal.querySelector('.beta-button');
    
    if (modalTitle) modalTitle.textContent = siteConfig.modal.title;
    if (modalText) modalText.textContent = siteConfig.modal.text;
    if (betaButton) {
        betaButton.textContent = siteConfig.modal.buttonText;
        betaButton.href = siteConfig.urls.betaFormUrl;
    }
}