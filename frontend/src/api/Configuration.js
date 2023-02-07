import axios from "axios";

class Configuration {
    baseURL = process.env.URL || 'http://localhost';
    
    user = "";

    API = {};

    constructor(token, user, prefix) {
        const baseURL = prefix ? this.baseURL + prefix : this.baseURL;
        this.API = axios.create({
            baseURL             
        });

        if (token)
            this.API.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;
        if (user) this.user = user;
    }

    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }

    handleError(error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
    }
}

export default Configuration;
