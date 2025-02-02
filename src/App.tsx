import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import {MenuDialog} from "./Menu/MenuDialog.tsx";
import {AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {LineFile} from "./DiaData/DiaData.ts";
import { StationEditPage } from './StationEdit/StationEditPage.tsx';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {TrainTypeEditPage} from "./TrainTypeEdit/TrainTypeEditPage.tsx";


export interface WebOuDia{
    AppTitle: string;
    setAppTitle(value: string): void;

    showDeleteIcon:boolean;
    setShowDeleteIcon(value: boolean): void;
    showSaveIcon:boolean;
    setShowSaveIcon(value: boolean): void;

    webOuDiaEvent:EventTarget;

    diaData: LineFile[];
    setDiaData: React.Dispatch<React.SetStateAction<LineFile[]>>;

}
function useWebOuDia():WebOuDia{
    const [AppTitle, setAppTitle] = useState("WebOuDia");
    const [diaData, setDiaData] = useState<LineFile[]>([{
        stations: [],
        trainType: []
    }]);
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [showSaveIcon, setShowSaveIcon] = useState(true);

    const [webOuDiaEvent] = useState(new EventTarget())


    return {AppTitle, setAppTitle,
        showDeleteIcon, setShowDeleteIcon,
        showSaveIcon, setShowSaveIcon,
        webOuDiaEvent: webOuDiaEvent,
        diaData, setDiaData
    };
}

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const webOuDia=useWebOuDia();

    return (
      <div >
          <AppBar position="static">
              <Toolbar>
                  <Typography variant="h6" style={{flexGrow: 1}}>
                      {webOuDia.AppTitle}
                  </Typography>
                  {
                        webOuDia.showDeleteIcon &&
                        <Button color="inherit"
                                onClick={()=>{
                                    webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent("onDeleteButtonClicked", {}))
                                }}
                        >
                            <DeleteIcon/>
                        </Button>
                    }
                    {
                        webOuDia.showSaveIcon &&
                        <Button color="inherit"
                                onClick={()=>{
                                    webOuDia.webOuDiaEvent.dispatchEvent(new CustomEvent("onSaveButtonClicked", {}))
                                }}
                           >
                            <SaveIcon/>
                        </Button>

                  }
                  {/*<Button color="inherit">Login</Button>*/}
              </Toolbar>
          </AppBar>
          <div style={{paddingBottom:'54px'}}>
          <BrowserRouter >
              <Routes >
                  <Route path="/" element={
                      <TrainTypeEditPage webOuDia={webOuDia}/>
                  }/>
                  <Route path="/StationEdit/:routeIndex" element={
                      <StationEditPage webOuDia={webOuDia}/>
                  }/>
                  <Route path="/TrainTypeEdit" element={
                      <TrainTypeEditPage webOuDia={webOuDia}/>
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
                  open={menuOpen}
                  setOpen={setMenuOpen}
                  webOuDia={webOuDia}
              ></MenuDialog>
          </BrowserRouter>
          </div>


          <Box sx={{width: '100%', position: 'fixed',bottom: 0, zIndex: 1300}}>

              <BottomNavigation
                  onChange={(event, newValue) => {
                  }}
                  showLabels
              >
                  {/*<BottomNavigationAction label="Recents" icon={<RestoreIcon />} />*/}
                  <BottomNavigationAction label="menu" icon={<MenuIcon/>}
                                          onClick={() => {
                                              setMenuOpen(true);
                                              //open MenuDialog

                                          }}/>
                  {/*<BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />*/}
              </BottomNavigation>

          </Box>


      </div>

  );
}

export default App;
