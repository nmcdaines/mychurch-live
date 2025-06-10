import React, { useEffect, useState } from 'react';
import AppBar from './components/AppBar';
import { TextField, Button, Box, Container, Paper } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";

import SurfaceContainer from "./containers/Surface";
import SettingsContainer from "./containers/Settings";
import ShortcutsContainer from "./containers/Shortcuts";
import LivestreamContainer from "./containers/Livestream";
import CameraContainer from "./containers/Camera";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Home from './Home';


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Router>
          <AppBar />

          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/shortcuts" element={<ShortcutsContainer />} />
            <Route path="/surface" element={<SurfaceContainer />} />
            <Route path="/settings" element={<SettingsContainer />} />
            <Route path="/livestream" element={<LivestreamContainer />} />
            <Route path="/camera" element={<CameraContainer />} />
          </Routes>
        </Router>


        <div>


          {/* <Container style={{ marginTop: 20 }}>
            <Paper>
              <Box p={2}>

                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={messageType}
                    onChange={(e) => setMessageType(e.target.value)}
                    placeholder="Message Type"
                    label="Type"
                  />
                </Box>
                <Box mt={2}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="Body"
                    label="Body"
                  />
                </Box>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      console.log('connect message');
                      socket?.emit(messageType, JSON.parse(messageBody));
                    }}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Container> */}

        </div>
      </div>
    </DndProvider>
  );
}

export default App;
