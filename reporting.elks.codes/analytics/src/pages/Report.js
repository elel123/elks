import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import verifyToken from "../util/verifyToken";
import { SITE_PAGES } from "../constants/links";
import { setToken, getToken, getAdminValFromToken } from "../util/jwt";
import ActivityPerPageGrid from "../components/ActivityPerPageGrid"; 

//import the zingchart library
import 'zingchart/es6';
import ZingChart from 'zingchart-react';

import './Report.css';

export default function Report({ adminState, loginState }) {
    const history = useHistory();
    const {isAdmin, setAdmin} = adminState;
    const {logIn, setLogIn} = loginState;

    const [barData, setBarData] = useState({});

    const [pieData, setPieData] = useState({});
    const [pieData1, setPieData1] = useState({});
    const [pieData2, setPieData2] = useState({});
    const [pieChartNames, setPieChartNames] = useState([]);
    const [pieOption, setPieOption] = useState('A');


    const parsePageBreakdownData = (data) => {
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

        setPieChartNames([seriesList[0][0], seriesList[1][0], seriesList[2][0]]);

        setPieData({
            type: 'pie', 
            adjustLayout: true, 
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

        setPieData1({
            type: 'pie', 
            adjustLayout: true, 
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

        setPieData2({
            type: 'pie', 
            adjustLayout: true, 
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

    const parsePageActivityData = (data) => {
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

        
        setBarData({
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

        if (logIn) {
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
                    parsePageBreakdownData(respData);

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
                    parsePageActivityData(respData);

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
        
        } else {
            history.push(SITE_PAGES.LOGIN);
        }
         

    }, []);
    

    return (
        <>
        <br></br>
        <div style={{"margin" : "0px 50px", "textAlign" : "center"}}>
            <section>
                <ZingChart data={barData} />
            </section>
            <hr></hr>
            <section>
                <h1 style={{"fontSize" : "x-large"}} align="center">Activity Breakdown of the 3 Pages with the Most Activity</h1>
                <br></br>
                <select className="select-pie" value={pieOption} onChange={(e) => {setPieOption(e.target.value);}}>
                    <option value='A'>{`#1) Activity Breakdown per Page at: ${pieChartNames[0]}`}</option>
                    <option value='B'>{`#2) Activity Breakdown per Page at: ${pieChartNames[1]}`}</option>
                    <option value='C'>{`#3) Activity Breakdown per Page at: ${pieChartNames[2]}`}</option>
                </select>
                {pieOption == 'A' ? (<ZingChart data={pieData} />) : null}
                {pieOption == 'B' ? (<ZingChart data={pieData1} />) : null}
                {pieOption == 'C' ? (<ZingChart data={pieData2} />) : null}
            </section>
            <section>
                <ActivityPerPageGrid></ActivityPerPageGrid>
            </section>
        </div>
        </>
    );
}
