import React from "react";
import { useHistory } from "react-router-dom";
import { SITE_PAGES } from "../constants/links";

export default function Logout() {
    const history = useHistory();
    return (
        <div>
            <p> This is the Logout Page </p>
            <p onClick={() => {history.push(SITE_PAGES.LOGIN)}} style={{"color" : "blue", "cursor" : "pointer"}}><u>Return to login</u></p>
        </div>
    );
}
