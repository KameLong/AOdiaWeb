import {TimeTableTimeView} from "./TimeTableTimeView.tsx";
import {MatchTextLabel} from "./MatchTextLabel.tsx";
import {Station} from "../DiaData/DiaData.ts";


interface TimeTableStationViewProp{
    stations:Station[]
    direction:number,
    lineHeight:number,
    onDblClick?:(station:Station,index:number)=>void
}

export function TimeTableStationView({stations,direction,lineHeight,onDblClick}:TimeTableStationViewProp){
    const stationList=(direction===0?stations:stations.toReversed());
    console.log(stationList);
    const StationView=(station:Station,index:number)=>{
        if (station.showArr[direction]&&station.showDep[direction]) {
            return (
                <div key={index}
                     style={{
                        height: `${lineHeight * 2 + 1}px`,
                        lineHeight: `${lineHeight * 2 + 1}px`,
                        overflow: "hidden",
                        whiteSpace: 'nowrap',
                        margin:'0px 3px'
                }}
                     onDoubleClick={()=>onDblClick?.(station,index)}
                ><MatchTextLabel>
                        {station.name}
                </MatchTextLabel></div>
            )
        }else{
            return (
                <div key={station.name}
                     style={{
                        lineHeight: `${lineHeight }px`,
                        height: `${lineHeight }px`,
                         overflow: "hidden",
                        whiteSpace: 'nowrap',
                        margin:'0px 3px',
                    }}
                        onDoubleClick={()=>onDblClick?.(station,index)}
                ><MatchTextLabel>
                    {station.name}
                </MatchTextLabel></div>
            )
        }
    }

    return (
        <div style={{
            borderBottom:'2px solid black',
        }}>
            {
                stationList.map((station, stationIndex) => StationView(station,stationIndex))
            }
        </div>
    )
}