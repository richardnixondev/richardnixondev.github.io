// Contact page JavaScript functionality
// Author: Manus AI
// Version: 1.0

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFaqAccordion();
});

// Initialize contact form validation and submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (!contactForm || !formStatus) return;
    
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
    
    // Add real-time validation for fields
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error class when user starts typing
            this.classList.remove('error');
        });
    });
    
    // Helper function to validate individual input
    function validateInput(input) {
        if (input.required && !input.value.trim()) {
            input.classList.add('error');
            return false;
        }
        
        if (input.id === 'email' && !isValidEmail(input.value)) {
            input.classList.add('error');
            return false;
        }
        
        input.classList.remove('error');
        return true;
    }
    
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

// Initialize FAQ accordion
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (!faqQuestions.length) return;
    
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

// Add social media link tracking if needed
function initSocialLinkTracking() {
    const socialLinks = document.querySelectorAll('.footer-social a, .info-card a[href^="https://www.linkedin.com"], .info-card a[href^="https://github.com"]');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('aria-label') || 'Social';
            
            // In a real site, this would track the social link click
            console.log(`${platform} link clicked`);
            
            // Example analytics tracking code:
            /*
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'Social',
                    'event_label': platform
                });
            }
            */
        });
    });
}

// Add copy to clipboard functionality for contact info if needed
function initCopyToClipboard() {
    const contactInfoItems = document.querySelectorAll('.info-card');
    
    contactInfoItems.forEach(item => {
        const infoValue = item.querySelector('.info-content p');
        
        if (!infoValue) return;
        
        item.addEventListener('click', function() {
            const textToCopy = infoValue.textContent;
            
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Show copied notification
                    const notification = document.createElement('div');
                    notification.className = 'copy-notification';
                    notification.textContent = 'Copied to clipboard!';
                    
                    this.appendChild(notification);
                    
                    // Remove notification after 2 seconds
                    setTimeout(() => {
                        notification.remove();
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    });
}
