import {O_O} from "@route-builders/oud-operator";
import {Color} from "@route-builders/oud-operator/src/models/Color.ts";
import {Streak} from "@route-builders/oud-operator/types/models/Streak";
import {StHandling} from "@route-builders/oud-operator/types/models/StHandling";

export interface LineFile{
    stations: Station[];
    trainType:TrainType[];
    diagram:Diagram[];
    name:string;
}

export function LineFileFromO_O(o_o: O_O): LineFile {
    return {
        stations: StationFromO_O(o_o),
        trainType: TrainTypeFromO_O(o_o),
        diagram: DiagramFromO_O(o_o,o_o.stations.length),
        name: o_o.name,
    };
}

export interface Diagram{
    name:string;
    trains:Train[][];
}

function TrainFromO_O(oTrain:Streak,stationCount:number,direction:number): Train{
    let times=oTrain.stHandlings;
    while(times.length<stationCount){
        times.push(null);
    }
    if(direction===1){
        times=times.toReversed();
    }
    const train={
        name: oTrain.name,
        num: oTrain.no,
        trainTypeId: oTrain.typeIdx,
        comment: oTrain.comment,
        times: times.map((time)=>{
            if(time===null){
                return {
                    depTime: -1,
                    ariTime: -1,
                    stopType: 0,
                };
            }
            return {
                depTime: time.departure.getTime(),
                ariTime: time.arrival.getTime(),
                stopType: time.type,
            };
        }),
    };
    return train;
}
export function DiagramFromO_O(o_o: O_O,stationCount:number): Array<Diagram>{
    return o_o.diagrams.map((diagram)=> {
        return {
            name: diagram.name,
            trains: [diagram.downStreaks.map((train) => TrainFromO_O(train,stationCount,0)),
                diagram.upStreaks.map((train) => TrainFromO_O(train,stationCount,1))],
        };
    });
}

export interface Train{
    name:string;
    num:string;
    trainTypeId:number;
    times:StationTime[];
    comment:string;
}
export interface StationTime{
    depTime: number;
    ariTime: number;
    stopType: number;
}
export function hasTime(time:StationTime):boolean{
    return time.depTime>=0 || time.ariTime>=0;
}
export function DAtime(time:StationTime):number{
    if(time.depTime>=0){
        return time.depTime;
    }
    return time.ariTime;
}
export function ADtime(time:StationTime):number{
    if(time.ariTime>=0){
        return time.ariTime;
    }
    return time.depTime;
}




export interface TrainType{
    name: string;
    shortName: string;
    trainColor: string;
    fontIdx: number;
    lineColor: string;
    lineType: number;
    lineWeight: number;
    shoudDrawStopMark: boolean;
}
function TrainTypeFromO_O(o_o: O_O): Array<TrainType>{
    return o_o.trainTypes.map((trainType)=>{
        console.log(trainType.lineType);
        return {
            name: trainType.name,
            shortName: trainType.shortname,
            trainColor: trainType.trainColor.HEX(),
            fontIdx: trainType.fontIdx,
            lineColor: trainType.lineColor.HEX(),
            lineType: trainType.lineType,
            lineWeight: trainType.lineWeight,
            shoudDrawStopMark: trainType.shoudDrawStopMark,
        };

    });
}
export interface Station{
    name: string;
    showDep: boolean[];
    showArr: boolean[];
    isMajor: boolean;

    branchStation:number;

    checked:boolean;
}
function StationFromO_O(o_o: O_O): Array<Station>{
    console.log(o_o.stations);
    return o_o.stations.map((station)=>{
        let showDep=[false,false];
        let showArr=[false,false];
        switch (station.timeType){
            case 10:
                showDep=[true,true];
                showArr=[true,true];
                break;
            case 20:
                showDep=[false,true];
                showArr=[true,false];
                break;
            case 30:
                showDep=[true,false];
                showArr=[false,true];
                break;
            default:
                showDep=[true,true];
                showArr=[false,false];
                break;
        }
        return {
            name: station.name,
            showDep: showDep,
            showArr: showArr,
            isMajor: station.scale===1,
            branchStation: -1,
            checked: false,
        };
    });
}

