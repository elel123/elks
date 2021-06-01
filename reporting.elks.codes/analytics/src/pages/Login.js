import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'; 
import { useHistory } from "react-router-dom";
import verifyToken from "../util/verifyToken";

import { SITE_PAGES } from "../constants/links";
import { setToken, getToken } from "../util/jwt";

import './Login.css'; 

async function loginUser(username, password, callback) { 
    // TODO replace url 
    console.log(`${username} ${password}`);
    fetch('https://www.elks.codes/server/user/login', { 
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {email : username, password})
    })
    .then( async (data) => {

        if (data.status === 200) {
            let respData = await data.json();
            callback(data, respData);
        } else {
            callback(null, null);
        }
    })
    .catch((error) => {
        console.log(error);
        callback(null, null);
    }) 
}

export default function Login({ adminState, loginState }) {
    const [username, setUserName] = useState(""); 
    const [password, setPassword] = useState(""); 

    const history = useHistory();

    const {isAdmin, setAdmin} = adminState;
    const {logIn, setLogIn} = loginState;

    useEffect(() => {
        //Check if the user is already logged in
        if (getToken() !== null) {
            console.log("we are here");
            /* TODO: Check if user's token is still valid by checking with the backend */
            verifyToken(getToken(), (success) => {
                if (success) {
                    // If token is valid --> redirect user to vis1
                    console.log("redirecting");
                    setLogIn(true);
                    history.push(SITE_PAGES.VIS1);
                } else {
                    // Else set the token to null and stay on this page
                    console.log("clearing input");
                    setLogIn(false);
                    setToken(null);
                    setAdmin(false);
                }
            });
        }

    }, []);


    const submitForm = async e => { 
        e.preventDefault(); 
        loginUser(username, password, (data, json) => {
            if (data == null) {
                alert("Login Failed. Please Try Again.");
                //Reset the username and pw fields
                setUserName("");
                setPassword("");
            } else {
                setToken(json.token);
                setLogIn(true);

                if (json.isAdmin) {
                    setAdmin(true);
                }

                history.push(SITE_PAGES.VIS1); //Redirect the user to the first data viz page
            }
        }); 
    }
    return (
        <div className='login-wrapper' style={{"marginTop" : "50px"}}>
            <h1> Log In </h1>
            <br></br>
            <form onSubmit = {submitForm}>
                <label>
                    <p>Username</p>
                    <input type="text" value={username} onChange={ e => setUserName(e.target.value)} />
                </label>
                <br></br> 
                <label>
                    <p>Password</p>
                    <input type="password" value={password} onChange={ e => setPassword(e.target.value)} />
                </label>
                <div>
                    <br></br>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </div>
    );
}

// Login.propTypes = {
//     tokenState: PropTypes.isRequired
// }