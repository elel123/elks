import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import verifyToken from "../util/verifyToken";
import { SITE_PAGES } from "../constants/links";
import { setToken, getToken, getAdminValFromToken } from "../util/jwt";

//import the zingchart library
import 'zingchart/es6';
import ZingChart from 'zingchart-react';


export default function Vis1({ adminState, loginState }) {
    const history = useHistory();
    const {isAdmin, setAdmin} = adminState;
    const {logIn, setLogIn} = loginState;

    const [data, setData] = useState({});

    const parseData = (data) => {
        let parsed = [];
        for (let page of data) {
            if (page._id === null || page._id === "" || page._id.indexOf("public_html") !== -1) {
                continue;
            }
            parsed.push([page._id, page.count]);
        }

        parsed.sort((a, b) => {return b[1] - a[1]});

        let topLabels = parsed.slice(0, 5).map(entry => entry[0]);
        let topValues = parsed.slice(0, 5).map(entry => entry[1]);

        
        setData({
            type: 'bar', 
            width: "100%",
            adjustLayout: true, 
            plotarea: { 
                margin: 'dynamic',
                marginTop: 70
            },
            title: {
              text: 'Activity Per Page On elks.codes',
              fontSize: 24,
            },
            legend: {
              draggable: true,
            },
            scaleX: {
              // Set scale label
              label: { text: 'Page' },
              // Convert text on scale indices
              labels: topLabels
            },
            scaleY: {
              // Scale label with unicode character
              label: { text: 'Number of Activity' }
            },
            plot: {
              // Animation docs here:
              // https://www.zingchart.com/docs/tutorials/styling/animation#effect
              animation: {
                effect: 'ANIMATION_EXPAND_BOTTOM',
                method: 'ANIMATION_STRONG_EASE_OUT',
                sequence: 'ANIMATION_BY_NODE',
                speed: 275,
              }
            },
            series: [
              {
                // Plot 1 values, linear data
                values: topValues,
                text: "Number of Activity"
              }
            ]
        })
    }

    useEffect(() => {

        fetch(`https://www.elks.codes/server/api/activity/pages?jwt=${getToken()}`, { 
                method: 'GET',
                headers:{
                    'Accept': 'application/json'
                }
            })
            .then( async (data) => {

                if (data.status === 200) {

                    setLogIn(true);
                    setAdmin(getAdminValFromToken());

                    let respData = await data.json();
                    parseData(respData);

                } else {
                    //If token invalid, redirect to login
                    setLogIn(false);
                    setToken(null);
                    setAdmin(false);
                    history.push(SITE_PAGES.LOGIN);
                }

            })
            .catch((error) => {
                //If token invalid, redirect to login
                setLogIn(false);
                setToken(null);
                setAdmin(false);
                history.push(SITE_PAGES.LOGIN);
            }) 

    }, []);


    return (
        <>
        <br></br>
        <br></br>
        <div style={{"margin" : "0px 50px"}}>
            <ZingChart data={data} />
        </div>
        

        </>
    );
}
