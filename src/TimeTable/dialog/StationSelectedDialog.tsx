import React, { useState } from "react";
import {Box, Dialog, List, ListItem, ListItemButton, Paper} from "@mui/material";



// フック名を "useStationSelectedDialog" に変更
export function useStationSelectedDialog() {
    const [open, setOpen] = useState<boolean>(false);
    const [stationName, setStationName] = useState<string>("");
    const [stationIdx, setStationIdx] = useState<number>(0);

    return { open, setOpen, stationName, setStationName, stationIdx, setStationIdx };
}

interface StationSelectedDialogProps {
    hook: ReturnType<typeof useStationSelectedDialog >;
    onSort: (stationIdx: number) => void;
}

export function StationSelectedDialog({
                                          hook,
                                          onSort,
                                      }: StationSelectedDialogProps) {
    const handleSort = () => {
        onSort(hook.stationIdx);
    };

    return (
        <Dialog open={hook.open} onClose={() => hook.setOpen(false)}>
            <Paper>
                <h3>{hook.stationName}</h3>
                <Box>
                    <List>
                        <ListItemButton  onClick={handleSort}>
                            この駅を基準に並び替える。
                        </ListItemButton>
                        <ListItemButton >
                            下り駅時刻表
                        </ListItemButton>
                        <ListItemButton >
                            上り駅時刻表
                        </ListItemButton>
                    </List>
                </Box>
            </Paper>
        </Dialog>
    );
}