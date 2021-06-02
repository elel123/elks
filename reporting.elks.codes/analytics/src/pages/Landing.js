import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

import { SITE_PAGES } from "../constants/links";

export default function Landing() {
    const history = useHistory();
    return (
        <div>
            <p> This is the Landing Page! Welcome!!! :) </p>
            <p onClick={() => {history.push(SITE_PAGES.LOGIN)}} style={{"color" : "blue", "cursor" : "pointer"}}><u>Return to login</u></p>
        </div>
    );
}
