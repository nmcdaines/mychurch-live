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
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import SettingsDevices from './containers/Settings/SettingsDevices';
import Macros from './containers/Settings/Macros';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <Router>
            <AppBar />
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/shortcuts" element={<ShortcutsContainer />} />
              <Route path="/surface" element={<SurfaceContainer />} />
              <Route path="/settings" element={<SettingsContainer />}>
                <Route path="" element={<>Please select a settings</>} />
                <Route path="devices" element={<SettingsDevices />} />
                <Route path="livestream" element={<>Livestream</>} />
                <Route path="macros" element={<Macros />} />
                <Route path="shortcuts" element={<>Shortcuts</>} />
              </Route>
              <Route path="/livestream" element={<LivestreamContainer />} />
              <Route path="/camera" element={<CameraContainer />} />
            </Routes>
          </Router>
        </div>
      </DndProvider>
    </QueryClientProvider>
  );
}

export default App;
