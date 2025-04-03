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
        linkedinPage: "https://www.linkedin.com/company/stdverify"
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
        companyName: "STD Verify"
    },
    
    // Social media links
    socialMedia: {
        twitter: "#",
        instagram: "https://www.instagram.com/stdverify",
        linkedin: "https://www.linkedin.com/company/stdverify"
    },
    
    // Navigation structure
    navigation: {
        leftLinks: [
            { text: "About", url: "index.html#about" },
            { text: "FAQ", url: "faq.html" }
        ],
        rightLinks: [
            { text: "Join Our Beta", url: "#", id: "contact-button" }
        ]
    },
    
    // Footer structure
    footer: {
        columns: [
            {
                title: "STD Verify",
                links: [
                    { text: "About Us", url: "index.html#about" },
                    { text: "Join Our Beta", url: "#", id: "footer-beta-button" },
                    { text: "Our Mission", url: "index.html#mission" },
                    { text: "Privacy Policy", url: "privacy-policy.html" }
                ]
            },
            {
                title: "Resources",
                links: [
                    { text: "FAQ", url: "faq.html" },
                    { text: "Blog - Coming soon!", url: "#blog" },
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