import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'; 
import { useHistory } from "react-router-dom";

import { SITE_PAGES } from "../constants/links";

import './Login.css'; 

async function loginUser(username, password, callback) { 
    // TODO replace url 
    fetch('elks.codes', { 
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {username, password})
    })
    .then( async (data) => {
        let respData = await data.json();

        callback(data, respData);
        //setToken(respData['token'])
        // TODO extract token and save
    })
    .catch((error) => {
        callback(null, null);
    }) 
}

export default function Login({ tokenState }) {
    const [username, setUserName] = useState(); 
    const [password, setPassword] = useState(); 

    const history = useHistory();

    let {token, setToken} = tokenState;

    useEffect(() => {

        //Check if the user is already logged in
        if (token != null) {
            /* TODO: Check if user's token is still valid by checking with the backend */

            // If token is valid --> redirect user to vis1

            // Else set the token to null and stay on this page
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
                setToken('set token to be whereever it can be found in the json');
                history.push(SITE_PAGES.VIS1); //Redirect the user to the first data viz page
            }
        }); 
    }
    return (
        <div className='login-wrapper'>
            <h1> Log In </h1>
            <form onSubmit = {submitForm}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={ e => setUserName(e.target.value)} />
                </label>
                <br></br> 
                <label>
                    <p>Password</p>
                    <input type="password" onChange={ e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}