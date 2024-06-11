/* author : Juan Zárate */

let URL_BASE = "http://localhost:8080"

// Create a new workspace and at the time add a user to it and add a note
async function createWorkspacebtn(event){
    let crateworkspaceform = "<div class='option1'>";
    crateworkspaceform += "<label for='workspaceName'>Nombre del Workspace:</label>";
    crateworkspaceform += "<input type='text' id='workspaceName' placeholder='Nombre del workspace'>";
    crateworkspaceform += "<button id='createWorkspaceBtn' onclick='createWorkspace()'>Crear Workspace</button></div>";

    document.getElementById('workspace-content').innerHTML = crateworkspaceform;

}

async function createWorkspace() {
    let workspaceName = document.getElementById('workspaceName').value;
    let userId = localStorage.getItem('userId');
    let userName = localStorage.getItem('userName');

    let url_post = URL_BASE + '/createWorkspace';

    response = await fetch(url_post, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify({
                id: 0,
                name: workspaceName,
                "creator": { 
                    "id": userId,
                    "name": userName
                  },
                "list_users": [],
                "list_notes": []
        })
    });

}

    async function deleteWorkspace(event){
        event.preventDefault();
        let url_post = URL_BASE + '/deleteWorkspace';

        let workspaceId = localStorage.getItem('workspaceId');

        response = await fetch(url_post, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify({
                id: workspaceId,
                name: "",
                creator: {},
                list_users: [
                    "string"
                ],
                list_notes: [
                    "string"
                ]
            })
        });
    
    }




    async function addnote() {
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
        let userEmail = document.getElementById('userEmail').value;
        let workspaceId = localStorage.getItem('workspaceId');
        let url_post = URL_BASE + '/workspaces/add-user';

        try {
            const response = await fetch(url_post, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5500',
                    "Access-Control-Allow-Methods": "POST"
                },
                body: JSON.stringify({
                    workspace: {
                      id: workspaceId,
                      name: workspaceName,
                      creator: {},
                      list_users: [],
                      list_notes: []
                    },
                    user: {
                      id: userId,
                      name: userName,
                      email: "string",
                      password: "string",
                      list_workspaces: [
                        {}
                      ]
                    }
                  })
            });
            const result = await response.json();
            document.getElementById('result').textContent = result.message;
        } catch (error) {
            console.error('Error:', error);
        }
    }

async function addNoteToWorkspace() {
    let data = {
        note: {
          id: 0,
          title: Document.getElementById('titleNote').value,
          content: Document.getElementById('noteText').value
        },
        workspace: {
          id: workspaceId,
          name: workspaceName,
          creator: {},
          list_users: [
            "string"
          ],
          "list_notes": [
            "string"
          ]
        }
      }
    
    let url_post = URL_BASE + '/workspaces/addNote'

    try {
        const response = await fetch(url_post, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        document.getElementById('result').textContent = result.message;
    } catch (error) {
        console.error('Error:', error);
}
}

 async function viewWorkspaces(event){
    event.preventDefault();
    let url_post = URL_BASE + '/viewWorkspaces';

    let userId = localStorage.getItem('userId');
    let userName = localStorage.getItem('userName');

    response = await fetch(url_post, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify({
            id: userId,
            name: userName,
            email: "",
            password: "",
            list_workspaces: []
        })
    });
    data = await response.json();
    let table = "<table>";
    table += "<tr><th>Workspace</th><th>acceder</th></tr>";

    data.forEach(workspace => {
        table += "<tr><td>" + workspace.name + "</td><td><button onclick='viewNotes'>Acceder</button></td></tr>";
    });
    table += "</table>";

    document.getElementById('workspace-content').innerHTML = table;

 }
   