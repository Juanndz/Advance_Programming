document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }

    // Aquí iría la lógica para registrar al usuario
    alert("Registro exitoso. Redirigiendo a la página de inicio de sesión...");
    window.location.href = 'index.html'; // Redirige a la página de inicio de sesión
});
