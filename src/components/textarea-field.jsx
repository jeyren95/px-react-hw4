import React from "react";
import { TextArea } from "./text-area";
import { Field } from "./field"
import { Label } from "./label"

export const TextAreaField = ({ id, label, ...props }) => {
    
    return (
        <Field id={id}>
            <Label>{label}</Label>
            <TextArea 
            {...props}
            />
        </Field>
    )

}