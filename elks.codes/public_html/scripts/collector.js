// Init the data structs to save the user info here
const start = Date.now();
let enterTime = start;
let currentPage = window.location.pathname;
let leaveTime = null;
let pageLoadEnd = 0; 

let activityData = [];

var pageLoadObj = null; 

let lastActivityTs = 0; // ms since last activity (mouse or key up/down)


//Use to post data to the server (note this function is async)
function postData(url, jsonData, callback, jsonCallback) {
    fetch(url, {
        headers: { 
            'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(jsonData)
    }).then(async function(response) {
        let json = await response.json();
        callback(response, json);
    })
}

//Use this function to send the activity data to the server.
function sendDataToServer() {
    console.log("Sending Data...");
    
    let url = "https://elks.codes/server/api/activity";
    
    let itemsSent = activityData.length;

    postData(url, {"data" : activityData }, function(response, json) { 
        console.log(`RESPONSE CODE ${response.status}`);
        let end = Date.now();

        if (response.status == 200 ) { 
            activityData = activityData.slice(itemsSent);
        }
        else {
            console.log(json);
        }
    });
}



//When the window first loads, this function is called
window.addEventListener('load', function (event) {
    pageLoadEnd = Date.now(); //ts for end of page load 

    /* Send Static data to the server */
    let staticData = collectStaticInfo();

    let staticUrl = "https://elks.codes/server/api/static";
    
    postData( staticUrl, staticData, function(response, json) { 
        console.log("Sent Static Data to server");
        if (response.status == 200 ) { 
            console.log(response.status);
        }
        else { 
            console.log(json);
        }
    });

    //Append page entry data
    activityData.push({
        category : 'Navigation',
        event : 'PageEntry',
        details : {
            'enterTime' : enterTime,
            'currentPage' : currentPage
        }
    });

    //Call sendDataToServer every 30 seconds
    this.setInterval(sendDataToServer, 30000);
});


//When the user is about to leave the page, this function is called
window.addEventListener("beforeunload", function(event) {
    //Append page leave data
    leaveTime = Date.now();
    activityData.push({
        category : 'Navigation',
        event : 'PageLeave',
        details : {
            'leaveTime' : leaveTime,
            'currentPage' : currentPage
        }
    });
    sendDataToServer(); // Send activityData[] to server 
});

// This event fires with a visibilityState of hidden when a user navigates to 
// a new page, switches tabs, closes the tab, minimizes or closes the browser, 
// or, on mobile, switches from the browser to a different app. Transitioning
// to hidden is the last event that's reliably observable by the page, so 
// developers should treat it as the likely end of the user's session 
document.addEventListener("visibilitychange", function(event) { 
    if (document.visibilityState === 'hidden') {
        // send Performance Data (page load stats)
        let performanceData = collectPerformanceInfo();
        let performanceUrl = "https://elks.codes/server/api/performance";

        let blob = new Blob([JSON.stringify(performanceData)], {type: 'application/json'}); 
        navigator.sendBeacon(performanceUrl, blob);
    }
}); 



function collectStaticInfo() {
    let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    let staticData = {
        'agent' : navigator.userAgent,
        'language' : navigator.language,
        'acceptsCookies' : navigator.cookieEnabled,
        'allowsJavascript' : true,
        'screenWidth' : screen.width,
        'screenHeight' : screen.height,
        'windowWidth' : window.innerWidth,
        'windowHeight' : window.innerHeight,
        'networkType' : (connection === undefined ? null : connection.effectiveType),
        'allowsImages' : !(document.getElementById('flag').width === 0),
        'allowsStyles' : (window.getComputedStyle(document.getElementById('flag')).visibility === 'hidden')
    }

    // console.log("allows images: " + staticData['allows-images']);
    // console.log("allows css: " + staticData['allows-styles']);

    return staticData;
}

function collectPerformanceInfo() {
    //If NavigationTiming API is supported by this browser 
    let performanceData = {};
    if( performance.getEntriesByType("navigation").length > 0 ) { 
        const entry = performance.getEntriesByType("navigation")[0];

        performanceData['startTime'] = start + entry.startTime;
        performanceData['endTime'] = start + entry.loadEventEnd;
        performanceData['totalTime'] = entry.duration;
        performanceData['timingObject'] = entry;
    }
    // NavigationTiming API is not supported by this browser 
    else { 
        performanceData['startTime'] = start;
        performanceData['endTime'] = pageLoadEnd;
        performanceData['totalTime'] = pageLoadEnd - start;
        performanceData['timingObject'] = null;
    }
    // console.log(performanceData);
    return performanceData;
}


// ----- Methods to collect (Key, Mouse, Idle) Activity data -----

function recordCursorPosition(e) {
    recordIdle(e);

    //e.offsetX and e.offsetY give (x, y) offset of mouse pointer between event and padding edge
    // of target (window)
    // console.log(`Cursor Coord: (${e.offsetX}, ${e.offsetY})`);
    
    activityData.push({
        category : 'Mouse',
        event : 'MouseMove',
        details : {
            'mousePosition' : [e.offsetX, e.offsetY],
            'currentPage' : currentPage
        }
    });
}

/*
    Mouse Code Key; Source: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
    0: Main button pressed, usually the left button or the un-initialized state
    1: Auxiliary button pressed, usually the wheel button or the middle button (if present)
    2: Secondary button pressed, usually the right button
    3: Fourth button, typically the Browser Back button
    4: Fifth button, typically the Browser Forward button
*/
function recordMouseClick(e) {
    recordIdle(e);

    console.log(e.button);
    activityData.push({
        category : 'Mouse',
        event : 'MouseClick',
        details : {
            'mouseButton' : e.button,
            'mousePositionX' : e.offsetX,
            'mousePositionY' : e.offsetY,
            'currentPage' : currentPage
        }
    });
}

function recordMouseScroll(e) {
    recordIdle(e);


    // window.scrollY = # of pixels the document is currently scrolled vertically
    //console.log(`Horiz Scroll Dist:  ${window.scrollX}`);
    //console.log(`Vert Scroll Dist:  ${window.scrollY}`);

    activityData.push({
        category : 'Mouse',
        event : 'MouseScroll',
        details : {
            'windowScrollX' : window.scrollX,
            'windowScrollX' : window.scrollY,
            'currentPage' : currentPage
        }
    });
}

function recordKeyDown(e) {
    recordIdle(e);

    // console.log(`Key Down Code: ${e.code}`);
    activityData.push({
        category : 'Keyboard',
        event : 'KeyDown',
        details : {
            'keyCode' : e.code,
            'currentPage' : currentPage
        }
    });
}

function recordKeyUp(e) {
    recordIdle(e);

    //console.log(`Key Up Code: ${e.code}`);
    activityData.push({
        category : 'Keyboard',
        event : 'KeyUp',
        details : {
            'keyCode' : e.code,
            'currentPage' : currentPage
        }
    });
}


// Helper method to record idle activity (2 sec +) between key/mouse activity.

// event.timestamp() is milliseconds since epoch, which depending on the implementation is
// time since system start (curr doc lifetime) or 1st Jan 1970.
function recordIdle(e) {
    let idleEndTs = Date.now(); // milliseconds elpased since Jan 1. 1970

    let currTs = e.timeStamp;
    if ( lastActivityTs < currTs ) {
        idleDuration = currTs - lastActivityTs;
        lastActivityTs = currTs;

        if( idleDuration > 2000 ) {  // idle for more than 2 seconds
            //console.log(`End of Idle Activity Timestamp: ${idleEndTs}`);
            //console.log(`Idle for ${idleDuration}`);

            activityData.push({
                category : 'Idle',
                event : 'Idle',
                details : {
                    'idleDuration' : idleDuration,
                    'idleEndTime' : idleEndTs,
                    'currentPage' : currentPage
                }
            });
        }
    }
}

document.addEventListener('keyup', recordKeyUp);
document.addEventListener('keydown', recordKeyDown);
window.addEventListener('mouseup', recordMouseClick);
window.addEventListener('mousemove', recordCursorPosition);


