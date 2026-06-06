// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    
    // Initialize Animate On Scroll (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true, // whether animation should happen only once - while scrolling down
            offset: 100, // offset (in px) from the original trigger point
            easing: 'ease-out-cubic',
        });
    }

    // Handle Site Visit Form Submission
    const visitForm = document.getElementById('visitForm');
    if (visitForm) {
        visitForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload
            
            // Hide form and show success message
            this.style.display = 'none';
            const successMsg = document.getElementById('successMessage');
            if (successMsg) {
                successMsg.classList.remove('hidden');
            }
        });
    }
});
