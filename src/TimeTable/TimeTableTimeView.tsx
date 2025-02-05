import styles from "./timetable.module.scss";
import {Station, StationTime} from "../DiaData/DiaData.ts";
import {TimeTablePageSetting} from "./TimeTableView.tsx";
interface TimeTableTimeViewProps {
    direction: number;
    stationTime:StationTime;
    station:Station;
    // 直前の駅
    befTime?:StationTime;
    // 直後の駅
    aftTime?:StationTime;
    setting:TimeTablePageSetting;
    selected:number;
    onSelected?:(type:number)=>void;


}

function time2Str(time:number):string{
    if(time<0){
        return "⚪︎";
    }
    return `${Math.floor(time/3600)%24}${(Math.floor(time/60)%60).toString().padStart(2,"0")}`;
}
function getBetterTime(time1:number,time2:number):number{
    if(time1 < 0){
        return time2;
    }
    return time1;

}


export function TimeTableTimeView({stationTime,befTime,aftTime,station,setting,direction,selected,onSelected}:TimeTableTimeViewProps){
    // const divWidth=setting.fontSize*2.2;
    const isBothShow=station.showDep[direction]&&station.showArr[direction];
    const lineHeight=setting.lineHeight*setting.fontSize;

    let ariStr:string="";
    let depStr:string="";

    switch (stationTime.stopType){
        case 0:
            depStr="‥";
            ariStr="‥";
            break;
        case 20:
            depStr="⇂";
            ariStr="⇂";
            break;
        case 30:
            depStr="║";
            ariStr="║";
            break;
        default:
            if(isBothShow){
                //発着表示の時
                depStr=time2Str(stationTime.depTime);
                //発着表示の時、かつ発時刻が存在しないときの処理、aftStationが運行なしなら運行なし、経由なしなら経由なし
                if(stationTime.depTime<0){
                    if(aftTime){
                        if(aftTime.stopType==0){
                            depStr="‥";
                        }else if (aftTime.stopType==3){
                            depStr="║";
                        }
                    }else{
                        depStr="‥";
                    }
                }

                ariStr=time2Str(stationTime.ariTime);
                //発着表示の時、かつ着時刻が存在しないときの処理、befStationが運行なしなら運行なし、経由なしなら経由なし
                if(stationTime.ariTime<0){
                    if(befTime){
                        if(befTime.stopType==0){
                            ariStr="‥";
                        }else if (befTime.stopType==3){
                            ariStr="║";
                        }
                    }else{
                        ariStr="‥";
                    }
                }


            }else{
                depStr=time2Str(getBetterTime(stationTime.depTime,stationTime.ariTime));
                ariStr=time2Str(getBetterTime(stationTime.ariTime,stationTime.depTime));
            }
            break;
    }

    return <div>
        {station.showArr[direction]?
            <div className={styles.time}
                 style={{
                    lineHeight: `${lineHeight}px`,
                    height: `${lineHeight}px`,
                    backgroundColor:"#FFF",
                    mixBlendMode:selected===0 ? 'difference':'normal'}}
                    onClick={()=>{onSelected?.(0)}}
            >
                {ariStr}
            </div>:null
        }
        {station.showArr[direction]&&station.showDep[direction] ?
            <div style={{borderBottom:'1px solid black',height:'1px'}}>
            </div>:null
        }

        {station.showDep[direction]?
            <div className={styles.time}
                 style={{
                     lineHeight: `${lineHeight}px`,
                     height: `${lineHeight}px`,
                     backgroundColor:"#FFF",
                     mixBlendMode:selected===2 ? 'difference':'normal'
            }}
                 onClick={()=>{onSelected?.(2)}}
            >
            {depStr}
            </div>:null
        }
    </div>
}