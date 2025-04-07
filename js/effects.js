/**
 * STD Verify - Visual Effects
 * Handles cursor effects and other visual enhancements
 * This file is optional and can be excluded for better performance
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if the device is mobile or tablet
    const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || (window.innerWidth <= 768);
    
    // Only apply custom cursor effects on desktop
    if (!isMobileOrTablet) {
        initCustomCursor();
        initRainbowTrails();
    } else {
        // On mobile, ensure we don't hide the cursor
        document.body.style.cursor = 'auto';
    }
});

function initCustomCursor() {
    // Remove any existing cursors first to prevent duplicates
    const existingCursors = document.querySelectorAll('.custom-cursor');
    existingCursors.forEach(cursor => cursor.remove());
    
    // Create custom cursor
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    
    // Add a glow effect to the cursor
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    customCursor.appendChild(cursorGlow);
    
    // Create cursor inner (where the logo will be)
    const cursorInner = document.createElement('div');
    cursorInner.className = 'cursor-inner';
    customCursor.appendChild(cursorInner);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    document.body.classList.add('custom-cursor-active');
    
    // Use the logo as cursor
    const logoImg = document.querySelector('.logo');
    
    // Set default fallback
    cursorInner.style.backgroundImage = `url(./assets/logo.png)`;
    
    // Try to use the actual logo if available
    if (logoImg) {
        logoImg.addEventListener('load', function() {
            try {
                const tempCanvas = document.createElement('canvas');
                const ctx = tempCanvas.getContext('2d');
                tempCanvas.width = 40;
                tempCanvas.height = 40;
                ctx.drawImage(logoImg, 0, 0, 40, 40);
                
                const dataURL = tempCanvas.toDataURL();
                cursorInner.style.backgroundImage = `url(${dataURL})`;
            } catch(e) {
                // Keep the fallback if there's an error
                console.log('Using fallback cursor image');
            }
        });
    }
    
    document.body.appendChild(customCursor);
    
    // Update custom cursor position
    document.addEventListener('mousemove', function(e) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    // Add hover effect on clickable elements
    document.querySelectorAll('a, button, .faq-question').forEach(element => {
        element.addEventListener('mouseenter', function() {
            customCursor.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            customCursor.classList.remove('cursor-hover');
        });
    });
    
    // Add specific handling for modals
    const modal = document.getElementById('contact-modal');
    if (modal) {
        // Special handling for modal content to ensure cursor is visible
        modal.addEventListener('mousemove', function(e) {
            if (modal.style.display === 'block') {
                document.body.style.cursor = 'auto';
            }
        });
        
        // Ensure we see normal cursor on clickable elements in modal
        modal.querySelectorAll('a, button, .close-modal').forEach(element => {
            element.addEventListener('mouseenter', function() {
                if (modal.style.display === 'block') {
                    this.style.cursor = 'pointer';
                }
            });
        });
        
        // Restore custom cursor when modal is closed
        const closeButton = modal.querySelector('.close-modal');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                setTimeout(() => {
                    document.body.style.cursor = 'none';
                }, 100);
            });
        }
        
        // Also handle clicking outside the modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                setTimeout(() => {
                    document.body.style.cursor = 'none';
                }, 100);
            }
        });
    }
}

function initRainbowTrails() {
    // Remove any existing trails first to prevent duplicates
    const existingTrails = document.querySelectorAll('.cursor-trail');
    existingTrails.forEach(trail => trail.remove());
    
    // Create trail container for better performance
    const trailContainer = document.createElement('div');
    trailContainer.className = 'trail-container';
    document.body.appendChild(trailContainer);
    
    // Number of trail elements to create
    const numberOfTrails = 25;
    
    // Rainbow colors with some translucency
    const colors = [
        'rgba(255, 200, 200, 0.7)',   // light red
        'rgba(255, 230, 200, 0.7)',   // light orange
        'rgba(255, 255, 200, 0.7)',   // light yellow
        'rgba(200, 255, 200, 0.7)',   // light green
        'rgba(200, 230, 255, 0.7)',   // light blue
        'rgba(220, 200, 255, 0.7)',   // light purple
        'rgba(255, 200, 230, 0.7)'    // light pink
    ];
    
    // Create trail elements
    for (let i = 0; i < numberOfTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        
        // Alternate rainbow colors for better effect
        const colorIndex = i % colors.length;
        trail.style.backgroundColor = colors[colorIndex];
        
        // Vary size based on position in trail
        const size = Math.max(5, 20 - (i * 0.5));
        trail.style.width = `${size}px`;
        trail.style.height = `${size}px`;
        
        // More rounded as they get smaller
        trail.style.borderRadius = `${Math.min(50, 30 + i)}%`;
        
        trailContainer.appendChild(trail);
    }
    
    const trails = document.querySelectorAll('.cursor-trail');
    let mouseX = 0;
    let mouseY = 0;
    const trailPositions = Array(numberOfTrails).fill().map(() => ({ x: 0, y: 0 }));
    
    // Update mouse position on move
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate trails
    function animateTrails() {
        for (let i = 0; i < trails.length; i++) {
            // Delayed following effect with varied delay
            const delay = 0.05 * (i + 1); // Slightly faster following
            const trail = trails[i];
            
            // Update position with easing
            trailPositions[i].x += (mouseX - trailPositions[i].x) * (0.25 - delay * 0.01);
            trailPositions[i].y += (mouseY - trailPositions[i].y) * (0.25 - delay * 0.01);
            
            // Apply position with dynamic rotation and slight bounce
            const rotation = (i * 15) + (Math.sin(Date.now() * 0.003) * 10);
            const bounce = Math.sin(Date.now() * 0.005 + i * 0.2) * 2;
            
            trail.style.transform = `translate(${trailPositions[i].x - 10}px, ${trailPositions[i].y - 10 + bounce}px) 
                                     scale(${1.2 - i * 0.03}) 
                                     rotate(${rotation}deg)`;
            
            // Vary opacity for twinkle effect
            const baseOpacity = 1 - (i / trails.length) * 0.7;
            const twinkle = Math.sin(Date.now() * 0.01 + i) * 0.1;
            trail.style.opacity = Math.max(0, baseOpacity + twinkle);
            
            // Add slight filter variations for more vibrant effects
            const hueRotate = (i * 15 + Date.now() * 0.05) % 360;
            trail.style.filter = `hue-rotate(${hueRotate}deg) blur(${i * 0.1}px)`;
        }
        
        requestAnimationFrame(animateTrails);
    }
    
    // Start animation
    animateTrails();
}