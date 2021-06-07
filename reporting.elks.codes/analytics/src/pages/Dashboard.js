import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import verifyToken from "../util/verifyToken";
import { SITE_PAGES } from "../constants/links";
import { setToken, getToken, getAdminValFromToken } from "../util/jwt";

//import the zingchart library
import 'zingchart/es6';
import ZingChart from 'zingchart-react';

import { Container, Row, Col } from 'react-bootstrap';

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

export default function Dashboard({ adminState, loginState }) {
    const history = useHistory();
    const {isAdmin, setAdmin} = adminState;
    const {logIn, setLogIn} = loginState;

    const [activityData, setActivityData] = useState({});
    const [sessionsData, setSessionsData] = useState({
      xVal: [],
      yVal: []
    });

    const [loadData, setLoadData] = useState([]);
    const [outliers, setOutliers] = useState([]);

    const colorConfigs = {
        fillColor: "#b87b5a",
        backgroundColor: "#ECECEC"
    }

    let sessionsInfo = {
      type: 'line',
      "background-color": colorConfigs.backgroundColor,
      width: "100%",
            adjustLayout: true, 
            plotarea: { 
                margin: 'dynamic',
                marginTop: 70
            },
      title: {
        text: 'Unique Sessions Over Past Week',
        fontSize: 24,
      },
      scaleX: {
        // Set scale label
        label: { text: 'Date' },
        // Convert text on scale indices
        labels: sessionsData.xVal
      },
      scaleY: {
        // Scale label with unicode character
        label: { text: '# Unique Sessions' }
      },
      plot: {
        // Animation docs here:
        // https://www.zingchart.com/docs/tutorials/styling/animation#effect
        animation: {
          effect: "ANIMATION_SLIDE_LEFT",
        },
        'line-color': colorConfigs.fillColor,
        marker: {
            'background-color': colorConfigs.fillColor,
            'border-width': 2
        }

      },
      series: [
        { values: sessionsData.yVal }
      ]
    };

    const parseActivityData = (data) => {
        console.log("Parsing Data");
        let parsed = [];
        for (let page of data) {
            if (page._id === null || page._id === "" || page._id.indexOf("public_html") !== -1) {
                continue;
            }
            parsed.push([page._id, page.count]);
        }

        parsed.sort((a, b) => {return a[1] - b[1]});

        let topLabels = parsed.slice(parsed.length - 5).map((entry) => entry[0]);
        let topValues = parsed.slice(parsed.length - 5).map(entry => entry[1]);

        
        setActivityData({
            type: 'hbar', 
            "background-color": colorConfigs.backgroundColor,
            width: "100%",
            adjustLayout: true, 
            plotarea: { 
                margin: 'dynamic',
                marginTop: 70,
                marginRight: 30
            },
            title: {
                text: 'Activity Per Page On elks.codes',
                fontSize: 24,
            },
            scaleX: {
                // Set scale label
                label: { text: 'Page' },
                // Convert text on scale indices
                labels: topLabels,
                item: {
                    fontAngle: 0,
                  }
            },
            scaleY: {
                // Scale label with unicode character
                label: { text: '# Logged Activities' }
            },
            plot: {
                // Animation docs here:
                // https://www.zingchart.com/docs/tutorials/styling/animation#effect
                animation: {
                    effect: 'ANIMATION_EXPAND_BOTTOM',
                    method: 'ANIMATION_STRONG_EASE_OUT',
                    sequence: 'ANIMATION_BY_NODE',
                    speed: 275,
                },
                "background-color": colorConfigs.fillColor
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

        setLoadData({
            "graphset": [{
                "type": "hboxplot",
                "plotarea": {
                    "marginLeft": "100",
                    "marginRight": "100",
                },
                "background-color": colorConfigs.backgroundColor,
                title: {
                    text: 'User Load Time Distribution',
                    fontSize: 24,
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
                            "text": "<br><b style=\"font-size:15px;\">Load Times:</b><br><br>Maximum: <b>%data-max ms</b><br>Upper Quartile: <b>%data-upper-quartile ms</b><br>Median: <b>%data-median ms</b><br>Lower Quartile: <b>%data-lower-quartile ms</b><br>Minimum: <b>%data-min ms</b>",
                            "background-color": colorConfigs.fillColor,
                        },
                        "border-color":"#204A7B",
                        "border-width": 2,
                        "background-color":colorConfigs.fillColor
                            
                        
                    },
                    "outlier": {
                        "tooltip": {
                            "text": "<br><b style=\"font-size:15px;\">Load Time: %node-value ms</b>",
                            "background-color": colorConfigs.fillColor,
                        },
                        "marker": {
                            "type": "circle",
                            'background-color': colorConfigs.fillColor,
                            'border-color': colorConfigs.fillColor,
                            'border-width': 2
                            
                        },
                        
                    },
                    "line-median-level":{
                        "line-color":"black",
                        "line-width": 2
                    },
                    "line-min-level":{
                        "line-color":"black",
                        "line-width": 2
                    },
                    "line-min-connector": {
                        "line-color":"black",
                        "line-width": 2
                    },
                    "line-max-level": {
                        "line-color":"black",
                        "line-width": 2
                    },
                    "line-max-connector": {
                        "line-color":"black",
                        "line-width": 2
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

    async function retrieveActivityData(){
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
            parseActivityData(respData);

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
    });
    }


    async function retrieveSessionsData(){
      fetch(`https://www.elks.codes/server/dashboard/dailyUsers?jwt=${getToken()}`, { 
        method: 'GET',
        headers:{
            'Accept': 'application/json'
        }
    })
    .then( async (res) => {

        if (res.status === 200) {

            let json = await res.json();

            let xData = [];
            const yData = json.map((entry) => {
              xData.push(`${entry._id.month}/${entry._id.day}`);
              return entry.count; 
            });

            setSessionsData({xVal: xData, yVal: yData});

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
    });
    }

    async function retreiveLoadData() {
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
    }

    useEffect(async () => {

        if (logIn) {
            await Promise.all([
                retrieveActivityData(),
                retrieveSessionsData(),
                retreiveLoadData()
            ]);
        } else {
            history.push(SITE_PAGES.LOGIN); 
        }


    }, []);


    return (
        <>
        <br></br>
        <br></br>
        <div style={{"margin" : "0px 40px"}}>
            <Row>
                <Col>
                    <ZingChart data={activityData} />
                </Col>
                <Col>
                    <ZingChart data={sessionsInfo} />
                </Col>
            </Row>
            
            <section style={{"textAlign" : "center", "margin" : "50px 0px", "paddingBottom": "20px", "backgroundColor" : colorConfigs.backgroundColor}}>
                <ZingChart data={loadData} />
                <div style={{"borderStyle" : "solid", 'margin' : "0px 100px"}}><b>Notable Outliers:</b> {outliers.map((outlier, i) => {return i === outliers.length - 1 ? `${outlier} ` : `${outlier}, `})}</div>
            </section>
        </div>
        </>
    );
}
