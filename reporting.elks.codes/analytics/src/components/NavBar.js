import React, {useEffect}  from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

import { SITE_PAGES } from "../constants/links";
import { setToken } from "../util/jwt";
import ElksLogo from "../pages/images/android-chrome-192x192.png";
import '../css/NavBar.css';

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
            <Navbar.Brand onClick={() => {history.push(SITE_PAGES.DASH);}}>
                <img src={ElksLogo} className="nav-logo"/>
                &nbsp;
                Elks.Code Reporting 
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">

                    {
                        logIn ?
                        (
                            <>
                            {/* <NavDropdown title="Visualizations" id="basic-nav-dropdown">
                                <Nav.Link onClick={() => {redirect(SITE_PAGES.DASH);}} style={{"color": "#000000"}}>Dashboard</Nav.Link>
                                <Nav.Link onClick={() => {redirect(SITE_PAGES.REPORT);}} style={{"color": "#000000"}}>Activity Report</Nav.Link>
                                <Nav.Link onClick={() => {redirect(SITE_PAGES.VIS3);}} style={{"color": "#000000"}}>Vis3</Nav.Link>
                            </NavDropdown> */}
                            <Nav.Link onClick={() => {redirect(SITE_PAGES.DASH);}}>Dashboard</Nav.Link>
                            <Nav.Link onClick={() => {redirect(SITE_PAGES.REPORT);}}>Activity Report</Nav.Link>
                            { isAdmin ? (<Nav.Link onClick={() => {redirect(SITE_PAGES.ADMIN);}}>Admin</Nav.Link>) : null }
                            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                            </>
                        ) :
                        null
                    } 
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
