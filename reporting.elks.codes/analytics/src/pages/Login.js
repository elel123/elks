import React, {useState} from "react";
import PropTypes from 'prop-types'; 

import './Login.css'; 

async function loginUser(username, password) { 
    // TODO replace url 
    return fetch('elks.codes', { 
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {username, password})
    })
    .then( data => {
        let respData = data.json();
        //setToken(respData['token'])
        // TODO extract token and save
    }) 
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState(); 
    const [password, setPassword] = useState(); 


    const submitForm = async e => { 
        e.preventDefault(); 
        const token = await loginUser(username, password); 
        setToken(token); 
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