import React from "react";
import { FieldContext } from "./field-context";

export const Label = ({ children }) => {
    const id = React.useContext(FieldContext)

    return (
        <label className="block text-sm font-medium text-gray-900" htmlFor={id}>{children}</label>
    )
}

