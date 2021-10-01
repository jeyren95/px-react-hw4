```jsx
const Demo = () => {
    const [text, setText] = React.useState("")
    return (
        <TextArea 
        id="comment"
        name="comment"
        className="w-1/2"
        onChange={(e) => setText(e.target.value)}
        />
    )
}


<Demo />

```