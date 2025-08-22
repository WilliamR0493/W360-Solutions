 // Inicialización del Swiper
    const swiper = new Swiper('.servicios-swiper', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
    });

    // Efecto de partículas binarias que caen hacia abajo
    const canvasGlobal = document.getElementById('escarchaGlobal');
    const ctxGlobal = canvasGlobal.getContext('2d');
    canvasGlobal.width = window.innerWidth;
    canvasGlobal.height = window.innerHeight;

    const binaryParticlesGlobal = [];
    // Crear partículas para un efecto de lluvia digital
    for (let i = 0; i < 80; i++) {
      binaryParticlesGlobal.push({
        x: Math.random() * canvasGlobal.width,
        y: Math.random() * canvasGlobal.height,
        value: Math.random() > 0.5 ? '1' : '0',
        size: Math.random() * 12 + 8,
        speedY: Math.random() * 1.2 + 0.5,
        opacity: Math.random() * 0.6 + 0.3
      });
    }

    function drawBinaryGlobal() {
      ctxGlobal.clearRect(0, 0, canvasGlobal.width, canvasGlobal.height);
      ctxGlobal.font = 'bold 14px "Courier New", monospace';
      ctxGlobal.textAlign = 'center';
      ctxGlobal.textBaseline = 'middle';
      
      binaryParticlesGlobal.forEach(p => {
        // Hacer que las partículas caigan hacia abajo
        p.y += p.speedY;
        
        // Si la partícula sale por abajo, reiniciarla en la parte superior
        if (p.y > canvasGlobal.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvasGlobal.width;
          p.value = Math.random() > 0.5 ? '1' : '0';
        }
        
        ctxGlobal.fillStyle = `rgba(51, 154, 240, ${p.opacity})`;
        ctxGlobal.fillText(p.value, p.x, p.y);
      });
      requestAnimationFrame(drawBinaryGlobal);
    }
    drawBinaryGlobal();

    window.addEventListener("resize", () => {
      canvasGlobal.width = window.innerWidth;
      canvasGlobal.height = window.innerHeight;
    });

    /* Configuración del formulario de contacto */
    document.getElementById('miFormulario').addEventListener('submit', async function (e) {
      e.preventDefault();

      const form = e.target;
      const submitBtn = form.querySelector('button[type="submit"]');

      // Estado de "cargando"
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';

      try {
        // Envía los datos a FormSubmit
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json',
          },
        });

        alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
        form.reset();

      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al enviar. Por favor, recarga la página e inténtalo de nuevo.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
      }
    });