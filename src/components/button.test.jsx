import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event"
import { Button } from "./button";

test("<Button />", () => {
    const handleClick = jest.fn()
    const { container } = render(<Button type="button" onClick={handleClick}>Click me!</Button>)

    // test button type
    expect(container.firstChild.type).toBe("button");

    // test button handle click
    user.click(screen.getByText("Click me!"))
    expect(handleClick).toHaveBeenCalledTimes(1)
})



