// by default => react testing library will create a div and append that div to document.body 
// screen => used to query document.body
// render => render into the container that was created by the react testing library by default
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import React from "react";
import { TextField } from "./text-field";


const TestBed = () => {
    const [value, setValue] = React.useState("")

    return (
        <div>
            <TextField value={value} onChange={(e) => setValue(e.target.value)} label="Username" />
            <div data-testid="output">{value}</div>
        </div>
    )
}

test("<TextField />", () => {
    render(<TestBed />)
    user.type(screen.getByLabelText("Username"), "James")
    expect(screen.getByTestId("output").textContent).toBe("James")
})