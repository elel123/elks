import React from "react";
import NavBar from "./NavBar";

export default function PageLayout({ children }) {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    );
}
