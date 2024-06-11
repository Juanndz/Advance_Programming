/* author : Juan Zárate */
/* author : Angel Diaz */

let URL_BASE = "http://localhost:8080";


// Create a new workspace and at the time add a user to it and add a note
async function createWorkspaceForm(){
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

    try {
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
    alert("Workspace creado exitosamente");
    } catch (error) {
    console.error('Error:', error);
    alert("error al crear el workspace");
    }
}

    async function deleteWorkspace(workspaceId){
        w_id = workspaceId

        console.log(w_id);

        let url_post = URL_BASE + '/deleteWorkspace';
        let sure = confirm("¿Estás seguro de que deseas eliminar este workspace?");

        if(sure){
        response = await fetch(url_post, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify({
                id: w_id,
                name: "",
                creator: {},
                list_users: [""],
                list_notes: [""]
              })
        });
        }
    }

    async function addnote() {
        let userOptions = "<div class='option1'>";
                /*userOptions += "<label for='userEmail'>Agregar Usuario (Correo):</label>";
                userOptions += "<input type='email' id='userEmail' placeholder='Correo del usuario'>";
                userOptions += "<button id='addUserBtn' onclick='addUserToWorkspace()'>Agregar Usuario</button> </div>";
                userOptions += "<div class='option2'>";*/
                userOptions += "<label for='noteText'>Agregar Nota:</label>";
                userOptions += "<textarea id='titleNote' placeholder='Escribe el título de tu nota'></textarea>";
                userOptions += "<textarea id='noteText' placeholder='Escribe tu nota aquí'></textarea>";
                userOptions += "<button id='addNoteBtn' onclick='addNoteToWorkspace()'>Agregar Nota</button></div>";

                document.getElementById('notes-content').innerHTML = userOptions;
    }
// Add a user to the workspace
    async function addUserToWorkspace() {
        let userId = document.getElementById('userid').value;
        let userName = document.getElementById('username').value;
        let workspaceId = localStorage.getItem('workspaceId');
        let url_post = URL_BASE + '/workspace/addUser';

        try {
            const response = await fetch(url_post, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5500',
                    "Access-Control-Allow-Methods": "POST"
                },
                body: JSON.stringify({
                    workspace: {
                      id: workspaceId,
                      name: "",
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

    async function deleteUserfromWorkspace(userId) {
    
    let workspaceId = localStorage.getItem('workspaceId');
    let url_post = URL_BASE + '/workspace/removeUser';
    

    let sure = confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if(sure){
    try {
        const response = await fetch(url_post, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                workspace: {
                  id: workspaceId,
                  name: "",
                  creator: {},
                  list_users: [],
                  list_notes: []
                },
                user: {
                  id: userId,
                  name: "",
                  email: "",
                  password: "",
                  list_workspaces: [
                    {}
                  ]
                }
              })
        });
        alert("Usuario eliminado exitosamente");
    } catch (error) {
        console.error('Error:', error);
    
       }   }
}

async function addNoteToWorkspace() {

    titleNote = document.getElementById('titleNote').value;
    noteText = document.getElementById('noteText').value;
    w_id = localStorage.getItem('workspaceId');

    console.log(titleNote);
    console.log(noteText);
    console.log(w_id);

    let url_post = URL_BASE + '/workspace/createNote'

    try {
        const response = await fetch(url_post, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                note: {
                  id: 0,
                  title: titleNote,
                  content: noteText,
                },
                workspace: {
                  id: w_id,
                  name: "name",
                  creator: {},
                  list_users: [
                    "string"
                  ],
                  "list_notes": [
                    "string"
                  ]
                }
              })
        });
        alert("Nota agregada exitosamente");
    } catch (error) {
        console.error('Error:', error);
}
}

async function deleteNoteFromWorkspace(noteId, noteTitle) {

    let workspaceId = localStorage.getItem('workspaceId');
    let url_post = URL_BASE + '/workspace/deleteNote';
    let sure = confirm("¿Estás seguro de que deseas eliminar esta nota?");

    if(sure){
    try {
        const response = await fetch(url_post, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                note: {
                    id: noteId,
                    title: noteTitle,
                    content: "string"
                  },
                workspace: {
                  id: workspaceId,
                  name: "",
                  creator: {},
                  list_users: [],
                  list_notes: []
                }
              })
        });
        alert("Nota eliminada exitosamente");
    } catch (error) {
        console.error('Error:', error);
    }
    }

}

async function viewNotes(){
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
        console.log(data);

        let table = "<table>";
        table += "<tr><th>Titulo</th><th>Editar</th><th>eliminar</th></tr>";

        data.forEach(note => {
            table += "<tr><td>" + note.title + "</td><td><button onclick='editNoteForm("+ note.id + ", `" + note.title + "` )'>Editar</button></td><td><button onclick='deleteNoteFromWorkspace("+ note.id + ", `" + note.title + "` )'>Eliminar</button></td></tr>";
        });
        table += "</table>";

        document.getElementById('notes-content').innerHTML = table;

}

async function editNoteForm(noteId, noteTitle){

    let request = await fetch(URL_BASE + '/workspace/viewNote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: noteId,
            title: noteTitle,
            content: ""
        }
        )});

    let note = await request.json();

    let userOptions = "<label for='noteText'>Editar Nota:</label><br>";
    userOptions += "<textarea id='titleNote' ></textarea><br>";
    userOptions += "<textarea id='noteText' ></textarea><br>";
    userOptions += "<button id='addNoteBtn' onclick='editNote("+ note.id + ", `" + note.title + "` )'>Agregar Nota</button></div>";

    document.getElementById('notes-content').innerHTML = userOptions;
    document.getElementById('titleNote').value = noteTitle;
    document.getElementById('noteText').value = note.content;
}

async function editNote(noteId, noteTitle) {
    let newTitle = document.getElementById('titleNote').value;
    let newContent = document.getElementById('noteText').value;
    let workspaceId = localStorage.getItem('workspaceId');
    let url_post = URL_BASE + '/workspace/editNote';

    try {
        const response = await fetch(url_post, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                workspace: {
                  id: workspaceId,
                  name: "",
                  creator: {},
                  list_users: [],
                  list_notes: []
                },
                note: {
                    id: noteId,
                    title: noteTitle,
                    content: ""
                  },
                new_note: {
                    id: noteId,
                    title: newTitle,
                    content: newContent
                }
              })
        });
        alert("Nota editada exitosamente");
    }
    catch (error) {
        console.error('Error:', error);
    }

}

 async function viewWorkspaces(){
    let url_post = URL_BASE + '/user/viewWorkspaces';

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

    console.log(data);

    let table = "<table>";
    table += "<tr><th>Workspace</th><th>acceder</th></tr><tr><th>eliminar</th></tr>";

    data.forEach(workspace => {
        table += "<tr><td>" + workspace.name + "</td><td><button onclick='accessworkspace("+ workspace.id +")'>Acceder</button></td></tr><td><button onclick='deleteWorkspace("+ workspace.id +")'>Eliminar</button></td></tr>";
    });
    table += "</table>";

    document.getElementById('workspace-content').innerHTML = table;

 }
  async function accessworkspace(id){
    localStorage.setItem('workspaceId', id);
    
           workspaceOptions = "<div class='option1'>";
           workspaceOptions += "<button id='administrateUsers' onclick='manageUsers()'>Administrar Usuarios</button>"; 
           workspaceOptions += "<button id='administrateNotes' onclick='manageNotes()'>Administrar Notas</button></div>";
              document.getElementById('workspace-content').innerHTML = workspaceOptions;   
  }

  async function manageUsers(){ // TODO : implement this function
    let userOptions = "<div class='option1'>";
    userOptions += "<button id='addUserBtn' onclick='addUserform()'>Agregar Usuario</button><br>";
    userOptions += "<button id='viewUsersBtn' onclick='viewUsers()'>Ver Usuarios</button></div>";

    document.getElementById('workspace-content').innerHTML = userOptions;
}

async function addUserform(){
    let userOptions = "<div class='option1'>";
    userOptions += "<label for='userl'>Id Usuario:</label><br>";
    userOptions += "<input type='number' id='userid' placeholder='id del usuario'><br><br>";
    userOptions += "<label for='username'>Nombre del Usuario:</label><br>";
    userOptions += "<input type='text' id='username' placeholder='Nombre del usuario'><br><br>";
    userOptions += "<button id='addUserBtn' onclick='addUserToWorkspace()'>Agregar Usuario</button></div>";
    document.getElementById('workspace-content').innerHTML = userOptions;


}

async function viewUsers(){
    let url_post = URL_BASE + '/workspace/viewUsers';

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
    console.log(data);

    let table = "<table>";
    table += "<tr><th>Nombre</th><th>Eliminar</th></tr>";

    data.forEach(user => {
        table += "<tr><td>" + user.name + "</td><td><button onclick='deleteUserfromWorkspace("+ user.id + ")'>Eliminar</button></td></tr>";
    });
    table += "</table>";

    document.getElementById('workspace-content').innerHTML = table;

}

async function manageNotes(){ 
    let noteOptions = "<div id ='notes-content'>";
    noteOptions += "<button id='addNoteBtn' onclick='addnote()'>Agregar Nota</button><br>";
    noteOptions += "<button id='viewNotesBtn' onclick='viewNotes()'>Ver Notas</button></div>";
    noteOptions += "</div>";

    document.getElementById('workspace-content').innerHTML = noteOptions;

}

 async function logout(){
    localStorage.clear();
    window.location.href =  'http://127.0.0.1:8000/login';
 }