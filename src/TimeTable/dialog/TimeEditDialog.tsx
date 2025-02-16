import {Button, Dialog, TextField} from "@mui/material";
import  Grid  from "@mui/material/Grid2";
import React, {useContext, useState} from "react";
import {EditTime} from "../TimeTableViewHook.ts";
import {TimeTablePageContext} from "../TimeTablePage.tsx";



export function TimeEditDialog(){
    const editTimeHook=useContext(TimeTablePageContext).editTime;
    const buttonStyle={height:'50px',margin:"2px",border:'solid 1px black'};
    return(
        <div style={{display:editTimeHook.open?'block':'none'}}>
            <Grid container spacing={0}>
                <Grid size={{xs:6}}>
                    <Grid container spacing={0}>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                通過
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                停車
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                分割
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                経由無
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
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