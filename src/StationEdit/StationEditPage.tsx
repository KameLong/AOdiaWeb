import {Box, Button, Checkbox, Divider, FormControlLabel, Paper, TextField, Typography} from "@mui/material";
import {WebOuDia} from "../App.tsx";
import React, {useEffect} from "react";
import {LineFile, Station} from "../DiaData/DiaData.ts";
import {useNavigate} from "react-router-dom";
import Add from "@mui/icons-material/Add";
import {Delete} from "@mui/icons-material";

interface StationEditPageProps{
    webOuDia: WebOuDia;
}


export function StationEditPage({webOuDia}:StationEditPageProps){
    const diaIndex=0;
    const navigate = useNavigate();
    const [stations,setStations]=React.useState<Station[]>(webOuDia.diaData[diaIndex].stations);
    useEffect(()=>{
        if(stations.length===0){
            addStation(0);
        }
    },[stations.length]);
    useEffect(()=> {
        setStations(webOuDia.diaData[diaIndex].stations);
        console.log(webOuDia.diaData[0]);
    },[webOuDia.diaData[0]]);

    useEffect(()=>{
        const fn=()=>{
            console.log("SaveButtonClicked");
            webOuDia.setDiaData(prev=>{
                console.log(prev[0].stations);
                const newDiaData=[...prev];
                newDiaData[diaIndex]={...newDiaData[diaIndex]};
                newDiaData[diaIndex].stations=stations;
                return newDiaData;
            });
        };
        webOuDia.webOuDiaEvent.addEventListener("onSaveButtonClicked", fn);
        return () => webOuDia.webOuDiaEvent.removeEventListener("onSaveButtonClicked", fn);
    },[webOuDia.webOuDiaEvent]);

    useEffect(()=>{
        //チェックがついている駅を削除します。
        const fn=()=>{
            setStations(prev=>{
                return prev.filter((station)=>!station.checked);
            })
        };
        webOuDia.webOuDiaEvent.addEventListener("onDeleteButtonClicked", fn);
        return () => webOuDia.webOuDiaEvent.removeEventListener("onDeleteButtonClicked", fn);
    },[webOuDia.webOuDiaEvent]);

    useEffect(()=>{
        webOuDia.setShowDeleteIcon(stations.filter((station)=>station.checked).length>0);
    },[stations.filter((station)=>station.checked).length]);



    function setArr(index:number,direct:number,value:boolean){
        setStations(prev=>{
            const newStations=[...prev];
            newStations[index].showArr[direct]=value;
            return newStations;
        });
    }
    function setDep(index:number,direct:number,value:boolean){
        setStations(prev=>{
            const newStations=[...prev];
            newStations[index].showDep[direct]=value;
            return newStations;
        });
    }
    function setMajor(index:number,value:boolean){
        setStations(prev=>{
            const newStations=[...prev];
            newStations[index].isMajor=value;
            return newStations;
        });
    }

    function addStation(index:number){
        setStations(prev=>{
            const newStations=[...prev];
            newStations.splice(index,0,{
                name:"",
                showDep:[true,true],
                showArr:[false,false],
                isMajor:false,
                branchStation:-1,
                checked:false
            });
            return newStations;
        });
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
        setStations(prev=>{
            const newStations=[...prev];
            newStations.splice(index,1);
            if(newStations.length===0){
                newStations.push({
                    name:"",
                    showDep:[true,true],
                    showArr:[false,false],
                    isMajor:false,
                    branchStation:-1,
                    checked:false
                });
            }
            return newStations;
        });
    }


    return (
        <div >
            <Box sx={{pb:10}}>

                {stations.map((station,index)=>{
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
                            <Paper  sx={{m: 1, padding: 2,background: (station.checked ? "lightYellow":"white")}}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >


                            <Typography sx={{mr:2}} >{index}</Typography>


                            <TextField
                                label="駅名"
                                value={station.name}
                                onInput={(event) => {
                                    setStations(prev => {
                                        const newStations = [...prev];
                                        newStations[index].name = (event.target as HTMLInputElement).value;
                                        return newStations;
                                    });
                                }}
                                onFocus={(event) => {
                                    console.log(event);
                                    if(index===stations.length-1) {
                                        addStation(index+1);
                                    }
                                }}
                                fullWidth
                                margin="dense"
                            />
                            <Button onClick={()=>deleteStation(index)}>
                                <Delete></Delete>
                            </Button>
                                </Box>
                            <Divider></Divider>
                            <span style={{marginRight: 10}}>着時刻表示</span>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={station.showArr[0]}
                                        onChange={() => {
                                            setArr(index, 0, !station.showArr[0]);
                                        }}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label={"上り"}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={station.showArr[1]}
                                        onChange={() => {
                                            setArr(index, 1, !station.showArr[1]);
                                        }}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="下り"
                            />
                            <Divider></Divider>
                            <span style={{marginRight: 10}}>発時刻表示</span>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={station.showDep[0]}
                                        onChange={() => {
                                            setDep(index, 0, !station.showDep[0]);
                                        }}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="上り"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={station.showDep[1]}
                                        onChange={() => {
                                            setDep(index, 1, !station.showDep[1]);
                                        }}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label={("下り")}
                            />
                            <Divider></Divider>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={station.isMajor}
                                        onChange={() => {
                                            setMajor(index, !station.isMajor);
                                        }}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label={"主要駅"}
                            />
                        </Paper>

                    </React.Fragment>
                    )
                })}
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', m: 2 }}>
                    {/*<Button onClick={()=>{*/}
                    {/*    const stationID=RandomID();*/}
                    {/*    const station:StationDTO={*/}
                    {/*        stationID:stationID,*/}
                    {/*        companyId:companyID,*/}
                    {/*        name:"駅名",*/}
                    {/*        lat:35,*/}
                    {/*        lon:135*/}
                    {/*    };*/}
                    {/*    setCompany(prev=>{*/}
                    {/*        const newCompany={...prev};*/}
                    {/*        newCompany.stations[stationID]=station;*/}
                    {/*        return newCompany;*/}
                    {/*    });*/}


                    {/*    setRoute(prev=>{*/}
                    {/*        const newRoute={...prev};*/}
                    {/*        newRoute.routeStations.push({*/}
                    {/*            routeStationId:RandomID(),*/}
                    {/*            stationId:stationID,*/}
                    {/*            showStyle:(1<<8)+(1),*/}

                    {/*        });*/}
                    {/*        return newRoute;*/}
                    {/*    })*/}
                    {/*}}>*/}
                    {/*    <Add fontSize={"large"}></Add>*/}
                    {/*</Button>*/}
                </Box>
            </Box>

</div>
    );
}