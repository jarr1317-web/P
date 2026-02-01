// Variables globales
let starsCreated = false;

// Configuración de EmailJS (REEMPLAZA CON TUS PROPIOS DATOS)
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_de_confirmacion', // Reemplaza con tu Service ID
    TEMPLATE_ID: '__ejs-test-mail-service__', // Reemplaza con tu Template ID
    USER_ID: 'rjjK9LtImL3mtG17m', // Reemplaza con tu Public Key (User ID)
    JESUS_EMAIL: 'jarr1317@gmail.com' // Tu correo
};

// Variables para la animación de la luna
const initialMoonSize = 400; // Tamaño inicial en px
const finalMoonSize = 600; // Tamaño final en px

// Cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const envelope = document.getElementById('envelope');
    const initialScreen = document.getElementById('initial-screen');
    const questionScreen = document.getElementById('question-screen');
    const noScreen = document.getElementById('no-screen');
    const yesScreen = document.getElementById('yes-screen');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const ropeContainer = document.getElementById('rope-container');
    const ropeMask = document.getElementById('rope-mask');
    const moon = document.getElementById('moon');
    const moonImage = document.getElementById('moon-image');
    const finalMessageContainer = document.querySelector('.final-message-container');
    const musicToggle = document.getElementById('music-toggle');
    const loveSong = document.getElementById('love-song');
    const emailNotification = document.getElementById('email-notification');
    
    // Inicializar EmailJS con tu User ID
    emailjs.init(EMAILJS_CONFIG.USER_ID);
    
    // Abrir el sobre
    envelope.addEventListener('click', function() {
        envelope.classList.add('opened');
        
        // Mostrar la pregunta después de 1 segundo
        setTimeout(() => {
            initialScreen.classList.remove('active');
            questionScreen.classList.add('active');
        }, 1000);
    });
    
    // Manejar clic en SÍ
    yesBtn.addEventListener('click', function() {
        // Enviar correo REAL usando EmailJS
        sendRealEmail();
        
        // Ocultar la pregunta
        questionScreen.classList.remove('active');
        
        // Mostrar la pantalla SÍ
        yesScreen.classList.add('active');
        
        // Crear estrellas si no se han creado
        if (!starsCreated) {
            createStars();
            starsCreated = true;
        }
        
        // Iniciar la animación de bajar la luna después de 1 segundo
        setTimeout(() => {
            startMoonAnimation();
        }, 1000);
        
        // Reproducir música
        setTimeout(() => {
            loveSong.play().catch(e => {
                console.log("La reproducción automática fue bloqueada. El usuario debe interactuar primero.");
                musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Click para reproducir música</span>';
            });
        }, 500);
    });
    
    // Manejar clic en NO
    noBtn.addEventListener('click', function() {
        // Ocultar la pregunta
        questionScreen.classList.remove('active');
        
        // Mostrar la pantalla NO
        noScreen.classList.add('active');
    });
    
    // Controlar la música
    musicToggle.addEventListener('click', function() {
        if (loveSong.paused) {
            loveSong.play();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Música: ON</span>';
        } else {
            loveSong.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Música: OFF</span>';
        }
    });
    
    // Función para crear estrellas en el cielo
    function createStars() {
        const starsContainer = document.querySelector('.stars-container');
        const starCount = 150;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Tamaño aleatorio
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Posición aleatoria
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Opacidad aleatoria
            star.style.opacity = Math.random() * 0.5 + 0.2;
            
            // Animación con duración aleatoria
            const duration = Math.random() * 10 + 5;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            starsContainer.appendChild(star);
        }
    }
    
    // Función para animar la luna con todos los efectos
    function startMoonAnimation() {
        // Mostrar la soga completa
        ropeContainer.style.opacity = '1';
        
        // Calcular posición final de la luna (centro vertical de la pantalla)
        const windowHeight = window.innerHeight;
        const moonFinalTop = (windowHeight / 2) - (finalMoonSize / 2);
        
        // Animación 1: Bajar la luna desde arriba
        moon.style.top = `${moonFinalTop}px`;
        
        // Animación 2: Hacer crecer la luna gradualmente
        moon.style.width = `${finalMoonSize}px`;
        moon.style.height = `${finalMoonSize}px`;
        
        // Aumentar el brillo de la imagen de la luna a medida que crece
        moonImage.style.filter = 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.9))';
        moonImage.style.transform = 'scale(1.1)';
        
        // Animación 3: Efecto de jalar la soga (máscara que sube)
        // La máscara comienza en 0% y sube hasta cubrir toda la soga
        ropeMask.style.height = '100%';
        
        // Animación 4: Mostrar mensaje final después de terminar
        setTimeout(() => {
            finalMessageContainer.style.opacity = '1';
            finalMessageContainer.style.zIndex = '20';
            
            // Añadir clase para confirmar que la luna creció
            moon.classList.add('grown');
        }, 4000);
    }
    
    // Función para enviar correo REAL con EmailJS
    function sendRealEmail() {
        // Mostrar notificación
        emailNotification.style.display = 'flex';
        
        // Preparar datos para el correo
        const templateParams = {
            to_email: EMAILJS_CONFIG.JESUS_EMAIL,
            to_name: 'Jesús',
            from_name: 'Osmary',
            message: '¡Osmary ha dicho que SÍ a tu propuesta de ser tu novia! 🎉❤️',
            date: new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        
        // Enviar correo usando EmailJS
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('Correo enviado con éxito!', response.status, response.text);
                // Actualizar notificación con éxito
                emailNotification.innerHTML = '<p><i class="fas fa-check-circle"></i> ¡Correo enviado exitosamente a Jesús!</p>';
                emailNotification.style.background = 'linear-gradient(to right, #00c853, #64dd17)';
            })
            .catch(function(error) {
                console.log('Error al enviar el correo:', error);
                // Actualizar notificación con error
                emailNotification.innerHTML = '<p><i class="fas fa-exclamation-triangle"></i> Error al enviar correo, pero Osmary dijo SÍ!</p>';
                emailNotification.style.background = 'linear-gradient(to right, #ff9800, #ff5722)';
            });
        
        // Ocultar notificación después de 5 segundos
        setTimeout(() => {
            emailNotification.style.display = 'none';
        }, 0.000);
    }
    
    // Añadir estrellas a los corazones
    const hearts = document.querySelectorAll('.hearts-container i');
    hearts.forEach((heart, index) => {
        heart.style.setProperty('--i', index);
    });
    
    // Ajustar animación si la pantalla cambia de tamaño
    window.addEventListener('resize', function() {
        if (yesScreen.classList.contains('active')) {
            // Recalcular posición de la luna si está visible
            const windowHeight = window.innerHeight;
            const moonCurrentSize = moon.classList.contains('grown') ? finalMoonSize : initialMoonSize;
            const moonFinalTop = (windowHeight / 2) - (moonCurrentSize / 2);
            moon.style.top = `${moonFinalTop}px`;
        }
    });
});