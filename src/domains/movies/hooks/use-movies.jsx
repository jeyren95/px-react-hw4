import React from "react";
import { useQuery } from "react-query"

// fetch movies
const fetchMovies = (page, signal) => 
    fetch(`https://ecomm-service.herokuapp.com/movie?page=${page}&limit=6`, {signal})
    .then((res) => res.json())


export const useMovies = () => {
    const [page, setPage] = React.useState(1)

    // useQuery takes in 2 args => query key, query function 
        // query key is used internally for refetching, caching, sharing data across the app
        // require array as key => page is a dependency
        // query function returns a promise => usually the api call
    const queryResult = useQuery(["movies", page], () => {
        const controller = new AbortController()
        const request = fetchMovies(page, controller.signal)

        // attach the cancel function to the promise => react query will call the cancel function if needed (like when the query key changes before the promise is resolved)
        request.cancel = () => controller.abort()
        return request
    })
    
    
    console.log(queryResult)
    return {
        ...queryResult,
        page,
        setPage 
    }
}



// React.useEffect(() => { 
//     let controller = new AbortController()

//     fetchMovies(page, controller.signal)
//     .then((data) => setMovies(data))
//     .catch((err) => {
//         console.log(err)
//     })

//     return () => {
//         controller.abort()
//     }
// }, [page])