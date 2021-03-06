import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

import { SITE_PAGES } from "../constants/links";
import { setToken, getToken, getAdminValFromToken } from "../util/jwt";


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './AdminView.css';
import pencil from './images/small-pencil.png';
import trash from './images/small-trash.png';

export default function AdminView({ adminState, loginState }) {
    const history = useHistory();
    const {isAdmin, setAdmin} = adminState;
    const {logIn, setLogIn} = loginState;

    const [loading, setLoading] = useState(true);

    const [users, setUsers] = useState([]);
    const [displayUsers, setDisplayUsers] = useState([]);

    const [editUser, setEditUser] = useState(false); 
    const [addUser, setAddUser] = useState(false); 
    const [deleteUser, setDeleteUser] = useState(false); 


    const [currentUser, setCurrentUser] = useState({_id: "", email: "", password: "", isAdmin: false});

    // Functions to manage displaying of add/edit/delete user dialog
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

    const handleOpenDeleteUser = (user) => { 
        setCurrentUser(user);
        setDeleteUser(true);
    }
    const handleCloseDeleteUser = (e) => { 
        setDeleteUser(false);
    }


    const getAllUsers = () => {
        //Attempt to fetch the user data with the user's jwt
        //If successful, save in users 
        //Else redirect user to dashboard page
        fetch(`https://www.elks.codes/server/user?jwt=${getToken()}`, { 
            method: 'GET',
            headers:{
                'Accept': 'application/json'
            }
        })
        .then( async (data) => {
            if (data.status === 200) {
                let respData = await data.json();

                setLogIn(true);
                setAdmin(getAdminValFromToken());
                setLoading(false);
                setUsers([...respData]);
                // console.log(JSON.stringify(respData));
            } else {
                console.log(data);
                alert("You do not have admin privileges.");
                history.push(SITE_PAGES.DASH);
            }

        })
        .catch((error) => {
            console.log(error);
            alert("You do not have admin privileges.");
            history.push(SITE_PAGES.DASH);
        }) 
    }

    const handleSubmitEditUser = (user) => { 
        // fetch(`http://127.0.0.1:9000/user`, { 
        fetch(`https://www.elks.codes/server/user`, { 
            method: 'POST',
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
            else if( data.status === 409) { 
                console.log("HERE");
                alert("User with this email already exists");
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
        fetch(`https://www.elks.codes/server/user/${user._id}?jwt=${getToken()}`, { 
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

        setDeleteUser(false);
    }

    useEffect(() => {
        getAllUsers(); 
    }, []);



    useEffect(() => {
        

        let usersHTML = users.map((user) => {
            return (
                <li key={user._id} className="list-item">
                    <div>
                        <div className="info">
                            <p><b>Email:</b> {user.email}</p>
                            <p><b>Hashed Password:</b> {user.password}</p>
                            <p><b>Is Admin:</b> {user.isAdmin ? "Yes" : "No"}</p>
                        </div>
                        <div className="icons">
                            <img src={pencil} onClick={() => {handleOpenEditUser(user)}} style={{"cursor" : "pointer", "width" : "30px", "height" : "30px"}}/>
                            <img src={trash} onClick={() => {handleOpenDeleteUser(user)}} style={{"cursor" : "pointer", "width" : "30px", "height" : "30px"}}/>
                        </div>
                        <Dialog maxWidth='xl' fullWidth={true} open={editUser} onClose={handleCloseEditUser} aria-labelledby="form-dialog-title" >
                            <DialogTitle id="edit-user-dialog-title">Edit User</DialogTitle>
                            <DialogContent>
                                <p> Leave Password untouched if you do not wish to change it. </p>
                                <p> If you wish to change the password, please type in the unhashed password. </p>
                                <span style={{"color": "gray"}}> <small>Email: &nbsp; </small></span>
                                <span> {currentUser.email} </span> 
                                <br></br>
                                <br></br>
                                <span style={{"color": "gray"}}> <small>Password: &nbsp; </small></span>
                                <TextField name="password" id="password" onChange={ e => setCurrentUser({ ...currentUser, password: e.target.value})}  value={currentUser.password}/>
                                <br></br>
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
                                    <MenuItem value={false}>No</MenuItem>
                                    <MenuItem value={true}>Yes</MenuItem>
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
                                <br></br>
                                <span style={{"color": "gray"}}> <small>Password: &nbsp; </small></span>
                                <TextField name="password" id="password" onChange={ e => setCurrentUser({ ...currentUser, password: e.target.value})}  value={currentUser.password}/>
                                <br></br>
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
                                    <MenuItem value={false}>No</MenuItem>
                                    <MenuItem value={true}>Yes</MenuItem>
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
                        <Dialog maxWidth='xl' fullWidth={true} open={deleteUser} onClose={handleCloseDeleteUser} aria-labelledby="form-dialog-title" >
                            <DialogTitle id="add-user-dialog-title">Confirm User Deletion</DialogTitle>
                            <DialogContent>
                                <span style={{"color": "gray"}}> <small>Email: &nbsp; </small></span>
                                <span> {currentUser.email }</span>
                                <br></br>

                                <span style={{"color": "gray"}}> <small>Password: &nbsp; </small></span>
                                <span> {currentUser.password }</span>
                                <br></br>

                                <span style={{"color": "gray"}}> <small>Is Admin&nbsp; </small></span>
                                <span> {currentUser.isAdmin ? "Yes" : "No" }</span>
                            </DialogContent>
                            <DialogActions> 
                                <Button onClick={handleCloseDeleteUser} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={ () => { handleSubmitDeleteUser(user) }} color="primary">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
             
                    </div>
                </li>
            );
        });

        setDisplayUsers(usersHTML);

    }, [users, editUser, addUser, deleteUser, currentUser]);

    return (
        <div className="top-div">
            { loading ? (
                <div style={{"textAlign" : "center", "fontSize" : "x-large"}}>
                    <br></br>
                    <p>Loading...</p>
                </div>
            ) :
            (
                <button className="addBtn" onClick={handleOpenAddUser}>+</button>
            )
            }
            <ul className="user-list">{displayUsers}</ul>
        </div>
    );
}