// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Initialize Animate On Scroll (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true, 
            offset: 50, 
            easing: 'ease-out-cubic',
        });
    }

    // 2. Custom Cursor Logic (Only runs if elements exist)
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Instantly follow dot
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Smoothly animate the outline ring
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add interactive hover states for the cursor
        const interactables = document.querySelectorAll('a, button, input, textarea, .cursor-pointer');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // 3. Parallax Effect for Hero Background
    const heroImg = document.querySelector('.hero-bg-img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            let scrollPosition = window.pageYOffset;
            // Move image down slightly as user scrolls down
            heroImg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        });
    }

    // 4. Navbar Blur transition on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.background = 'rgba(15, 15, 15, 0.85)';
        }
    });

    // 5. Mobile Navigation Toggle with smooth animate
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            if(mobileMenu.classList.contains('hidden')){
                mobileMenu.classList.remove('hidden');
                // Small delay to allow display block to process before opacity
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0', '-translate-y-4');
                }, 10);
            } else {
                mobileMenu.classList.add('opacity-0', '-translate-y-4');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300); // Wait for transition to finish
            }
        });

        // Close menu when clicking a link on mobile
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('opacity-0', '-translate-y-4');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            });
        });
    }

    // 6. Handle Site Visit Form Submission
    const visitForm = document.getElementById('visitForm');
    if (visitForm) {
        visitForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // Hide form and show success message
            this.style.display = 'none';
            const successMsg = document.getElementById('successMessage');
            if (successMsg) {
                successMsg.classList.remove('hidden');
            }
        });
    }
});