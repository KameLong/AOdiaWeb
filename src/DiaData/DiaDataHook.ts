import {useState} from "react";
import {Diagram, LineFile, Station, StationTime, Train, TrainType} from "./DiaData.ts";


export interface useLineFileReturn{
    lineFiles:{[key:number]:LineFile};
    setLineFiles:(lineFiles:{[key:number]:LineFile})=>void;
    getEditLineFile:(lineID:number)=>EditLineFileReturn;
}
export interface EditLineFileReturn{
    lineFile:LineFile;
    setLineFile:(func:(prev:LineFile)=>LineFile)=>void;
    editStations:(stations:Station[])=>void;
    addStation:(station:Station,idx:number)=>void;
    removeStation:(idx:number)=>void;
    editStation:(station:Station,idx:number)=>void;
    getEditTrainType:(typeIdx:number)=>ReturnType<typeof editTrainType>;
    getEditDiagram:(diaIdx:number)=>ReturnType<typeof editDiagram>;

}
export function editLineFile():useLineFileReturn{
    const [lineFiles, setLineFiles] = useState<{[key:number]:LineFile}>({0: {
        name:"サンプル路線名",
        stations: [{
            name: "駅A",
            showArr: [false, false],
            showDep: [true, true],
            branchStation: -1,
            isMajor: false,
            checked: false
        }, {
            name: "駅B",
            showArr: [false, false],
            showDep: [true, true],
            branchStation: -1,
            isMajor: false,
            checked: false
        }],
        trainType: [{
            name: "普通",
            shortName: "普通",
            trainColor: "#000000",
            lineColor   : "#000000",
            fontIdx: 0,
            lineWeight:1,
            lineType:0,
            shoudDrawStopMark:false,
        }],
        diagram:[{
            trains:[[{
                trainTypeId:0,
                times:[{
                    depTime:3600*12,
                    ariTime:-1,
                    stopType:1,
                },{
                    depTime:-1,
                    ariTime:3600*12+600,
                    stopType:1,
                }],
                name:"train1",
                num:"1",
                comment:""

            }],[{
                trainTypeId:0,
                times:[{
                    depTime:3600*12+1500,
                    ariTime:-1,
                    stopType:1,
                },{
                    depTime:-1,
                    ariTime:3600*12+900,
                    stopType:1,
                }],
                name:"train1",
                num:"1",
                comment:""

            }]],
            name:"平日",
        }]
    }});
    function getEditLineFile(lineID:number):EditLineFileReturn{
        const lineFile=lineFiles[lineID];


        function setLineFile(func:(prev:LineFile)=>LineFile){
            setLineFiles((prev)=>{
                return {...prev,[lineID]:func(prev[lineID])}
            });
        }
        function editStations(stations:Station[]){
            setLineFile(()=>{
                return {...lineFile,stations:stations}
            });
        }
        function addStation(station:Station,idx:number){
            const newStations=[...lineFile.stations];
            newStations.splice(idx,0,station);
            editStations(newStations);
            // 全ての列車の時刻表に新しい駅を追加
            for(let i=0;i<lineFile.diagram.length;i++){
                const ed=editDiagram(lineFile,setLineFile,i);
                for(let j=0;j<lineFile.diagram[i].trains[0].length;j++){
                    const train=ed.getEditTrain(0,j);
                    train.setTrain(prev=>{
                        const newTimes=[...prev.times];
                        newTimes.splice(idx,0,{depTime:-1,ariTime:-1,stopType:1});
                        return {...prev,times:newTimes};
                    });
                }
                for(let j=0;j<lineFile.diagram[i].trains[1].length;j++){
                    const train=ed.getEditTrain(1,j);
                    train.setTrain(prev=>{
                        const newTimes=[...prev.times];
                        newTimes.splice(idx,0,{depTime:-1,ariTime:-1,stopType:1});
                        return {...prev,times:newTimes};
                    });
                }
            }

        }
        function removeStation(idx:number){
            const newStations=[...lineFile.stations];
            newStations.splice(idx,1);
            editStations(newStations);
            // 全ての列車の時刻表から駅を削除
            for(let i=0;i<lineFile.diagram.length;i++){
                const ed=editDiagram(lineFile,setLineFile,i);
                for(let j=0;j<lineFile.diagram[i].trains[0].length;j++){
                    const train=ed.getEditTrain(0,j);
                    train.setTrain(prev=>{
                        const newTimes=[...prev.times];
                        newTimes.splice(idx,1);
                        return {...prev,times:newTimes};
                    });
                }
                for(let j=0;j<lineFile.diagram[i].trains[1].length;j++){
                    const train=ed.getEditTrain(1,j);
                    train.setTrain(prev=>{
                        const newTimes=[...prev.times];
                        newTimes.splice(idx,1);
                        return {...prev,times:newTimes};
                    });
                }
            }
        }
        function editStation(station:Station,idx:number){
            const newStations=[...lineFile.stations];
            newStations.splice(idx,1,station);
            editStations(newStations);
        }
        function getEditDiagram(diaIdx:number){
            return editDiagram(lineFile,setLineFile,diaIdx);
        }
        function getEditTrainType(typeIdx:number){
            return editTrainType(getEditLineFile(lineID),lineFile,setLineFile,typeIdx);
        }



        return {
            lineFile:lineFiles[lineID],
            setLineFile,
            editStations,
            addStation,
            removeStation,
            editStation,
            getEditTrainType,
            getEditDiagram
        }
    }


    //駅追加
    return {lineFiles,setLineFiles,getEditLineFile};
}

export function editTrain(diagram:Diagram,setDiagram:(func:(prev:Diagram)=>Diagram)=>void,direction:number,trainIdx:number){
    const train=diagram.trains[direction][trainIdx];
    function editTrain(train:Train){
        setDiagram((prev)=>{
            console.log(prev.trains[0][0].times);

            const newTrains=[[...prev.trains[0]],[...prev.trains[1]]];
            newTrains[direction].splice(trainIdx,1,train);
            return {...prev,trains:newTrains};
        });
    }
    function setTrain(func:(prev:Train)=>Train){
        setDiagram((prev)=>{
            const newTrains=[[...prev.trains[0]],[...prev.trains[1]]];
            newTrains[direction].splice(trainIdx,1,func(prev.trains[direction][trainIdx]));
            return {...prev,trains:newTrains};
        });
    }
    function addTrain(train:Train,idx:number){
        setDiagram((prev)=> {
            const newTrains=[[...prev.trains[0]],[...prev.trains[1]]];
            newTrains[direction].splice(trainIdx,0,train);
            return {...prev,trains:newTrains};
        });

    }
    function removeTrain(idx:number){
        setDiagram((prev)=> {
            const newTrains=[[...prev.trains[0]],[...prev.trains[1]]];
            newTrains[direction].splice(trainIdx,1);
            return {...prev,trains:newTrains};
        });
    }
    function getEditStationTime(stationIdx:number){
        return editStationTime(train,setTrain,stationIdx);
    }
    return{
        train,
        setTrain,
        addTrain,
        removeTrain,
        getEditStationTime
    }
}

export function editStationTime(train:Train,setTrain:(func:(prev:Train)=>Train)=>void,stationIdx:number){
    function setStationTime(st:StationTime){
        setTrain(prev=>{
            const next={...prev};
            next.times=[...next.times];
            next.times[stationIdx]=st;
            return next;
        });
    }
    return{
        setStationTime

    }
}

export function editDiagram(lineFile:LineFile,setLineFile: (func:(prev:LineFile)=>LineFile)=>void,diaIdx:number){
//    const diagram=lineFile.diagram[diaIdx];
    function setDiagram(func:(prev:Diagram)=>Diagram){
        setLineFile((prev)=>{
            const newDiagram=[...prev.diagram];
            newDiagram.splice(diaIdx,1,func(prev.diagram[diaIdx]));
            return {...prev,diagram:newDiagram};
        });
    }
    function addDiagram(diagram:Diagram,idx:number){
        setLineFile((prev)=> {
            const newDiagram=[...prev.diagram];
            newDiagram.splice(idx,0,diagram);
            return {...prev, diagram: newDiagram};
        });
    }
    function removeDiagram(idx:number){
        setLineFile((prev)=> {
            const newDiagram=[...prev.diagram];
            newDiagram.splice(idx,1);
            return {...prev, diagram: newDiagram};
        });
    }
    function getEditTrain(direction:number,trainIdx:number){
        return editTrain(lineFile.diagram[diaIdx],setDiagram,direction,trainIdx);
    }

    /**
     * 指定駅で並び替えを行います
     */
    function sortTrainsByStation(direction:number,stationIdx:number){
        setDiagram((prev)=>{
            const newTrains=[[...prev.trains[0]],[...prev.trains[1]]];
            newTrains[direction].sort((a,b)=>{
                return a.times[stationIdx].depTime-b.times[stationIdx].depTime;
            });
            return {...prev,trains:newTrains};
        });
    }
    return{
        setDiagram,
        addDiagram,
        removeDiagram,
        getEditTrain,
        sortTrainsByStation
    }


}

export function editTrainType(editLine:EditLineFileReturn,lineFile:LineFile,setLineFile: (func:(prev:LineFile)=>LineFile)=>void,typeIdx:number){
    function setTrainType(func:(prev:TrainType)=>TrainType){
        setLineFile((prev)=>{
            const newTypes=[...prev.trainType];
            newTypes.splice(typeIdx,1,func(prev.trainType[typeIdx]));
            return {...prev,trainType:newTypes};
        });
    }
    function addTrainType(type:TrainType,idx:number){
        //種別idxのインクリメント

        for(let i=0;i<lineFile.diagram.length;i++) {
            for (let j = 0; j < lineFile.diagram[i].trains[0].length; j++) {
                if (lineFile.diagram[i].trains[0][j].trainTypeId >= idx) {
                    const ed=editLine.getEditDiagram(i).getEditTrain(0,j);
                    ed.setTrain(prev=>{
                        const newTrain={...prev};
                        newTrain.trainTypeId=prev.trainTypeId+1;
                        return newTrain;
                    });
                }
                if (lineFile.diagram[i].trains[1][j].trainTypeId >= idx) {
                    const ed=editLine.getEditDiagram(i).getEditTrain(1,j);
                    ed.setTrain(prev=>{
                        const newTrain={...prev};
                        newTrain.trainTypeId=prev.trainTypeId+1;
                        return newTrain;
                    });
                }
            }
        }

        setLineFile((prev)=> {
            const newTypes=[...prev.trainType];
            newTypes.splice(idx,0,type);
            return {...prev, trainType: newTypes};
        });

    }

    /**
     * 種別削除
     * @param idx
     * @returns 削除成功したか
     */
    function removeTrainType(idx:number):boolean{
        //現在使用されているかの判定
        for(let i=0;i<lineFile.diagram.length;i++) {
            for (let j = 0; j < lineFile.diagram[i].trains[0].length; j++) {
                if (lineFile.diagram[i].trains[0][j].trainTypeId === idx) {
                    return false;
                }
                if (lineFile.diagram[i].trains[1][j].trainTypeId === idx) {
                    return false;
                }
            }
        }

        //種別idxのデクリメント
        for(let i=0;i<lineFile.diagram.length;i++) {
            for (let j = 0; j < lineFile.diagram[i].trains[0].length; j++) {
                if (lineFile.diagram[i].trains[0][j].trainTypeId > idx) {
                    const ed=editLine.getEditDiagram(i).getEditTrain(0,j);
                    ed.setTrain(prev=>{
                        const newTrain={...prev};
                        newTrain.trainTypeId=prev.trainTypeId-1;
                        return newTrain;
                    });
                }
                if (lineFile.diagram[i].trains[1][j].trainTypeId > idx) {
                    const ed=editLine.getEditDiagram(i).getEditTrain(1,j);
                    ed.setTrain(prev=>{
                        const newTrain={...prev};
                        newTrain.trainTypeId=prev.trainTypeId-1;
                        return newTrain;
                    });
                }
            }
        }

        setLineFile((prev)=> {
            const newTypes=[...prev.trainType];
            newTypes.splice(idx,1);
            return {...prev, trainType: newTypes};
        });
        return true;
    }
    return{
        setTrainType,
        addTrainType,
        removeTrainType
    }

}