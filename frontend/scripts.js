document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Aquí se puede agregar la lógica de autenticación
    window.location.href = 'workspaces.html'; // Redirige a la página de workspaces
});

document.getElementById('register-link').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'register.html'; // Redirige a la página de registro
});
