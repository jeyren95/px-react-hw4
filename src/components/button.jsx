import React from "react";
import cn from "classnames";

export const Button = ({ variant="primary", children, ...props }) => {
    return (
        <button 
        {...props}
        className = {cn(`
            inline-flex
            justify-center
            items-center
            py-2
            px-4
            border 
            shadow-sm
            text-sm
            font-medium
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2         
            `, 
            props.className,
            classByColor[variant]   
            )}
        >
        {children}
        </button>
    )
}

const classByColor = {
    primary: "border-transparent text-white bg-pink-600 hover:bg-pink-700 focus:ring-pink-500",
    outline: "border-pink-500 text-pink-500 bg-white hover:text-pink-700"
}