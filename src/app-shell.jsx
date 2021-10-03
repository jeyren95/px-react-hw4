import React from "react";
import { Link } from "react-router-dom";
import { AuthContext, UserProvider, useLogout, useUser } from "domains/auth";
import { Button } from "components/button";


export const AppShell = ({ children }) => {
    const authState = React.useContext(AuthContext)
    const logout = useLogout()
    const { currentUserId, currentName } = useUser()

    return (
        <UserProvider 
        currentUserId={currentUserId}
        currentName={currentName}
        >
            <header className="md:sticky md:top-0 bg-white md:z-10">
                <div className="px-4">
                    <div className="flex justify-between items-center py-2 max-w-7xl mx-auto border-b border-gray-200">
                        <nav className="flex items-center">
                            <Link to="/" className="text-xl inline-block mr-4 font-bold text-pink-700 hover:text-pink-900"> 
                                Movies App
                            </Link>

                            {authState.token ?
                            <Button type="button" onClick={logout}>Logout</Button>
                            :
                            <>
                                <Link to="/login">
                                    <Button type="button" className="mx-3">        
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button type="button" className="mx-3" variant="outline">                                
                                            Register          
                                    </Button>
                                </Link>
                            </>
                            }
                        </nav>
                        {currentName && <p>You are logged in as <span className="font-bold text-pink-700 ">{currentName}</span></p>}
                    </div>
                    
                </div>
            </header>
            <main>
                {children}
            </main>
        </UserProvider>
    )
}