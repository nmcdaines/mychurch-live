import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import React from "react";
import {Field, useField} from "formik";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export function FormField({label, name, required}: { label: string, name: string, required?: boolean }) {
  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label>{label}</Label>
      <Field name={name} required={required}>
        {({
            field, // { name, value, onChange, onBlur }
            form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta,
          }) => (
          <>
            <Input {...field} />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
          </>
        )}
      </Field>
    </div>
  )
}


export function FormSelectField({label, name, options}: {
  label: string,
  name: string,
  options: Array<{ value: string, label: string }>
}) {
  const [field, meta, helper] = useField(name)

  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label>{label}</Label>
      <Select onValueChange={helper.setValue} defaultValue={field.value}>
        <SelectTrigger className="w-full">
          <SelectValue/>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem value={`${option.value}`}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {meta.touched && meta.error && (
        <div className="error">{meta.error}</div>
      )}
    </div>
  )
}