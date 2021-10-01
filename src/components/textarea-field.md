```jsx
const Demo = () => {
    const [text, setText] = React.useState("")

    return (
        <TextAreaField 
        id="comment"
        name="comment"
        label="Comment"
        className="w-1/2"
        onChange={(e) => setText(e.target.value)}
        />
    )
}

<Demo />

```