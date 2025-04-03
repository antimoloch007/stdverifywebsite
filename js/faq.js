/**
 * STD Verify - FAQ Accordion Functionality
 * Handles the expanding/collapsing of FAQ questions and answers
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ question elements
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Add click event listener to each question
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on the question
            this.classList.toggle('active');
            
            // Get the answer associated with this question
            const answer = this.nextElementSibling;
            
            // Toggle the show class on the answer
            answer.classList.toggle('show');
            
            // Optional: close other open FAQs when opening a new one
            // Uncomment the following block if you want this behavior
            /*
            if (answer.classList.contains('show')) {
                // Close all other open answers
                document.querySelectorAll('.faq-answer.show').forEach(openAnswer => {
                    if (openAnswer !== answer) {
                        openAnswer.classList.remove('show');
                        openAnswer.previousElementSibling.classList.remove('active');
                    }
                });
            }
            */
        });
    });
    
    // Auto-open the first FAQ by default
    if (faqQuestions.length > 0) {
        faqQuestions[0].classList.add('active');
        faqQuestions[0].nextElementSibling.classList.add('show');
    }
});