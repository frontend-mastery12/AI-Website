// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document ready!');
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize navigation
    initNavigation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize dashboard tabs
    initDashboardTabs();
    
    // Initialize mesh background
    initMeshBackground();
    
    // Create some random particles
    createParticles();
});

// Handle navigation and mobile menu
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Smooth scroll to section when clicking on nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize GSAP animations
function initAnimations() {
    // Hero section animations
    gsap.to('.fade-in', {
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out'
    });
    
    gsap.to('.slide-up', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });
    
    gsap.to('.slide-left', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7
    });
    
    gsap.to('.slide-right', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7
    });
    
    // Animate sections when scrolling into view
    const sections = ['#features', '#pricing', '#dashboard'];
    
    sections.forEach(section => {
        // Section title animations
        gsap.from(`${section} .section-title h2`, {
            scrollTrigger: {
                trigger: `${section} .section-title`,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.from(`${section} .section-title p`, {
            scrollTrigger: {
                trigger: `${section} .section-title`,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out'
        });
    });
    
    // Feature cards animations
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Pricing cards animations
    gsap.from('.pricing-card', {
        scrollTrigger: {
            trigger: '.pricing-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Dashboard gallery animations
    gsap.from('.dashboard-gallery', {
        scrollTrigger: {
            trigger: '.dashboard-gallery',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
}

// Handle dashboard tabs
function initDashboardTabs() {
    const tabs = document.querySelectorAll('.dashboard-tab');
    const screens = document.querySelectorAll('.screen');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get the data-tab attribute
            const tabId = tab.getAttribute('data-tab');
            
            // Hide all screens
            screens.forEach(screen => {
                screen.classList.remove('active');
            });
            
            // Show the corresponding screen
            document.querySelector(`.screen[data-screen="${tabId}"]`).classList.add('active');
        });
    });
}

// Create cybersecurity mesh background animation
function initMeshBackground() {
    const canvas = document.getElementById('meshCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
        const meshBg = document.querySelector('.mesh-bg');
        if (meshBg) {
            canvas.width = meshBg.offsetWidth;
            canvas.height = meshBg.offsetHeight;
        }
    };
    
    // Call once to initialize
    setCanvasDimensions();
    
    // Update on window resize
    window.addEventListener('resize', setCanvasDimensions);
    
    // Mesh properties
    const gridPoints = [];
    const numPointsX = 12;
    const numPointsY = 8;
    const gridSpacingX = canvas.width / (numPointsX - 1);
    const gridSpacingY = canvas.height / (numPointsY - 1);
    
    // Create grid points
    for (let y = 0; y < numPointsY; y++) {
        for (let x = 0; x < numPointsX; x++) {
            gridPoints.push({
                x: x * gridSpacingX,
                y: y * gridSpacingY,
                originX: x * gridSpacingX,
                originY: y * gridSpacingY,
                vx: 0,
                vy: 0
            });
        }
    }
    
    // Animation properties
    let animationFrameId;
    let lastTime = 0;
    
    // Draw function
    function draw(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update grid points
        gridPoints.forEach(point => {
            // Add some subtle movement
            point.vx += (Math.random() - 0.5) * 0.1;
            point.vy += (Math.random() - 0.5) * 0.1;
            
            // Dampen velocity
            point.vx *= 0.95;
            point.vy *= 0.95;
            
            // Apply spring force back to origin
            const dx = point.originX - point.x;
            const dy = point.originY - point.y;
            point.vx += dx * 0.01;
            point.vy += dy * 0.01;
            
            // Update position
            point.x += point.vx * (deltaTime / 16);
            point.y += point.vy * (deltaTime / 16);
        });
        
        // Draw connections
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        
        // Horizontal lines
        for (let y = 0; y < numPointsY; y++) {
            for (let x = 0; x < numPointsX - 1; x++) {
                const point1 = gridPoints[y * numPointsX + x];
                const point2 = gridPoints[y * numPointsX + x + 1];
                
                ctx.moveTo(point1.x, point1.y);
                ctx.lineTo(point2.x, point2.y);
            }
        }
        
        // Vertical lines
        for (let x = 0; x < numPointsX; x++) {
            for (let y = 0; y < numPointsY - 1; y++) {
                const point1 = gridPoints[y * numPointsX + x];
                const point2 = gridPoints[(y + 1) * numPointsX + x];
                
                ctx.moveTo(point1.x, point1.y);
                ctx.lineTo(point2.x, point2.y);
            }
        }
        
        ctx.stroke();
        
        // Draw points
        gridPoints.forEach(point => {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Request next frame
        animationFrameId = requestAnimationFrame(draw);
    }
    
    // Start animation
    animationFrameId = requestAnimationFrame(draw);
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
}

// Create floating particles in the background
function createParticles() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const numParticles = 15;
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5;
            
            // Append to section
            section.appendChild(particle);
            
            // Animate with GSAP
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                duration: Math.random() * 20 + 10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    });
}