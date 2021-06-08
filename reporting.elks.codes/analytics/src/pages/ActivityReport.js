import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import verifyToken from "../util/verifyToken";
import { SITE_PAGES } from "../constants/links";
import { setToken, getToken, getAdminValFromToken } from "../util/jwt";
import ActivityPerPageGrid from "../components/ActivityPerPageGrid"; 

//import the zingchart library
import 'zingchart/es6';
import ZingChart from 'zingchart-react';

import { Row, Col } from 'react-bootstrap';

import './ActivityReport.css';

export default function Report({ adminState, loginState }) {
    const history = useHistory();
    const {isAdmin, setAdmin} = adminState;
    const {logIn, setLogIn} = loginState;

    const [barData, setBarData] = useState({});

    const [pieData, setPieData] = useState({});
    const [pieData1, setPieData1] = useState({});
    const [pieData2, setPieData2] = useState({});
    const [pieChartNames, setPieChartNames] = useState([]);
    const [pieOption, setPieOption] = useState(0);

    const colorConfigs = {
        fillColor: "#b87b5a",
        backgroundColor: "#ECECEC",
        pieChartColor: {
            'Idle' : '#452f1e', 
            'Mouse' : '#8c5f3c', 
            'Keyboard' : '#c99063', 
            'Navigation' : '#ff8c30'
        }
    }


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
                    text: b._id,
                    "background-color": colorConfigs.pieChartColor[b._id]
                } 
                mySeries.push(a);
                activityCount += b.count; 
            }
            seriesList.push([datum[0], mySeries.sort((a,b)=>a['text'].length-b['text'].length), activityCount]);
        }

        setPieChartNames([seriesList[0][0], seriesList[1][0], seriesList[2][0]]);

        
        setPieData({
            type: 'pie', 
            "background-color": colorConfigs.backgroundColor,
            adjustLayout: true, 
            legend: {
                draggable: true,
                x: "5%", 
                y: "10%",
            },
            title: {
                text: seriesList[0][0],
                fontSize: 20,
                marginTop: 10
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
                },
                
            },
            plotarea: { 
                margin: 'dynamic',
                marginLeft: 30
            },
            series: seriesList[0][1]
        });

        setPieData1({
            type: 'pie', 
            "background-color": colorConfigs.backgroundColor,
            adjustLayout: true, 
            legend: {
                draggable: true,
                x: "5%", 
                y: "10%",
            },
            title: {
                text: seriesList[1][0],
                fontSize: 20,
                marginTop: 10
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
                },
                
            },
            plotarea: { 
                margin: 'dynamic',
                marginLeft: 30
            },
            series: seriesList[1][1]
        });

        setPieData2({
            type: 'pie', 
            "background-color": colorConfigs.backgroundColor,
            adjustLayout: true, 
            legend: {
                draggable: true,
                x: "5%", 
                y: "10%",
            },
            title: {
                text: seriesList[2][0],
                fontSize: 20,
                marginTop: 10
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
                },
                
            },
            plotarea: { 
                margin: 'dynamic',
                marginLeft: 30
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
            "background-color": colorConfigs.backgroundColor,
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
        <div class="media" style={{"backgroundColor" : colorConfigs.backgroundColor, "margin" : "50px 50px 25px 50px", "paddingTop" : "20px"}}> 
            <div class="media-body">
                <h1 class="mx-5"> Detailed Activity Report </h1>
                <p class="mx-5"> With our collected data, we wanted to answer the question: <q>Which site pages traffic the most amount of user activity?</q> To answer this question, we created the following visualizations (displayed at the bottom of the page).  </p>
                <p class="mx-5">  The first visualization (Activity PerPage On elks.codes bar chart) focused on giving the top 5 pages on the site (descending order) that had the most logged activity data (navigation, mouse clicks, keyboard, etc.). More usage of the page (scrolling, clicking, etc.) yielded more logged data, which in turn gave that page a higher overall activity ranking. Clearly, looking at the bar graph, it's easy to see that “/hw3/database.html” by far has the most activity, as it beats out the second place page <q>/hw3/hellodataviz.html</q> by about 18000 logged entries. Then second and third place (“/”) have little difference, though second place does have an edge of 1000 more entries. However, anything after third place yields very little activity, as the fourth and fifth highly ranked pages only have a few hundred entries - extremely low compared to the top three places. Based on these results, we can make the conclusion that our site has very little activity usage aside from the <q>/hw3/database.html</q> page, which hoards most of the user traffic. </p>
                <p class="mx-5"> As it appears, the second visualization (pie chart detailing activity type break down for a page) provided an even further breakdown of the bar chart. Moreover, as explained in prior, the fourth and fifth pages had comparatively negligible amounts of user activity, which is why we didn’t find too much a need to break down these pages as the top 3. Interestingly, all three pages displayed a similar story, as predominantly (greater than 96%) all user data was of mouse activity, with idle usually taking up the next 1% - 2 %, and then keyboard and navigation being of trace amounts (less than 1%). As most of the pages didn’t have too many buttons and our site did not have a consistent navigation bar, the data made sense. Especially when considering that idle data was highest in <q>/hw3/hellodataviz.html</q> probably because it had the most amount of static content for reading, and navigation was highest in the root page <q>/</q> since that was the page that had the most amount of links attached to it.  </p>
                <p class="mx-5">  In conclusion, we see that <q>/hw3/database.html</q> has the most activity among users of elks.codes, and the pie chart breakdown reveals that a large percentage of the activity is mouse activity. Due to the interactive nature of the database grids, we do not see other pages taking the place of most popular in the near future. </p>
            </div>
        </div>
        <br></br>
        <div style={{"margin" : "0px 50px", "textAlign" : "center"}}>
            <section align="center">
                <ZingChart data={barData} align="center" margin="auto" />
            </section>
            <section style={{"margin" : "50px 0px", "paddingTop" : "30px", "backgroundColor" : colorConfigs.backgroundColor}}>
                <h1 style={{"fontSize" : "x-large"}} align="center">Activity Breakdown of the 3 Pages with the Most Activity</h1>
                <br></br>
                <Row>
                    <Col>
                        <ZingChart data={pieData} />
                    </Col>
                    <Col>
                        <ZingChart data={pieData1} />
                    </Col>
                    <Col>
                        <ZingChart data={pieData2} />
                    </Col>
                </Row>
            </section>
            <section>
                <select style={{"margin" : "10px 0px 10px 0px"}} className="select-pie" value={pieOption} onChange={(e) => {setPieOption(e.target.value);}}>
                    <option value={0}>{`#1) Activity Breakdown per Page at: ${pieChartNames[0]}`}</option>
                    <option value={1}>{`#2) Activity Breakdown per Page at: ${pieChartNames[1]}`}</option>
                    <option value={2}>{`#3) Activity Breakdown per Page at: ${pieChartNames[2]}`}</option>
                </select>

                <ActivityPerPageGrid pageNames={pieChartNames[pieOption]}></ActivityPerPageGrid>
            </section>
        </div>
        </>
    );
}
