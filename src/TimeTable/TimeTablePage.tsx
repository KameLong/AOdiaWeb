import {WebOudContext, WebOuDia} from "../App.tsx";
import {useNavigate, useParams} from "react-router-dom";
import { TimeTableView } from "./TimeTableView.tsx";
import React, {createContext, useCallback, useContext, useEffect} from "react";
import {useStationSelectedDialog, StationSelectedDialog} from "./dialog/StationSelectedDialog.tsx";
import {TimeEditDialog} from "./dialog/TimeEditDialog.tsx";
import {TimeTableViewHook} from "./TimeTableViewHook.ts";
import {StationTime} from "../DiaData/DiaData.ts";


export const TimeTablePageContext = createContext<ReturnType<typeof TimeTableViewHook>>(null);

export function TimeTablePage(){
    const param = useParams<{ lineID: string, diaIdx: string, direct: string }>();
    const navigate=useNavigate();
    const webOuDia=useContext(WebOudContext);
    const lineID= parseInt(param.lineID ?? "0");
    const diaIdx = parseInt(param.diaIdx ?? "0");
    const direct = parseInt(param.direct ?? "0");

    const lineFile=webOuDia.diaData[lineID];
    const editLineFile=webOuDia.getEditLineFile(lineID);
    const diagram=lineFile.diagram[diaIdx];
    const trainTypes=lineFile.trainType;
    const snackbar=webOuDia.snackbar;
    const timetableViewHook = TimeTableViewHook();
    const onEnterClicked = useCallback((event:CustomEvent<StationTime>) => {
        // 最新のstateを使って処理を行う
        const trainIdx=timetableViewHook.timeSelected.selectedTrainIdx;
        const train = timetableViewHook.timeSelected.selectedTrainIdx !== undefined
            ? diagram.trains[direct][trainIdx]
            : null;
        if (!train) return;
        const stationIdx = timetableViewHook.timeSelected.selectedStationIdx;
        const editStation=webOuDia.getEditLineFile(lineID).getEditDiagram(diaIdx).getEditTrain(direct,trainIdx).getEditStationTime(stationIdx)
        editStation.setStationTime(event.detail);
        console.log(event.detail);
        timetableViewHook.timeSelected.moveToNextRow(lineFile.stations, direct);
    }, [
        timetableViewHook.timeSelected.selectedTrainIdx,
        timetableViewHook.timeSelected.selectedStationIdx,
        diagram,
        direct,
        lineFile.stations,
    ]);

    const onRightClicked = useCallback(() => {
        // 最新のstateを使って処理を行う
        const trainIdx=timetableViewHook.timeSelected.selectedTrainIdx;
        console.log(trainIdx);
        timetableViewHook.timeSelected.setSelectedTime(trainIdx+1,timetableViewHook.timeSelected.selectedStationIdx,timetableViewHook.timeSelected.selectedType);
    }, [
        timetableViewHook.timeSelected.selectedTrainIdx,
        timetableViewHook.timeSelected.selectedStationIdx,
    ]);
    const onLeftClicked = useCallback(() => {
        // 最新のstateを使って処理を行う
        const trainIdx=timetableViewHook.timeSelected.selectedTrainIdx;
        console.log(trainIdx);
        timetableViewHook.timeSelected.setSelectedTime(trainIdx-1,timetableViewHook.timeSelected.selectedStationIdx,timetableViewHook.timeSelected.selectedType);
    }, [
        timetableViewHook.timeSelected.selectedTrainIdx,
        timetableViewHook.timeSelected.selectedStationIdx,
    ]);




    const stationSelectedDialog=useStationSelectedDialog();
    useEffect(()=>{
        console.log("useEffect");
        if(direct===0){
            webOuDia.setAppTitle("下り時刻表 "+diagram.name);
        }else{
            webOuDia.setAppTitle("上り時刻表 "+diagram.name);
        }
        const onDownTimeTableButton=()=>{
            navigate(`/timetable/${lineID}/${diaIdx}/${0}`);
        }
        const onUpTimeTableButton=()=>{
            navigate(`/timetable/${lineID}/${diaIdx}/${1}`);
        }
        const onDiagramButton=()=>{
            navigate(`/diagram/${lineID}/${diaIdx}`);
        }




        webOuDia.setShowBottomIcon(true);
        webOuDia.webOuDiaEvent.addEventListener("onDownTimeTableButtonClicked",onDownTimeTableButton);
        webOuDia.webOuDiaEvent.addEventListener("onUpTimeTableButtonClicked",onUpTimeTableButton);
        webOuDia.webOuDiaEvent.addEventListener("onDiagramButtonClicked",onDiagramButton);
        return ()=>{
            webOuDia.webOuDiaEvent.removeEventListener("onDownTimeTableButtonClicked",onDownTimeTableButton);
            webOuDia.webOuDiaEvent.removeEventListener("onUpTimeTableButtonClicked",onUpTimeTableButton);
            webOuDia.webOuDiaEvent.removeEventListener("onDiagramButtonClicked",onDiagramButton);

            webOuDia.setShowBottomIcon(false);
        }
    },[]);
    useEffect(() => {
        webOuDia.webOuDiaEvent.addEventListener("onEnterClicked",onEnterClicked);
        return ()=>{
            webOuDia.webOuDiaEvent.removeEventListener("onEnterClicked",onEnterClicked);
        }
    }, [onEnterClicked]);



    const handleKeyDown=useCallback((event:KeyboardEvent) => {
        console.log(event.key);
            switch(event.key){
                case "ArrowRight":
                    timetableViewHook.timeSelected.moveTrainDiff(1);
                    event.preventDefault();
                    break;
                case "ArrowLeft":
                    timetableViewHook.timeSelected.moveTrainDiff(-1);
                    event.preventDefault();
                    break;

                case "ArrowDown":
                    timetableViewHook.timeSelected.moveToNextRow(lineFile.stations, direct);
                    event.preventDefault();
                    break;
                case "ArrowUp":
                    timetableViewHook.timeSelected.moveToPrevRow(lineFile.stations, direct);
                    event.preventDefault();
                    break;
            }
    },[timetableViewHook.timeSelected])


    useEffect(() => {
            // コンポーネントがマウントされたときにイベントリスナーを登録
            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        // クリーンアップ: コンポーネントがアンマウントされる際にイベントリスナーを解除
    }, [handleKeyDown]); // 空の依存配列で初回マウント時のみ登録



    return (
        <TimeTablePageContext.Provider value={timetableViewHook}>
        <div style={{height:'100%',display:"flex", flexDirection: "column"}}>
            <TimeTableView lineFile={lineFile} diaIdx={diaIdx} direction={direct}
                            onStationSelected={(name,stationIdx)=> {
                                console.log(name,stationIdx);
                                stationSelectedDialog.setOpen(true);
                                stationSelectedDialog.setStationName(name);
                                stationSelectedDialog.setStationIdx(stationIdx);
                            }}
            ></TimeTableView>
            <StationSelectedDialog hook={stationSelectedDialog}
             onSort={(stationIdx:number)=>{
                 editLineFile.getEditDiagram(diaIdx).sortTrainsByStation(direct,stationIdx);
                 snackbar.setMessage("現在実装中です");
             }}/>
            <TimeEditDialog>

            </TimeEditDialog>
        </div>
        </TimeTablePageContext.Provider>
    )

}