import React, { useState, useEffect } from 'react';
import {Alert, Box, CircularProgress, Divider, List, ListItem, ListItemButton, Paper, Typography} from "@mui/material";


interface OPFSFileReaderProps {
    onFileSelected: (file:File) => void;
}

/**
 * OPFS 上のファイルを一覧表示し、選択したファイルの内容を読み込んで表示するコンポーネント
 */
export function OPFSFileReader({ onFileSelected }: OPFSFileReaderProps) {
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loadingList, setLoadingList] = useState(false);


    // OPFS のルートディレクトリハンドルを取得
    async function getRootHandle() :
        Promise<FileSystemDirectoryHandle>{
        if (!navigator.storage || !navigator.storage.getDirectory) {
            throw new Error("このブラウザは OPFS に対応していません。");
        }
        return await navigator.storage.getDirectory();
    }

    // ディレクトリ内のファイル名一覧を取得
    async function loadFileList() {
        setError(null);
        setLoadingList(true);
        try {
            const root = await getRootHandle();

            const names: string[] = [];
            //@ts-expect-error root.valuesでエラーが出ます
            for await (const entry of root.values()) {
                if (entry.kind === 'file') {
                    names.push(entry.name);
                }
            }
            setFileNames(names);
        } catch (err: any) {
            setError(err.message || 'ファイルリストの取得に失敗しました');
        }finally {
            setLoadingList(false);
        }
    }



    useEffect(() => {
        loadFileList();
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
                OPFS ファイル一覧
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <Paper variant="outlined" sx={{ maxHeight: 240, overflow: 'auto', mb: 2 }}>
                {loadingList ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                        <CircularProgress />
                    </Box>
                ) : fileNames.length ? (
                    <List disablePadding>
                        {fileNames.map(name => (
                            <React.Fragment key={name}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={async() => {
                                        const root = await getRootHandle();
                                        const handle = await root.getFileHandle(name);
                                        const file = await handle.getFile();

                                        onFileSelected(file);
                                    }} selected={selectedFile === name}>
                                        <ListItem  >{name}</ListItem>
                                    </ListItemButton>
                                </ListItem>
                                <Divider component="li" />
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <Box sx={{ p: 2 }}>
                        <Typography variant="body2">保存されたファイルがありません。</Typography>
                    </Box>
                )}
            </Paper>

        </Box>
    );
}
