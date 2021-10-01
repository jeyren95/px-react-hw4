import React from "react";
import { FieldContext } from "./field-context";

export const TextInput = React.forwardRef((props, ref) => {
    const id = React.useContext(FieldContext)

    return (
        <div className="mt-1">
            <input 
            {...props}
            ref={ref}
            id={id}
            className="
            block
            w-full
            shadow-sm
            sm:text-sm
            focus:ring-pink-500 
            focus:border-pink-500
            border-gray-300
            rounded-md
            "
            />
        </div>
    )
})

