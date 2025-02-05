import { useState } from "react";

export function TimeTableViewHook(){
    const timeSelected=TimeTableTimeSelected();
    return{
        timeSelected
    }
}

export function EditTime(){
    const [open,setOpen]=useState<boolean>(true);
    const [time,setTime]=useState<number>(0);

    return{
        open,
        setOpen
    }

}

export function TimeTableTimeSelected(){
    const [selectedTrainIdx, setSelectedTrainIdx] = useState<number>(-1);
    const [selectedStationIdx, setSelectedStationIdx] = useState<number>(-1);
    const [selectedType, setSelectedType] = useState<number>(-1);

    function setSelectedTime(trainIDx:number,stationIdx:number,type:number){
        setSelectedTrainIdx(trainIDx);
        setSelectedStationIdx(stationIdx);
        setSelectedType(type);
    }
    function byTrainIdx(trainIdx:number):{stationIdx:number,type:number}{
        if(selectedTrainIdx===trainIdx){
            return{
                stationIdx:selectedStationIdx,
                type:selectedType
            }
        }else{
            return{
                stationIdx:-1,
                type:-1
            }
        }
    }
    return{
        selectedTrainIdx,
        selectedStationIdx,
        selectedType,
        setSelectedTime,
        byTrainIdx
    }


}