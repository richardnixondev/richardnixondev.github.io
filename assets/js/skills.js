// Skills page JavaScript functionality
// Author: Manus AI
// Version: 1.0

document.addEventListener('DOMContentLoaded', function() {
    initSkillBars();
});

// Initialize skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the width from the inline style
                const width = entry.target.style.width;
                
                // Reset width to 0
                entry.target.style.width = '0';
                
                // Animate to the target width
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each skill bar
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Add skill category filtering if needed
function initSkillFiltering() {
    const filterButtons = document.querySelectorAll('.skill-filter-btn');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    if (!filterButtons.length || !skillCategories.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Show/hide skill categories based on filter
            skillCategories.forEach(category => {
                if (filter === 'all' || category.getAttribute('data-category') === filter) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
}

// Initialize radar chart for skills visualization if needed
function initSkillsRadarChart() {
    // This would use a library like Chart.js to create a radar chart
    // Example implementation would depend on the specific library used
    
    // Example with Chart.js (would need to be included in the HTML):
    /*
    const ctx = document.getElementById('skills-radar-chart').getContext('2d');
    
    const skillsRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'HTML/CSS'],
            datasets: [{
                label: 'Skill Level',
                data: [85, 80, 80, 75, 75, 90],
                backgroundColor: 'rgba(3, 102, 214, 0.2)',
                borderColor: '#0366D6',
                pointBackgroundColor: '#0366D6',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#0366D6'
            }]
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    */
}
