export interface IBaseScooter {
    id: string;
    model: string;
    revision: string;
    color: string;
    name: string;
}

export interface IScooter extends IBaseScooter, IScooterDetails, IScooterStatus {}
export interface IDynamicScooter extends IBaseScooter, IScooterStatus {}
export interface IDetailedScooter extends IBaseScooter, IScooterDetails {}

export interface IScooterDetails {
    imei: string;
    btMac: string;
    frameNo: string;
    manufactureDate: string;
}

export interface IScooterStatus {
    lastLocation: ILocation;
    batteryId: number;
    batterySoc: number;
    odometer: number;
    batteryTemperature: number;
    motorTemperature: number;
    inverterTemperature: number;
    range: number;
    ambientTemperature: number;
    velocity: number;
    odometerOn: number;
    warningFlags: number;
    status: number;
    currentSpeed: number;
    internalSoc: number;
    externalSoc: number;
    overallSoc: number;
    externalBatteryVoltage: number;
    internalBatteryVoltage: number;
    internalBatteryTemp1: number;
    internalBatteryTemp2: number;
    externalBatteryTemp1: number;
    externalBatteryTemp2: number;
    lastReportTime: Date;
    lastConnection: Date;
}

export interface ILocation {
    latitude: number;
    longitude: number;
    altitude: number;
    currentSpeed: number;
    maxSpeed: number;
    time: Date;
}

export interface ITrip {
    id: string;
    startDate: Date;
    endDate: Date;
    startBattery: number;
    endBattery: number;
    distance: number;
    speedMax: number;
    speedAvg: number;
    co2Savings: number;
    fromDescription: string;
    toDescription: string;
}

export interface ITripWithRoute extends ITrip {
    points: IPoint[]
}

export interface IPoint {
    lat: number;
    lon: number;
    timestamp: Date;
}

export interface IListResult<T> {
    limit: number;
    items: T[];
    left: number;
    offset: string;
}