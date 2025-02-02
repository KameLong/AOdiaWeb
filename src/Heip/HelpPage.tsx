import React, {useEffect} from "react";
import {List, ListItem, Paper, Typography} from "@mui/material";
import {WebOuDia} from "../App.tsx";

export function HelpPage({webOuDia}:{webOuDia:WebOuDia}){
    useEffect(() => {
        webOuDia.setAppTitle("ヘルプ")
    }, []);
    // @ts-ignore
    const version=import.meta.env.VITE_APP_VERSION;
    return (
        <>
            <Paper sx={{mx: 2, px: 2}}>
                <h3>version & 履歴</h3>
                現在のversion:{version}
                <List>
                    <ListItem>
                        <div>
                            <Typography variant={'h6'} component="div">
                                2025/02/02 v0.1.0
                            </Typography>
                            <Typography component="div" sx={{ml: 2}}>
                                ダイヤグラムViewを実装
                            </Typography>
                        </div>
                    </ListItem>
                    <ListItem>
                        <div>
                            <Typography variant={'h6'} component="div">
                                2025/01/26 v0.0.0
                            </Typography>
                            <Typography component="div" sx={{ml: 2}}>
                                時刻表Viewを実装
                            </Typography>
                        </div>
                    </ListItem>

                </List>

            </Paper>

        </>
    )
}