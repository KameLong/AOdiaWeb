import {Button, Dialog} from "@mui/material";
import  Grid  from "@mui/material/Grid2";
import React, {useState} from "react";

export function TimeEditDialog(){
    const [open,setOpen]=useState<boolean>(true);
    const buttonStyle={height:'50px',margin:"2px",border:'solid 1px black'};
    return(
        <div style={{display:'block'}}>
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
                            <Button style={buttonStyle}>
                                1
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                2
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                3
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                4
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                5
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                6
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                7
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                8
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                9
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                ←
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                0
                            </Button>
                        </Grid>
                        <Grid size={{xs:4}}>
                            <Button style={buttonStyle}>
                                ↩︎

                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    )
}