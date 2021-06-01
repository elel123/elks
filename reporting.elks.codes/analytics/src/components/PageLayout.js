import React from "react";
import NavBar from "./NavBar";

export default function PageLayout({ children, adminState, loginState }) {
    return (
        <div>
            <NavBar loginState={loginState} adminState={adminState}/>
            {children}
        </div>
    );
}
