// Initialize EmailJS
(function() {
    emailjs.init("EAY-Fn-KzYuw1X-2K");
})();

// ===================================
// Modal Utility
// ===================================
function showModal(type, title, message) {
    // Remove any existing modal
    const existing = document.getElementById('formModal');
    if (existing) existing.remove();

    const isSuccess = type === 'success';

    const modal = document.createElement('div');
    modal.id = 'formModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modalTitle');
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-box modal-${type}">
            <div class="modal-icon">
                ${isSuccess
                    ? `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                       </svg>`
                    : `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                       </svg>`
                }
            </div>
            <h3 class="modal-title" id="modalTitle">${title}</h3>
            <p class="modal-message">${message}</p>
            <button class="modal-close-btn btn btn-primary" id="modalCloseBtn">
                ${isSuccess ? 'Awesome!' : 'Got it'}
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Animate in
    requestAnimationFrame(() => {
        modal.classList.add('modal-visible');
    });

    // Close handlers
    function closeModal() {
        modal.classList.remove('modal-visible');
        modal.classList.add('modal-hiding');
        setTimeout(() => modal.remove(), 350);
    }

    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', onKey);
        }
    });
}

// ===================================
// Navigation & Smooth Scrolling
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===================================
    // Smooth Scrolling for Navigation Links
    // ===================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ===================================
    // Active Navigation Link on Scroll
    // ===================================
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ===================================
    // Section Reveal on Scroll
    // ===================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===================================
    // Scroll Event Listeners
    // ===================================
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
        }, 50);
    });

    handleNavbarScroll();
    updateActiveNavLink();

    // ===================================
    // Project Card Animations
    // ===================================
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });

    // ===================================
    // Timeline Item Animations
    // ===================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });

    // ===================================
    // Contact Form Handling with EmailJS
    // ===================================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const templateParams = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            emailjs.send('service_wi0spko', 'template_hfnujz4', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showModal(
                        'success',
                        'Message Sent!',
                        "Thank you for reaching out! I'll get back to you as soon as possible."
                    );
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }, function(error) {
                    console.log('FAILED...', error);
                    showModal(
                        'error',
                        'Something Went Wrong',
                        'Your message could not be sent. Please try again or email me directly at <a href="mailto:reamaeroyandoyan445@gmail.com">reamaeroyandoyan445@gmail.com</a>'
                    );
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
        });
    }

    // ===================================
    // Smooth Scroll for Internal Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ===================================
    // Parallax Effect for Hero Background
    // ===================================
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }

    // ===================================
    // Typing Effect for Hero Subtitle
    // ===================================
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // ===================================
    // Skill Tags Hover Animation
    // ===================================
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(-2deg)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ===================================
    // Keyboard Navigation Support
    // ===================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===================================
    // Lazy Loading Images
    // ===================================
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));

    document.documentElement.classList.add('js-enabled');

    console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #FF3366;');
    console.log('%cInterested in the code? Check out the repository!', 'font-size: 14px; color: #666;');
});

// ===================================
// Utility Functions
// ===================================
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

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}