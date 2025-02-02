import {LineFile, Station} from "./DiaData.ts";

export function addStation(lineFile:LineFile,station:Station,index:number){
    const newLineFile={...lineFile};
    const newStations=[...newLineFile.stations];
    newStations.splice(index,0,station);
    newLineFile.stations=newStations;
    return newLineFile
}
