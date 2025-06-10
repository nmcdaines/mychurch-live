import React, { useState } from "react";
import { Typography, IconButton, Fab, CardActions } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { MacroForm } from "./MacroForm";
import { useSocket, useMacros } from "../../core/SocketContext";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

interface IMacro {
  id: string;
  name: string;
  steps: IStep[];
}

interface IStep {
  order: number;
  delay: number;
  command: string;
  properties: string;
}

function MacroViewItem({ macro, onEdit }: any) {
  // const socket = useSocket();

  const { steps = [] } = macro;

  function run() {
    // socket?.emit("macro:execute:id", { id: macro.id });
    window.api.macro.execute(macro.id)
  }

  return (
    <Card style={{ marginBottom: 10 }}>
      <CardHeader>
        <CardTitle>{macro.name}</CardTitle>
        <CardDescription>
          {macro.type === "camera" && (
            <>
              Pan: {steps[0]?.properties?.pan || steps[1]?.properties?.pan || 0}
              , Tilt:{" "}
              {steps[0]?.properties?.tilt || steps[1]?.properties?.tilt || 0},
              Zoom:{" "}
              {(
                (10 / 16384) *
                (steps[0]?.properties?.zoom || steps[1]?.properties?.zoom || 0)
              ).toFixed(1)}
              x
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {macro.description}
        </Typography>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button color="primary" onClick={run}>
          Run <PlayArrowIcon />
        </Button>
        <Button>
          <EditIcon onClick={onEdit} />
        </Button>
        <Button variant="destructive">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Macros() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialState, setInitialState] = useState<any>({});
  const [mode, setMode] = useState("create");
  const socket = useSocket();
  const { data: macros } = useMacros();

  function createMacro(macro: any) {
    if (mode === "edit") {
      socket?.emit("macro:update", macro);
      setIsOpen(false);
      return;
    }

    socket?.emit("macro:create", macro);
    setIsOpen(false);
  }

  return (
    <div>
      {macros?.map((macro) => {
        return (
          <MacroViewItem
            key={`macro-${macro.id}`}
            macro={macro}
            onEdit={() => {
              setMode("edit");
              setInitialState({ ...macro });
              setIsOpen(true);
            }}
            mode={mode}
          />
        );
      })}

      <Button
        color="primary"
        style={{ position: 'fixed', right: 16, bottom: 16 }}
        onClick={() => {
          setMode('create');
          setInitialState({
            name: '',
            description: '',
            steps: [{ delay: 0, command: 'SET_PREVIEW' }],
          });
          setIsOpen(true);
        }}
      >
        <AddIcon />
      </Button>

      <MacroForm
        isOpen={isOpen}
        initialValues={initialState}
        onSubmit={createMacro}
        onCancel={() => setIsOpen(false)}
        mode={mode}
      />
    </div>
  );
}
