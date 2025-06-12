import React from "react";
import {useAtemState, useDevices, useSocketState} from "../../core/SocketContext";
import { Grid, List, ListSubheader, Button, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import DeviceCard from "../../components/DeviceCard";

function SettingsDevices() {
  // const atemState = useDevices();
  // const devices = Object.keys(atemState);

  const { data: devices } = useDevices()

  return (
    <div className="flex flex-col space-y-2">
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
    </div>
  );
}

export default SettingsDevices;
