import React from "react";
import { TextField } from "components/text-field";
import { Button } from "components/button";
import { useRegister } from "domains/auth";

export const RegisterForm = () => {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [avatar, setAvatar] = React.useState("")

    const nameRef = React.useRef()
    const { attemptRegister, registerError } = useRegister()

    // on load, focus on name input
    React.useEffect(() => {
        nameRef.current.focus()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        attemptRegister({ name, email, password, avatar })

        setName("")
        setEmail("")
        setPassword("")
        setAvatar("")
        nameRef.current.focus()
    }

    return (
        <div className="max-w-md mx-auto m-6 shadow">
            <form className="p-6" onSubmit={handleSubmit}>
                <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
                    Register
                </div>
                {registerError !== "" && <p className="m-3 text-pink-600">Sorry, {registerError}</p>} 
                <div className="space-y-6">
                    <TextField 
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                    id="name"
                    name="name"
                    label="Name"
                    ref={nameRef}
                    />
                    <TextField 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="text" 
                    value={email}
                    id="email"
                    name="email"
                    label="Email"
                    />
                    <TextField 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    value={password}
                    id="password"
                    name="password"
                    label="Password"
                    />
                    <TextField 
                    onChange={(e) => setAvatar(e.target.value)}
                    type="text"
                    value={avatar}
                    id="avatar"
                    name="avatar"
                    label="Your Avatar Link"
                    />
            
                    <Button 
                    type="submit"
                    className="w-full"
                    >        
                        Register       
                    </Button>
                    
                </div>
            </form>
        </div>
    )
}