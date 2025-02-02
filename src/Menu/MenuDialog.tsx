import React, { useState } from 'react';
import { Dialog, Button, List, ListItem, ListItemText, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function MenuPage() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const menuItems = new Array(100).fill(0).map((_, i) => 'test' + i);

    return (
            <Dialog
                fullScreen
                PaperProps={{
                    style: {
                        position: 'absolute',
                        bottom: 0,
                        margin: 0,
                        width: '100%',
                        maxHeight: '80vh',
                    },
                }}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <List>
                    <ListItem button onClick={handleClose}>
                        <ListItemText primary="新規作成" />
                    </ListItem>
                    <ListItem button onClick={handleClose}>
                        <ListItemText primary="ファイルを開く" />
                    </ListItem>
                    {menuItems.map((text, index) => (
                        <ListItem button key={text} onClick={handleClose}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
    );
}
