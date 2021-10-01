import React from "react";
import { FieldContext } from "./field-context";
import { useId } from "hooks/use-id";

export const Field = ({ children, id }) => {
    const ensuredId = useId(id)

    return (
        <FieldContext.Provider value={ensuredId}>
            <div className="space-y-1">{children}</div>
        </FieldContext.Provider>
    )
}
