import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import verifyToken from "../util/verifyToken";
import { SITE_PAGES } from "../constants/links";
import { setToken, getToken } from "../util/jwt";

export default function Vis3({ adminState }) {
    const history = useHistory();
    const {isAdmin, setAdmin} = adminState;

    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        verifyToken(getToken(), (success) => {
            if (success) {
                setVerifying(false);
            } else {
                //If token invalid, redirect to login
                setToken(null);
                setAdmin(false);
                history.push(SITE_PAGES.LOGIN);
            }
        });
    }, []);

    useEffect(() => {
        if (!verifying) {

            /* Proceed to fetch the data from the server to display on the page */
            console.log("Access Granted");

        }
    }, [verifying]);

    return (
        <div>
            <p> This is the Vis #3 Page </p>
        </div>
    );
}
