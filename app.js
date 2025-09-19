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
        
        // Scroll animations
        function checkVisibility() {
            const elements = document.querySelectorAll('.section-title, .service-card, .about-image, .about-text, .portfolio-item, .contact-info, .contact-form');
            
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
        }
        
        // Initialize canvas animations
        window.addEventListener('load', initCanvasAnimations);
        window.addEventListener('resize', initCanvasAnimations);