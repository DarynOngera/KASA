/**
 * KASA Website JavaScript - Professional & Interactive Features
 */

console.log('🚀 KASA JavaScript loaded!');

// DOM Elements
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const sectionIndicator = document.querySelector('.indicator-text');

// FAQ Elements
const faqItems = document.querySelectorAll('.faq-item');

// Testimonial Elements
const testimonialItems = document.querySelectorAll('.testimonial-item');
const sliderDots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

// Form Elements
const contactForm = document.querySelector('.contact-form');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting initialization...');
    
    initializeNavigation();
    initializeScrollEffects();
    initializeFAQ();
    initializeTestimonials();
    initializeContactForm();
    initializeAnimations();
    initializeCTAButtons();
    initializeSocialLinks();
    initializeEventButtons();
    initializeCalendarModal();
    initializeStayUpdated();
    
    console.log('KASA Website initialized successfully');
    
    // Make test functions available globally
    window.testCalendar = function() {
        console.log('Testing calendar modal...');
        openCalendarModal();
    };
    
    window.testClose = function() {
        console.log('Testing close modal...');
        closeCalendarModal();
    };
});

/**
 * Navigation Functions
 */
function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                closeMobileMenu();
                smoothScrollTo(targetSection);
                updateActiveNavLink(link);
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Update navbar on scroll
    window.addEventListener('scroll', updateNavbarOnScroll);
    
    // Update active nav link on scroll
    window.addEventListener('scroll', debounce(updateActiveNavOnScroll, 100));
}

function toggleMobileMenu() {
    if (navMenu && navToggle) {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
}

function openMobileMenu() {
    if (navMenu && navToggle) {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add click listener to close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
}

function closeMobileMenu() {
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
        
        // Remove click listeners from nav links
        navLinks.forEach(link => {
            link.removeEventListener('click', closeMobileMenu);
        });
    }
}

function smoothScrollTo(element) {
    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    const elementPosition = element.offsetTop - navbarHeight;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
                updateSectionIndicator(sectionId);
            }
        }
    });
}

function updateSectionIndicator(sectionId) {
    if (!sectionIndicator) return;
    
    const sectionNames = {
        'home': 'Welcome',
        'about': 'About Us',
        'events': 'Our Events',
        'contact': 'Contact'
    };
    
    const sectionName = sectionNames[sectionId] || 'Welcome';
    sectionIndicator.textContent = `Section: ${sectionName}`;
}

function updateNavbarOnScroll() {
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(254, 254, 254, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(254, 254, 254, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

/**
 * Scroll Effects Functions
 */
function initializeScrollEffects() {
    // Simple scroll effects for navbar only - no animations
    initializeNavbarScrollEffects();
    
    console.log('Scroll effects initialized');
}

function initializeNavbarScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for subtle navbar styling changes only
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * FAQ Functions
 */
function initializeFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => toggleFAQItem(item));
        }
    });
}

function toggleFAQItem(item) {
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        item.classList.add('active');
    }
}

/**
 * Testimonials Functions
 */
function initializeTestimonials() {
    let currentTestimonial = 0;
    const testimonials = [
        {
            quote: "Joining KASA was a transformative experience. Their expertise and personalized approach made connecting with my heritage stress-free and meaningful.",
            author: "Amara Johnson"
        },
        {
            quote: "The community support and cultural events at KASA helped me find my place at Kent State. I've made lifelong friendships here.",
            author: "Kwame Asante"
        },
        {
            quote: "KASA's academic support and mentorship programs were instrumental in my success. They truly care about each member's growth.",
            author: "Fatima Al-Rashid"
        }
    ];
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialItems.forEach(item => item.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        // Update content
        const activeTestimonial = document.querySelector('.testimonial-item');
        if (activeTestimonial && testimonials[index]) {
            const blockquote = activeTestimonial.querySelector('blockquote');
            const cite = activeTestimonial.querySelector('cite');
            
            if (blockquote) blockquote.textContent = testimonials[index].quote;
            if (cite) cite.textContent = testimonials[index].author;
        }
        
        // Show active testimonial and dot
        if (testimonialItems[0]) testimonialItems[0].classList.add('active');
        if (sliderDots[index]) sliderDots[index].classList.add('active');
        
        currentTestimonial = index;
    }
    
    // Initialize first testimonial
    showTestimonial(0);
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = currentTestimonial > 0 ? currentTestimonial - 1 : testimonials.length - 1;
            showTestimonial(currentTestimonial);
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTestimonial = currentTestimonial < testimonials.length - 1 ? currentTestimonial + 1 : 0;
            showTestimonial(currentTestimonial);
        });
    }
    
    // Dot navigation
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = currentTestimonial < testimonials.length - 1 ? currentTestimonial + 1 : 0;
        showTestimonial(currentTestimonial);
    }, 5000);
}

/**
 * Contact Form Functions
 */
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add input focus effects
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.firstName || !data.lastName || !data.email) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Animation Functions
 */
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add animation classes to elements
    const elementsToAnimate = [
        { selector: '.hero-content', class: 'fade-in' },
        { selector: '.hero-image', class: 'slide-in-right' },
        { selector: '.about-content', class: 'slide-in-left' },
        { selector: '.about-image', class: 'slide-in-right' },
        { selector: '.benefit-item', class: 'fade-in' },
        { selector: '.testimonials-content', class: 'slide-in-left' },
        { selector: '.testimonials-image', class: 'slide-in-right' },
        { selector: '.faq-item', class: 'fade-in' },
        { selector: '.contact-form-container', class: 'slide-in-right' },
        { selector: '.contact-image', class: 'slide-in-left' }
    ];
    
    elementsToAnimate.forEach(({ selector, class: className }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add(className);
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
}

/**
 * Utility Functions
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Touch handling for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;
    
    // Close mobile menu on upward swipe
    if (swipeDistance > swipeThreshold && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
}

// Improved viewport handling for mobile
function handleViewportChange() {
    // Close mobile menu on orientation change
    if (navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
    
    // Update viewport height for mobile browsers
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('orientationchange', handleViewportChange);
window.addEventListener('resize', debounce(handleViewportChange, 250));

// Smooth scroll behavior for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScrollTo(target);
        }
    });
});

// Performance optimization: Lazy loading for images when added
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

/**
 * CTA Button Functions
 */
function initializeCTAButtons() {
    // Join Community buttons
    const joinButtons = document.querySelectorAll('.cta-button.primary, .connect-btn.primary');
    joinButtons.forEach((button) => {
        button.addEventListener('click', handleJoinCommunity);
    });
    
    // View Events buttons - try multiple selectors to ensure we find the button
    const eventButtons1 = document.querySelectorAll('.cta-button.secondary, .connect-btn.secondary');
    const eventButtons2 = document.querySelectorAll('button');
    
    // Add event listeners to buttons found by first selector
    eventButtons1.forEach((button) => {
        button.addEventListener('click', handleViewEvents);
    });
    
    // Also add to any button containing "View Events" text as fallback
    eventButtons2.forEach((button) => {
        if (button.textContent.toLowerCase().includes('view events')) {
            button.addEventListener('click', handleViewEvents);
            // Also add direct onclick as backup
            button.onclick = function(e) {
                e.preventDefault();
                openCalendarModal();
            };
        }
    });
    
    // WhatsApp group buttons
    const whatsappButtons = document.querySelectorAll('.connect-btn.whatsapp');
    whatsappButtons.forEach((button) => {
        button.addEventListener('click', handleWhatsAppJoin);
    });
}

function handleJoinCommunity(e) {
    console.log('Join Community clicked');
    e.preventDefault();
    
    // Smooth scroll to connect section
    const connectSection = document.querySelector('#connect');
    if (connectSection) {
        console.log('Connect section found, scrolling...');
        smoothScrollTo(connectSection);
        
        // Highlight connect section briefly
        connectSection.style.backgroundColor = 'rgba(244, 208, 63, 0.1)';
        setTimeout(() => {
            connectSection.style.backgroundColor = '';
        }, 2000);
    } else {
        console.log('Connect section not found');
    }
    
    try {
        showNotification('Ready to join? Check out the ways to connect with us below!', 'info');
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

function handleViewEvents(e) {
    e.preventDefault();
    openCalendarModal();
}

function handleWhatsAppJoin(e) {
    e.preventDefault();
    
    // WhatsApp group invite link (replace with actual link when available)
    const whatsappGroupLink = 'https://www.instagram.com/kasa1969'; // Temporary redirect to Instagram
    
    // Show confirmation modal
    const confirmJoin = confirm('Join our KASA community! We\'ll redirect you to our Instagram where you can find our WhatsApp group link and latest updates.');
    
    if (confirmJoin) {
        // Open WhatsApp group link
        window.open(whatsappGroupLink, '_blank');
        showNotification('Redirecting to KASA Instagram for WhatsApp group access!', 'success');
    }
}

/**
 * Social Media Functions
 */
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-quick-link, .social-link');
    
    socialLinks.forEach(link => {
        // Only add JavaScript handling for links that don't have direct hrefs
        const href = link.getAttribute('href');
        if (!href || href === '#') {
            link.addEventListener('click', handleSocialClick);
        }
    });
}

function handleSocialClick(e) {
    e.preventDefault();
    
    const linkElement = e.currentTarget;
    const platform = getSocialPlatform(linkElement);
    
    // Social media URLs (replace with actual KASA social media accounts)
    const socialUrls = {
        instagram: 'https://www.instagram.com/kasa1969',
        tiktok: 'https://www.instagram.com/kasa1969',
        twitter: 'https://www.instagram.com/kasa1969',
        discord: 'https://www.instagram.com/kasa1969',
        youtube: 'https://www.instagram.com/kasa1969'
    };
    
    const url = socialUrls[platform];
    if (url) {
        window.open(url, '_blank');
        showNotification(`Opening ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`, 'info');
    } else {
        showNotification('Social media link coming soon!', 'info');
    }
}

function getSocialPlatform(element) {
    const classList = element.classList;
    
    if (classList.contains('instagram')) return 'instagram';
    if (classList.contains('tiktok')) return 'tiktok';
    if (classList.contains('twitter')) return 'twitter';
    if (classList.contains('discord')) return 'discord';
    if (element.textContent.toLowerCase().includes('youtube')) return 'youtube';
    if (element.textContent.toLowerCase().includes('instagram')) return 'instagram';
    if (element.textContent.toLowerCase().includes('tiktok')) return 'tiktok';
    if (element.textContent.toLowerCase().includes('twitter')) return 'twitter';
    if (element.textContent.toLowerCase().includes('discord')) return 'discord';
    
    return 'unknown';
}

/**
 * Event Registration Functions
 */
function initializeEventButtons() {
    const eventLinks = document.querySelectorAll('.event-link');
    
    eventLinks.forEach(link => {
        // Only add JavaScript handling for links that don't have direct hrefs
        const href = link.getAttribute('href');
        if (!href || href === '#') {
            link.addEventListener('click', handleEventInterest);
        }
    });
    
    // Media buttons - only handle those without direct links
    const mediaButtons = document.querySelectorAll('.media-btn');
    mediaButtons.forEach(button => {
        const href = button.getAttribute('href');
        if (!href || href === '#') {
            button.addEventListener('click', handleMediaClick);
        }
    });
}

function handleEventInterest(e) {
    e.preventDefault();
    
    const eventElement = e.currentTarget.closest('.event-item');
    const eventTitle = eventElement ? eventElement.querySelector('.event-title')?.textContent : 'Event';
    
    const eventInfo = {
        title: `Interested in ${eventTitle}?`,
        message: "Great choice! Here's how to stay updated:",
        steps: [
            "Join our WhatsApp group for instant updates",
            "Follow us on social media",
            "Check your email for event reminders",
            "Mark your calendar for upcoming dates"
        ],
        action: "Join Updates"
    };
    
    showEventModal(eventInfo);
}

function handleMediaClick(e) {
    e.preventDefault();
    
    const buttonText = e.currentTarget.textContent.toLowerCase();
    
    if (buttonText.includes('instagram')) {
        window.open('https://instagram.com/kasa_kent', '_blank');
    } else if (buttonText.includes('tiktok')) {
        window.open('https://tiktok.com/@kasa_kent', '_blank');
    } else if (buttonText.includes('youtube')) {
        window.open('https://youtube.com/@kasa_kent', '_blank');
    } else if (buttonText.includes('gallery')) {
        showNotification('Photo gallery coming soon!', 'info');
    }
}

/**
 * Modal Functions
 */
function showMembershipModal(info) {
    const modal = createModal(info);
    document.body.appendChild(modal);
    
    // Add event listener for action button
    const actionButton = modal.querySelector('.modal-action');
    if (actionButton) {
        actionButton.addEventListener('click', () => {
            closeModal(modal);
            // Redirect to contact section or external form
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                smoothScrollTo(contactSection);
            }
        });
    }
}

function showEventModal(info) {
    const modal = createModal(info);
    document.body.appendChild(modal);
    
    // Add event listener for action button
    const actionButton = modal.querySelector('.modal-action');
    if (actionButton) {
        actionButton.addEventListener('click', () => {
            closeModal(modal);
            handleWhatsAppJoin({ preventDefault: () => {} });
        });
    }
}

function createModal(info) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${info.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${info.message}</p>
                <ul class="modal-steps">
                    ${info.steps.map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-footer">
                <button class="modal-action cta-button primary">${info.action}</button>
                <button class="modal-cancel">Maybe Later</button>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    // Add event listeners
    const closeButton = modal.querySelector('.modal-close');
    const cancelButton = modal.querySelector('.modal-cancel');
    
    [closeButton, cancelButton].forEach(button => {
        if (button) {
            button.addEventListener('click', () => closeModal(modal));
        }
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    return modal;
}

function closeModal(modal) {
    modal.style.opacity = '0';
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }, 300);
}

/**
 * Calendar Modal Functions
 */
let currentCalendarDate = new Date();

// KASA Events Calendar - Update this array to add/remove/modify events
const calendarEvents = [
    {
        date: '2025-10-11',
        title: 'Homecoming Day  ',
        description: 'Join us for our annual homecoming celebration with food, music, and fun!'
    },

    // Add new events here following the same format:
    // {
    //     date: 'YYYY-MM-DD',
    //     title: 'Event Title',
    //     description: 'Event description that appears when clicked'
    // }
];

function openCalendarModal() {
    const modal = document.getElementById('calendarModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        generateCalendar();
        updateEventsPreview();
    }
}

function closeCalendarModal() {
    const modal = document.getElementById('calendarModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function generateCalendar() {
    const monthYear = document.getElementById('calendarMonthYear');
    const calendarDays = document.getElementById('calendarDays');
    
    if (!monthYear || !calendarDays) return;
    
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Update month/year display
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    monthYear.textContent = `${monthNames[month]} ${year}`;
    
    // Clear previous calendar
    calendarDays.innerHTML = '';
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Add previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayElement = createCalendarDay(daysInPrevMonth - i, true, year, month - 1);
        calendarDays.appendChild(dayElement);
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = createCalendarDay(day, false, year, month);
        calendarDays.appendChild(dayElement);
    }
    
    // Add next month's leading days to fill the grid
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = createCalendarDay(day, true, year, month + 1);
        calendarDays.appendChild(dayElement);
    }
}

function createCalendarDay(day, isOtherMonth, year, month) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;
    
    if (isOtherMonth) {
        dayElement.classList.add('other-month');
    }
    
    // Check if it's today
    const today = new Date();
    const dayDate = new Date(year, month, day);
    if (!isOtherMonth && 
        dayDate.getDate() === today.getDate() && 
        dayDate.getMonth() === today.getMonth() && 
        dayDate.getFullYear() === today.getFullYear()) {
        dayElement.classList.add('today');
    }
    
    // Check if it's an event day
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasEvent = calendarEvents.some(event => event.date === dateString);
    if (hasEvent && !isOtherMonth) {
        dayElement.classList.add('event-day');
        
        // Add click handler to show event details
        dayElement.addEventListener('click', () => showEventDetails(dateString));
    }
    
    return dayElement;
}

function showEventDetails(dateString) {
    const events = calendarEvents.filter(event => event.date === dateString);
    if (events.length === 0) return;
    
    const event = events[0]; // Show first event if multiple
    const eventDate = new Date(dateString);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    showNotification(`${event.title} - ${formattedDate}: ${event.description}`, 'info');
}

function updateEventsPreview() {
    const eventsList = document.getElementById('eventsList');
    if (!eventsList) return;
    
    // Get upcoming events (next 3 events from today)
    const today = new Date();
    const upcomingEvents = calendarEvents
        .filter(event => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);
    
    eventsList.innerHTML = '';
    
    if (upcomingEvents.length === 0) {
        eventsList.innerHTML = '<p style="color: var(--soft-gray); text-align: center;">No upcoming events scheduled.</p>';
        return;
    }
    
    upcomingEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-preview-item';
        
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        
        eventElement.innerHTML = `
            <div class="event-preview-date">${formattedDate}</div>
            <div class="event-preview-title">${event.title}</div>
            <div class="event-preview-description">${event.description}</div>
        `;
        
        eventsList.appendChild(eventElement);
    });
}

function initializeCalendarModal() {
    // Close modal button
    const closeButton = document.getElementById('closeCalendarModal');
    if (closeButton) {
        closeButton.addEventListener('click', closeCalendarModal);
        // Also add direct onclick as backup
        closeButton.onclick = function(e) {
            e.preventDefault();
            closeCalendarModal();
        };
    }
    
    // Navigation buttons
    const prevButton = document.getElementById('prevMonth');
    const nextButton = document.getElementById('nextMonth');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            generateCalendar();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            generateCalendar();
        });
    }
    
    // Close modal when clicking outside
    if (calendarModal) {
        calendarModal.addEventListener('click', (e) => {
            if (e.target === calendarModal) {
                closeCalendarModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && calendarModal && calendarModal.classList.contains('active')) {
            closeCalendarModal();
        }
    });
}

/**
 * Event Management Functions
 * Use these functions to add, remove, or update events programmatically
 */

// Add a new event to the calendar
function addCalendarEvent(date, title, description) {
    const newEvent = {
        date: date, // Format: 'YYYY-MM-DD'
        title: title,
        description: description
    };
    
    calendarEvents.push(newEvent);
    
    // Refresh calendar if modal is open
    const modal = document.getElementById('calendarModal');
    if (modal && modal.classList.contains('active')) {
        generateCalendar();
        updateEventsPreview();
    }
    
    console.log('Event added:', newEvent);
}

// Remove an event by title
function removeCalendarEvent(title) {
    const index = calendarEvents.findIndex(event => event.title === title);
    if (index > -1) {
        const removedEvent = calendarEvents.splice(index, 1)[0];
        
        // Refresh calendar if modal is open
        const modal = document.getElementById('calendarModal');
        if (modal && modal.classList.contains('active')) {
            generateCalendar();
            updateEventsPreview();
        }
        
        console.log('Event removed:', removedEvent);
        return true;
    }
    return false;
}

// Update an existing event
function updateCalendarEvent(oldTitle, newDate, newTitle, newDescription) {
    const event = calendarEvents.find(event => event.title === oldTitle);
    if (event) {
        event.date = newDate;
        event.title = newTitle;
        event.description = newDescription;
        
        // Refresh calendar if modal is open
        const modal = document.getElementById('calendarModal');
        if (modal && modal.classList.contains('active')) {
            generateCalendar();
            updateEventsPreview();
        }
        
        console.log('Event updated:', event);
        return true;
    }
    return false;
}

// Get all events for a specific date
function getEventsForDate(date) {
    return calendarEvents.filter(event => event.date === date);
}

// Make functions globally available for easy access
window.addCalendarEvent = addCalendarEvent;
window.removeCalendarEvent = removeCalendarEvent;
window.updateCalendarEvent = updateCalendarEvent;
window.getEventsForDate = getEventsForDate;

/**
 * Stay Updated Functions - Calendar Sync & Email Subscriptions
 */
function initializeStayUpdated() {
    // iCalendar download button
    const icalButton = document.getElementById('downloadIcal');
    if (icalButton) {
        icalButton.addEventListener('click', downloadICalendar);
    }
    
    // Google Calendar button
    const googleCalButton = document.getElementById('addToGoogleCalendar');
    if (googleCalButton) {
        googleCalButton.addEventListener('click', addToGoogleCalendar);
    }
    
    // Email subscription form
    const emailForm = document.getElementById('emailSubscriptionForm');
    if (emailForm) {
        emailForm.addEventListener('submit', handleEmailSubscription);
    }
    
    // Bookmark calendar button
    const bookmarkButton = document.getElementById('bookmarkCalendar');
    if (bookmarkButton) {
        bookmarkButton.addEventListener('click', bookmarkCalendar);
    }
    
    // Share calendar button
    const shareButton = document.getElementById('shareCalendar');
    if (shareButton) {
        shareButton.addEventListener('click', shareCalendar);
    }
}

// Generate and download iCalendar (.ics) file
function downloadICalendar() {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'KASA-Events.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Calendar file downloaded! Import it to your calendar app.', 'success');
}

// Generate ICS (iCalendar) content
function generateICSContent() {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    let icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//KASA//KASA Events//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:KASA Events',
        'X-WR-CALDESC:Kenyan American Student Association Events'
    ].join('\r\n') + '\r\n';
    
    calendarEvents.forEach((event, index) => {
        const eventDate = new Date(event.date + 'T18:00:00'); // Default to 6 PM
        const startTime = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const endDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours duration
        const endTime = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        icsContent += [
            'BEGIN:VEVENT',
            `UID:kasa-event-${index}-${timestamp}@kasa.org`,
            `DTSTAMP:${timestamp}`,
            `DTSTART:${startTime}`,
            `DTEND:${endTime}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description}`,
            'LOCATION:Kent State University',
            'STATUS:CONFIRMED',
            'TRANSP:OPAQUE',
            'END:VEVENT'
        ].join('\r\n') + '\r\n';
    });
    
    icsContent += 'END:VCALENDAR\r\n';
    return icsContent;
}

// Add events to Google Calendar
function addToGoogleCalendar() {
    if (calendarEvents.length === 0) {
        showNotification('No events available to add to Google Calendar.', 'info');
        return;
    }
    
    // For multiple events, we'll create a Google Calendar URL for the first event
    // and show instructions for adding all events
    const firstEvent = calendarEvents[0];
    const eventDate = new Date(firstEvent.date + 'T18:00:00');
    const endDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(firstEvent.title)}&dates=${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(firstEvent.description)}&location=${encodeURIComponent('Kent State University')}`;
    
    window.open(googleCalendarUrl, '_blank');
    
    if (calendarEvents.length > 1) {
        showNotification(`Added "${firstEvent.title}" to Google Calendar. Download the .ics file to add all ${calendarEvents.length} events at once.`, 'info');
    } else {
        showNotification('Event added to Google Calendar!', 'success');
    }
}

// Handle email subscription
function handleEmailSubscription(e) {
    e.preventDefault();
    
    const email = document.getElementById('subscriptionEmail').value;
    const eventNotifications = document.getElementById('eventNotifications').checked;
    const weeklyDigest = document.getElementById('weeklyDigest').checked;
    
    if (!email) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // In a real application, you would send this data to your backend
    const subscriptionData = {
        email: email,
        eventNotifications: eventNotifications,
        weeklyDigest: weeklyDigest,
        timestamp: new Date().toISOString()
    };
    
    // Store locally for demo purposes
    localStorage.setItem('kasaEmailSubscription', JSON.stringify(subscriptionData));
    
    // Clear form
    document.getElementById('subscriptionEmail').value = '';
    
    showNotification('Successfully subscribed to KASA updates! You\'ll receive notifications at ' + email, 'success');
}

// Bookmark calendar functionality
function bookmarkCalendar() {
    const currentUrl = window.location.href;
    const calendarUrl = currentUrl + '#events';
    
    if (navigator.share) {
        navigator.share({
            title: 'KASA Events Calendar',
            text: 'Bookmark the KASA Events Calendar to stay updated on all our activities!',
            url: calendarUrl
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(calendarUrl).then(() => {
            showNotification('Calendar link copied to clipboard! Bookmark it for quick access.', 'success');
        }).catch(() => {
            showNotification('Please bookmark this page to quickly access the KASA events calendar.', 'info');
        });
    }
}

// Share calendar functionality
function shareCalendar() {
    const currentUrl = window.location.href;
    const shareText = 'Check out the KASA Events Calendar and never miss an event!';
    
    if (navigator.share) {
        navigator.share({
            title: 'KASA Events Calendar',
            text: shareText,
            url: currentUrl
        });
    } else {
        // Fallback: copy to clipboard
        const shareContent = `${shareText} ${currentUrl}`;
        navigator.clipboard.writeText(shareContent).then(() => {
            showNotification('Share link copied to clipboard!', 'success');
        }).catch(() => {
            // Manual share options
            const shareModal = createShareModal(currentUrl);
            document.body.appendChild(shareModal);
        });
    }
}

// Create share modal for browsers without native sharing
function createShareModal(url) {
    const modal = document.createElement('div');
    modal.className = 'share-modal-overlay';
    modal.innerHTML = `
        <div class="share-modal-content">
            <div class="share-modal-header">
                <h3>Share KASA Events Calendar</h3>
                <button class="share-modal-close">&times;</button>
            </div>
            <div class="share-modal-body">
                <p>Share the KASA Events Calendar with your friends:</p>
                <div class="share-options">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" class="share-btn facebook">
                        <i class="fab fa-facebook-f"></i> Facebook
                    </a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Check out the KASA Events Calendar!')}" target="_blank" class="share-btn twitter">
                        <i class="fab fa-twitter"></i> Twitter
                    </a>
                    <a href="https://wa.me/?text=${encodeURIComponent('Check out the KASA Events Calendar! ' + url)}" target="_blank" class="share-btn whatsapp">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
                <div class="share-link">
                    <input type="text" value="${url}" readonly>
                    <button class="copy-link-btn">Copy Link</button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    const closeBtn = modal.querySelector('.share-modal-close');
    const copyBtn = modal.querySelector('.copy-link-btn');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    copyBtn.addEventListener('click', () => {
        const input = modal.querySelector('input');
        input.select();
        document.execCommand('copy');
        showNotification('Link copied to clipboard!', 'success');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    return modal;
}

// Calendar modal is now initialized in the main DOMContentLoaded event listener above

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMobileMenu,
        toggleFAQItem,
        handleFormSubmit,
        showNotification,
        handleJoinCommunity,
        handleViewEvents,
        handleWhatsAppJoin,
        openCalendarModal,
        closeCalendarModal
    };
}
