import { TextInput } from "./text-input";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

test("<TextInput />", () => {
    // by default => react testing library creates a div and append that div to the document.body 
    // render => helps to render the component into that div without the use of react renderDOM
    //        => render also returns an object with some props such as container

    const handleChange = jest.fn()
    const { container } = render(<TextInput type="text" onChange={handleChange} />)
    
    // test input type
    expect(container.firstChild.firstChild.type).toBe("text")
    
    // test input handle change
    user.type(screen.getByDisplayValue(""), "Hello")
    expect(handleChange).toHaveBeenCalledTimes(5)
})