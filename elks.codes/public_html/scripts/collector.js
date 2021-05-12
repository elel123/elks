// Init the data structs to save the user info here
const start = Date.now();
let enterTime = start;
let currentPage = window.location.pathname;
let leaveTime = null;

let activityData = [];

var pageLoadObj = null; 

// Arrays containing key/mouse activity data 
let keyDown = []; // list of character codes for keys pressed down
let keyUp = []; // list of character codes for keys released

let mousePositions = []; // list of [x, y] mouse coordinates (in term of offsets)
let mouseClicks = [];  // list of numbers (ranging from 0-4) which denote the mouse button clicked
let mouseScrolls = []; // list of [x, y] mouse scroll pixel offsets

let idle = [];  // array of [ idle duration in ms, end idle ts in ms since Jan 1 1970 ]
let lastActivityTs = 0; // ms since last activity (mouse or key up/down)





//Use to post data to the server (note this function is async)
function postData(url, jsonData, callback) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(jsonData)
    }).then(function(response) {
        callback(response);
    })
}

//Use this function to send the activity data to the server.
function sendDataToServer() {
    console.log("Sending Data...");

    //Flush the activity data 
    // (later we'll only flush once we get the OK from the server)
    activityData = [];
    keyDown = [];
    keyUp = [];
    mousePositions = []; 
    mouseClicks = [];
    mouseScrolls = []; 
    idle = [];

}



//When the window first loads, this function is called
window.addEventListener('load', function (event) {
    let performanceData = collectPerformanceInfo();
    let staticData = collectStaticInfo();
    /* TODO: send performance and static data to the server */


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
    leaveTime = Date.now();
    //Append page leave data
    activityData.push({
        category : 'Navigation',
        event : 'PageLeave',
        details : {
            'leaveTime' : leaveTime,
            'currentPage' : currentPage
        }
    });
    sendDataToServer();
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
    let end = Date.now();
    let performanceData = {
        'startTime' : start,
        'endTime' : end,
        'totalTime' : end - start 
    }

    // console.log(performanceData);

    return performanceData;
}

// // ----- Methods to collect Performance (Collected after page has loaded) data -----
function recordPageLoadPerformance() {

  let perfObj = new Object();

  // https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API#calculate_the_total_page_load_time
  // timestamps are in milliseconds
  const perfData = window.performance.timing;
  const pageLoadStart = perfData.navigationStart;
  const pageLoadEnd = perfData.loadEventEnd;
  const pageLoadTime = pageLoadEnd - pageLoadStart;

  perfObj['timingObj'] = perfData;
  perfObj['pageLoadStart'] = pageLoadStart;
  perfObj['pageLoadEnd'] = pageLoadEnd;
  perfObj['pageLoadTime'] = pageLoadTime;
  perfObj['path'] = window.location.pathname; // no query string nor fragment


  //console.log(`Page Load Time: ${perfObj.pageLoadTime}`);

  pageLoadObj = perfObj;
}

// window.addEventListener('load', (event) => {
//     setTimeout(function() {
//       recordPageLoadPerformance();
//     }, 0);
// });


// ----- Methods to collect (Key, Mouse, Idle) Activity data -----

function recordCursorPosition(e) {
    recordIdle(e);

    //e.offsetX and e.offsetY give (x, y) offset of mouse pointer between event and padding edge
    // of target (window)
    // console.log(`Cursor Coord: (${e.offsetX}, ${e.offsetY})`);
    mousePositions.push([e.offsetX, e.offsetY]);
    
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

    console.log(e);
    mouseClicks.push(e.button);

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
    mouseScrolls.push([window.scrollX, window.scrollY]);

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
    keyDown.push(e.code);

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
    keyUp.push(e.code);

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
            idle.push([idleDuration, idleEndTs]);

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


