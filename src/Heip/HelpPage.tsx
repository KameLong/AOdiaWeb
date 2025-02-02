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
            <Paper sx={{mx: 2,mt:2, p:3 }}>
                <h3>不具合が発生した場合は</h3>
                <Typography>
                    以下のリンクから不具合内容を書いたissueを作成してください
                </Typography>
                <a href="https://github.com/KameLong/AOdiaWeb/issues">https://github.com/KameLong/AOdiaWeb/issues</a>


            </Paper>

            <Paper sx={{mx: 2, px: 2}}>
                <h3>version & 履歴</h3>
                現在のversion:{version}
                <List>
                    <ListItem>
                        <div>
                            <Typography variant={'h6'} component="div">
                                2025/02/02 v0.1.1
                            </Typography>
                            <Typography component="div" sx={{ml: 2}}>
                                駅編集機能を実装
                            </Typography>
                        </div>
                    </ListItem>
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