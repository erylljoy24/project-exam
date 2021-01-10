import axios from 'axios';

export default {
    initialize: (store, history) => {
        axios.defaults.baseURL="http://100.26.220.123/api/";
        // axios.defaults.headers.post['X-CSRF-Token'] = "123";
        axios.defaults.xsrfHeaderName = "X-CSRFToken";
    
        axios.interceptors.response.use( (response) => {
            return response;
        }, 
        (error) => {
            switch (error.response.status) {
                case 400:
                    console.log('Bad request');
                    break
                case 401:
                    console.log("Error");
                    history.push('/');
                    break;
                case 404:
                    // window.location.href = "/";
                    history.push('/');
                    break;
                default:
                    break;
            }
            return Promise.reject(error);
        });
    }
}