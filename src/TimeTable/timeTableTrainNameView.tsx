import React from "react";
import {MatchTextLabel} from "./MatchTextLabel.tsx";
import {Train, TrainType} from "../DiaData/DiaData.ts";
import {TimeTablePageSetting} from "./TimeTableView.tsx";

interface TimeTableTrainNameViewProps {
    train:Train;
    setting:TimeTablePageSetting;
    type:TrainType;


}

export function TimeTableTrainNameView({train,setting,type}:TimeTableTrainNameViewProps){
    const viewHeight=setting.fontSize*4;
    const divWidth=setting.fontSize*2.2;



    return(
        <div style={{lineHeight:setting.lineHeight,borderRight: '1px solid black', width: divWidth,height:100, color: type.trainColor,borderBottom: '2px gray solid'}}>
            <MatchTextLabel>
                {"　"}
            </MatchTextLabel>
            <div style={{borderBottom: '1px gray solid'}}></div>
            <MatchTextLabel style={{height:setting.lineHeight*setting.fontSize}}>
                {type.shortName}
            </MatchTextLabel>
            <div style={{borderBottom: '1px gray solid'}}></div>
            <div style={{height: viewHeight}} >
            </div>
        </div>
    )
}