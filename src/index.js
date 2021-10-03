import React from "react";
import ReactDOM from "react-dom";
import "./index.css"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "domains/auth";
import { QueryClient, QueryClientProvider } from "react-query"

import { AppShell } from "./app-shell";
import { Movies } from "pages/movies";
import { Login } from "pages/login";
import { Register } from "pages/register";
import { MovieDetailsPage } from "pages/movie-details";
import { Error404 } from "pages/error-404";

// provide the query client as a context
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000
        }
    }
})

ReactDOM.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>                
                <AppShell>
                    <Switch>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/movie/:movieId">
                            <MovieDetailsPage />
                        </Route>
                        <Route path="/" exact>
                            <Movies />
                        </Route>
                        <Route path="*">
                            <Error404 />
                        </Route>
                    </Switch>
                </AppShell>            
            </AuthProvider>
        </QueryClientProvider>
    </BrowserRouter>
    , document.getElementById("root"))