/**
 * STD Verify - Apply Configuration
 * This file applies the configuration values from config.js to the HTML
 */

document.addEventListener('DOMContentLoaded', function() {
    // Apply form URL to all beta buttons
    const betaButtons = document.querySelectorAll('.beta-button');
    betaButtons.forEach(button => {
        button.href = window.siteConfig.urls.betaFormUrl;
    });
    
    // Apply modal content
    const modalTitle = document.querySelector('.modal-title');
    const modalText = document.querySelector('.modal-text');
    const modalButton = document.querySelector('.modal-content .beta-button');
    
    if (modalTitle) modalTitle.textContent = window.siteConfig.modal.title;
    if (modalText) modalText.textContent = window.siteConfig.modal.text;
    if (modalButton) modalButton.textContent = window.siteConfig.modal.buttonText;
    
    // Apply site name
    const siteNameElements = document.querySelectorAll('.nav-logo');
    siteNameElements.forEach(element => {
        element.textContent = window.siteConfig.siteName;
    });
    
    // Apply tagline if it exists
    const taglineElement = document.querySelector('.tagline');
    if (taglineElement) {
        taglineElement.textContent = window.siteConfig.siteTagline;
    }
    
    // Apply copyright information
    const copyrightElement = document.querySelector('.copyright p');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${window.siteConfig.copyright.year} ${window.siteConfig.copyright.companyName}. All rights reserved.`;
    }
    
    // Apply social media links
    const twitterLink = document.querySelector('.social-icon:nth-child(1)');
    const instagramLink = document.querySelector('.social-icon:nth-child(2)');
    const linkedinLink = document.querySelector('.social-icon:nth-child(3)');
    
    if (twitterLink) twitterLink.href = window.siteConfig.socialMedia.twitter;
    if (instagramLink) instagramLink.href = window.siteConfig.socialMedia.instagram;
    if (linkedinLink) linkedinLink.href = window.siteConfig.socialMedia.linkedin;
    
    // Apply support email
    const supportEmailLinks = document.querySelectorAll('a[href^="mailto:support"]');
    supportEmailLinks.forEach(link => {
        link.href = `mailto:${window.siteConfig.urls.supportEmail}`;
        link.textContent = window.siteConfig.urls.supportEmail;
    });
});