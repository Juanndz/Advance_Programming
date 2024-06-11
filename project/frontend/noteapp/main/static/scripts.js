let URL_BASE = "http://localhost:8080";

async function login() {

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let url_post = URL_BASE + '/login';

    await fetch(url_post, {
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
            //window.location.href = '{% url 'workspaces' %}';
        } else {
            alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
        }
    })
    .catch(error => console.error('Error:', error));  // Log any errors

}

async function register() {

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    let email = document.getElementById('email').value;
    let name = document.getElementById('name').value;
    let URL_BASE = "http://localhost:8080";

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }

    // Aquí iría la lógica para registrar al usuario
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

}