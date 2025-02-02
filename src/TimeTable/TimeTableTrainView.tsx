import {TimeTableTimeView} from "./TimeTableTimeView.tsx";
import {Station, Train, TrainType} from "../DiaData/DiaData.ts";
import {TimeTablePageSetting} from "./TimeTableView.tsx";


interface TimeTableTrainViewProps {
    train:Train;
    station:Station[]
    setting:TimeTablePageSetting;
    type:TrainType;
    direction:number;


}
export function TimeTableTrainView({train,station,setting,type,direction}:TimeTableTrainViewProps){
    const divWidth=setting.fontSize*2.2;
    const orderedRouteStation=direction===0?station:station.toReversed();
    const orderedStationTime=direction===0?train.times:train.times.toReversed();
    return(
        <div style={{display:"flex"}}>
            <div
                 style={{
                     color:type.trainColor,
                     width:divWidth,
                     borderRight:'1px solid black',
                     borderBottom:'2px solid black',
            }}>
                {
                    orderedRouteStation.map((station,sIndex)=>{
                        return(
                            <TimeTableTimeView key={sIndex} direction={1}
                                               befTime={orderedStationTime[sIndex-1]} aftTime={orderedStationTime[sIndex+1]}
                                               station={station} stationTime={orderedStationTime[sIndex]} setting={setting} />
                        )
                    })
                }
            </div>

        </div>
    )
}