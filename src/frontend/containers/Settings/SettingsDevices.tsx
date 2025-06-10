import React from "react";
import {useAtemState, useDevices, useSocketState} from "../../core/SocketContext";
import { Grid, List, ListSubheader, Button, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import DeviceCard from "../../components/DeviceCard";

function SettingsDevices() {
  // const atemState = useDevices();
  // const devices = Object.keys(atemState);

  const { data: devices } = useDevices()

  console.log(devices);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={8}>
          { devices?.map((device) => {
            return (
              <div key={`device-card-${device.id}`} className="mb-5">
                <DeviceCard
                  productIdentifier={device.id}
                  device={device}
                />
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default SettingsDevices;
