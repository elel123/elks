import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { SITE_PAGES } from "../constants/links";

export default function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Elks.Code Reporting </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href={SITE_PAGES.VIS1}>Vis1</Nav.Link>
                    <Nav.Link href={SITE_PAGES.VIS2}>Vis2</Nav.Link>
                    <Nav.Link href={SITE_PAGES.VIS3}>Vis3</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
