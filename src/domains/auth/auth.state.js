import React from "react";

const ACCESS_TOKEN_STORAGE = "access_token";

const INITIAL_AUTH_STATE = localStorage.getItem(ACCESS_TOKEN_STORAGE) ?
    {
        authStatus: "authenticated",
        token: localStorage.getItem(ACCESS_TOKEN_STORAGE)
    }
    :
    {
        authStatus: "anonymous",
        token: null
    }
    


// useReducer to handle auth state
const authReducer = (authState, action) => {
    switch(action.type) {
        case "login":
            return {
                authStatus: "authenticated",
                token: action.token
            }
        case "logout":
            return {
                authStatus: "anonymous",
                token: null
            }
        default:
            throw new Error(`Unsupported action type ${action.type} in authReducer`)
    }
}


const useAuthState = () => {
    const [authState, dispatch] = React.useReducer(authReducer, INITIAL_AUTH_STATE)

    // dispatch actions
    const login = (token) => {
        dispatch({ type: "login", token })
    }

    const logout = () => {
        dispatch({ type: "logout" })
    }

    return {
        ...authState,
        login,
        logout
    }
}


// useContext to share the auth state with entire app
export const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }) => {
    const authState = useAuthState()

    return (
        <AuthContext.Provider value={authState}>
            { children }
        </AuthContext.Provider>
    )
}


// login user
const loginUser = (userDetails) => 
    fetch("https://ecomm-service.herokuapp.com/login", {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userDetails)
    })
    .then((res) => Promise.all([res.status, res.json()]))


export const useLogin = () => {
    const authState = React.useContext(AuthContext)
    const [loginError, setLoginError] = React.useState("")

    const attemptLogin = (userDetails) => 
        loginUser(userDetails)
        .then((data) => {
            if (data[0] === 200) {
                if (loginError !== "") {
                    setLoginError("")
                }
                authState.login(data[1].access_token)
                localStorage.setItem(ACCESS_TOKEN_STORAGE, data[1].access_token)
            } else {
                setLoginError(data[1].message)
            }
        })
        .catch((err) => console.log(err.message))

    
     
    if (!authState) {
        throw new Error("Your application must be wrapped with Auth Provider")
    } else {
        return {
            attemptLogin,
            loginError
        }
    }
}

export const useLogout = () => {
    const authState = React.useContext(AuthContext)

    if (!authState) {
        throw new Error("Your application must be wrapped with Auth Provider")
    } else {
        return () => {
            authState.logout()
            localStorage.removeItem(ACCESS_TOKEN_STORAGE)
        }
    }
}