Text Input
```jsx
const Demo = () => {
    const [username, setUsername] = React.useState("")
    
    return (
        <TextInput
        onChange={(e) => setUsername(e.target.value)}
        type="text" 
        id="username"
        />
    )
}

<Demo />
```
Password Input
```jsx
const Demo = () => {
    const [password, setPassword] = React.useState("")

    return (
        <TextInput 
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        id="password"
        />
    )
}

<Demo />
```