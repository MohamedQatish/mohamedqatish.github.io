// DOM Elements
const mobileToggle = document.querySelector('.mobile-toggle');
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillLevels = document.querySelectorAll('.skill-level');
const projectCards = document.querySelectorAll('.project-card');
const contactCards = document.querySelectorAll('.contact-card');

// Mobile Navigation Toggle
mobileToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    navMenu.classList.toggle('active');
    mobileToggle.innerHTML = navbar.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !mobileToggle.contains(e.target)) {
        navbar.classList.remove('active');
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu
            navbar.classList.remove('active');
            navMenu.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    skillLevels.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
};

// Animate elements on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate skill bars when skills section is in view
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 300);
            }
            
            // Animate language bars
            if (entry.target.id === 'education') {
                const langProgress = document.querySelectorAll('.lang-progress');
                langProgress.forEach(progress => {
                    const width = progress.style.width;
                    progress.style.width = '0';
                    setTimeout(() => {
                        progress.style.transition = 'width 1.2s ease';
                        progress.style.width = width;
                    }, 400);
                });
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add hover effects to project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '100';
    });
    
    card.addEventListener('mouseleave', () => {
        setTimeout(() => {
            card.style.zIndex = '1';
        }, 300);
    });
});

// Add pulse animation to contact cards
contactCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.contact-icon');
        icon.style.animation = 'pulse 1s ease infinite';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.contact-icon');
        icon.style.animation = '';
    });
});

// Update current year in footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Add typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        
        // Start typing after page load
        setTimeout(typeWriter, 1000);
    }
    
    // Add scroll progress indicator
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Update CSS variable
        document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
    });
    
    // Add active class to nav links on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// Add loading animation for images
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
    
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
    
    // Initialize animations
    setTimeout(() => {
        document.querySelectorAll('.skill-level').forEach(bar => {
            bar.style.width = bar.getAttribute('data-level') + '%';
        });
    }, 500);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    body.loaded section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    body.loaded section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Smooth transitions for interactive elements */
    .skill-level,
    .lang-progress,
    .lang-dot {
        transition: all 0.6s ease;
    }
    
    /* Hover effects for cards */
    .project-card,
    .experience-item .exp-content,
    .education-card,
    .languages-card,
    .contact-card,
    .social-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Active navigation link */
    .nav-link.active {
        color: var(--primary);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resizing');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resizing');
    }, 250);
});

// Add touch support for mobile
document.addEventListener('touchstart', function() {}, {passive: true});