// Projects page JavaScript functionality
// Author: Manus AI
// Version: 1.0

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
    initProjectDetails();
    initProjectModal();
});

// Initialize project filtering
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Show/hide projects based on filter
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize project details toggle
function initProjectDetails() {
    const detailsToggles = document.querySelectorAll('.details-toggle');
    
    detailsToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectModal = document.getElementById('project-modal');
            
            if (!projectCard || !projectModal) return;
            
            // Get project details
            const title = projectCard.querySelector('h3').textContent;
            const description = projectCard.querySelector('p').textContent;
            const techElements = projectCard.querySelectorAll('.project-tech span');
            const tech = Array.from(techElements).map(el => el.textContent);
            
            // Set modal content
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-description').textContent = description;
            
            // Clear and populate tech tags
            const modalTech = document.getElementById('modal-tech');
            modalTech.innerHTML = '';
            tech.forEach(item => {
                const span = document.createElement('span');
                span.textContent = item;
                modalTech.appendChild(span);
            });
            
            // Set placeholder features (in a real site, these would come from a database)
            const features = [
                'User authentication and authorization',
                'Responsive design for all devices',
                'Data persistence with MongoDB',
                'RESTful API endpoints'
            ];
            
            const featuresList = document.getElementById('modal-features');
            featuresList.innerHTML = '';
            features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            
            // Set placeholder challenges (in a real site, these would come from a database)
            document.getElementById('modal-challenges').textContent = 
                'One of the main challenges was implementing real-time updates using WebSockets while maintaining performance. This was solved by optimizing the data transfer and implementing efficient state management on the frontend.';
            
            // Show modal
            projectModal.classList.add('active');
        });
    });
}

// Initialize project modal
function initProjectModal() {
    const projectModal = document.getElementById('project-modal');
    const closeButton = document.querySelector('.modal-close');
    
    if (!projectModal || !closeButton) return;
    
    // Close modal when clicking close button
    closeButton.addEventListener('click', function() {
        projectModal.classList.remove('active');
    });
    
    // Close modal when clicking outside content
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            projectModal.classList.remove('active');
        }
    });
    
    // Handle image gallery thumbnails
    const thumbItems = document.querySelectorAll('.thumb-item');
    const mainImage = document.getElementById('modal-main-image');
    
    if (thumbItems.length && mainImage) {
        thumbItems.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Update main image source
                const imgSrc = this.getAttribute('data-src');
                mainImage.src = imgSrc;
            });
        });
    }
}
