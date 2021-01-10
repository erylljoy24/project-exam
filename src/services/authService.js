import axios from 'axios';

export const authService = {
    login,
    register,
    logout
};

function login(credentials) {
    //  http://100.26.220.123/api/token https://jsonplaceholder.typicode.com/posts
    return axios.get('https://jsonplaceholder.typicode.com/posts');
}

function register(data) {
    //  http://100.26.220.123/api/token https://jsonplaceholder.typicode.com/posts
    return axios.get('https://jsonplaceholder.typicode.com/posts');
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('_vsuser');
}