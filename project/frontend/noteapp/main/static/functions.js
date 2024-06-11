/* author : Juan Zárate */

let URL_BASE = "http://localhost:8080"

// Create a new workspace and at the time add a user to it and add a note
    async function createWorkspace() {
        let userOptions = "<div class='option1'>";
                userOptions += "<label for='userEmail'>Agregar Usuario (Correo):</label>";
                userOptions += "<input type='email' id='userEmail' placeholder='Correo del usuario'>";
                userOptions += "<button id='addUserBtn' onclick='addUserToWorkspace()'>Agregar Usuario</button> </div>";
                userOptions += "<div class='option2'>";
                userOptions += "<label for='noteText'>Agregar Nota:</label>";
                userOptions += "<textarea id='titleNote' placeholder='Escribe el título de tu nota'></textarea>";
                userOptions += "<textarea id='noteText' placeholder='Escribe tu nota aquí'></textarea>";
                userOptions += "<button id='addNoteBtn' onclick='addNoteToWorkspace()'>Agregar Nota</button></div>";

                document.getElementById('workspace-content').innerHTML = userOptions;
    }
// Add a user to the workspace
    async function addUserToWorkspace() {
        let data = {
            user: document.getElementById('userEmail').value
        }
        console.log(data)
        
        let url_post = URL_BASE + '/workspaces/add-user'
    
        try {
            const response = await fetch(url_post, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5500',
                    "Access-Control-Allow-Methods": "POST"
                },
                body: JSON.stringify(data)
            });
            const workspace = await response.json();
            document.getElementById('workspace-content').textContent = workspace.message;
        } catch (error) {
            console.error('Error:', error);
    }
    }
// Add a note to the workspace

async function addNoteToWorkspace() {
    let data = {
        Title: document.getElementById('titleNote').value,
        Description: document.getElementById('noteText').value
    }
    console.log(data)
    
    let url_post = URL_BASE + '/workspaces/add-note'

    try {
        const response = await fetch(url_post, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:5500',
                "Access-Control-Allow-Methods": "POST"
            },
            body: JSON.stringify(data)
        });
        const workspace = await response.json();
        document.getElementById('workspace-content').textContent = workspace.message;
    } catch (error) {
        console.error('Error:', error);
}
}
   
/// Get the list of workspaces
    async function seeWorkspaces() {
        // Connect to the database and retrieve the list of workspaces
        try {
            const response = await fetch(URL_BASE + '/workspaces');
            const data = await response.json();
            
            let workspaceList = "<ul>";
        // Iterate over the workspaces and create list items
        workspaces.forEach(workspace => {
            workspaceList += "<li>" + workspace.name + "</li>";
        });
            
            
            document.getElementById('').innerHTML = table;
        } catch (error) {
            console.error('Error:', error);
        }
        let workspaces = await fetch(URL_BASE + '/workspaces', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
/// Delete a workspaces

    async function deleteWorkspace() {
        let data = {
            workspace: document.getElementById('workspaceName').value
        }
        console.log(data)
        
        let url_post = URL_BASE + '/workspaces/delete'
    
        try {
            const response = await fetch(url_post, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5500',
                    "Access-Control-Allow-Methods": "POST"
                },
                body: JSON.stringify(data)
            });
            const workspace = await response.json();
            document.getElementById('workspace-content').textContent = workspace.message;
        } catch (error) {
            console.error('Error:', error);
    }
    }