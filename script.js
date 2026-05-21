// Navigation scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return;
        try {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } catch (err) {
            console.error('Smooth scroll target error:', err);
        }
    });
});

// Animated counter for statistics
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
};

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutStats = document.querySelector('.about-stats-row');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Fade in animation on scroll
const fadeElements = document.querySelectorAll('.service-card, .project-card, .about-text, .contact-info, .contact-form, .about-carousel');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message (in a real application, you would send this to a server)
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project card hover effect enhancement
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const img = card.querySelector('.project-image img');
        if (img) {
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.5s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.project-image img');
        if (img) {
            img.style.transform = 'scale(1)';
            img.style.transition = 'transform 0.5s ease';
        }
    });
});

// Service card hover effect enhancement
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.service-icon').style.transform = 'rotateY(180deg)';
        card.querySelector('.service-icon').style.transition = 'transform 0.6s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.service-icon').style.transform = 'rotateY(0deg)';
    });
});

// Hero Background Slider Logic
const slides = document.querySelectorAll('.hero-slider .slide');
const dots = document.querySelectorAll('.slider-dots .dot');
let currentSlideIndex = 0;
let slideInterval;
const SLIDE_DURATION = 6000; // 6 seconds

function showSlide(index) {
    if (!slides.length || !dots.length) return;
    
    // Remove active class from current slide and dot
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    // Update index
    currentSlideIndex = (index + slides.length) % slides.length;
    
    // Add active class to new slide and dot
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function startSlideTimer() {
    stopSlideTimer();
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
}

function stopSlideTimer() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Add click listeners to dots for manual navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        startSlideTimer(); // Reset auto-slide timer after manual click
    });
});

// Initialize timer
startSlideTimer();

// Loading animation & page opacity initialization
if (document.readyState === 'complete') {
    document.body.style.opacity = '1';
} else {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// About Column Carousel Fading Slider Logic
const showcaseSlides = document.querySelectorAll('.carousel-slide');
const showcaseDots = document.querySelectorAll('.indicator-dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentShowcaseIndex = 0; // Start with the 1st slide active
let showcaseInterval;
const SHOWCASE_DURATION = 3000; // 3 seconds

function updateShowcaseCarousel() {
    if (!showcaseSlides.length) return;
    
    showcaseSlides.forEach((slide, idx) => {
        if (idx === currentShowcaseIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Update indicator dots active state
    showcaseDots.forEach((dot, idx) => {
        if (idx === currentShowcaseIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function navigateShowcase(direction) {
    const totalSlides = showcaseSlides.length;
    currentShowcaseIndex = (currentShowcaseIndex + direction + totalSlides) % totalSlides;
    updateShowcaseCarousel();
}

function startShowcaseTimer() {
    stopShowcaseTimer();
    showcaseInterval = setInterval(() => {
        navigateShowcase(1);
    }, SHOWCASE_DURATION);
}

function stopShowcaseTimer() {
    if (showcaseInterval) {
        clearInterval(showcaseInterval);
    }
}

// Add listeners to prev/next buttons
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        navigateShowcase(-1);
        startShowcaseTimer(); // Reset timer on manual click
    });
    
    nextBtn.addEventListener('click', () => {
        navigateShowcase(1);
        startShowcaseTimer(); // Reset timer on manual click
    });
}

// Add click listeners to indicator dots
showcaseDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentShowcaseIndex = index;
        updateShowcaseCarousel();
        startShowcaseTimer(); // Reset timer on manual click
    });
});

// Pause autoplay on mouse hover, resume on leave
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopShowcaseTimer);
    carouselContainer.addEventListener('mouseleave', startShowcaseTimer);
}

// Support mobile swipe gestures
let touchStartX = 0;
let touchEndX = 0;

if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const threshold = 50; // Minimum swipe distance in pixels
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance > 0) {
            // Swipe Right -> Previous Slide
            navigateShowcase(-1);
        } else {
            // Swipe Left -> Next Slide
            navigateShowcase(1);
        }
        startShowcaseTimer(); // Reset autoplay timer
    }
}

// Initialize Showcase Carousel
if (showcaseSlides.length) {
    updateShowcaseCarousel();
    startShowcaseTimer();
}
