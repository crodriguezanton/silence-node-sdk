import { AxiosInstance } from "axios";

import { Auth } from "./auth";
import { IListResult, IScooter, ITrip, ITripWithRoute } from "./models";

export class SilenceAPI {

    private axios: AxiosInstance;

    constructor(private auth: Auth) {
        this.axios = this.auth.axios;
    }

    public async getScooters(): Promise<IScooter[]> {
        try {
            const response = await this.axios.get("https://api.connectivity.silence.eco/api/v1/me/scooters?dynamic=true&details=true");
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    public async getScooter(scooterId: string): Promise<IScooter> {
        try {
            const response = await this.axios.get(`https://api.connectivity.silence.eco/api/v1/scooters/${scooterId}?dynamic=true&details=true`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    public async getScooterTrips(scooterId: string): Promise<IListResult<ITrip>> {
        try {
            const response = await this.axios.get(`https://api.connectivity.silence.eco/api/v1/scooters/${scooterId}/trips`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    public async getTrip(scooterId: string, tripId: string): Promise<ITripWithRoute> {
        try {
            const response = await this.axios.get(`https://api.connectivity.silence.eco/api/v1/scooters/${scooterId}/trips/${tripId}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}