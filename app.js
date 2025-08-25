 // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
            
            // Update canvas animations for new theme
            initCanvasAnimations();
        });
        
        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        // Navigation
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");
        
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
        
        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Services Carousel
        const servicesTrack = document.getElementById('servicesTrack');
        const carouselDots = document.querySelectorAll('.carousel-dot');
        const serviceCards = document.querySelectorAll('.service-card');
        let currentIndex = 0;
        let autoSlideInterval;
        
        function updateCarousel() {
            const cardWidth = serviceCards[0].offsetWidth + 30; // width + margin
            servicesTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            // Update active dot
            carouselDots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Update active card
            serviceCards.forEach((card, index) => {
                if (index === currentIndex) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % serviceCards.length;
            updateCarousel();
        }
        
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Initialize carousel
        startAutoSlide();
        
        // Dot click events
        carouselDots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                updateCarousel();
                stopAutoSlide();
                startAutoSlide();
            });
        });
        
        // Pause auto slide on hover
        servicesTrack.addEventListener('mouseenter', stopAutoSlide);
        servicesTrack.addEventListener('mouseleave', startAutoSlide);
        
        // Scroll animations
        function checkVisibility() {
            const elements = document.querySelectorAll('.section-title, .about-image, .about-text, .portfolio-item, .contact-info, .contact-form');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }
        
        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('load', checkVisibility);
        
        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            this.reset();
        });
        
        // Canvas Animations
        function initCanvasAnimations() {
            const canvases = {
                hero: document.getElementById('heroCanvas'),
                services: document.getElementById('servicesCanvas'),
                about: document.getElementById('aboutCanvas'),
                portfolio: document.getElementById('portfolioCanvas'),
                contact: document.getElementById('contactCanvas'),
                footer: document.getElementById('footerCanvas')
            };
            
            // Set canvas sizes
            for (const key in canvases) {
                if (canvases[key]) {
                    const canvas = canvases[key];
                    const container = canvas.parentElement.parentElement;
                    canvas.width = container.offsetWidth;
                    canvas.height = container.offsetHeight;
                }
            }
            
            // Hero Canvas - Binary Rain Effect
            if (canvases.hero) {
                const ctx = canvases.hero.getContext('2d');
                const characters = '01';
                const fontSize = 18;
                const columns = Math.floor(canvases.hero.width / fontSize);
                const drops = [];
                
                // Initialize drops
                for (let i = 0; i < columns; i++) {
                    drops[i] = Math.floor(Math.random() * -100);
                }
                
                function draw() {
                    // Semi-transparent background for trail effect
                    ctx.fillStyle = document.body.classList.contains('dark-mode') 
                        ? 'rgba(18, 18, 18, 0.05)' 
                        : 'rgba(248, 249, 250, 0.05)';
                    ctx.fillRect(0, 0, canvases.hero.width, canvases.hero.height);
                    
                    ctx.fillStyle = document.body.classList.contains('dark-mode') 
                        ? 'rgba(26, 115, 232, 0.8)' 
                        : 'rgba(26, 115, 232, 0.6)';
                    ctx.font = `${fontSize}px monospace`;
                    
                    for (let i = 0; i < drops.length; i++) {
                        const text = characters.charAt(Math.floor(Math.random() * characters.length));
                        const x = i * fontSize;
                        const y = drops[i] * fontSize;
                        
                        ctx.fillText(text, x, y);
                        
                        // Reset drop if it reaches the bottom
                        if (y > canvases.hero.height && Math.random() > 0.975) {
                            drops[i] = 0;
                        }
                        
                        drops[i]++;
                    }
                }
                
                setInterval(draw, 33);
            }
            
            // Services Canvas - Network Nodes
            if (canvases.services) {
                const ctx = canvases.services.getContext('2d');
                const nodes = [];
                const nodeCount = 25;
                
                // Create nodes
                for (let i = 0; i < nodeCount; i++) {
                    nodes.push({
                        x: Math.random() * canvases.services.width,
                        y: Math.random() * canvases.services.height,
                        radius: Math.random() * 3 + 1,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5
                    });
                }
                
                function draw() {
                    ctx.clearRect(0, 0, canvases.services.width, canvases.services.height);
                    
                    // Draw connections
                    for (let i = 0; i < nodes.length; i++) {
                        for (let j = i + 1; j < nodes.length; j++) {
                            const dx = nodes[i].x - nodes[j].x;
                            const dy = nodes[i].y - nodes[j].y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            
                            if (dist < 150) {
                                ctx.beginPath();
                                ctx.strokeStyle = document.body.classList.contains('dark-mode') 
                                    ? `rgba(255, 145, 0, ${0.2 - dist/750})` 
                                    : `rgba(26, 115, 232, ${0.2 - dist/750})`;
                                ctx.lineWidth = 0.5;
                                ctx.moveTo(nodes[i].x, nodes[i].y);
                                ctx.lineTo(nodes[j].x, nodes[j].y);
                                ctx.stroke();
                            }
                        }
                    }
                    
                    // Draw nodes
                    for (let i = 0; i < nodes.length; i++) {
                        ctx.beginPath();
                        ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, Math.PI * 2);
                        ctx.fillStyle = document.body.classList.contains('dark-mode') 
                            ? 'rgba(255, 145, 0, 0.8)' 
                            : 'rgba(26, 115, 232, 0.6)';
                        ctx.fill();
                        
                        // Update node position
                        nodes[i].x += nodes[i].vx;
                        nodes[i].y += nodes[i].vy;
                        
                        // Bounce off edges
                        if (nodes[i].x < 0 || nodes[i].x > canvases.services.width) {
                            nodes[i].vx = -nodes[i].vx;
                        }
                        if (nodes[i].y < 0 || nodes[i].y > canvases.services.height) {
                            nodes[i].vy = -nodes[i].vy;
                        }
                    }
                    
                    requestAnimationFrame(draw);
                }
                
                draw();
            }
            
            // About Canvas - Circuit Board Effect
            if (canvases.about) {
                const ctx = canvases.about.getContext('2d');
                const points = [];
                const pointCount = 50;
                let time = 0;
                
                // Create points
                for (let i = 0; i < pointCount; i++) {
                    points.push({
                        x: Math.random() * canvases.about.width,
                        y: Math.random() * canvases.about.height,
                        size: Math.random() * 2 + 1
                    });
                }
                
                function draw() {
                    ctx.clearRect(0, 0, canvases.about.width, canvases.about.height);
                    
                    // Draw connections
                    ctx.strokeStyle = document.body.classList.contains('dark-mode') 
                        ? 'rgba(26, 115, 232, 0.3)' 
                        : 'rgba(26, 115, 232, 0.2)';
                    ctx.lineWidth = 1;
                    
                    for (let i = 0; i < points.length; i++) {
                        for (let j = i + 1; j < points.length; j++) {
                            const dx = points[i].x - points[j].x;
                            const dy = points[i].y - points[j].y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            
                            if (dist < 100) {
                                ctx.beginPath();
                                ctx.moveTo(points[i].x, points[i].y);
                                ctx.lineTo(points[j].x, points[j].y);
                                ctx.stroke();
                            }
                        }
                    }
                    
                    // Draw points
                    for (let i = 0; i < points.length; i++) {
                        ctx.beginPath();
                        ctx.arc(points[i].x, points[i].y, points[i].size, 0, Math.PI * 2);
                        ctx.fillStyle = document.body.classList.contains('dark-mode') 
                            ? 'rgba(255, 145, 0, 0.8)' 
                            : 'rgba(26, 115, 232, 0.6)';
                        ctx.fill();
                        
                        // Animate points slightly
                        points[i].x += Math.sin(time + i) * 0.3;
                        points[i].y += Math.cos(time + i) * 0.3;
                    }
                    
                    time += 0.01;
                    requestAnimationFrame(draw);
                }
                
                draw();
            }
        }
        
        // Initialize canvas animations
        window.addEventListener('load', initCanvasAnimations);
        window.addEventListener('resize', initCanvasAnimations);
        
        // Initialize carousel on load
        window.addEventListener('load', updateCarousel);
        window.addEventListener('resize', updateCarousel);