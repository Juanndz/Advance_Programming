/* author : Juan Zárate */

let URL_BASE = "http://localhost:8080"

// Cerrar sesión
document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', function() {
    const createWorkspaceBtn = document.getElementById('createWorkspaceBtn');
    const optionsContainer = document.getElementById('workspace-content');

    createWorkspaceBtn.addEventListener('click', function() {
        optionsContainer.innerHTML = `
            <div class="option">
                <label for="userEmail">Agregar Usuario (Correo):</label>
                <input type="email" id="userEmail" placeholder="Correo del usuario">
                <button id="addUserBtn">Agregar Usuario</button>
            </div>
            <div class="option">
                <label for="noteText">Agregar Nota:</label>
                <textarea id="noteText" placeholder="Escribe tu nota aquí"></textarea>
                <button id="addNoteBtn">Agregar Nota</button>
            </div>
        `;

        const addUserBtn = document.getElementById('addUserBtn');
        const addNoteBtn = document.getElementById('addNoteBtn');

        addUserBtn.addEventListener('click', addUserToWorkspace);
        addNoteBtn.addEventListener('click', addNoteToWorkspace);
    });
});

async function addUserToWorkspace() {
    const userEmail = document.getElementById('userEmail').value;
    console.log('Usuario agregado:', userEmail);
    // Aquí puedes agregar la lógica para enviar el correo del usuario al backend
    let response = await fetch(URL_BASE + '/workspaces/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            email: userEmail
        })  
    });
}

async function addNoteToWorkspace() {
    const noteText = document.getElementById('noteText').value;
    console.log('Nota agregada:', noteText);
    // Aquí puedes agregar la lógica para enviar la nota al backend
}
