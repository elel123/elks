// Init the data structs to save the user info here
const start = Date.now();


//Use to post data to the server (note this function is async)
function postData(url, jsonData, callback) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(jsonData)
    }).then(function(response) {
        callback(response);
    })
}



//When the window first loads, this function is called
window.addEventListener('load', function (event) {
    let initialData = {
        ...(collectPerformanceInfo()),
        ...(collectStaticInfo())
    }
    console.log(initialData);   
});


//When the user is about to leave the page
window.addEventListener("beforeunload", function(event) {
    
});


function collectStaticInfo() {
    let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    let staticData = {
        'agent-string' : navigator.userAgent,
        'language' : navigator.language,
        'accepts-cookies' : navigator.cookieEnabled,
        'allows-js' : true,
        'screen-width' : screen.width,
        'screen-height' : screen.height,
        'window-width' : window.innerWidth,
        'window-height' : window.innerHeight,
        'connection-type' : (connection === undefined ? null : connection.effectiveType),
        'allows-images' : !(document.getElementById('flag').width === 0),
        'allows-styles' : (window.getComputedStyle(document.getElementById('flag')).visibility === 'hidden')
    }

    // console.log("allows images: " + staticData['allows-images']);
    // console.log("allows css: " + staticData['allows-styles']);

    return staticData;
}

function collectPerformanceInfo() {
    let end = Date.now();
    let performanceData = {
        'start-load' : start,
        'end-load' : end,
        'total-load' : end - start 
    }

    // console.log(performanceData);

    return performanceData;
}