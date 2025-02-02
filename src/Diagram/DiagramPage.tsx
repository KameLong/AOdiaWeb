

import React, { useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {DiagramView} from "./DiagramView.tsx";
import {useDiagramViewHook2} from "./hook/DiagramHook.ts";
import {WebOuDia} from "../App.tsx";



interface DiagramPageProps {
    webOuDia:WebOuDia;
}

export function DiagramPage({webOuDia}:DiagramPageProps) {
    const params = useParams<{ lineID: string,diaIdx:string }>();
    const lineID = Number.parseInt(params.lineID??"0");
    const diaIdx = Number.parseInt(params.diaIdx??"0");
    const {diaStations, downLines, upLines} = useDiagramViewHook2(webOuDia.diaData[lineID],diaIdx);
    const navigate=useNavigate();
    useEffect(()=>{
            webOuDia.setAppTitle("ダイヤグラム "+webOuDia.diaData[lineID].diagram[diaIdx].name);
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

    return (
        <>
            <div style={{height:'100%',
            overflow:'hidden'}}>
            <DiagramView
                routeStations={diaStations}
                upLines={upLines}
                downLines={downLines}
            ></DiagramView>
            </div>
        </>


    );
}





