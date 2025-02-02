import {
    Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Paper,
    Select, TextField, Typography
} from "@mui/material";
import {WebOuDia} from "../App.tsx";
import React, {useEffect} from "react";
import {LineFile, Station, TrainType} from "../DiaData/DiaData.ts";
import {useNavigate} from "react-router-dom";
import Add from "@mui/icons-material/Add";
import {Delete} from "@mui/icons-material";
import { SketchPicker } from "react-color";
import {ColorPickerKL} from "../CMN/ColorPicker.tsx";
import SelectInput from "@mui/material/Select/SelectInput";
interface TrainTypeEditPageProps{
    webOuDia: WebOuDia;
}


export function TrainTypeEditPage({webOuDia}:TrainTypeEditPageProps){
    const diaIndex=0;
    const navigate = useNavigate();
    const [trainTypes,setTrainTypes]=React.useState<TrainType[]>(webOuDia.diaData[diaIndex].trainType);
    useEffect(()=> {
        setTrainTypes(webOuDia.diaData[diaIndex].trainType);
        console.log(webOuDia.diaData[0]);
    },[webOuDia.diaData[0]]);
    useEffect(()=>{
        if(trainTypes.length===0){
            addStation(0);
        }
    },[trainTypes.length]);

    useEffect(()=>{
        const fn=()=>{
            console.log("SaveButtonClicked");
            webOuDia.setDiaData(prev=>{
                const newDiaData=[...prev];
                newDiaData[diaIndex]={...newDiaData[diaIndex]};
                newDiaData[diaIndex].trainType=trainTypes;
                return newDiaData;
            });
        };
        webOuDia.webOuDiaEvent.addEventListener("onSaveButtonClicked", fn);
        return () => webOuDia.webOuDiaEvent.removeEventListener("onSaveButtonClicked", fn);
    },[webOuDia.webOuDiaEvent]);





    // function setArr(index:number,direct:number,value:boolean){
    //     setStations(prev=>{
    //         const newStations=[...prev];
    //         newStations[index].showArr[direct]=value;
    //         return newStations;
    //     });
    // }
    // function setDep(index:number,direct:number,value:boolean){
    //     setStations(prev=>{
    //         const newStations=[...prev];
    //         newStations[index].showDep[direct]=value;
    //         return newStations;
    //     });
    // }
    function setMajor(index:number,value:boolean){
        // setStations(prev=>{
        //     const newStations=[...prev];
        //     newStations[index].isMajor=value;
        //     return newStations;
        // });
    }

    function addStation(index:number){
        // setStations(prev=>{
        //     const newStations=[...prev];
        //     newStations.splice(index,0,{
        //         name:"",
        //         showDep:[true,true],
        //         showArr:[false,false],
        //         isMajor:false,
        //         branchStation:-1,
        //         checked:false
        //     });
        //     return newStations;
        // });
        webOuDia.setDiaData((prev:LineFile[])=>{
            const newDiaData=[...prev];
            newDiaData[diaIndex]={...newDiaData[diaIndex]};
            newDiaData[diaIndex].stations.splice(index,0,{
                name:"",
                showDep:[true,true],
                showArr:[false,false],
                isMajor:false,
                branchStation:-1,
                checked:false
            });
            console.log(newDiaData[diaIndex].stations.length)
            return newDiaData;
        })

        //列車の駅情報にも追加
    }
    function deleteStation(index:number){
        // setStations(prev=>{
        //     const newStations=[...prev];
        //     newStations.splice(index,1);
        //     if(newStations.length===0){
        //         newStations.push({
        //             name:"",
        //             showDep:[true,true],
        //             showArr:[false,false],
        //             isMajor:false,
        //             branchStation:-1,
        //             checked:false
        //         });
        //     }
        //     return newStations;
        // });
    }

    function setTrainType(type:TrainType,index:number){
        setTrainTypes(prev=>{
            const newTrainTypes=[...prev];
            newTrainTypes[index]=type;
            return newTrainTypes;
        });
    }


    return (
        <div >
            <Box sx={{pb:10}}>

                {trainTypes.map((trainType:TrainType,index)=>{
                    return(
                        <React.Fragment key={index}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Button onClick={()=>{
                                    addStation(index);

                                }}>
                                    <Add></Add>
                                </Button>
                            </Box>
                            <Paper sx={{m: 1, padding: 2}}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >

                                    <TextField
                                        size={'small'}
                                        label="種別名"
                                        value={trainType.name}
                                        onInput={(event) => {
                                            setTrainType({...trainType, name: (event.target as HTMLInputElement).value}, index);
                                        }}
                                        onFocus={(event) => {
                                            console.log(event);
                                            if (index === trainTypes.length - 1) {
                                                addStation(index + 1);
                                            }
                                        }}
                                        fullWidth
                                        margin="dense"
                                    />
                                    <TextField
                                        size={'small'}
                                        sx={{ml: 2}}
                                        label="種別略称"
                                        value={trainType.shortName}
                                        onInput={(event) => {
                                            setTrainType({...trainType, shortName: (event.target as HTMLInputElement).value}, index);
                                        }}
                                        fullWidth
                                        margin="dense"
                                    />

                                    <Button onClick={() => deleteStation(index)}>
                                        <Delete></Delete>
                                    </Button>
                                </Box>
                                <Divider></Divider>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span>文字色</span>
                                    <ColorPickerKL style={{flexGrow:'1', height: '30px', margin: '5px 10px'}}
                                                   color={trainType.trainColor}
                                                   onChange={(color) => {
                                                       setTrainType({...trainType, trainColor: color}, index);
                                                   }}></ColorPickerKL>
                                    <span style={{marginLeft:'10px'}}>ダイヤ色</span>
                                    <ColorPickerKL style={{flexGrow:'1', height: '30px', margin: '5px 10px'}}
                                                   color={trainType.trainColor}
                                                   onChange={(color) => {
                                                       setTrainType({...trainType, trainColor: color}, index);
                                                   }}></ColorPickerKL>
                                </Box>
                                <Divider></Divider>
                                <FormControl sx={{mt:2}} fullWidth>
                                    <InputLabel id="demo-simple-select-label">ダイヤ線スタイル</InputLabel>
                                    <Select
                                        size={'small'}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={trainType.lineType}
                                        label="ダイヤ線スタイル"
                                        onChange={(event)=>{
                                            setTrainType({...trainType, lineType: event.target.value as number}, index);
                                        }}
                                    >
                                        <MenuItem value={0}>実線</MenuItem>
                                        <MenuItem value={20}>破線</MenuItem>
                                        <MenuItem value={10}>点線</MenuItem>
                                        <MenuItem value={30}>一点鎖線</MenuItem>
                                    </Select>
                                </FormControl>

                                <Divider></Divider>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={trainType.lineWeight===2}
                                            onChange={(event) => {
                                                setTrainType({...trainType, lineWeight: event.target.checked?2:1}, index);
                                            }}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={"ダイヤ線を太線にする"}
                                />
                            </Paper>

                        </React.Fragment>
                    )
                })}
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', m: 2}}>

                </Box>
            </Box>

</div>
    );
}