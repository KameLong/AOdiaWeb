import {useCallback, useContext, useEffect, useState} from "react";
import {Station, StationTime} from "../DiaData/DiaData.ts";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {useEvent} from "react-use";
import {WebOudContext} from "../App.tsx";

export function TimeTableViewHook(){
    const timeSelected=TimeTableTimeSelected();
    const editTime=EditTime();
    useEffect(() => {
        if(timeSelected.selectedTrainIdx!==-1) {
            editTime.setOpen(true);
        }else{
            editTime.setOpen(false);
        }
    }, [timeSelected.selectedTrainIdx,timeSelected.selectedStationIdx,timeSelected.selectedType]);
    useEffect(() => {
        editTime.setType(timeSelected.selectedType);
    }, [timeSelected.selectedType]);

    return{
        timeSelected,
        editTime
    }
}

export function EditTime(){
    const [open,setOpen]=useState<boolean>(false);
    const [type,setType]=useState<number>(0);
    const [time,setTime]=useState<StationTime>({
        depTime:-1,
        ariTime:-1,
        stopType:0
    });

    //直前の参考になる時間。
    const [refTime,setRefTime]=useState<number>(-1);

    const webOuDia=useContext(WebOudContext);


    const [inputText,setInputText]=useState<string>("");
    // const [event] = useState(new EventTarget());


    useEffect(() => {
        if(inputText.length===4){
            switch(type){
                case 0:
                    //着時刻に設定
                    setTime(prev=> {
                        const next={...prev};
                        next.ariTime = getInputTime();
                        next.stopType=10;
                        setTimeout(()=>{
                            webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent<StationTime>("onEnterClicked", {detail:next}));
                        },0);
                        return next;
                    });
                    break;
                case 2:
                    //発時刻に設定
                    setTime(prev=> {
                        const next={...prev};
                        next.depTime = getInputTime();
                        setTimeout(()=>{
                            webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent<StationTime>("onEnterClicked", {detail:next}));
                        },0);
                        next.stopType=10;
                        return next;
                    });
                    break;
            }

        }



    }, [inputText]);

    const getInputTime=useCallback(():number=>{
        let text=inputText;
        if(text.length===0){
            return -1;
        }
        text=text.padEnd(4,"0");
        const hh=parseInt(text.slice(0,2));
        const mm=parseInt(text.slice(2,4));
        return hh*3600+mm*60;
    },[inputText]);


// 4桁(HHMM)としての入力が将来的に有効かどうかをチェック
    const validFor4 = (str) => {
        switch (str.length) {
            case 0:
                return true;
            case 1:
                // 1桁目は時の10の位として、0～2 でなければならない
                return /^[0-2]$/.test(str);
            case 2:
                // 2桁目を含めた「時」は 00～23 でなければならない
                return /^(?:[0-1]\d|2[0-3])$/.test(str);
            case 3:
                // 3桁目は分の十位（0～5）として入力中
                return /^(?:[0-1]\d|2[0-3])[0-5]$/.test(str);
            case 4:
                // 完全な 4 桁の場合、時は 00～23、分は 00～59
                return /^(?:[0-1]\d|2[0-3])[0-5]\d$/.test(str);
            default:
                return false;
        }
    };
    //inputTextに数値を追加
    const appendDigit = (digit) => {
        // 既に桁数が 4 以上なら入力しない
        if (inputText.length >= 4) return;
        const newTime = inputText + digit;

        if (validFor4(newTime)) {
            setInputText(newTime);
        }

    };

    const appendText=useCallback((text:string)=>{
        switch(text){
            case "0":
                appendDigit(text);
                break;
            case "1":
                appendDigit(text);
                break;
            case "2":
                appendDigit(text);
                break;
            case "3":
                appendDigit(text);
                break;
            case "4":
                appendDigit(text);
                break;
            case "5":
                appendDigit(text);
                break;
            case "6":
                appendDigit(text);
                break;
            case "7":
                appendDigit(text);
                break;
            case "8":
                appendDigit(text);
                break;
            case "9":
                appendDigit(text);
                break;
            case "back":
                // バックスペースで末尾を削除
                    setInputText(inputText.slice(0, -1));
                    break;
            case "enter":
                console.log("enter");
                webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent<StationTime>("onEnterClicked", {detail:time}))
                break;
            case "pass":
                webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent<StationTime>("onEnterClicked", {detail:{
                    depTime:-1,ariTime:-1,stopType:20
                    }}))
                break;
            case "novia":
                webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent<StationTime>("onEnterClicked", {detail:{
                        depTime:-1,ariTime:-1,stopType:30
                    }}))
                break;
            case "none":
                webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent<StationTime>("onEnterClicked", {detail:{
                        depTime:-1,ariTime:-1,stopType:0
                    }}))
                break;


        }
    },[webOuDia.webOuDiaEvent,inputText,appendDigit]);

    useEffect(() => {
        switch(type){
            case 0:{
                //着時刻
                if(time.ariTime<0){
                    if(refTime<0){
                        setInputText("");
                        break;
                    }
                    const hh=Math.floor(refTime/3600);
                    setInputText(hh.toString().padStart(2,'0'));
                    break;
                }
                const hh=Math.floor(time.ariTime/3600);
                setInputText(hh.toString().padStart(2,'0'));
                break;
            }
            case 2:{
                if(time.depTime<0){
                    if(refTime<0){
                        setInputText("");
                        break;
                    }
                    const hh=Math.floor(refTime/3600);
                    setInputText(hh.toString().padStart(2,'0'));
                    break;
                }
                const hh=Math.floor(time.depTime/3600);
                //発時刻
                setInputText(hh.toString().padStart(2,'0'));
                break;
            }
        }
    }, [type,time]);
    return{
        open,
        setOpen,
        time,
        setTime,
        inputText,
        setInputText,
        type,
        setType,
        appendText,
        setRefTime

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
    //ひとつ次の行に移動します。
    function moveToNextRow(stations:Station[],direction:number){
        console.log(selectedStationIdx, selectedType);
        const sIdx=selectedStationIdx;
        if(direction===0) {
            switch (selectedType) {
                case 0:
                    if(stations[sIdx].showDep[direction]){
                        console.log(0);
                        setSelectedType(()=>2);
                        return;
                    }
                    console.log(1);
                case 2:
                    //次の駅の到着or発車のうち存在する方を選択
                    for(let i=sIdx+1;i<stations.length;i++){
                        console.log(stations[i],direction);
                        if(stations[i].showArr[direction]){
                            console.log(i);
                            setSelectedStationIdx(()=>i);
                            setSelectedType(()=>0);
                            return;
                        }
                        if(stations[i].showDep[direction]){
                            console.log(i);
                            setSelectedStationIdx(()=>i);
                            setSelectedType(()=>2);
                            return;
                        }
                    }
                    setSelectedStationIdx(-1);
                    setSelectedType(-1);
                    break;
            }
        }

    }
    function moveToPrevRow(stations:Station[],direction:number){
        console.log(selectedStationIdx, selectedType);
        const sIdx=selectedStationIdx;
        if(direction===0) {
            switch (selectedType) {
                case 2:
                    if(stations[sIdx].showArr[direction]){
                        setSelectedType(()=>0);
                        return;
                    }
                    console.log(1);
                case 0:
                    //前の駅の到着or発車のうち存在する方を選択
                    for(let i=sIdx-1;i>=0;i--){
                        if(stations[i].showDep[direction]){
                            console.log(i);
                            setSelectedStationIdx(()=>i);
                            setSelectedType(()=>2);
                            return;
                        }
                        if(stations[i].showArr[direction]){
                            console.log(i);
                            setSelectedStationIdx(()=>i);
                            setSelectedType(()=>0);
                            return;
                        }
                    }
                    setSelectedStationIdx(-1);
                    setSelectedType(-1);
                    break;
            }
        }

    }
    function moveTrainDiff(trainDiff:number){
        setSelectedTrainIdx((prev)=>prev+trainDiff);
    }

    return{
        selectedTrainIdx,
        selectedStationIdx,
        selectedType,
        setSelectedTime,
        byTrainIdx,
        moveToNextRow,
        moveToPrevRow,
        moveTrainDiff
    }


}