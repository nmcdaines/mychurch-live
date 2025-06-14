import React, { useState } from "react";
import {
  Container,
  TextField,
  Paper,
  Box,
  Typography,
  Grid,
} from "@material-ui/core";
import {
  useSocket,
  useDevices,
  useAtemState,
  useMacros,
  useMacrosByDevice,
} from "../../core/SocketContext";
import CameraControlSimple from "../../components/CameraControlSimple";
import { CameraPresetForm } from "../../components/CameraPresetForm";
import { CameraMacroCard } from "../../components/CameraMacroCard";
import { Button } from "@/components/ui/button";

function Camera() {
  const socket = useSocket();
  const { data: devices } = useDevices();
  const states = useAtemState();

  const [presetFormInitialValue, setPresetFormInitialValue] = useState<any>({});
  const [presetFormOpen, setPresetFormOpen] = useState(false);
  const [tempState, setTempState] = useState<any>({});

  const openSavePreset = (deviceId: string) => () => {
    setTempState({
      ...states[deviceId],
      deviceId,
    });
    setPresetFormOpen(true);
  };

  const onSave = ({ name, description }: any) => {
    const deviceId = tempState?.deviceId;

    socket?.emit("macro:create", {
      type: "camera",
      name,
      description,
      device: deviceId,
      steps: [
        {
          delay: 0,
          order: 0,
          device: deviceId,
          command: "VISCA_SET_PAN_TILT",
          properties: {
            pan: tempState?.pan,
            panSpeed: 8,
            tilt: tempState?.tilt,
            tiltSpeed: 8,
          },
        },
        {
          delay: 0,
          order: 1,
          device: deviceId,
          command: "VISCA_SET_ZOOM",
          properties: {
            zoom: tempState?.zoom,
          },
        },
      ],
    });

    setPresetFormOpen(false);
  };

  return (
    <div style={{ paddingTop: 20 }}>
      <Container>
        {devices?.map((device) => {
          if (device.type !== "birddog") {
            return <div>{device.type}</div>;
          }

          return (
            <div key={`device-${device.id}`}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h3">{device.name}</Typography>

                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={openSavePreset(device.id)}
                  >
                    Save Preset
                  </Button>
                </div>
              </div>

              <Box mt={2}>
                <Paper>
                  <Box p={2}>
                    <CameraControlSimple
                      deviceId={device.id}
                      name={device.name.name}
                      {...device}
                      state={states[device.id]}
                    />
                  </Box>
                </Paper>
              </Box>

              <Box mt={2}>
                <Typography variant="h4">Presets</Typography>

                <CameraMacros deviceId={device.id} />

                <CameraPresetForm
                  isOpen={presetFormOpen}
                  initialValues={presetFormInitialValue}
                  onSubmit={onSave}
                  onCancel={() => setPresetFormOpen(false)}
                />
              </Box>
            </div>
          );
        })}
      </Container>
    </div>
  );
}

function CameraMacros({ deviceId }: { deviceId: number }) {
  const { data: macros } = useMacrosByDevice(deviceId);

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {macros?.map((macro) => {
          if (macro.type !== "camera") {
            return null;
          }

          return (
            <Grid key={`device-macro-${macro.id}`} item md={4}>
              <CameraMacroCard {...macro} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Camera;
