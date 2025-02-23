import {Button, Dialog, TextField} from "@mui/material";
import  Grid  from "@mui/material/Grid2";
import React, {useContext, useEffect, useState} from "react";
import {EditTime} from "../TimeTableViewHook.ts";
import {TimeTablePageContext} from "../TimeTablePage.tsx";
import {StationTime} from "../../DiaData/DiaData.ts";
import {WebOudContext} from "../../App.tsx";



export function TimeEditDialog(){
    const editTimeHook=useContext(TimeTablePageContext).editTime;
    const buttonStyle={height:'50px',margin:"2px",border:'solid 1px black'};
    const webOuDia=useContext(WebOudContext);
    useEffect(() => {
        // キーイベントハンドラの定義
        const handleKeyDown = (event:KeyboardEvent) => {
            console.log(event.key);
            switch(event.key){
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    editTimeHook.appendText(event.key);
                    break;
                case "-":
                    if(event.ctrlKey){
                        editTimeHook.appendText("pass");
                    }
                    break;

                case "Backspace":
                    editTimeHook.appendText("back");

            }
        };
        if(editTimeHook.open){
            // コンポーネントがマウントされたときにイベントリスナーを登録
            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }
        // クリーンアップ: コンポーネントがアンマウントされる際にイベントリスナーを解除
    }, [editTimeHook.open,editTimeHook]); // 空の依存配列で初回マウント時のみ登録


    return(
        <div style={{display:editTimeHook.open?'block':'none'}}>
            <Grid container spacing={0}>
                <Grid size={{xs:6}}>
                    <Grid container spacing={0}>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                onClick={()=>{
                                    editTimeHook.appendText("pass");
                                }}>
                                通過
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                            onClick={()=>{
                                editTimeHook.appendText("stop");
                            }}>
                                停車
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                分割
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("novia");
                                    }}>
                                経由無
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("none");
                                    }}>
                            運行無
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                結合
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                +1分
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                -1分
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                繰上
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                +5秒
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                -5秒
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                繰下

                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={{xs:6}}>
                    <Grid container spacing={0}>
                        <Grid size={{xs:4}}>
                            <Button
                                style={buttonStyle}
                                onClick={()=>{
                                    editTimeHook.appendText("1");
                                }}
                            >
                                1
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("2");
                                    }}
                            >
                                2
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("3");
                                    }}
                            >
                                3
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("4");
                                    }}
                            >
                                4
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("5");
                                    }}
                            >

                                5
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("6");
                                    }}
                            >
                                6
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("7");
                                    }}
                            >
                                7
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("8");
                                    }}
                            >
                                8
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("9");
                                    }}
                            >
                                9
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("back");
                                    }}
                            >
                                ←
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("0");
                                    }}
                            >
                                0
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}
                                    onClick={()=>{
                                        editTimeHook.appendText("enter");
                                    }}>
                                ↩︎

                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    )
}