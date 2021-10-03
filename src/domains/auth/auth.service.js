// register user
export const registerUser = (userDetails) => 
    fetch("https://ecomm-service.herokuapp.com/register", {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userDetails)
    })
    .then((res) => {
        if (res.status === 201) {
            return res.json()
        } else if (res.status === 409) {
            throw new Error("Sorry, that email has already been used.")
        }  
    })


// login user
export const loginUser = (userDetails) => 
    fetch("https://ecomm-service.herokuapp.com/login", {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userDetails)
    })
    .then((res) => {
        if (res.status === 200) {
            return res.json()
        } else if (res.status === 401) {
            throw new Error("Sorry, please provide valid credentials.")
        }
    })

// fetch user
export const fetchUser = (token) => 
    fetch("https://ecomm-service.herokuapp.com/whoami", {
        headers: {
            accept: "application/json",
            "Authorization": `Bearer ${token}`    
        }
    })
    .then((res) => res.json())