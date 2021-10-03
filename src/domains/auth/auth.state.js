import React from "react";
import { loginUser, fetchUser } from "./auth.service";
import { useHistory } from "react-router-dom";

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



export const useLogin = () => {
    const authState = React.useContext(AuthContext)
    const [loginError, setLoginError] = React.useState("")
    const history = useHistory()

    const attemptLogin = (userDetails) => 
        loginUser(userDetails)
        .then((data) => {
            if (loginError !== "") {
                setLoginError("")
            }
            authState.login(data.access_token)
            localStorage.setItem(ACCESS_TOKEN_STORAGE, data.access_token)
            history.push("/")
        })
        .catch((err) => {
            console.log(err.message)
            setLoginError(err.message)
        })

     
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



export const useUser = () => {
    const [currentUserId, setCurrentUserId] = React.useState("")
    const [currentName, setCurrentName] = React.useState("")
    const authState = React.useContext(AuthContext)

    React.useEffect(() => {
        const controller = new AbortController()
        fetchUser(authState.token, controller.signal)
        .then((data) => {
            setCurrentUserId(data.userId)
            setCurrentName(data.name)
        })
        .catch((err) => console.log(err))

        return () => controller.abort()
    }, [authState.token])

    return {
        currentUserId,
        currentName
    }
}

export const UserContext = React.createContext()
UserContext.displayName = "UserContext"

export const UserProvider = ({ children, currentUserId, currentName }) => {
    const currentUser = {
        currentUserId, 
        currentName
    }

    return (
        <UserContext.Provider value={currentUser}>
            { children }
        </UserContext.Provider>
    )

}

