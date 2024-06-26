from core.user import User
from core.note import Note
from core.workspace import Workspace
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# author: Angel Diaz

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- USER ----------------


@app.post("/login")
def login(user: User):
    """this service is used to login the user"""
    return User.login(user.name, user.email, user.password)


@app.post("/register")
def register(user: User):
    """this service is used to register the user"""
    User.register(user.name, user.email, user.password)


@app.delete("/user/deleteWorkspace")
def remove_workspace(user: User, workspace: Workspace):
    """this service is used to remove a workspace from the user"""
    user.remove_workspace(workspace)


@app.post("/user/viewWorkspaces")
def view_workspaces(user: User):
    """this service is used to view all the workspaces of the user"""
    return user.view_workspaces()


# ---------------- WORKSPACE ----------------#


@app.post("/createWorkspace")
def create_workspace(workspace: Workspace):
    """this service is used to create a workspace"""
    w_id = Workspace.create_workspace(workspace.name, workspace.creator)

    print(w_id)

    user = User(
        id=workspace.creator["id"],
        name=workspace.creator["name"],
        email="",
        password="",
        list_workspaces=[],
    )
    workspace.id = w_id
    print(workspace, workspace.id)
    user.add_workspace(user, workspace)
    return "Workspace created successfully"


@app.delete("/deleteWorkspace")
def remove_workspace(workspace: Workspace):
    """this service is used to delete a workspace"""
    userslist = workspace.view_users()
    for user in userslist:
        user_ = User(
            id=user["id"],
            name=user["name"],
            email="",
            password="",
            list_workspaces=[],
        )
        user_.remove_workspace(workspace)
    Workspace.delete_workspace(workspace)


# ---------------- edit workspace ----------------#

# --------- User ---------#


@app.put("/workspace/addUser")
def add_user(workspace: Workspace, user: User):
    """this service is used to add a user to the workspace"""
    Workspace.add_user(workspace, user)
    user.add_workspace(user, workspace)


@app.put("/workspace/removeUser")
def remove_user(workspace: Workspace, user: User):
    """this service is used to remove a user from the workspace"""
    workspace.remove_user(user)
    user.remove_workspace(workspace)


@app.post("/workspace/viewUsers")
def view_users(workspace: Workspace):
    """this service is used to view all the users in the workspace"""
    return workspace.view_users()


# ----------- Note -----------


@app.post("/workspace/createNote")
def create_note(note: Note, workspace: Workspace):
    """this service is used to create a note"""
    Workspace.create_note(workspace, note)


@app.delete("/workspace/deleteNote")
def delete_note(note: Note, workspace: Workspace):
    """this service is used to delete a note"""
    Workspace.delete_note(workspace, note)


@app.post("/workspace/viewNotes")
def view_notes(workspace: Workspace):
    """this service is used to view all the notes in the workspace"""
    return workspace.view_notes()


@app.post("/workspace/viewNote")
def view_note(note: Note):
    """this service is used to view a note"""
    return note.view_note()


@app.put("/workspace/editNote")
def edit_note(workspace: Workspace, note: Note, new_note: Note):
    """this service is used to edit a note"""
    workspace.edit_note(note, new_note)


# ----------------- RUN -----------------

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)