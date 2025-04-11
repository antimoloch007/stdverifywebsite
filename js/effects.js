/**
 * STD Verify - Visual Effects
 * This is a simplified version with cursor effects removed
 * Using normal system cursor
 */

document.addEventListener('DOMContentLoaded', function() {
    // No initialization needed - using default system cursor
    console.log("Effects initialized - using default system cursor for better performance");
    
    // Ensure we use the normal system cursor
    document.body.style.cursor = 'auto';
});

// Simple modal cursor handling
function handleModalCursor() {
    // Get modal
    const modal = document.getElementById('contact-modal');
    if (!modal) return;
    
    // Ensure clickable elements in modal have proper cursor
    modal.querySelectorAll('a, button, .close-modal').forEach(element => {
        element.style.cursor = 'pointer';
    });
}