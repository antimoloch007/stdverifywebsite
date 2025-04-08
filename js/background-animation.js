/**
 * STD Verify - Background Animation
 * Adds subtle animated elements to the background
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the animated background
    initBackgroundAnimations();
});

/**
 * Initialize all background animations
 */
function initBackgroundAnimations() {
    console.log("Initializing background animations");
    
    // Check if animation container exists, if not create one
    let bgContainer = document.querySelector('.animated-background');
    if (!bgContainer) {
        bgContainer = document.createElement('div');
        bgContainer.className = 'animated-background';
        document.body.insertBefore(bgContainer, document.body.firstChild);
        
        // Clear any existing animations to prevent duplication
        bgContainer.innerHTML = '';
        
        // Add floating elements
        addFloatingElements(bgContainer);
        
        // Add rising bubbles
        addRisingBubbles(bgContainer);
        
        // Add twinkling dots
        addTwinklingDots(bgContainer);
    }
}

/**
 * Add floating elements that drift around the screen
 */
function addFloatingElements(container) {
    // Create floating elements for the background - soft pastel circles
    const colors = [
        'rgba(255, 200, 200, 0.2)', // light pink
        'rgba(255, 230, 200, 0.2)', // light peach
        'rgba(255, 255, 200, 0.2)', // light yellow
        'rgba(200, 255, 200, 0.2)', // light green
        'rgba(200, 230, 255, 0.2)', // light blue
        'rgba(220, 200, 255, 0.2)'  // light purple
    ];
    
    for (let i = 0; i < 10; i++) {
        const floater = document.createElement('div');
        floater.className = 'bg-floater';
        
        // Randomize size - smaller elements to be more subtle
        const size = Math.random() * 60 + 20; // 20-80px
        floater.style.width = `${size}px`;
        floater.style.height = `${size}px`;
        
        // Randomize position
        floater.style.left = `${Math.random() * 100}vw`;
        floater.style.top = `${Math.random() * 100}vh`;
        
        // Pick a color
        const colorIndex = Math.floor(Math.random() * colors.length);
        floater.style.backgroundColor = colors[colorIndex];
        
        // Randomize animation duration and delay
        const duration = Math.random() * 20 + 15; // 15-35s
        const delay = Math.random() * 10; // 0-10s
        floater.style.animationDuration = `${duration}s`;
        floater.style.animationDelay = `${delay}s`;
        
        // Add to container
        container.appendChild(floater);
    }
}

/**
 * Add bubbles that rise up from the bottom of the screen
 */
function addRisingBubbles(container) {
    // Create a number of bubbles that will rise up
    for (let i = 0; i < 12; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Randomize size
        const size = Math.random() * 15 + 5; // 5-20px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Randomize horizontal position
        bubble.style.left = `${Math.random() * 100}vw`;
        
        // Randomize animation duration and delay
        const duration = Math.random() * 10 + 10; // 10-20s
        const delay = Math.random() * 15; // 0-15s
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;
        
        // Add to container
        container.appendChild(bubble);
        
        // Recycle the bubble when animation ends
        bubble.addEventListener('animationend', function() {
            // Reset position
            this.style.left = `${Math.random() * 100}vw`;
            
            // Remove and re-add to reset animation
            container.removeChild(this);
            setTimeout(() => {
                container.appendChild(this);
            }, Math.random() * 5000); // Random delay 0-5s
        });
    }
}

/**
 * Add twinkling dots across the background
 */
function addTwinklingDots(container) {
    // Create twinkling dots
    for (let i = 0; i < 20; i++) {
        const twinkle = document.createElement('div');
        twinkle.className = 'twinkle';
        
        // Randomize size - very small dots
        const size = Math.random() * 3 + 1; // 1-4px
        twinkle.style.width = `${size}px`;
        twinkle.style.height = `${size}px`;
        
        // Randomize position
        twinkle.style.left = `${Math.random() * 100}vw`;
        twinkle.style.top = `${Math.random() * 100}vh`;
        
        // Randomize animation delay
        const delay = Math.random() * 5; // 0-5s
        twinkle.style.animationDelay = `${delay}s`;
        
        // Add to container
        container.appendChild(twinkle);
    }
}