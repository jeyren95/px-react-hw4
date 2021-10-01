import React from "react";

// register user
const registerUser = (userDetails) => 
    fetch("https://ecomm-service.herokuapp.com/register", {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userDetails)
    })
    .then((res) => Promise.all([res.status, res.json()]))


export const useRegister = () => {
    const [registerError, setRegisterError] = React.useState("")

    const attemptRegister = (userDetails) => {
        registerUser(userDetails)
        .then((data) => {
            // display register error message if any
            // if not, register success => redirect to login page
            if (data[0] === 201) {
                if (registerError !== "") {
                    setRegisterError("")
                }
            } else {
                setRegisterError(data[1].message)               
            }   
        })
        .catch((err) => console.log(err))
    }

    return {
        attemptRegister,
        registerError
    }
}