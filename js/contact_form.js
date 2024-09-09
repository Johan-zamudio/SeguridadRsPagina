document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Recoger datos del formulario
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
  
      // Enviar los datos al backend
      fetch('/enviar-correo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone, email, message })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Mostrar mensaje de confirmación
          document.getElementById('responseMessage').style.display = 'block';
          document.getElementById('contactForm').reset(); // Resetear el formulario
        } else {
          alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
      });
    });
  });
  