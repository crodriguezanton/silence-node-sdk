import Axios, { AxiosError, AxiosInstance } from "axios";
import * as https from "https";

import { AUTH_KEY } from "./constants";

export class Auth {

    private refreshToken?: string;

    constructor(public axios: AxiosInstance = Axios.create({httpsAgent: new https.Agent({rejectUnauthorized: false})})) {}

    public setCredentials(accessToken: string, refreshToken: string) {
        this.refreshToken = refreshToken;
        this.axios.defaults.headers = {"Authorization": `Bearer ${accessToken}`};
        this.axios.interceptors.response.use((response) => response, this.renewInterceptor)
    }

    public async login(email: string, password: string) {
        const response = await Axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${AUTH_KEY}`, {
            email,
            password,
            returnSecureToken: true
        });

        this.setCredentials(response.data.idToken, response.data.refreshToken);
    }

    private async renew() {
        const response = await Axios.post(`https://securetoken.googleapis.com/v1/token?key=${AUTH_KEY}`, {
            grant_type: "refresh_token",
            refreshToken: this.refreshToken,
        });

        this.setCredentials(response.data.id_token, response.data.refresh_token);
    }

    private renewInterceptor = (error: AxiosError) => {
        if (error.response.status !== 401) {
            return new Promise((_, reject) => {reject(error)});
        }

        return this.renew()
            .then(() => {
                const config = error.config;
                config.headers["Authorization"] = this.axios.defaults.headers["Authorization"];

                return new Promise((resolve, reject) => {
                    this.axios.request(error.config)
                        .then(response => resolve(response))
                        .catch(error => reject(error));
                })
                
            })
            .catch((error) => {Promise.reject(error)});
    }
}