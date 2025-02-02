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
    const trainTypes=webOuDia.diaData[diaIndex].trainType;
    const editTrainType=webOuDia.getEditLineFile(diaIndex).getEditTrainType;

    const snackbar=webOuDia.snackbar;
    // const [trainTypes,setTrainTypes]=React.useState<TrainType[]>(webOuDia.diaData[diaIndex].trainType);
    useEffect(()=>{
        if(trainTypes.length===0){
            addType(0);
        }
    },[trainTypes.length]);

    function addType(index:number){
        editTrainType(index).addTrainType({
            name: "",
            shortName: "",
            trainColor: "#000000",
            lineColor: "#000000",
            fontIdx: 0,
            lineWeight: 1,
            lineType: 0,
            shoudDrawStopMark: false,
        },index);
    }
    function deleteStation(index:number){
        const res=editTrainType(index).removeTrainType(index);
        if(!res){
            snackbar.setMessage("この種別は現在使用されているため、削除できません。")

        }

    }
    function setTrainType(type:TrainType,index:number){
        editTrainType(index).setTrainType(prev=>{
            return type;
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
                                    addType(index);

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
                                                addType(index + 1);
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
                                                   color={trainType.lineColor}
                                                   onChange={(color) => {
                                                       setTrainType({...trainType, lineColor: color}, index);
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
                                        {/*<MenuItem value={20}>破線</MenuItem>*/}
                                        {/*<MenuItem value={10}>点線</MenuItem>*/}
                                        {/*<MenuItem value={30}>一点鎖線</MenuItem>*/}
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