import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import {MenuDialog} from "./Menu/MenuDialog.tsx";
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button,
    Snackbar,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {LineFile} from "./DiaData/DiaData.ts";
import { StationEditPage } from './StationEdit/StationEditPage.tsx';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {TrainTypeEditPage} from "./TrainTypeEdit/TrainTypeEditPage.tsx";
import {TimeTablePage} from "./TimeTable/TimeTablePage.tsx";
import {TbArrowBigDownLine, TbArrowBigUp, TbArrowBigUpLine} from "react-icons/tb";
import { BsGraphDown } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import {Top} from "./Top.tsx";
import {DiagramPage} from "./Diagram/DiagramPage.tsx";
import { HelpPage } from './Heip/HelpPage.tsx';

export interface useSnackbarProps{
    open:boolean;
    setOpen(value:boolean):void;
    message:string;
    setMessage(value:string):void;
}
function useSnackbar():useSnackbarProps{
    const [open, setOpen] = useState(false);
    const [message, _setMessage] = useState("");
    function setMessage(value:string){
        _setMessage(value);
        setOpen(true);
    }
    return {open, setOpen, message, setMessage};
}

export interface WebOuDia{
    snackbar:useSnackbarProps;



    AppTitle: string;
    setAppTitle(value: string): void;

    showDeleteIcon:boolean;
    setShowDeleteIcon(value: boolean): void;
    showSaveIcon:boolean;
    setShowSaveIcon(value: boolean): void;

    showBottomIcon:boolean;
    setShowBottomIcon(value: boolean): void;

    menuOpen:boolean;
    setMenuOpen(value: boolean): void;


    webOuDiaEvent:EventTarget;

    diaData: LineFile[];
    setDiaData: React.Dispatch<React.SetStateAction<LineFile[]>>;

}
function useWebOuDia():WebOuDia{
    const [AppTitle, setAppTitle] = useState("WebDia");
    const snackbar=useSnackbar();
    const [menuOpen, setMenuOpen] = useState(false);

    const [diaData, setDiaData] = useState<LineFile[]>([{
        name:"サンプル路線名",
        stations: [{
            name: "駅A",
            showArr: [false, false],
            showDep: [true, true],
            branchStation: -1,
            isMajor: false,
            checked: false
        }, {
            name: "駅B",
            showArr: [false, false],
            showDep: [true, true],
            branchStation: -1,
            isMajor: false,
            checked: false
        }],
        trainType: [{
            name: "普通",
            shortName: "普通",
            trainColor: "#000000",
            lineColor   : "#000000",
            fontIdx: 0,
            lineWeight:1,
            lineType:0,
            shoudDrawStopMark:false,
        }],
        diagram:[{
            trains:[[{
                trainTypeId:0,
                times:[{
                    depTime:3600*12,
                    ariTime:0,
                    stopType:1,
                },{
                    depTime:3600*12+600,
                    ariTime:0,
                    stopType:1,
                }],
                name:"train1",
                num:"1",
                comment:""

            }],[{
                trainTypeId:0,
                times:[{
                    depTime:3600*12+1500,
                    ariTime:0,
                    stopType:1,
                },{
                    depTime:3600*12+900,
                    ariTime:0,
                    stopType:1,
                }],
                name:"train1",
                num:"1",
                comment:""

            }]],
            name:"平日",
        }]
    }]);
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [showSaveIcon, setShowSaveIcon] = useState(true);
    const [showBottomIcon, setShowBottomIcon] = useState(false);

    const [webOuDiaEvent] = useState(new EventTarget())


    return {AppTitle, setAppTitle,
        snackbar,
        showDeleteIcon, setShowDeleteIcon,
        showSaveIcon, setShowSaveIcon,
        showBottomIcon,setShowBottomIcon,
        webOuDiaEvent: webOuDiaEvent,
        diaData, setDiaData,
        menuOpen, setMenuOpen
    };
}


function App() {
    const webOuDia=useWebOuDia();

    return (
        <div style={{height:'100vh'}}>
            <AppBar position="static" sx={{backgroundColor:'#040'}}>
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        {webOuDia.AppTitle}
                    </Typography>
                    {/*{*/}
                    {/*      webOuDia.showDeleteIcon &&*/}
                    {/*      <Button color="inherit"*/}
                    {/*              onClick={()=>{*/}
                    {/*                  webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent("onDeleteButtonClicked", {}))*/}
                    {/*              }}*/}
                    {/*      >*/}
                    {/*          <DeleteIcon/>*/}
                    {/*      </Button>*/}
                    {/*  }*/}
                    {/*  {*/}
                    {/*      webOuDia.showSaveIcon &&*/}
                    {/*      <Button color="inherit"*/}
                    {/*              onClick={()=>{*/}
                    {/*                  webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent("onSaveButtonClicked", {}))*/}
                    {/*              }}*/}
                    {/*         >*/}
                    {/*          <SaveIcon/>*/}
                    {/*      </Button>*/}

                    {/*}*/}
                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
            <div style={{height:'calc(100% - 118px)'}}>
                <BrowserRouter >
                    <Routes >
                        <Route path="/" element={
                            <Top webOuDia={webOuDia} />
                        }/>
                        <Route path="/StationEdit/:lineID" element={
                            <StationEditPage webOuDia={webOuDia}/>
                        }/>
                        <Route path="/TrainTypeEdit/:lineID" element={
                            <TrainTypeEditPage webOuDia={webOuDia}/>
                        }/>
                        <Route path="/TimeTable/:lineID/:diaIdx/:direct" element={
                            <TimeTablePage webOuDia={webOuDia}/>
                        }/>
                        <Route path="/Diagram/:lineID/:diaIdx" element={
                            <DiagramPage webOuDia={webOuDia}/>
                        }/>

                        <Route path="/Help" element={
                            <HelpPage webOuDia={webOuDia}/>
                        }/>

                        {/*<Route path="/Company/:companyID" element={*/}
                        {/*  <CompanyPage/>*/}
                        {/*}/>*/}
                        {/*<Route path="/RouteEdit/:companyID/:routeID" element={*/}
                        {/*  <RouteEditPage/>*/}
                        {/*}/>*/}
                        {/*<Route path="/TimeTable/:companyID/:routeID/:direct" element={*/}
                        {/*  <RouteTimeTablePage/>*/}
                        {/*}></Route>*/}
                        {/*<Route path="/MainTimeTable/:companyID/:timetableID/:direct" element={*/}
                        {/*  <CustomTimeTablePage/>*/}
                        {/*}></Route>*/}
                        {/*<Route path="/TimeTablePDF/:companyID/:routeID" element={*/}
                        {/*  <TimeTablePDF/>*/}
                        {/*}></Route>*/}
                        {/*<Route path={"/TimeTableEdit/:companyID/:timetableID"} element={*/}
                        {/*  <TimeTableEditPage/>*/}
                        {/*}></Route>*/}
                        {/*<Route path={"/TimeTableEditStation/:companyID/:timetableID"} element={*/}
                        {/*  <TimeTableEditStationPage/>*/}
                        {/*}></Route>*/}
                        {/*<Route path="/Diagram/:companyID/:routeID" element={*/}
                        {/*  <DiagramPage/>*/}
                        {/*}></Route>*/}
                        {/*<Route path="/DiagramPDF/:companyID/:routeID" element={*/}
                        {/*  <DiagramPDFPage/>*/}
                        {/*}></Route>*/}
                        {/*<Route path="/License" element={*/}
                        {/*  <LicensePage/>*/}
                        {/*}></Route>*/}
                        {/*<Route path="/Oudia" element={*/}
                        {/*  <OuDiaOpenDialog/>*/}
                        {/*}></Route>*/}
                        {/*<Route path="*" element={*/}
                        {/*  <div>Page not found</div>*/}
                        {/*}> </Route>*/}

                    </Routes>
                    <MenuDialog
                        open={webOuDia.menuOpen}
                        setOpen={webOuDia.setMenuOpen}
                        webOuDia={webOuDia}
                    ></MenuDialog>
                </BrowserRouter>
            </div>


            <Box sx={{width: '100%', borderTop:'1px solid gray',position: 'fixed',bottom: 0, zIndex: 1300}}>

                <BottomNavigation
                    onChange={(event, newValue) => {
                    }}
                    showLabels
                >
                    {
                        webOuDia.showBottomIcon &&
                        <BottomNavigationAction
                            label="下り時刻表" icon={<TbArrowBigDownLine />}
                            onClick={() => {
                                webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent("onDownTimeTableButtonClicked", {}))
                            }}/>
                    }
                    {
                        webOuDia.showBottomIcon &&
                    <BottomNavigationAction label="上り時刻表" icon={<TbArrowBigUpLine />}
                                            onClick={() => {
                                                webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent("onUpTimeTableButtonClicked", {}))
                                            }}/>
                    }
                    <BottomNavigationAction label="menu" icon={<MenuIcon/>}
                                            onClick={() => {
                                                webOuDia.setMenuOpen(true);
                                            }}/>
                    {
                        webOuDia.showBottomIcon &&
                    <BottomNavigationAction label="ダイヤグラム" icon={<BsGraphDown />}
                                            onClick={() => {
                                                webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent("onDiagramButtonClicked", {}))
                                            }}/>
                    }
                    {
                        webOuDia.showBottomIcon &&
                    <BottomNavigationAction label="駅時刻表" icon={<CgNotes />}
                                            onClick={() => {
                                                webOuDia.snackbar.setMessage("現在開発中です");
                                                webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent("onStationTimetableButtonClicked", {}))
                                            }}/>
                    }
                </BottomNavigation>

            </Box>
            <Snackbar
                open={webOuDia.snackbar.open}
                autoHideDuration={6000}
                onClose={()=>{webOuDia.snackbar.setOpen(false)}}
                message={webOuDia.snackbar.message}
            />

        </div>

    );
}

export default App;
