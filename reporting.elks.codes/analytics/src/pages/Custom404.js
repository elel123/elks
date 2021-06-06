import React from "react";
import { useHistory } from "react-router-dom";
import { SITE_PAGES } from "../constants/links";
import useWindowDimensions from "../util/windowDim.js";

import './Logout.css';
import elk from './images/android-chrome-512x512.png';

export default function Custom404() {
    const history = useHistory();
    const { height, width } = useWindowDimensions();
    return (
        <div className="contents" style={{"height" : `${height-60}px`}}>
            <div className="flier">
                <img src={elk} />
            </div>
            <div className="flier1">
                <img src={elk} />
            </div>
            <div className="display-contents">
                <h1>Oops. The page you requested was not found.</h1>
                <br></br>
                <button className="return-login-btn" onClick={() => {history.push(SITE_PAGES.LOGIN)}} >Return to login</button>
            </div>
        </div>
    );
}
