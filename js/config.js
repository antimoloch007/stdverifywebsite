/**
 * STD Verify - Site Configuration
 * This file contains all site-wide configuration values
 * Update values here to change them across the entire site
 */

const siteConfig = {
    // Site information
    siteName: "STD Verify",
    siteDescription: "Secure STD status verification for the LGBTQ+ community",
    siteTagline: "Know Your Status – Because Confidence is the Ultimate Turn-On – More Loads, Less Shots 🏳️‍🌈",
    
    // Important URLs
    urls: {
        betaFormUrl: "https://form.typeform.com/to/Ii3HSlEH",
        supportEmail: "support@stdverify.org",
        linkedinPage: "https://www.linkedin.com/company/stdverify",
        newsletterSubscribe: "https://stdverify.medium.com/subscribe",
        mediumBlog: "https://medium.com/@stdverify",
        githubRepo: "https://github.com/antimoloch007/stdverifywebsite"
    },
    
    // Modal content
    modal: {
        title: "Join Our Beta Program",
        text: "Sign up to be one of the first to try STD Verify and help us shape the future of sexual health verification.",
        buttonText: "Sign Up For The Beta"
    },
    
    // Copyright information
    copyright: {
        year: "2025",
        companyName: "STD Verify, SPC"
    },
    
    // Social media links
    socialMedia: {
        bluesky: "https://bsky.app/profile/stdverify.bsky.social",
        instagram: "https://www.instagram.com/stdverify",
        linkedin: "https://www.linkedin.com/company/stdverify",
        github: "https://github.com/antimoloch007/stdverifywebsite",
        medium: "https://medium.com/@stdverify"
    },
    
    // Navigation structure
    navigation: {
        leftLinks: [
            { text: "Home", url: "index.html" },
            { text: "Our Mission", url: "mission.html" },
            { text: "FAQ", url: "faq.html" },
            { text: "Blog", url: "https://medium.com/@stdverify", target: "_blank" }
        ],
        rightLinks: [
            { text: "Join Our Beta", url: "#", id: "contact-button" }
        ],
        // Mobile navigation - combines all links for the mobile menu
        mobileLinks: [
            { text: "Home", url: "index.html" },
            { text: "Our Mission", url: "mission.html" },
            { text: "FAQ", url: "faq.html" },
            { text: "Blog", url: "https://medium.com/@stdverify" },
            { text: "Join Our Beta", url: "#", id: "mobile-contact-button" }
        ]
    },
    
    // Mobile specific configuration
    mobile: {
        logoSmall: "./assets/logo-small.png", // Add a smaller logo for mobile navigation
        breakpoint: 768 // The width in pixels where mobile layout begins
    },
    
    // Footer structure
    footer: {
        columns: [
            {
                title: "STD Verify",
                links: [
                    { text: "Home", url: "index.html" },
                    { text: "Our Mission", url: "mission.html" },
                    { text: "Join Our Beta", url: "#", id: "footer-beta-button" },
                    { text: "Privacy Policy", url: "privacy-policy.html" }
                ]
            },
            {
                title: "Resources",
                links: [
                    { text: "FAQ", url: "faq.html" },
                    { text: "Blog", url: "https://medium.com/@stdverify" },
                    { text: "Newsletter", url: "https://stdverify.medium.com/subscribe" },
                    { text: "Partner Clinics - Coming soon!", url: "#clinics" }
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

// Make configuration accessible globally
window.siteConfig = siteConfig;