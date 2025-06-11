import React, { useState } from "react";

import { useSocket, useAtemState } from "../core/SocketContext";

import { TextField } from "@material-ui/core";
import DirectionalButtons from "./DirectionalButtons";
import ZoomButtons from "./ZoomButtons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ICameraControlSimple {
  deviceId: string;
  name: string;
  pan?: number;
  tilt?: number;
  zoom?: number;
  state: any;
}

function CameraControlSimple({ deviceId, state }: ICameraControlSimple) {
  const [moveIncrement, setMoveIncrement] = useState(10);
  const [zoomIncrement, setZoomIncrement] = useState(1638);
  const [speed, setSpeed] = useState(4);

  const socket = useSocket();

  const sendPanTitltCommand = ({ pan, tilt, panSpeed, tiltSpeed }: any) => {
    console.log("sendPanTitlt", pan, tilt);

    socket?.emit("action:execute", {
      id: deviceId,
      type: "VISCA_SET_PAN_TILT",
      properties: {
        pan: (state?.pan || 0) + pan,
        panSpeed: panSpeed || 0,
        tilt: (state?.tilt || 0) + tilt,
        tiltSpeed: tiltSpeed || 0,
      },
    });

    return window.api.device.execute(deviceId, "VISCA_SET_PAN_TILT", {
      pan: (state?.pan || 0) + pan,
      panSpeed: panSpeed || 0,
      tilt: (state?.tilt || 0) + tilt,
      tiltSpeed: tiltSpeed || 0,
    });
  };

  const onPan = (value: number) => () => {
    sendPanTitltCommand({
      pan: value,
      panSpeed: speed,
      tilt: 0,
    });
  };

  const onTitlt = (value: number) => () => {
    sendPanTitltCommand({
      pan: 0,
      tilt: value,
      tiltSpeed: speed,
    });
  };

  const onZoom = (value: number) => () => {
    socket?.emit("action:execute", {
      id: deviceId,
      type: "VISCA_SET_ZOOM",
      properties: {
        // max: 16384
        zoom: (state.zoom || 0) + value,
      },
    });

    window.api.device.execute(deviceId, "VISCA_SET_ZOOM", {
      zoom: (state.zoom || 0) + value,
    });
  };

  const handleIncrementChange = (
    event: React.MouseEvent<HTMLElement>,
    newIncrement: number,
  ) => {
    setMoveIncrement(newIncrement);
  };

  const handleZoomIncrement = (
    event: React.MouseEvent<HTMLElement>,
    newIncrement: number,
  ) => {
    setZoomIncrement(newIncrement);
  };

  return (
    <div>
      <div style={{ display: "flex", padding: "20px 0" }}>
        <DirectionalButtons
          onUp={onTitlt(moveIncrement)}
          onDown={onTitlt(moveIncrement * -1)}
          onLeft={onPan(moveIncrement * -1)}
          onRight={onPan(moveIncrement)}
        />
        <div style={{ width: 80 }} />
        <ZoomButtons
          onT={onZoom(zoomIncrement)}
          onW={onZoom(zoomIncrement * -1)}
        />
      </div>

      <div style={{ display: "flex", padding: "20px 0" }}>
        <div>
          <div>Pan/Tilt Increment</div>
          <ToggleGroup
            value={moveIncrement}
            exclusive
            onChange={handleIncrementChange}
            type="single"
          >
            <ToggleGroupItem value={2} aria-label="left aligned">
              2
            </ToggleGroupItem>
            <ToggleGroupItem value={5} aria-label="left aligned">
              5
            </ToggleGroupItem>
            <ToggleGroupItem value={10} aria-label="left aligned">
              10
            </ToggleGroupItem>
            <ToggleGroupItem value={30} aria-label="centered">
              30
            </ToggleGroupItem>
            <ToggleGroupItem value={50} aria-label="right aligned">
              50
            </ToggleGroupItem>
            <ToggleGroupItem value={100} aria-label="right aligned">
              100
            </ToggleGroupItem>
            <ToggleGroupItem value={250} aria-label="right aligned">
              250
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div style={{ width: 30 }} />

        <div>
          <div>Zoom Increment</div>
          <ToggleGroup
            value={zoomIncrement}
            exclusive
            onChange={handleZoomIncrement}
            type="single"
          >
            <ToggleGroupItem value={410} aria-label="right aligned">
              0.25x
            </ToggleGroupItem>
            <ToggleGroupItem value={819} aria-label="right aligned">
              0.5x
            </ToggleGroupItem>
            <ToggleGroupItem value={1638} aria-label="right aligned">
              1x
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div style={{ display: "flex", padding: "20px 0" }}>
        <div>
          <TextField
            variant="filled"
            label="Pan"
            disabled
            value={state?.pan}
            style={{ marginRight: 10 }}
          />

          <TextField
            variant="filled"
            label="Tilt"
            disabled
            value={state?.tilt}
            style={{ marginRight: 10 }}
          />

          <TextField
            variant="filled"
            label="Zoom"
            disabled
            value={`${((10 / 16384) * state?.zoom).toFixed(1)}x`}
            style={{ marginRight: 10 }}
          />
        </div>
      </div>
    </div>
  );
}

export default CameraControlSimple;
