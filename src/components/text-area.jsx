import React from "react";
import { FieldContext } from "components/field-context";
import cn from "classnames";

export const TextArea = ({ ...props }) => {
    const id = React.useContext(FieldContext)

    return (
        <textarea
        {...props} 
        id={id}
        className={cn("block shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-300 rounded-md h-52", props.className)}
        >
        </textarea>
    )
}