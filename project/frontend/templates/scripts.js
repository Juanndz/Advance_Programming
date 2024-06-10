document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let URL_BASE = "http://localhost:8080";
    let url_post = URL_BASE + '/login';

    fetch(url_post, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 0,
            name: "",
            email: email,
            password: password,
            list_workspaces: []
        })
    })
    .then(response => response.json())  // Parse the response as JSON
    .then(data => {
        if (data) {
            alert("Inicio de sesión exitoso. Redirigiendo a la página de inicio...");
            window.location.href = 'index.html'; // Redirige a la página de inicio
        } else {
            alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
        }
    })
    .catch(error => console.error('Error:', error));  // Log any errors

});

document.getElementById('register-link').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'register.html'; // Redirige a la página de registro
});
