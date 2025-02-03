import {Box, Dialog, List, ListItem, Paper} from "@mui/material";
import React, {useState} from "react";

export function hookStationSelectedDialog(){
    const [open,setOpen]=useState<boolean>(false);
    const [stationName,setStationName]=useState<string>("");
    const [stationIdx,setStationIdx]=useState<number>(0);
    return{
        open,
        setOpen,
        stationName,
        setStationName,
        stationIdx,
        setStationIdx
    }
}



export function StationSelectedDialog({hook,onSort}:{onSort:(stationIdx)=>void,hook:ReturnType<typeof hookStationSelectedDialog>}){
    return(
        <Dialog open={hook.open} onClose={()=>hook.setOpen(false)}
        >
            <Paper>
                <h3>{hook.stationName}</h3>
                <Box>
                    <List>
                        <ListItem onClick={()=>{
                            onSort(hook.stationIdx);
                        }}>
                            この駅を基準に並び替える。
                        </ListItem>
                        <ListItem>
                            下り駅時刻表
                        </ListItem>
                        <ListItem>
                            上り駅時刻表
                        </ListItem>
                    </List>
                </Box>

            </Paper>
        </Dialog>
    )
}