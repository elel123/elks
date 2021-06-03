import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

import { SITE_PAGES } from "../constants/links";
import { setToken, getToken } from "../util/jwt";


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


export default function AdminView({ adminState }) {
    const history = useHistory();
    const {isAdmin, setAdmin} = adminState

    const [users, setUsers] = useState([]);
    const [displayUsers, setDisplayUsers] = useState([]);

    const [editUser, setEditUser] = useState(false); 
    const [addUser, setAddUser] = useState(false); 

    const [currentUser, setCurrentUser] = useState({_id: "", email: "", password: "", isAdmin: false});

    // Functions to manage displaying of add/edit user dialog
    const handleOpenEditUser = (user) => { 
        setCurrentUser(user);
        setEditUser(true);
    }
    const handleCloseEditUser = (e) => { 
        setEditUser(false);
    }

    const handleOpenAddUser = () => { 
        setCurrentUser({_id: "", email: "", password: "", isAdmin: false});
        setAddUser(true);
    }
    const handleCloseAddUser = (e) => { 
        setAddUser(false);
    }


    const getAllUsers = () => {
        //Attempt to fetch the user data with the user's jwt
        //If successful, save in users 
        //Else redirect user to vis1 page
        fetch(`https://www.elks.codes/server/user?jwt=${getToken()}`, { 
            method: 'GET',
            headers:{
                'Accept': 'application/json'
            }
        })
        .then( async (data) => {
            if (data.status === 200) {
                let respData = await data.json();
                setUsers([...respData]);
                // console.log(JSON.stringify(respData));
            } else {
                console.log(data);
                alert("You do not have admin privileges.");
                // history.push(SITE_PAGES.VIS1);
            }

        })
        .catch((error) => {
            console.log(error);
            alert("You do not have admin privileges.");
            // history.push(SITE_PAGES.VIS1);
        }) 
    }

    const handleSubmitEditUser = (user) => { 
        // fetch(`http://127.0.0.1:9000/user`, { 
        fetch(`https://www.elks.codes/server/user`, { 
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                jwt: getToken(),
                _id: currentUser.id, 
                email: currentUser.email, 
                isAdmin: currentUser.isAdmin, 
                password: user.password === currentUser.password ? null : currentUser.password, 
            })
        })
        .then( async (data) => {
            // Upon successful update, get all users again 
            if(data.status === 200) { 
                console.log("update user succeeded");
                alert("User edit success");
                getAllUsers();
            }
            else { 
                alert("User edit failed, please try again later");
                console.log("update user failed");
            }
        })
        .catch((error) => {
            console.log(error);
            alert("User edit failed, please try again later");
        })

        setEditUser(false);

    }

    const handleSubmitAddUser = () => { 
        // fetch(`http://127.0.0.1:9000/user/register`, { 
        fetch(`https://www.elks.codes/server/user/register`, { 
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                jwt: getToken(),
                email: currentUser.email, 
                isAdmin: currentUser.isAdmin, 
                password: currentUser.password, 
            })
        })
        .then( async (data) => {
            // Upon successful adding, get all users again 
            if(data.status === 200) { 
                console.log("add user succeeded");
                alert("User successfully added");
                getAllUsers();
            }
            else { 
                alert("Add User failed, please try again later");
                console.log("add user failed");
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Add User failed, please try again later");
        })

        setAddUser(false);
    }

    const handleSubmitDeleteUser = (user) => { 
        // fetch(`http://127.0.0.1:9000/user/${user._id}?jwt=${getToken()}`, { 
        fetch(`https://www.elks.codes/server/${user._id}?jwt=${getToken()}`, { 
            method: 'GET',
        })
        .then( async (data) => {
            // Upon successful delete, get all users again 
            if(data.status === 200) { 
                console.log("user successfully deleted");
                alert("User successfully deleted");
                getAllUsers();
            }
            else { 
                alert("User deletion failed, please try again later");
                console.log("user deletion failed");
            }
        })
        .catch((error) => {
            console.log(error);
            alert("User deletion failed, please try again later");
        })

        setEditUser(false);
    }

    useEffect(() => {
        getAllUsers(); 
    }, []);



    useEffect(() => {
        

        let usersHTML = users.map((user) => {
            return (
                <li key={user._id}>
                    <div>
                        <p>Email: {user.email}</p>
                        <p>Hashed Password: {user.password}</p>
                        <p>Is Admin: {user.isAdmin ? "Yes" : "No"}</p>
                        <button onClick={() => {handleOpenEditUser(user)}}>Edit</button>
                        <button onClick={() => {handleSubmitDeleteUser(user)}}>Delete</button>
                        <Dialog maxWidth='xl' fullWidth={true} open={editUser} onClose={handleCloseEditUser} aria-labelledby="form-dialog-title" >
                            <DialogTitle id="edit-user-dialog-title">Edit User</DialogTitle>
                            <DialogContent>
                                <p> Leave Password blank if you do not wish to change it</p>
                                <span style={{"color": "gray"}}> <small>Email: &nbsp; </small></span>
                                <span> {currentUser.email} </span> 
                                <br></br>
                                <span style={{"color": "gray"}}> <small>Password: &nbsp; </small></span>
                                <TextField name="password" id="password" onChange={ e => setCurrentUser({ ...currentUser, password: e.target.value})}  value={currentUser.password}/>
                                <br></br>
                                <span style={{"color": "gray"}}> <small>Is Admin&nbsp; </small></span>
                                <Select
                                    value={currentUser.isAdmin}
                                    onChange={ e => setCurrentUser({ ...currentUser, isAdmin: e.target.value})}
                                    inputProps={{
                                        name: 'isAdmin',
                                        id: 'isAdmin', 
                                    }}
                                >
                                    <MenuItem value={false}>false</MenuItem>
                                    <MenuItem value={true}>true</MenuItem>
                                </Select>
                            </DialogContent>
                            <DialogActions> 
                                <Button onClick={handleCloseEditUser} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmitEditUser} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog maxWidth='xl' fullWidth={true} open={addUser} onClose={handleCloseAddUser} aria-labelledby="form-dialog-title" >
                            <DialogTitle id="add-user-dialog-title">Add User</DialogTitle>
                            <DialogContent>
                                <span style={{"color": "gray"}}> <small>Email: &nbsp; </small></span>
                                <TextField name="email" id="email" onChange={ e => setCurrentUser({ ...currentUser, email: e.target.value})}  value={currentUser.email}/>
                               
                                <br></br>
                                <span style={{"color": "gray"}}> <small>Password: &nbsp; </small></span>
                                <TextField name="password" id="password" onChange={ e => setCurrentUser({ ...currentUser, password: e.target.value})}  value={currentUser.password}/>

                                <br></br>
                                <span style={{"color": "gray"}}> <small>Is Admin&nbsp; </small></span>
                                <Select
                                    value={currentUser.isAdmin}
                                    onChange={ e => setCurrentUser({ ...currentUser, isAdmin: e.target.value})}
                                    inputProps={{
                                        name: 'isAdmin',
                                        id: 'isAdmin', 
                                    }}
                                >
                                    <MenuItem value={false}>false</MenuItem>
                                    <MenuItem value={true}>true</MenuItem>
                                </Select>
                            </DialogContent>
                            <DialogActions> 
                                <Button onClick={handleCloseAddUser} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmitAddUser} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>
                    
                    </div>
                </li>
            );
        });

        setDisplayUsers(usersHTML);

    }, [users, editUser, addUser, currentUser]);

    return (
        <div>
            <p>This is the Admin Page</p>
            <p>Users: </p>
            <button onClick={handleOpenAddUser}> Add User</button>
            <ul>{displayUsers}</ul>
        </div>
    );
}