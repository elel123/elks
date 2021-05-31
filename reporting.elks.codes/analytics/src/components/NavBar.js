import React, { useState, useEffect }  from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

import { SITE_PAGES } from "../constants/links";
import { setToken, getToken } from "../util/jwt";

export default function NavBar({ adminState }) {
    const history = useHistory();

    const {isAdmin, setAdmin} = adminState;

    const logoutHandler = () => {
        //TODO: clear the jwt from local storage
        setToken(null);
        setAdmin(false);
        //Redirect to logout page
        history.push(SITE_PAGES.LOGOUT);
    }

    const redirect = (route) => {        
        //Redirect user to their desired page
        history.push(route);
    }

    

    return (
        <Navbar className="bg-secondary" expand="lg">
            <Navbar.Brand onClick={() => {history.push(SITE_PAGES.VIS1);}} style={{"cursor" : "pointer", "color" : "#e6e6e6"}}>Elks.Code Reporting </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* This is just for testing */}
                    <Nav.Link onClick={() => {setAdmin(!isAdmin)}} style={{"color": "#e6e6e6"}}>Toggle</Nav.Link> 
                    <Nav.Link onClick={() => {redirect(SITE_PAGES.VIS1);}} style={{"color": "#e6e6e6"}}>Vis1</Nav.Link>
                    <Nav.Link onClick={() => {redirect(SITE_PAGES.VIS2);}} style={{"color": "#e6e6e6"}}>Vis2</Nav.Link>
                    <Nav.Link onClick={() => {redirect(SITE_PAGES.VIS3);}} style={{"color": "#e6e6e6"}}>Vis3</Nav.Link>
                    <Nav.Link onClick={logoutHandler} style={{"color": "#e6e6e6"}}>Logout</Nav.Link>

                    { isAdmin ? (<Nav.Link onClick={() => {redirect(SITE_PAGES.ADMIN);}} style={{"color": "#e6e6e6"}}>Admin</Nav.Link>) : null }
                    <Nav.Link onClick={() => {console.log(getToken())}} style={{"color": "#e6e6e6"}}>ViewToken</Nav.Link> 
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
