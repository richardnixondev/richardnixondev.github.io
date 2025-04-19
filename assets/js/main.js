// Main JavaScript file for Richard Nixon's Developer Portfolio
// Author: Manus AI
// Version: 1.0

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initScrollAnimation();
    initSmoothScroll();
    
    // Page-specific initializations
    if (document.querySelector('.faq-question')) {
        initFaqAccordion();
    }
    
    if (document.querySelector('#contact-form')) {
        initContactForm();
    }
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial theme based on localStorage or user preference
    if (isDarkMode || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('darkMode') === null)) {
        htmlElement.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        htmlElement.classList.remove('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', function() {
        if (htmlElement.classList.contains('dark-theme')) {
            htmlElement.classList.remove('dark-theme');
            localStorage.setItem('darkMode', 'false');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            htmlElement.classList.add('dark-theme');
            localStorage.setItem('darkMode', 'true');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (!mobileMenuToggle || !navList) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && navList.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navList.classList.remove('active');
        }
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767 && navList.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navList.classList.remove('active');
        }
    });
}

// Scroll Animation
function initScrollAnimation() {
    const elements = document.querySelectorAll('.skill-progress-bar, .mern-card, .project-card, .soft-skill-card, .timeline-item, .achievement-card');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-progress-bar')) {
                    // Animate skill bars
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                } else {
                    // Add animation class to other elements
                    entry.target.classList.add('animated');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navList = document.querySelector('.nav-list');
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
}

// FAQ Accordion
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on clicked question
            this.classList.toggle('active');
            
            // Close other open questions
            faqQuestions.forEach(q => {
                if (q !== this && q.classList.contains('active')) {
                    q.classList.remove('active');
                }
            });
        });
    });
}

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: contactForm.querySelector('#name').value,
            email: contactForm.querySelector('#email').value,
            subject: contactForm.querySelector('#subject').value,
            message: contactForm.querySelector('#message').value
        };
        
        // Validate form data
        if (!formData.name || !formData.email || !formData.message) {
            showFormStatus('error', 'Please fill in all required fields.');
            return;
        }
        
        if (!isValidEmail(formData.email)) {
            showFormStatus('error', 'Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission (in a real site, this would send data to a server)
        showFormStatus('success', 'Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        
        // In a real implementation, you would send the form data to a server here
        // For example:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            showFormStatus('success', 'Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        })
        .catch(error => {
            showFormStatus('error', 'There was an error sending your message. Please try again later.');
        });
        */
    });
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to show form status
    function showFormStatus(type, message) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        
        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    }
}
