import { screen, render } from "@testing-library/react";
import { TextAreaField } from "./textarea-field";
import user from "@testing-library/user-event";
import React from "react"

const TestBed = () => {
    const [value, setValue] = React.useState("")

    return (
        <div>
            <TextAreaField label="Comment" onChange={(e) => setValue(e.target.value)} />
            <div data-testid="output">{value}</div>
        </div>
    )
}

test("<TextAreaField />", () => {
    render(<TestBed />)
    user.type(screen.getByLabelText("Comment"), "This is a comment")
    expect(screen.getByTestId("output").textContent).toBe("This is a comment")
})