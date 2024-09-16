document.addEventListener('DOMContentLoaded', function () {
    const promoVideo = document.getElementById('promoVideo');
    const carousel = new bootstrap.Carousel('#carouselExampleCaptions', {
        interval: 3000, // Intervalo para las imágenes de 3 segundos
        pause: false // Asegúrate de que el carrusel no se pause en hover
    });

    if (promoVideo) {
        // Al cargar los datos del video, espera 6 segundos y luego cambia al siguiente slide
        promoVideo.addEventListener('loadeddata', () => {
            setTimeout(() => {
                promoVideo.pause(); // Pausa el video después de 6 segundos
                carousel.next(); // Cambia al siguiente slide
            }, 6000); // 6 segundos para el video
        });

        // Si el video termina antes de 6 segundos, espera 3 segundos antes de cambiar al siguiente slide
        promoVideo.addEventListener('ended', () => {
            setTimeout(() => {
                carousel.next(); // Cambia al siguiente slide
            }, 3000); // 3 segundos para las imágenes
        });
    }

    // Configurar el carrusel para avanzar automáticamente
    setInterval(() => {
        if (carousel._items.length > 1) {
            carousel.next(); // Cambia al siguiente slide
        }
    }, 3000); // Intervalo de 3 segundos para las imágenes
});

// Inicialización de EmailJS
(function() {
    emailjs.init("PTbYFfgzmvnZwqXRN");   // Reemplaza con tu Public Key
})();

// Validación y envío de correo
document.querySelector('.contact-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita el envío normal del formulario

    let email = document.getElementById('email').value;
    let texto = document.getElementById('texto').value;

    // Validar campos
    let errorMessage = validateForm(email, texto);
    if (errorMessage) {
        showFeedback(errorMessage, 'error');
        return;
    }

    // Enviar correo con EmailJS
    emailjs.send('service_94x2abb', 'template_2kq7dru', {
        to_name: email,
        from_name: "Nombre del remitente",
        message: texto,
        reply_to: email
    }).then(function(response) {
        showFeedback('Correo enviado correctamente', 'success');
        Swal.fire({
            icon: 'success',
            title: '¡Correo Enviado!',
            text: 'Tu correo ha sido enviado correctamente.',
            confirmButtonText: 'Aceptar'
        });
    }, function(error) {
        showFeedback(`Error al enviar el correo: ${error.text}`, 'error');
    });
});

// Función de validación del formulario
function validateForm(email, texto) {
    let message = '';

    // Validar email
    if (!validateEmail(email)) {
        message += 'El correo electrónico no es válido. ';
    }

    // Validar texto
    if (texto.length < 10) { // Ajusta la longitud según tu necesidad
        message += 'El mensaje debe tener al menos 10 caracteres. ';
    }

    return message ? message.trim() : null;
}

// Función de validación de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para mostrar mensajes de feedback
function showFeedback(message, type) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.textContent = message;
    feedbackElement.className = type;  // 'success' o 'error'
}


