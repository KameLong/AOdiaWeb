import React, {useEffect, useRef, useState} from 'react';
import {Dialog, Button, List, ListItem, ListItemText, Slide, Box, Typography} from '@mui/material';
import {WebOuDia} from "../App.tsx";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import {ExpandMore, ChevronRight, Save, Delete} from '@mui/icons-material';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {getFiles, saveData} from "../DiaData/IndexedDB.ts";
import {FileSelectDialog} from "./FileSelectDialog.tsx";
import {O_O} from "@route-builders/oud-operator";
import {LineFileFromO_O} from "../DiaData/DiaData.ts";
import {useNavigate} from "react-router-dom";

interface MenuDialogProps {
    open: boolean;
    setOpen(value: boolean): void;
    webOuDia: WebOuDia;


}

export function MenuDialog({open,setOpen,webOuDia}: MenuDialogProps) {
    const lineFiles = webOuDia.diaData;

    const handleClose = () => {
        setOpen(false);
    };
    const [fileSelectOpen,setFileSelectOpen] = useState(false);

    const menuItems = new Array(100).fill(0).map((_, i) => 'test' + i);
    const navigate=useNavigate();
    const deferredPromptRef = useRef(null);
    useEffect(() => {
        const beforeInstallPromptHandler = () => {
            deferredPromptRef.current = event;
        };

        window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                beforeInstallPromptHandler
            );
        };
    }, []);

    return (
        <Dialog
            fullScreen
            PaperProps={{
                style: {
                    position: 'absolute',
                    bottom: 0,
                    margin: 0,
                    width: 'calc(100% - 20px)',
                    maxHeight: '80vh',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    borderBottomLeftRadius: '0px',
                    borderBottomRightRadius: '0px',
                },
            }}
            open={open}
            onClose={handleClose}
        >
            <List sx={{paddingTop:0}}>
                <ListItem onClick={()=>{
                    const deferredPrompt = deferredPromptRef.current;
                    if (deferredPrompt) {
                        console.log("test");
                        // インストールプロンプトを表示する
                        deferredPrompt.prompt();
                    }
                }} sx={{color:'white',backgroundColor:'darkgreen',pt:2}}>
                    <ListItemText primary="メニュー" />
                </ListItem>
                <ListItem onClick={()=>{
                    webOuDia.snackbar.setMessage("現在開発中です");

                }}>
                    <ListItemText primary="新規作成" />
                </ListItem>
                <ListItem onClick={()=>{
                    webOuDia.snackbar.setMessage("現在開発中です");

                    // setFileSelectOpen(true);
                }}>
                    <ListItemText  primary="ブラウザに保存されたダイヤを開く" />
                </ListItem>
                <ListItem onClick={()=>{
                    //@ts-ignore
                    document.getElementById("fileInput").value='';
                    document.getElementById("fileInput").click();



                }}>
                    <input type={"file"}  style={{display:'none'}} id={"fileInput"} onChange={(event)=>{
                        if (event.target.files[0]) {
                            const file = event.target.files[0];
                            const reader = new FileReader();
                            reader.onload = e => {
                                try {
                                    // @ts-ignore
                                    const text: string[] = e.target.result.split('\r\n');
                                    const o_o = new O_O();
                                    o_o.fromOud(text);
                                    webOuDia.setDiaData([LineFileFromO_O(o_o)]);
                                }catch (ex){
                                    webOuDia.snackbar.setMessage("ファイルの読み込みに失敗しました。現在、oudファイルのみ対応しています。oud2ファイルは未対応です。");

                                }
                                handleClose();
                            };
                            reader.readAsText(file,'sjis');
                        }

                    }}　accept=".oud" />
                    <ListItemText  primary="端末に保存されたファイルを開く" />
                </ListItem>

                {Object.keys(lineFiles).map(( index) => {
                    console.log(index);
                    const lineFile = lineFiles[index];
                    return(

                    <SimpleTreeView
                        key={index}
                        aria-label="file system navigator"
                        sx={{  flexGrow: 1, overflowY: 'auto' }}
                    >
                        <TreeItem key={index} itemId="1" label={lineFile.name}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}>
                                {/*<Button*/}
                                {/*    onClick={()=>{*/}
                                {/*        //保存ボタン*/}
                                {/*        saveData("test1",{test:"test"});*/}
                                {/*    }}><Save></Save></Button>*/}
                                {/*<Button><Delete></Delete></Button>*/}
                            </Box>
                            <TreeItem itemId="2" label="駅編集" onClick={()=>{
                                // webOuDia.snackbar.setMessage("現在開発中です");


                                handleClose();
                                navigate(`/stationEdit/${index}`);
                            }}/>
                            <TreeItem itemId="3" label="種別編集" onClick={()=>{
                                // handleClose();
                                // navigate(`/traintypeEdit/${index}`);

                            }}/>
                            <TreeItem itemId="4" label="駅時刻表" onClick={()=>{
                                webOuDia.snackbar.setMessage("現在開発中です");
                            }}/>
                            {lineFile.diagram.map((diagram, diaIdx) => (
                                <TreeItem key={index+"-"+diaIdx+"-dia"} itemId={index+"-"+diaIdx+"-dia"} label={diagram.name}>
                                    <TreeItem itemId={index+"-"+diaIdx+"-downT"} label="下り時刻表"
                                              onClick={()=>{
                                                  handleClose();
                                                  navigate(`/timetable/${index}/${diaIdx}/0`);
                                              }}/>
                                    <TreeItem
                                        itemId={index+"-"+diaIdx+"-upT"} label="上り時刻表"
                                        onClick={()=>{
                                            handleClose();
                                            navigate(`/timetable/${index}/${diaIdx}/1`);
                                        }}

                                    />
                                    <TreeItem itemId={index+"-"+diaIdx+"-diagram"} label="ダイヤグラム"
                                    onClick={()=>{
                                        handleClose();
                                        navigate(`/Diagram/${index}/${diaIdx}`);
                                    }}/>
                                </TreeItem>
                            ))}
                        </TreeItem>
                    </SimpleTreeView>
                )})}
                <ListItem onClick={()=>{
                    navigate('/help');
                    handleClose();
                }}>
                    <ListItemText  primary="ヘルプ" />
                </ListItem>
            </List>
            <FileSelectDialog open={fileSelectOpen} setOpen={setFileSelectOpen} onFileSelected={()=>{}}></FileSelectDialog>

        </Dialog>
    );
}
