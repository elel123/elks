export default function verifyToken(jwtToken, callback) {

    fetch('https://www.elks.codes/server/jwt/verify', { 
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({jwtToken})
    })
    .then( async (data) => {

        callback(data.status == 200);

    })
    .catch((error) => {
        callback(false);
    }) 
}