import axios from 'axios';

// Dynamically determine the backend URL based on the current hostname
// This allows the app to work on localhost and on the local network (mobile)
const getBaseUrl = () => {
    const { hostname } = window.location;
    return `http://${hostname}:8080/api`;
};

export const api = axios.create({
    baseURL: getBaseUrl(),
});
