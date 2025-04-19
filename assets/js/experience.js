// Experience page JavaScript functionality
// Author: Manus AI
// Version: 1.0

document.addEventListener('DOMContentLoaded', function() {
    initTimelineAnimation();
});

// Initialize timeline animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('animated');
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each timeline item
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Add interactive timeline functionality if needed
function initInteractiveTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle expanded class
            this.classList.toggle('expanded');
            
            // Get job description element
            const jobDescription = this.querySelector('.job-description');
            
            // Toggle visibility of job description
            if (this.classList.contains('expanded')) {
                jobDescription.style.maxHeight = jobDescription.scrollHeight + 'px';
            } else {
                jobDescription.style.maxHeight = null;
            }
        });
    });
}

// Add achievement cards animation
function initAchievementAnimation() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with delay based on index
                const delay = Array.from(achievementCards).indexOf(entry.target) * 0.2;
                entry.target.style.animationDelay = delay + 's';
                entry.target.classList.add('fade-in');
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each achievement card
    achievementCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize resume download tracking if needed
function initResumeDownloadTracking() {
    const downloadButton = document.querySelector('.download-button .btn');
    
    if (!downloadButton) return;
    
    downloadButton.addEventListener('click', function() {
        // In a real site, this would track the download event
        console.log('Resume downloaded');
        
        // Example analytics tracking code:
        /*
        if (typeof gtag === 'function') {
            gtag('event', 'download', {
                'event_category': 'Resume',
                'event_label': 'CV Download'
            });
        }
        */
    });
}
