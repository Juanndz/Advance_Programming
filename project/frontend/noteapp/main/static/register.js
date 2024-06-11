document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    let email = document.getElementById('email').value;
    let name = document.getElementById('name').value;
    let URL_BASE = "http://localhost:8080";

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }

    let url_post = URL_BASE + '/register';

    try {
        fetch(url_post, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 0,
                email: email,
                name: name,
                password: password,
                list_workspaces: []
            })
        });
    
    alert("Registro exitoso. Redirigiendo a la página de inicio de sesión...");
    window.location.href = 'index'; // Redirige a la página de inicio de sesión

    } catch (error) {
        console.error('Error:', error);
        alert("Error al registrar. Por favor, inténtalo de nuevo.");
    }
});