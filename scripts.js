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


