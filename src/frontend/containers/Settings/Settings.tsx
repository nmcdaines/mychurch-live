import React from "react";
import {createStyles, Grid, Theme, makeStyles, Paper} from "@material-ui/core"

import SettingsNavigation from "../../components/SettingsNavigation";

import { Routes, Route, useMatch, useLocation, Navigate } from "react-router-dom";
import SettingsDevices from "./SettingsDevices";
import Macros from './Macros';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // marginTop: theme.spacing(1),
      padding: theme.spacing(2),
    }
  })
);

function Settings() {
  const classes = useStyles();

  const match = useMatch("/settings/*");
  const location = useLocation();
  const basePath = match ? match.pathnameBase : "/settings";

  return (
      <Grid container className={classes.root}>
        <Grid item md={3}>
          {/* <Route path={`${basePath}/:settingId`}> */}
            {/* <SettingsNavigation /> */}
          {/* </Route> */}
        </Grid>
        <Grid item md={9}>
          {/* <Route path={basePath} element={<Navigate to={`${basePath}/devices`} state={{ from: location }} replace />} /> */}
          {/* <Route path={`${basePath}/devices`}>
            <SettingsDevices />
          </Route> */}
          {/* <Route path={`${basePath}/livestream`}>
            Livestream
          </Route> */}
          {/* <Route path={`${basePath}/macros`}>
            <Macros />
          </Route> */}
          {/* <Route path={`${basePath}/shortcuts`}>
            Shortcuts
          </Route> */}
        </Grid>
      </Grid>
  );
}

export default Settings;
