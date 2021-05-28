import React, { useState, useEffect }  from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

import { SITE_PAGES } from "../constants/links";

export default function NavBar({ tokenState }) {
    const history = useHistory();
    const [logIn, setLogIn] = useState(false); 

    let {token, setToken} = tokenState;

    const logoutHandler = () => {
        //TODO: clear the jwt from local storage
        setToken(null);
        //Redirect to logout page
        history.push(SITE_PAGES.LOGOUT);
    }

    const redirect = (route) => {
        /* TODO: Check if user's token is still valid by checking with the backend 
            If not valid, send a message to the broswer and redirect user to the login page
        */

        //Else redirect user to their desired page
        history.push(route);
    }

    useEffect(() => {

        if (token == null) {
            setLogIn(false);
            history.push(SITE_PAGES.LOGIN);
        } else {
            setLogIn(true);
        }

    }, []);

    const displayNavContents = () => {
        if (logIn) {
            return (
                <>
                <Nav.Link onClick={() => {redirect(SITE_PAGES.VIS1);}}>Vis1</Nav.Link>
                <Nav.Link onClick={() => {redirect(SITE_PAGES.VIS2);}}>Vis2</Nav.Link>
                <Nav.Link onClick={() => {redirect(SITE_PAGES.VIS3);}}>Vis3</Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </>
            );
        } else {
            return null
        }
    }
    

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand onClick={() => {history.push(SITE_PAGES.VIS1);}} style={{"cursor" : "pointer"}}>Elks.Code Reporting </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* This is just for testing */}
                    <Nav.Link onClick={() => {setLogIn(!logIn)}}>Toggle</Nav.Link> 
                    { displayNavContents() }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
