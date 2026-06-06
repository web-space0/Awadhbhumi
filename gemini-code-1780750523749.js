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

    // 2. Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

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

    // 5. Mobile Navigation Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            if(mobileMenu.classList.contains('hidden')){
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0', '-translate-y-4');
                }, 10);
            } else {
                mobileMenu.classList.add('opacity-0', '-translate-y-4');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        });

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

    // 6. Handle Site Visit Form Submission (Formspree)
    const visitForm = document.getElementById('visitForm');
    if (visitForm) {
        visitForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            
            const submitBtn = visitForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch(visitForm.action, {
                    method: 'POST',
                    body: new FormData(visitForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    visitForm.style.display = 'none';
                    const successMsg = document.getElementById('successMessage');
                    if (successMsg) {
                        successMsg.classList.remove('hidden');
                    }
                } else {
                    alert("Oops! There was a problem submitting your form.");
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                alert("Oops! Check your internet connection and try again.");
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // 7. Custom Image Carousel Logic
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (track && prevBtn && nextBtn && dotsContainer) {
        const slides = Array.from(track.children);
        const dots = Array.from(dotsContainer.children);
        let currentIndex = 0;
        let slideInterval;

        function updateCarousel(index) {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.className = "w-2.5 h-2.5 rounded-full bg-premiumGold transition-all duration-300 transform scale-125 cursor-pointer shadow-[0_0_8px_#D4AF37]";
                } else {
                    dot.className = "w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer";
                }
            });
            currentIndex = index;
        }

        function nextSlide() {
            let nextIndex = (currentIndex + 1) % slides.length;
            updateCarousel(nextIndex);
        }

        function prevSlide() {
            let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel(prevIndex);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateCarousel(index);
                resetInterval();
            });
        });

        function startInterval() {
            slideInterval = setInterval(nextSlide, 4000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        startInterval();
    }
});