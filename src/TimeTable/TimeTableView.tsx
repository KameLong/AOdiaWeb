import React, {useContext, useEffect, useState} from "react";
import {TimeTableTrainView} from "./TimeTableTrainView.tsx";
import {HolizontalBoxList} from "./HolizontalBoxList.tsx";
import {TimeTableStationView} from "./TimeTableStationView.tsx";
import {TimeTableTrainNameView} from "./timeTableTrainNameView.tsx";
import {LineFile} from "../DiaData/DiaData.ts";
import {TimeTableViewHook} from "./TimeTableViewHook.ts";
import {TimeTablePageContext} from "./TimeTablePage.tsx";

export interface TimeTablePageSetting{
    fontSize:number,
    lineHeight:number,
}

interface TimeTableViewProp{
    lineFile:LineFile;
    diaIdx:number;
    direction:number;
    onStationSelected?:(name:string,stationIndex:number)=>void;
}
export function TimeTableView({lineFile,diaIdx,direction,onStationSelected}:TimeTableViewProp) {
    const [timetableSetting,setTimetableSetting] = useState<TimeTablePageSetting>({
        fontSize:14,
        lineHeight:1.1
    });

    let setScrollX:undefined|((scrollX:number)=>void)=undefined;
    let setScrollX2:undefined|((scrollX:number)=>void)=undefined;

    const lineHeight=timetableSetting.lineHeight*timetableSetting.fontSize;
    const fontSize=timetableSetting.fontSize;
    const width=2.2*timetableSetting.fontSize;
    const stationNameWidth=4*timetableSetting.fontSize;

    const trains=lineFile.diagram[diaIdx].trains[direction];

    const hook=useContext(TimeTablePageContext);

    useEffect(() => {
        const stationTime=trains[hook.timeSelected.selectedTrainIdx]?.times[hook.timeSelected.selectedStationIdx];
        if(stationTime===undefined){
            hook.editTime.setTime({depTime: -1, ariTime: -1, stopType: 0});
            return;
        }
        hook.editTime.setTime(stationTime);
    }, [hook.timeSelected.selectedTrainIdx,hook.timeSelected.selectedStationIdx]);



    if(trains.length==0){
        return(<div></div>)
    }


    const TrainView = ( index:number, style:any) => {
        const train=trains[index];
        const selected=false;
        return (
            <div key={index} className={selected?"selected":""} style={style}>
                <TimeTableTrainView
                    train={train}
                    selected={hook.timeSelected.byTrainIdx(index)}
                    direction={direction}
                    station={lineFile.stations}
                    type={lineFile.trainType[train.trainTypeId]}
                    setting={timetableSetting}
                    onClicked={(stationIdx,type)=>{
                        if(hook.timeSelected.selectedTrainIdx===index&&hook.timeSelected.selectedStationIdx===stationIdx&&hook.timeSelected.selectedType===type) {
                            hook.timeSelected.setSelectedTime(-1, -1, -1);
                        }else {
                            hook.timeSelected.setSelectedTime(index, stationIdx, type);
                        }
                    }
                }>
                </TimeTableTrainView>
            </div>
        );
    }
    const TrainNameView = ( index:number, style:any) => {
        const train=trains[index];
        const selected=false;
        return (
            <div key={index} className={selected?"selected":""} style={style}>
                <TimeTableTrainNameView
                    train={train}
                    type={lineFile.trainType[train.trainTypeId]}
                                        setting={timetableSetting}></TimeTableTrainNameView>
            </div>
        );
    }

    return (

        <div style={{
            background: 'white',
            width: '100%',
            height: '100%',
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,

        }}>
            <div style={{
                display: "flex",
                width: '100%',
                height: '100%',
                zIndex: 5,
            }}>
                <div style={{
                    height: '100%',
                    width: `${stationNameWidth}px`,
                    overflow: 'hidden',
                    position: 'relative'
                }}>

                    <div style={{
                        width: `${stationNameWidth}px`,
                        borderRight: "2px solid black",
                        borderBottom: "2px solid black",
                        position: "absolute",
                        height: `${100}px`,
                        background: "white",
                        zIndex: 20
                    }}>
                        {/*<StationHeaderView setting={setting}/>*/}
                    </div>
                    <div style={{
                        width: `${stationNameWidth}px`,
                        borderRight: "2px solid black",
                        position: 'absolute',
                        zIndex: 1,
                        paddingTop: `${100}px`,
                        overflow: 'hidden',
                        background: "white"

                    }} id="stationViewLayout">
                        <TimeTableStationView
                            stations={lineFile.stations}
                            direction={direction}
                            lineHeight={lineHeight}
                            onDblClick={(station, index: number) => {
                                onStationSelected?.(station.name, index);
                            }}
                        />
                    </div>
                </div>
                <div style={{
                    width: '0px', flexShrink: 1, flexGrow: 1, paddingRight: '10px',
                    display: 'flex', flexDirection: 'column'
                }}>
                    <div
                        style={{
                            overflowX: "hidden",
                            width: '100%',
                            height: 100
                        }}
                    >
                        <HolizontalBoxList
                            itemCount={trains.length}
                            itemSize={(fontSize * 2.2)}
                            getSetScrollX={(_setScrollX) => {
                                setScrollX2 = _setScrollX;
                            }}
                            onScroll={(_scrollX, scrollY) => {
                                setScrollX?.(_scrollX);
                            }}
                        >
                            {TrainNameView}
                        </HolizontalBoxList>
                    </div>

                    <div
                        style={{
                            flexGrow: 1,
                            height: 0,
                            overflowX: "hidden",
                            width: '100%',
                        }}
                    >
                        <HolizontalBoxList
                            itemCount={trains.length}
                            itemSize={(fontSize * 2.2)}
                            onScroll={(_scrollX, scrollY) => {
                                const stationViewLayout = document.getElementById("stationViewLayout")
                                if (stationViewLayout !== null) {
                                    stationViewLayout.style.top = -scrollY + "px";
                                }
                                setScrollX2?.(_scrollX);
                            }}
                            getSetScrollX={(_setScrollX) => {
                                setScrollX = _setScrollX;
                            }
                            }

                        >
                            {TrainView}
                        </HolizontalBoxList>
                    </div>

                </div>

            </div>
            <div style={{height: '10px'}}></div>

        </div>


    )


}