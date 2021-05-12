// Init the data structs to save the user info here
const start = Date.now();
let enterTime = start;
let currentPage = window.location;
let leaveTime = null;

let activityData = [];


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
}



//When the window first loads, this function is called
window.addEventListener('load', function (event) {
    let performanceData = collectPerformanceInfo();
    let staticData = collectStaticInfo();
    /* TODO: send performance and static data to the server */


    //Append page entry data
    activityData.push({
        category : 'Navigation',
        event : 'Page Entry',
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
        event : 'Page Leave',
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