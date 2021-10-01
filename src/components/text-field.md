With given ID
```jsx
const Demo = () => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    return (
        <div className="space-y-5">
            <TextField 
            id="username" 
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            label="Username"
            />
            <TextField 
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            label="Password"
            />
        </div>
    )
}

<Demo />
```

Without given ID
```jsx
const Demo = () => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
 
    return (
        <div className="space-y-5">
            <TextField 
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            label="Username"
            />
            <TextField 
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            name="password"
            label="Password"
            />
        </div>
    )
}

<Demo />

```