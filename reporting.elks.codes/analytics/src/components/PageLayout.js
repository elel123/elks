import React from "react";
import NavBar from "./NavBar";

export default function PageLayout({ children, tokenState }) {
    return (
        <div>
            <NavBar tokenState={tokenState}/>
            {children}
        </div>
    );
}
