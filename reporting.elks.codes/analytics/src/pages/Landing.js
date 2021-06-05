import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

import { SITE_PAGES } from "../constants/links";

import './Landing.css';
import elk from './images/android-chrome-512x512.png';

export default function Landing() {
    const history = useHistory();
    return (
        <div style={{"text-align" : "center"}}>
            <img 
                src={elk} 
                style={{
                    "marginTop" : "30px", 
                    "marginBottom" : "20px",
                    "width" : "450px",
                    "height" : "450px"
                }}
            />
            <p style={{"fontSize" : "larger", "fontWeight" : "500"}}> Welcome To The Data Analytics Center of elks.codes! </p>
            <button className="enter-btn" onClick={() => {history.push(SITE_PAGES.LOGIN)}}>Enter</button>
        </div>
    );
}


