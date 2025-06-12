import React, {useMemo, useState} from "react";
import {
  Fab,
  DialogContentText,
  TextField,
  DialogActions,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {Formik, FieldArray} from "formik";
import {useDevices} from "../../core/SocketContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {FormField, FormSelectField} from "@/components/form-field";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";

const defaultTextFieldProps: any = {
  fullWidth: true,
  variant: "outlined",
  margin: "dense",
}

interface IMacroFormProps {
  isOpen: boolean,

  initialValues: any,
  onSubmit: any;
  onCancel: any;
  mode?: any;
}

export const MacroForm: React.FC<IMacroFormProps> = (props) => {
  const {data: devices} = useDevices();

  return (
    <Dialog
      open={props.isOpen}
    >
      <DialogContent className="max-h-[calc(100vh-20px)] overflow-scroll">
        <DialogTitle>
          {props.mode === 'edit' ? 'Edit' : 'Create'} Macro
        </DialogTitle>


        <Formik
          initialValues={props.initialValues}
          onSubmit={props.onSubmit}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => {
            const steps = values.steps || [];

            return (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <FormField
                  label="Name"
                  name="name"
                />

                <FormField label="Description" name="description"/>

                <div className="mt-2 space-y-6">
                  <FieldArray
                    name="steps"
                    render={arrayHelpers => (
                      <>
                        {steps.map((step: any, index: number) => (
                          <div
                            key={`step-${index}`}
                          >
                            <Card className="relative">
                              <CardHeader>Step {index + 1}</CardHeader>

                              <CardContent className="flex flex-col space-y-6">

                                <FormField label="Delay" name={`steps.${index}.delay`}/>

                                <div className="grid grid-cols-2 gap-2">
                                  <FormSelectField label="Device" name={`steps.${index}.device`} options={devices.map(
                                    ({id, name}) => ({value: id, label: name})
                                  )}/>


                                  <FormSelectField label="Command" name={`steps.${index}.command`} required options={[
                                    {value: "SET_PROGRAM", label: "Set Program Input"},
                                    {value: "SET_PREVIEW", label: "Set Preview Input"},
                                    {value: "SET_PIP", label: "Set Picture In Picture"},
                                    {value: "TRANSITION_AUTO", label: "Transition AUTO"},
                                    {value: "TRANSITION_CUT", label: "Transition CUT"},
                                    {value: "VISCA_SET_PAN_TILT", label: "Visca Set Pan Tilt"},
                                    {value: "VISCA_SET_ZOOM", label: "Visca Set Zoom"},
                                  ]}/>
                                </div>

                                {Boolean(step.command) && <div className="mt-8">Properties</div>}
                                {renderStepProperties(step, index)}
                              </CardContent>
                            </Card>
                          </div>
                        ))}

                        <Button
                          variant="secondary"
                          color="primary"
                          onClick={() => arrayHelpers.push({})}
                          type="button"
                        >
                          <AddIcon/> Add step
                        </Button>
                      </>
                    )}
                  />

                </div>
                <DialogFooter>
                  <Button color="primary" onClick={props.onCancel}>Cancel</Button>
                  <Button color="primary" type="submit">Save</Button>
                </DialogFooter>
              </form>
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

const getCommands = (type: string) => {
  if (type === 'birddog') {
    return [
      {value: "VISCA_SET_PAN_TILT", label: "Visca Set Pan Tilt"},
      {value: "VISCA_SET_ZOOM", label: "Visca Set Zoom"},
    ]
  }

  if (type === 'atem') {
    return [
      {value: "SET_PROGRAM", label: "Set Program Input"},
      {value: "SET_PREVIEW", label: "Set Preview Input"},
      {value: "SET_PIP", label: "Set Picture In Picture"},
      {value: "TRANSITION_AUTO", label: "Transition AUTO"},
      {value: "TRANSITION_CUT", label: "Transition CUT"},
    ]
  }

  return []
}

function renderStepProperties(step: any, index: number) {
  if (!step.command) return null;

  if (step.command === 'VISCA_SET_PAN_TILT') {
    return (
      <div className="space-y-2">
        <FormField
          label="Pan"
          name={`steps.${index}.properties.pan`}
        />
        <FormField
          label="Pan Speed"
          name={`steps.${index}.properties.panSpeed`}
        />
        <FormField
          label="Tilt"
          name={`steps.${index}.properties.tilt`}
        />
        <FormField
          label="Tilt Speed"
          name={`steps.${index}.properties.tiltSpeed`}
        />
      </div>
    )
  }

  if (step.command === 'VISCA_SET_ZOOM') {
    return (
      <div className="space-y-2">
        <FormField
          label="Zoom"
          name={`steps.${index}.properties.zoom`}
        />
      </div>
    )
  }

  if (step.command != 'SET_PIP' && step.command != 'VISCA_SET_PAN_TILT' && step.command != 'VISCA_SET_ZOOM') {
    return (
      <div className="space-y-2">
        <FormField
          label="Input"
          name={`steps.${index}.properties.input`}
        />
      </div>
    )
  }

  if (step.command === 'SET_PIP') {
    return (
      <div className="space-y-4">
        <FormSelectField label="Direction" name={`steps.${index}.properties.direction`}
                         required options={[
          {value: "ON", label: "On"},
          {value: "OFF", label: "Off"},
        ]}/>

        <div className="grid grid-cols-2 gap-2">
          <FormField
            label="Position X"
            name={`steps.${index}.properties.positionX`}
          />
          <FormField
            label="Position Y"
            name={`steps.${index}.properties.positionY`}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            label="Size X"
            name={`steps.${index}.properties.sizeX`}
          />
          <FormField
            label="Size Y"
            name={`steps.${index}.properties.sizeY`}
          />
        </div>
        <FormField
          label="Source"
          name={`steps.${index}.properties.source`}
        />
      </div>
    )
  }
}