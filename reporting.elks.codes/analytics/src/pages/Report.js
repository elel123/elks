import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import verifyToken from "../util/verifyToken";
import { SITE_PAGES } from "../constants/links";
import { setToken, getToken, getAdminValFromToken } from "../util/jwt";

//import the zingchart library
import 'zingchart/es6';
import ZingChart from 'zingchart-react';

export default function Report({ adminState, loginState }) {
    const history = useHistory();
    const {isAdmin, setAdmin} = adminState;
    const {logIn, setLogIn} = loginState;

    const [data, setData] = useState({});
    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});


    const parseData = (data) => {
        // Filter out invalid data 
        let parsed = [];
        for (let page of data) {
            if (page.page === null || page.page === "" || page.page.indexOf("public_html") !== -1) {
                continue;
            }
            parsed.push([page.page, page.breakdown]);
        }


        // Rearrange data appropiately for ZingChart
        let seriesList = []; 
        for( let datum of parsed) { 
            let mySeries = []; 
            let activityCount = 0; 
            for( let b of datum[1]) { 
                let a = { 
                    values: [b.count], 
                    text: b._id
                } 
                mySeries.push(a);
                activityCount += b.count; 
            }
            seriesList.push([datum[0], mySeries, activityCount]);
        }

        setData({
            type: 'pie', 
            adjustLayout: true, 
            title: {
                text: `Activity Breakdown per Page at ${seriesList[0][0]}`,
                fontSize: 24,
            },
            legend: {
                draggable: true,
                x: "75%", 
                y: "15%",
            },
            plot: {
                "value-box": { 
                    "font-size": 15, 
                    "font-weight": "normal",
                    "placement": "out"
                },
                animation: {
                    effect: 'ANIMATION_EXPAND_VERTICAL',
                    method: 'ANIMATION_STRONG_EASE_OUT',
                    sequence: 'ANIMATION_BY_NODE',
                    speed: "ANIMATION_SLOW",
                }
            },
            series: seriesList[0][1]
        });

        setData1({
            type: 'pie', 
            adjustLayout: true, 
            title: {
                text: `Activity Breakdown per Page at ${seriesList[1][0]}`,
                fontSize: 24,
            },
            legend: {
                draggable: true,
                x: "75%", 
                y: "15%",
            },
            plot: {
                "value-box": { 
                    "font-size": 15, 
                    "font-weight": "normal",
                    "placement": "out"
                },
                animation: {
                    effect: 'ANIMATION_EXPAND_VERTICAL',
                    method: 'ANIMATION_STRONG_EASE_OUT',
                    sequence: 'ANIMATION_BY_NODE',
                    speed: "ANIMATION_SLOW",
                }
            },
            series: seriesList[1][1]
        });

        setData2({
            type: 'pie', 
            adjustLayout: true, 
            title: {
              text: `Activity Breakdown per Page at ${seriesList[2][0]}`,
              fontSize: 24,
            },
            legend: {
                draggable: true,
                x: "75%", 
                y: "15%",
            },
            plot: {
                "value-box": { 
                    "font-size": 15, 
                    "font-weight": "normal",
                    "placement": "out"
                },
                animation: {
                    effect: 'ANIMATION_EXPAND_VERTICAL',
                    method: 'ANIMATION_STRONG_EASE_OUT',
                    sequence: 'ANIMATION_BY_NODE',
                    speed: "ANIMATION_SLOW",
                }
            },
            series: seriesList[2][1]
        });
    }




    useEffect(() => {

        fetch(`https://www.elks.codes/server/api/activity/pagesbreakdown?jwt=${getToken()}`, { 
                method: 'GET',
                headers:{
                    'Accept': 'application/json'
                }
            })
            .then( async (data) => {

                if (data.status === 200) {
                    console.log("A");
                    setLogIn(true);
                    setAdmin(getAdminValFromToken());

                    let respData = await data.json();
                    parseData(respData);

                } else if(data.status === 403) {
                    //If token invalid, redirect to login
                    setLogIn(false);
                    setToken(null);
                    setAdmin(false);
                    history.push(SITE_PAGES.LOGIN);
                }
            })
            .catch((error) => {
                console.log(error.message)
            }) 

    }, []);
    


    return (
        <>
        <br></br>
        <div style={{"margin" : "0px 50px"}}>
            <h2 align="center">Activity Breakdown of the 3 Pages with the Most Activity</h2>
            <br></br>
            <ZingChart data={data} />
            <ZingChart data={data1} />
            <ZingChart data={data2} />
        </div>
        </>
    );
}
