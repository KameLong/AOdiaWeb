import React, {useEffect, useState} from "react";
import {Dialog, List, ListItem, ListItemText} from "@mui/material";

interface FileSelectDialogProps {
    open:boolean;
    setOpen(value:boolean):void;
    onFileSelected:(data:any)=>void;
}

export function FileSelectDialog({onFileSelected,open,setOpen}:FileSelectDialogProps){
    const [files,setFiles] = useState<string[]>([]);
    useEffect(()=>{
        // getFiles().then((files)=>{
        //     setFiles(files);
        // });
    },[]);
    return(
        <Dialog open={open} onClose={()=>setOpen(false)}
                fullScreen
                PaperProps={{
                    style: {
                        position: 'absolute',
                        bottom: 0,
                        margin: 0,
                        width: 'calc(100% - 20px)',
                        maxWidth:'400px',
                        maxHeight: '80vh',
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                        borderBottomLeftRadius: '0px',
                        borderBottomRightRadius: '0px',
                    },
                }}
        >
            {/*<List>*/}
            {/*    {*/}
            {/*        files.map((file,index)=>(*/}
            {/*            <ListItem key={index} onClick={()=>{*/}
            {/*                getFile(file).then((data)=>{*/}
            {/*                    onFileSelected(data);*/}
            {/*                    setOpen(false);*/}
            {/*                });*/}
            {/*            }}>*/}
            {/*                <ListItemText primary={file} />*/}
            {/*            </ListItem>*/}
            {/*        ))*/}
            {/*    }*/}

            {/*</List>*/}
        </Dialog>
    )

}