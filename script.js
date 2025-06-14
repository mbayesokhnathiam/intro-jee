// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    // Feature tabs
    const featureTabs = document.querySelectorAll('.feature-tab');
    const featurePanels = document.querySelectorAll('.feature-panel');
    
    // Example tabs
    const exampleTabs = document.querySelectorAll('.example-tab');
    const examplePanels = document.querySelectorAll('.example-panel');
    
    // Layer interactions
    const layers = document.querySelectorAll('.layer');
    
    // Navigation between sections
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item and target section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Scroll to top of content
            document.querySelector('.content').scrollTop = 0;
        });
    });
    
    // Feature tabs functionality
    featureTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetFeature = this.getAttribute('data-feature');
            
            // Remove active class from all tabs and panels
            featureTabs.forEach(t => t.classList.remove('active'));
            featurePanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked tab and target panel
            this.classList.add('active');
            document.getElementById(`feature-${targetFeature}`).classList.add('active');
        });
    });
    
    // Example tabs functionality
    exampleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetExample = this.getAttribute('data-example');
            
            // Remove active class from all tabs and panels
            exampleTabs.forEach(t => t.classList.remove('active'));
            examplePanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked tab and target panel
            this.classList.add('active');
            document.getElementById(`example-${targetExample}`).classList.add('active');
        });
    });
    
    // Layer interaction functionality
    layers.forEach(layer => {
        layer.addEventListener('click', function() {
            // Toggle expanded state
            this.classList.toggle('expanded');
            
            // Close other layers
            layers.forEach(otherLayer => {
                if (otherLayer !== this) {
                    otherLayer.classList.remove('expanded');
                }
            });
        });
    });
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Auto-assessment functionality
    const checkboxes = document.querySelectorAll('.assessment-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('.assessment-item input[type="checkbox"]:checked').length;
            const totalCount = checkboxes.length;
            
            // You could add progress tracking here
            console.log(`Progress: ${checkedCount}/${totalCount} items checked`);
        });
    });
    
    // Add hover effects for interactive elements
    const interactiveCards = document.querySelectorAll('.info-card, .component-card, .takeaway-card, .career-card, .server-card, .tool-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Code block copy functionality (if needed)
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // Add copy button functionality here if needed
        block.addEventListener('click', function() {
            // Select text for easy copying
            const range = document.createRange();
            range.selectNode(this);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        });
    });
    
    // Progress tracking
    let currentSection = 'introduction';
    const totalSections = sections.length;
    
    function updateProgress() {
        const currentIndex = Array.from(sections).findIndex(section => section.classList.contains('active'));
        const progress = ((currentIndex + 1) / totalSections) * 100;
        
        // You could add a progress bar here
        console.log(`Course progress: ${Math.round(progress)}%`);
    }
    
    // Update progress when section changes
    navItems.forEach(item => {
        item.addEventListener('click', updateProgress);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const currentSectionElement = document.querySelector('.section.active');
        const currentSectionId = currentSectionElement.id;
        const sectionIds = Array.from(sections).map(section => section.id);
        const currentIndex = sectionIds.indexOf(currentSectionId);
        
        // Arrow key navigation
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % sectionIds.length;
            const nextNavItem = document.querySelector(`[data-section="${sectionIds[nextIndex]}"]`);
            if (nextNavItem) {
                nextNavItem.click();
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = currentIndex === 0 ? sectionIds.length - 1 : currentIndex - 1;
            const prevNavItem = document.querySelector(`[data-section="${sectionIds[prevIndex]}"]`);
            if (prevNavItem) {
                prevNavItem.click();
            }
        }
    });
    
    // Initialize tooltips or additional interactive features
    function initializeTooltips() {
        const elementsWithTooltips = document.querySelectorAll('[title]');
        
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', function() {
                // Add tooltip functionality here if needed
            });
        });
    }
    
    initializeTooltips();
    
    // Print functionality
    function setupPrintStyles() {
        const printButton = document.createElement('button');
        printButton.textContent = 'Imprimer le cours';
        printButton.className = 'print-button';
        printButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        `;
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printButton);
    }
    
    setupPrintStyles();
    
    // Local storage for progress tracking
    function saveProgress() {
        const currentSectionElement = document.querySelector('.section.active');
        if (currentSectionElement) {
            localStorage.setItem('jakartaEE_currentSection', currentSectionElement.id);
        }
    }
    
    function loadProgress() {
        const savedSection = localStorage.getItem('jakartaEE_currentSection');
        if (savedSection && document.getElementById(savedSection)) {
            const navItem = document.querySelector(`[data-section="${savedSection}"]`);
            if (navItem) {
                navItem.click();
            }
        }
    }
    
    // Save progress when section changes
    navItems.forEach(item => {
        item.addEventListener('click', saveProgress);
    });
    
    // Load progress on page load
    loadProgress();
    
    // Add animation classes for better UX
    function addAnimations() {
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
        const animatedElements = document.querySelectorAll('.info-card, .component-card, .takeaway-card, .timeline-item');
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
    
    addAnimations();
});

// Utility functions
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

// Search functionality (basic)
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Rechercher dans le cours...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        width: 100%;
        padding: 12px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 14px;
    `;
    
    const navCard = document.querySelector('.nav-card');
    navCard.insertBefore(searchInput, navCard.firstChild);
    
    const searchHandler = debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const sections = document.querySelectorAll('.section');
        
        if (searchTerm.length < 2) {
            // Reset search
            sections.forEach(section => {
                section.style.display = '';
            });
            return;
        }
        
        sections.forEach(section => {
            const content = section.textContent.toLowerCase();
            if (content.includes(searchTerm)) {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    }, 300);
    
    searchInput.addEventListener('input', searchHandler);
}

// Initialize search after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeSearch, 1000);
});