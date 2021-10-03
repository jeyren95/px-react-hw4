import React from "react";
import { registerUser } from "../auth.service";
import { useHistory } from "react-router-dom";

export const useRegister = () => {
    const [registerError, setRegisterError] = React.useState("")
    const history = useHistory()

    const attemptRegister = (userDetails) => 
        registerUser(userDetails)
        .then(() => {
            if (registerError !== "") {
                setRegisterError("")
            }
            history.push("/login")
        })
        .catch((err) => {
            console.log(err.message)
            setRegisterError(err.message)
        })

    return {
        attemptRegister,
        registerError
    }
}