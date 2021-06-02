const jwt = require("jsonwebtoken");

export function setToken(token) {
    if (token === null) {
        window.localStorage.removeItem('jwttoken');
    } else {
        window.localStorage.setItem('jwttoken', token);
    }
}

export function getToken() {
    return window.localStorage.getItem('jwttoken');
}

export function getAdminValFromToken() { 
    let token = window.localStorage.getItem('jwttoken');
    
    if( token === null) { 
        return false; 
    }

    let decodedToken = jwt.decode(token, {complete:true}); 

    return decodedToken.payload.isAdmin; 
}