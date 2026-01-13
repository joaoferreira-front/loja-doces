import axios from 'axios';

// Dynamically determine the backend URL based on the current hostname
// This allows the app to work on localhost and on the local network (mobile)
const getBaseUrl = () => {
    const { hostname } = window.location;
    if (hostname.includes('github.io') || hostname.includes('onrender.com')) {
        return 'https://doces-g-and-j.onrender.com/api';
    }
    return `http://${hostname}:8082/api`;
};

export const api = axios.create({
    baseURL: getBaseUrl(),
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
    }
});
