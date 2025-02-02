import {useEffect, useState} from "react";
import {
    hasTime,
    LineFile,
    StationTime, Train,
} from "../../DiaData/DiaData.ts";
import {DiagramStation, DiagramTrip} from "../DiagramData.ts";
import {DiagramLine} from "../DiagramCanvas.ts";

const getAD = (stopTime: StationTime) => {
    if (stopTime.ariTime >= 0) {
        return stopTime.ariTime;
    }
    return stopTime.depTime;
}
const getDA = (stopTime: StationTime) => {
    if (stopTime.depTime >= 0) {
        return stopTime.depTime;
    }
    return stopTime.ariTime;
}
const diagramStartTime=3600*3;
function diagramTime(time:number):number{
    if(time<diagramStartTime){
        return time+24*3600;
    }
    return time;
}

const makeDiagramLine = (trips: DiagramTrip[], routeStations: DiagramStation[],direction:number): DiagramLine[] => {
    const diagramLines: DiagramLine[] = [];
    trips.forEach(trip => {

        const diagramLine: DiagramLine = {
            color: trip.trainType.lineColor,
            points: [],
            number: "",
        };
        const stopTimes = trip.stopTimes;
        const stationIndexArray=(new Array(stopTimes.length).fill(0).map((_,_i)=>_i));
        if(direction===1){
            stationIndexArray.reverse();
        }
        for(let i of stationIndexArray){
        // for (let i = 0; i < stopTimes.length; i++) {
            const st = stopTimes[i];
            if (st.ariTime >= 0) {
                diagramLine.points.push({
                    x: diagramTime(st.ariTime),
                    y: routeStations[i].stationTime
                });
            }
            if (st.depTime >= 0) {
                diagramLine.points.push({
                    x: diagramTime(st.depTime),
                    y: routeStations[i].stationTime
                });
            }
        }
        diagramLines.push(diagramLine);
    })
    return diagramLines;
}


export function useDiagramViewHook2(lineData:LineFile, diaIdx:number) {
    const [diaStations, setDiaStations] = useState<DiagramStation[]>([]);
    const [downLines, setDownLines] = useState<DiagramLine[]>([]);
    const [upLines, setUpLines] = useState<DiagramLine[]>([]);

    const dia=lineData.diagram[diaIdx];

    const stations = lineData.stations;
    const trainTypes = lineData.trainType;

    useEffect(() => {
        if(stations.length===0||dia===undefined){
            return ;
        }
        const rs: DiagramStation[] = [];
        rs.push({
            stationTime: 0,
            station: stations[0]});
        let nowStationTime = 0;
        for (let i = 1; i < stations.length; i++) {
            let minTime = 24 * 3600;
            //downTripの中で所要時間探索
            for (let j = 0; j < dia.trains[0].length; j++) {
                const trip = dia.trains[0][j];
                const stopTimes = trip.times;
                if (hasTime(stopTimes[i]) && hasTime(stopTimes[i - 1])) {
                    let t = diagramTime(getAD(trip.times[i]))- diagramTime(getDA(trip.times[i - 1]));
                    if (trip.times[i].stopType !== 1) {
                        t += 30;
                    }
                    if (trip.times[i - 1].stopType !== 1) {
                        t += 30;
                    }
                    minTime = Math.min(minTime, t);
                }
            }
            //upTripの中で所要時間探索
            for (let j = 0; j < dia.trains[1].length; j++) {
                const trip = dia.trains[1][j];
                const stopTimes = trip.times;
                if (hasTime(stopTimes[i]) && hasTime(stopTimes[i - 1])) {

                    let t = diagramTime(getAD(trip.times[i-1])) - diagramTime(getDA(trip.times[i]));
                    if (trip.times[i].stopType !== 1) {
                        t += 30;
                    }
                    if (trip.times[i - 1].stopType !== 1) {
                        t += 30;
                    }
                    minTime = Math.min(minTime, t);
                }
            }
            console.log(minTime);
            if (minTime === 24 * 3600) {
                minTime = 90;
            }
            if (minTime < 90) {
                minTime = 90;
            }
            nowStationTime = nowStationTime + minTime;
            rs.push({stationTime: nowStationTime, station: stations[i]});
        }

        setDiaStations(rs);
        const downTrips = dia.trains[0].map(item => {
            return {
                train: item,
                stopTimes: item.times.map(item => {
                    return {...item, depTime: getDA(item), ariTime: getAD(item)}
                }),
                trainType: trainTypes[item.trainTypeId]
            }
        });
        const upTrips = dia.trains[1].map(item => {
            return {
                train:item,
                stopTimes: item.times.map(item => {
                    return {...item, depTime: getDA(item), ariTime: getAD(item)}
                }),
                trainType: trainTypes[item.trainTypeId]
            }
        });

        setDownLines(makeDiagramLine(downTrips, rs,0));
        setUpLines(makeDiagramLine(upTrips, rs,1));

    }, [lineData, diaIdx]);
    return {diaStations, downLines, upLines};
}