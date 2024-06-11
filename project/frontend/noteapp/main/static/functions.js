/* author : Juan Zárate */
/* author : Angel Diaz */

let URL_BASE = "http://localhost:8080"

// Create a new workspace and at the time add a user to it and add a note
async function createWorkspacebtn(){
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
            const workspace = await response.json();
            document.getElementById('workspace-content').textContent = workspace.message;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function deleteUserfromWorkspace() {
    
    let userEmail = document.getElementById('userEmail').value;
    let workspaceId = localStorage.getItem('workspaceId');
    let url_post = URL_BASE + '/workspaces/deleteUser';

    try {
        const response = await fetch(url_post, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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
        const workspace = await response.json();
        document.getElementById('workspace-content').textContent = workspace.message;
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
        const workspace = await response.json();
        document.getElementById('workspace-content').textContent = workspace.message;
    } catch (error) {
        console.error('Error:', error);
}
}

async function deleteNoteFromWorkspace() {

    let noteId = localStorage.getItem('noteId');
    let workspaceId = localStorage.getItem('workspaceId');
    let url_post = URL_BASE + '/workspaces/deleteNote';

    try {
        const response = await fetch(url_post, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                note: {
                    id: noteId,
                    title: "string",
                    content: "string"
                  },
                workspace: {
                  id: workspaceId,
                  name: workspaceName,
                  creator: {},
                  list_users: [],
                  list_notes: []
                }
              })
        });
        const workspace = await response.json();
        document.getElementById('workspace-content').textContent = workspace.message;
    } catch (error) {
        console.error('Error:', error);
    }

}

async function viewNotes(event){
        event.preventDefault();
        let url_post = URL_BASE + '/workspace/viewNotes';
        
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
        data = await response.json();

        let table = "<table>";
        table += "<tr><th>Titulo</th><th>Nota</th><th>Editar</th><th>eliminar</th></tr>";

        data.forEach(note => {
            table += "<tr><td>" + note.title + "</td><td>" + note.content + "</td><td><button onclick='editNote()'>Editar</button></td><td><button onclick='deleteNotefromWorkspace()'>Eliminar</button></td></tr>";
        });
        table += "</table>";

        document.getElementById('workspace-content').innerHTML = table;

}

async function editNote() {
    let newTitle = document.getElementById('titleNote').value;
    let newContent = document.getElementById('noteText').value;
    let noteId = localStorage.getItem('noteId');
    let workspaceId = localStorage.getItem('workspaceId');
    let url_post = URL_BASE + '/workspaces/editNote';

    try {
        const response = await fetch(url_post, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                workspace: {
                  id: workspaceId,
                  name: workspaceName,
                  creator: {},
                  list_users: [],
                  list_notes: []
                },
                note: {
                    id: noteId,
                    title: newTitle,
                    content: newContent
                  },
                  note: {
                    id: noteId,
                    title: newTitle,
                    content: newContent
                  }
              })
        });
        const workspace = await response.json();
        document.getElementById('workspace-content').textContent = workspace.message;
    }
    catch (error) {
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
   