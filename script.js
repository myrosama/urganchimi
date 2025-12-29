/* ============================================
   URGANCH 1-IMI OFFICIAL WEBSITE
   JavaScript Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initTabs();
    initScrollAnimations();
    initTelegramNews();
});

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ============================================
   ACTIVITIES TABS
   ============================================ */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Remove active from all contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active to clicked button
            button.classList.add('active');

            // Show corresponding content
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    // Add animation class to elements
    const animatedElements = document.querySelectorAll(
        '.section-header, .feature-item, .program-card, .facility-card, ' +
        '.activity-card, .partner-card, .contact-item, .social-card, ' +
        '.timeline-item, .about-content, .about-timeline'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/* ============================================
   TELEGRAM NEWS FEED
   ============================================ */
function initTelegramNews() {
    const newsFeed = document.getElementById('news-feed');
    if (!newsFeed) return;

    // The Telegram widget is already embedded via script tag
    // This function can be extended to fetch and display posts
    // from t.me/s/Urganch_IMI if needed

    // For now, we'll enhance the widget container
    const widgetContainer = document.querySelector('.telegram-widget');
    if (widgetContainer) {
        // Check if widget loaded after a delay
        setTimeout(() => {
            const iframe = widgetContainer.querySelector('iframe');
            if (!iframe) {
                // Widget didn't load, show fallback
                widgetContainer.innerHTML = `
                    <div class="telegram-fallback">
                        <i class="fab fa-telegram" style="font-size: 4rem; color: #0088cc; margin-bottom: 1rem;"></i>
                        <h3>Telegram Kanali</h3>
                        <p>So'nggi yangiliklar uchun kanalimizga obuna bo'ling</p>
                        <a href="https://t.me/Urganch_IMI" target="_blank" class="btn btn-telegram" style="margin-top: 1rem;">
                            <i class="fab fa-telegram"></i>
                            <span>Kanalga O'tish</span>
                        </a>
                    </div>
                `;
                widgetContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 3rem;';
            }
        }, 3000);
    }
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   ACTIVE NAV LINK HIGHLIGHTING
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightNav = throttle(() => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 100);

    window.addEventListener('scroll', highlightNav);
});

/* ============================================
   PARALLAX EFFECT FOR HERO
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    const heroShapes = document.querySelectorAll('.hero-shape');

    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.pageYOffset;

        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, 16));
});

/* ============================================
   COUNTER ANIMATION FOR STATS
   ============================================ */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const animate = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(animate);
        } else {
            element.textContent = target;
        }
    };

    animate();
}

// Observe stats for counter animation
document.addEventListener('DOMContentLoaded', function () {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;

                // Only animate if it's a number
                if (!isNaN(text.replace('+', ''))) {
                    const num = parseInt(text.replace('+', ''));
                    const hasPlus = text.includes('+');

                    animateCounter(target, num, 2000);

                    if (hasPlus) {
                        setTimeout(() => {
                            target.textContent = num + '+';
                        }, 2100);
                    }
                }

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
});

/* ============================================
   LOADING STATE
   ============================================ */
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

console.log('🎓 Urganch 1-IMI Official Website Loaded');
console.log('📱 Telegram: @Urganch_IMI');
