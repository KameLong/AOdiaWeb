import {Station, Train, TrainType} from "../DiaData/DiaData.ts";

export interface DiagramStation {
    stationTime: number;
    station:Station;
}
export interface DiagramTrip{
    stopTimes: DiagramStopTime[];
    trainType: TrainType;
    train:Train;
}
export interface DiagramStopTime{
    depTime: number;
    ariTime: number;

}

export interface DiagramData {
    stations: DiagramStation[];
    upTrips: DiagramTrip[];
    downTrips: DiagramTrip[];
}
