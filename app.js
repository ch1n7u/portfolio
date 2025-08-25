
class PortfolioApp {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.animateElements = document.querySelectorAll('.animate-on-scroll');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupMobileMenu();
        this.addScrollClasses();
        this.handleScroll(); // Initial check
        this.updateActiveNavLink();
    }

    /**
     * ----------------------------------------------------------------------------------
     * Event Listeners
     * ----------------------------------------------------------------------------------
     */
    setupEventListeners() {
        // Window scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateActiveNavLink();
            this.animateOnScroll();
        });

        // Mobile menu toggle (hamburger)
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Navigation links – smooth scroll for internal anchors only
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                // Only intercept internal hash links (#section)
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        this.scrollToSection(targetSection);
                        this.closeMobileMenu();
                    }
                }
                // External links are left untouched (they open normally)
            });
        });

        // Close mobile menu when clicking outside (for better UX)
        document.addEventListener('click', (e) => {
            if (this.navMenu && this.navMenu.classList.contains('active')) {
                if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });

        // Window resize handler (close menu on desktop)
        window.addEventListener('resize', () => this.handleResize());
    }

    /**
     * ----------------------------------------------------------------------------------
     * Scrolling & Navigation Helpers
     * ----------------------------------------------------------------------------------
     */

    scrollToSection(target) {
        // Modern, clean method using scrollIntoView
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    toggleMobileMenu() {
        if (!this.navMenu) return;
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    closeMobileMenu() {
        if (!this.navMenu) return;
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }

    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;

        // Sticky navbar shadow
        if (scrollTop > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    updateActiveNavLink() {
        let currentSection = '';
        const scrollPos = window.pageYOffset + 200; // Offset to detect section earlier

        this.sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    }



    setupScrollAnimations() {
        const selectors = [
            '.section-title', '.skill-card', '.achievement-card', '.project-card',
            '.blog-card', '.contact-item', '.social-link', '.about-description', '.highlight-item'
        ];
        selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => el.classList.add('animate-on-scroll')));
        this.animateElements = document.querySelectorAll('.animate-on-scroll');
        this.animateOnScroll(); // Initial trigger
    }

    animateOnScroll() {
        const winH = window.innerHeight;
        this.animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < winH - 100) el.classList.add('animated');
        });

        // Skill bar animation once in viewport
        this.skillBars.forEach(bar => {
            if (bar.classList.contains('animated')) return;
            const rect = bar.getBoundingClientRect();
            if (rect.top < winH - 100) {
                bar.classList.add('animated');
                const target = parseInt(bar.getAttribute('data-skill') || '0', 10);
                bar.style.width = `${target}%`;
            }
        });
    }


}

window.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});
