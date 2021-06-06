import React, { useState, useEffect }  from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

import { SITE_PAGES } from "../constants/links";
import { setToken, getToken } from "../util/jwt";

import './NavBar.css';

export default function NavBar({ adminState, loginState }) {
    const history = useHistory();

    const {isAdmin, setAdmin} = adminState;
    const {logIn, setLogIn} = loginState;

    const logoutHandler = () => {
        //TODO: clear the jwt from local storage
        setLogIn(false);
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
            <Navbar.Brand onClick={() => {history.push(SITE_PAGES.DASH);}} style={{"cursor" : "pointer", "color" : "#e6e6e6"}}>Elks.Code Reporting </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* This is just for testing */}
                    <Nav.Link onClick={() => {setLogIn(!logIn)}} style={{"color": "#e6e6e6"}}>Toggle</Nav.Link>

                    {
                        logIn ?
                        (
                            <>
                            <NavDropdown title="Visualizations" id="basic-nav-dropdown">
                                <Nav.Link onClick={() => {redirect(SITE_PAGES.DASH);}} style={{"color": "#000000"}}>Dashboard</Nav.Link>
                                <Nav.Link onClick={() => {redirect(SITE_PAGES.REPORT);}} style={{"color": "#000000"}}>Page Breakdown</Nav.Link>
                                <Nav.Link onClick={() => {redirect(SITE_PAGES.VIS3);}} style={{"color": "#000000"}}>Vis3</Nav.Link>
                            </NavDropdown>
                            <Nav.Link onClick={logoutHandler} style={{"color": "#e6e6e6"}}>Logout</Nav.Link>
                            </>
                        ) :
                        null
                    } 

                    { isAdmin ? (<Nav.Link onClick={() => {redirect(SITE_PAGES.ADMIN);}} style={{"color": "#e6e6e6"}}>Admin</Nav.Link>) : null }
                    <Nav.Link onClick={() => {console.log(getToken())}} style={{"color": "#e6e6e6"}}>ViewToken</Nav.Link> 
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
