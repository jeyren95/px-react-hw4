import React from "react";
import { Field } from "./field";
import { TextInput } from "./text-input";
import { Label } from "./label";

export const TextField = React.forwardRef(({id, label, ...props}, ref) => {
    return (
        <Field id={id}>
            <Label>{label}</Label>
            <TextInput
            ref={ref}
            {...props} 
            />
        </Field>
    )
})


