import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

import { SITE_PAGES } from "../constants/links";
import { setToken, getToken } from "../util/jwt";



export default function AdminView({ adminState }) {
    const history = useHistory();
    const {isAdmin, setAdmin} = adminState

    const [users, setUsers] = useState([]);
    const [displayUsers, setDisplayUsers] = useState([]);

    useEffect(() => {

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
                setUsers([...respData.users]);
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

    }, []);



    useEffect(() => {
        let usersHTML = users.map((user) => {
            return (
                <li id={user.id}>
                    <div>
                        <p>Email: {user.email}</p>
                        <p>Hashed Password: {user.password}</p>
                        <p>Is Admin: {user.isAdmin ? "Yes" : "No"}</p>
                        <button onClick={console.log("Edit request")}>Edit</button>
                    </div>
                </li>
            );
        });

        // console.log(users);

        setDisplayUsers(usersHTML);
    }, [users]);

    return (

        <div>
            <p>This is the Admin Page</p>
            <p>Users: </p>
            <ul>{displayUsers}</ul>
        </div>
    );
}