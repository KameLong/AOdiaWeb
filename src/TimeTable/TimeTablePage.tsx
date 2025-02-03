import {WebOuDia} from "../App.tsx";
import {useNavigate, useParams} from "react-router-dom";
import { TimeTableView } from "./TimeTableView.tsx";
import {useEffect} from "react";
import {hookStationSelectedDialog, StationSelectedDialog} from "./dialog/StationSelectedDialog.tsx";

interface TimetablePageProps{

    webOuDia:WebOuDia;
}


export function TimeTablePage({webOuDia}:TimetablePageProps){
    const param = useParams<{ lineID: string, diaIdx: string, direct: string }>();
    const navigate=useNavigate();

    const lineID= parseInt(param.lineID ?? "0");
    const diaIdx = parseInt(param.diaIdx ?? "0");
    const direct = parseInt(param.direct ?? "0");

    const lineFile=webOuDia.diaData[lineID];
    const editLineFile=webOuDia.getEditLineFile(lineID);
    const diagram=lineFile.diagram[diaIdx];
    const stations=lineFile.stations;
    const trainTypes=lineFile.trainType;
    const snackbar=webOuDia.snackbar;

    const stationSelectedDialog=hookStationSelectedDialog();
    useEffect(()=>{
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
    })



    console.log(diagram);

    return (
        <div style={{height:'100%'}}>
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
                 // editLineFile.getEditDiagram(diaIdx).sortTrainsByStation(direct,stationIdx);
                 snackbar.setMessage("現在実装中です");
             }}/>
        </div>
    )

}