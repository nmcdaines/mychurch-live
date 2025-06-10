import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Fab,
  TextField,
  DialogActions,
  Box,
  Paper,
  TextFieldProps,
  StandardTextFieldProps,
  OutlinedTextFieldProps,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AddIcon from "@material-ui/icons/Add";
import { Formik, FieldArray } from "formik";
import { Button } from "@/components/ui/button";

const defaultTextFieldProps: any = {
  fullWidth: true,
  variant: "outlined",
  margin: "dense",
};

interface ICameraPresetCreateFormProps {
  isOpen: boolean;

  initialValues: any;
  onSubmit: any;
  onCancel: any;
}

export const CameraPresetForm: React.FC<ICameraPresetCreateFormProps> = (
  props,
) => {
  return (
    <Dialog open={props.isOpen}>
      <DialogContent>
        <DialogTitle>Create Preset</DialogTitle>

        <Formik initialValues={props.initialValues} onSubmit={props.onSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <DialogDescription>
                  Save the current Pan/Tilt/Zoom position as a Macro that can be
                  recalled later from the Camera settings or via other Macros.
                </DialogDescription>
                <TextField
                  {...defaultTextFieldProps}
                  label="Name"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  autoFocus
                  required
                />
                <Box mt={1}>
                  <TextField
                    {...defaultTextFieldProps}
                    label="Description"
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    multiline
                  />
                </Box>
                <DialogActions>
                  <Button color="primary" onClick={props.onCancel}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Save
                  </Button>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

