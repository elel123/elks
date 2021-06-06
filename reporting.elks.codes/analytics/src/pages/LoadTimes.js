import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import verifyToken from "../util/verifyToken";
import { SITE_PAGES } from "../constants/links";
import { setToken, getToken, getAdminValFromToken } from "../util/jwt";

//import the zingchart library
import 'zingchart/es6';
import ZingChart from 'zingchart-react';

function calcMedian(arr) {
    let median = 0;
    let medIndex = Math.floor(arr.length / 2);
    if (arr.length % 2 === 0) {
        median = Math.floor((arr[medIndex] + arr[medIndex + 1]) / 2);
    } else {
        median = Math.floor(arr[medIndex]);
    }

    return median;
}

export default function LoadTimes({ adminState, loginState }) {
    const history = useHistory();
    const {isAdmin, setAdmin} = adminState;
    const {logIn, setLogIn} = loginState;

    const [loadData, setLoadData] = useState([]);

    const [outliers, setOutliers] = useState([]);

    const parseLoadData = (data) => {
        let parsedData = [];
        // console.log(data);
        for (let timeObj of data) {
            if (timeObj.time === undefined) {
                continue;
            }
            parsedData.push(timeObj.time);
        }

        parsedData.sort((a, b) => a - b);

        let min = parsedData[0];
        let max = parsedData[parsedData.length - 1];

        
        let med = calcMedian(parsedData);

        let q25 = calcMedian(parsedData.slice(0, Math.floor(parsedData.length / 2)));
        let q75 = calcMedian(parsedData.slice(Math.floor(parsedData.length / 2), parsedData.length));

        let iqr = q75 - q25;
        let bottomCutoff = q25 - (1.5 * iqr);
        let topCutoff = q75 + (1.5 * iqr);

        let outliers = [];
        let notableOutliers = [];
        
        for (let i = 0; i < parsedData.length; i++) {
            if (parsedData[i] > bottomCutoff) {
                min = parsedData[i];
                break;
            } else {
                outliers.push(parsedData[i]);
            }
        }

        for (let i = parsedData.length; i >= 0 ; i--) {
            if (parsedData[i] < topCutoff) {
                max = parsedData[i];
                break;
            } else {
                if (parsedData[i] >  topCutoff * 1.5) {
                    notableOutliers.push(Math.floor(parsedData[i]));
                } else {
                    outliers.push(parsedData[i]);
                }
            }
        }

        setOutliers(notableOutliers.sort((a, b)=> a-b));


        // console.log(min);
        // console.log(q25);
        // console.log(med);
        // console.log(q75);
        // console.log(max);
        // console.log(outliers);

        // console.log(parsedData);



        setLoadData({
            "graphset": [{
                "type": "hboxplot",
                "plotarea": {
                    "marginLeft": "100",
                    "marginRight": "100",
                },
                "scaleX": {
                    "guide": {
                        "visible": false
                    },
                    "values": [""]
                },
                "scaleY": {
                    "label": {
                        "text": "Page Load Time (milliseconds)"
                    }
                },
                tooltip: {
                    paddingBottom: 20
                },
                "options": {
                    "box": {
                        "barWidth": 0.5,
                        "tooltip": {
                            "text": "<br><b style=\"font-size:15px;\">Load Times:</b><br><br>Maximum: <b>%data-max ms</b><br>Upper Quartile: <b>%data-upper-quartile ms</b><br>Median: <b>%data-median ms</b><br>Lower Quartile: <b>%data-lower-quartile ms</b><br>Minimum: <b>%data-min ms</b>"
                        }
                    },
                    "outlier": {
                        "tooltip": {
                            "text": "<br><b style=\"font-size:15px;\">Load Time: %node-value ms</b>"
                        },
                        "marker": {
                            "type": "circle"
                        }
                    }
                },
                "series": [{
                    "dataBox": [
                        /* min, lowerq, med, upperq, max */
                        [min, q25, med, q75, max]
                    ],
                    "dataOutlier": outliers.map((point) => [0, point])
                }]
            }]
        })
    }

    useEffect(() => {
        fetch(`https://www.elks.codes/server/dashboard/loadTimes?jwt=${getToken()}`, { 
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
                parseLoadData(respData);

                // console.log(respData);

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
        <section style={{"textAlign" : "center", "marginTop" : "40px"}}>
            <h1 style={{"fontSize" : "x-large"}}> User Load Time Distribution </h1>
            <ZingChart data={loadData} />
            <div style={{"borderStyle" : "solid", 'margin' : "0px 100px"}}><b>Notable Outliers:</b> {outliers.map((outlier, i) => {return i === outliers.length - 1 ? `${outlier} ` : `${outlier}, `})}</div>
        </section>
    );
}