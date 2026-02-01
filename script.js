// Page Navigation
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetPage = button.getAttribute('data-page');
        
        navButtons.forEach(btn => btn.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(targetPage).classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Auto-count projects
function updateProjectCounts() {
    const technicalProjects = document.querySelectorAll('#projectsCarousel .project-card').length;
    const researchProjects = document.querySelectorAll('#researchCarousel .project-card').length;
    const totalProjects = technicalProjects + researchProjects;
    
    // Animate the count
    animateCount('totalProjects', totalProjects);
    animateCount('technicalProjects', technicalProjects);
    animateCount('researchProjects', researchProjects);
}

function animateCount(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 1000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counts on page load
window.addEventListener('load', updateProjectCounts);

// Carousel Scroll Function
function scrollCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const scrollAmount = 420;
    
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Update carousel controls visibility
const updateControlsVisibility = () => {
    const carousels = ['projectsCarousel', 'researchCarousel'];
    
    carousels.forEach(carouselId => {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;
        
        const wrapper = carousel.closest('.carousel-wrapper');
        if (!wrapper) return;
        
        const controls = wrapper.querySelector('.carousel-controls');
        if (!controls) return;
        
        const isOverflowing = carousel.scrollWidth > carousel.clientWidth;
        controls.style.display = isOverflowing ? 'flex' : 'none';
    });
};

window.addEventListener('resize', updateControlsVisibility);
window.addEventListener('load', updateControlsVisibility);

// Smooth drag scrolling for carousels
const carouselContainers = document.querySelectorAll('.carousel-container');
carouselContainers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
    
    container.style.cursor = 'grab';
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .stat-card, .social-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stat card click handlers
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        
        if (category === 'technical') {
            // Navigate to projects page
            navButtons.forEach(btn => {
                if (btn.getAttribute('data-page') === 'projects') {
                    btn.click();
                }
            });
        } else if (category === 'research') {
            // Navigate to research page
            navButtons.forEach(btn => {
                if (btn.getAttribute('data-page') === 'research') {
                    btn.click();
                }
            });
        }
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateControlsVisibility();
    }, 250);
});

// Console branding
console.log('%c Sreelakshmi Vijay Portfolio', 'color: #1a5f4f; font-size: 20px; font-weight: bold;');
console.log('%c Built with HTML-CSS-JS technologies', 'color: #666; font-size: 12px;');
