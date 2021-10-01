import React from "react";
import { TextField } from "components/text-field";
import { Button } from "components/button";
import { useLogin } from "domains/auth";

export const LoginForm = () => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
  
    const { attemptLogin, loginError } = useLogin()

    const usernameRef = React.createRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        attemptLogin({ username, password })

        setUsername("")
        setPassword("")
        usernameRef.current.focus()
    }

    return (
        <div className="max-w-md mx-auto m-6 shadow">   
            <form className="p-6" onSubmit={handleSubmit}>
                <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
                    Login 
                </div>
                {loginError !== "" && <p className="m-3 text-pink-600">{loginError}, try again with valid credentials.</p>} 
                <div className="space-y-6">
                    <TextField 
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}
                    type="text" 
                    id="username"
                    name="username"
                    label="Username (as in email address)"
                    ref={usernameRef}
                    />
                    <TextField 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    type="password" 
                    id="password"
                    name="password"
                    label="Password"
                    />
                    <Button 
                    type="submit"
                    className="w-full"
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}