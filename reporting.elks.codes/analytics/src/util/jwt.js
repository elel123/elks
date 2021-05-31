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