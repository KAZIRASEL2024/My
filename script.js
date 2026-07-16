/* ==================== DOM ELEMENTS ==================== */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const yearSpan = document.getElementById('year');
const navLinks = document.querySelectorAll('.nav-link');

/* ==================== TYPING EFFECT ==================== */
class TypeWriter {
    constructor(elementSelector, texts, speed = 100, delay = 500) {
        this.element = document.querySelector(elementSelector);
        this.texts = texts;
        this.speed = speed;
        this.delay = delay;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.charIndex--;
        } else {
            this.charIndex++;
        }

        this.element.textContent = currentText.substring(0, this.charIndex);

        let speed = this.speed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            speed = this.delay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            speed = 500;
        }

        setTimeout(() => this.type(), speed);
    }
}

// Initialize typing effect
const typeWriter = new TypeWriter('.typing-text', [
    'Data Analyst',
    'Software Engineer',
    'Tech Enthusiast',
    'Problem Solver'
]);

/* ==================== MOBILE MENU TOGGLE ==================== */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navbar.contains(e.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ==================== NAVBAR SCROLL EFFECT ==================== */
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    // Add/remove scroll class
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (scrollTop > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }

    // Fade in animations on scroll
    revealElementsOnScroll();
});

/* ==================== SCROLL ANIMATIONS ==================== */
function revealElementsOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Check if element is in viewport
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

// Add fade-in class to elements on page load
function initScrollAnimations() {
    const elements = [
        '.about-content',
        '.about-stats',
        '.skill-category',
        '.project-card',
        '.stat-card',
        '.contact-info'
    ];

    elements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
        });
    });
}

// Run on page load
window.addEventListener('load', () => {
    initScrollAnimations();
    revealElementsOnScroll();
});

/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ==================== BACK TO TOP BUTTON ==================== */
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ==================== CONTACT FORM HANDLING ==================== */
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message and reset the form
    console.log('Form Data:', { name, email, message });
    
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Optional: Send to email service (requires backend)
    // sendEmailViaPHP(name, email, message);
});

/* ==================== UTILITY FUNCTIONS ==================== */

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification (simple toast message)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set colors based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        notification.style.color = '#fff';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        notification.style.color = '#fff';
    } else {
        notification.style.background = 'linear-gradient(135deg, #00d9ff, #0099cc)';
        notification.style.color = '#0f172a';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/* ==================== SET CURRENT YEAR ==================== */
yearSpan.textContent = new Date().getFullYear();

/* ==================== PARALLAX SCROLL EFFECT ==================== */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${scrollTop * 0.5}px)`;
        });
    });
}

// Initialize parallax on load
window.addEventListener('load', initParallaxEffect);

/* ==================== KEYBOARD NAVIGATION ==================== */
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ==================== PERFORMANCE OPTIMIZATION ==================== */
// Debounce scroll events for better performance
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Apply debounce to reveal elements
const debouncedReveal = debounce(revealElementsOnScroll, 50);

/* ==================== PROJECT CARD INTERACTIONS ==================== */
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

/* ==================== SKILL TAG INTERACTIONS ==================== */
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

/* ==================== IMAGE LAZY LOADING ==================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease-in-out';
        imageObserver.observe(img);
    });
}

/* ==================== STATS COUNTER ANIMATION ==================== */
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                
                statNumbers.forEach(element => {
                    const target = parseInt(element.textContent);
                    const isPercentage = element.textContent.includes('%');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(counter);
                        }
                        element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
                    }, 16);
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

window.addEventListener('load', animateCounters);

/* ==================== FORM FIELD VALIDATION ==================== */
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = 'rgba(0, 217, 255, 0.1)';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = '#00d9ff';
    });
});

/* ==================== ACCESSIBILITY ENHANCEMENTS ==================== */
// Ensure proper focus management for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.style.outline = 'none';
    }
});

// Add focus visible styling
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.documentElement.style.scrollBehavior = 'auto';
        setTimeout(() => {
            document.documentElement.style.scrollBehavior = 'smooth';
        }, 100);
    }
});

/* ==================== DYNAMIC BACKGROUND ON SCROLL ==================== */
function updateBackgroundOnScroll() {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercentage > 50) {
        document.body.style.background = 'linear-gradient(to bottom, #0f172a, #1a1f36, #2a2f45)';
    } else {
        document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1a1f36 100%)';
    }
}

window.addEventListener('scroll', updateBackgroundOnScroll);

/* ==================== INITIALIZATION ==================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    revealElementsOnScroll();
    
    // Log initialization
    console.log('Portfolio website initialized successfully!');
});

/* ==================== EXPORT FOR DEBUGGING ==================== */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        isValidEmail,
        debounce,
        TypeWriter
    };
}
