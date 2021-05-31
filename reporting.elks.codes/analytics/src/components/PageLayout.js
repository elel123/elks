import React from "react";
import NavBar from "./NavBar";

export default function PageLayout({ children, adminState }) {
    return (
        <div>
            <NavBar adminState={adminState}/>
            {children}
        </div>
    );
}
