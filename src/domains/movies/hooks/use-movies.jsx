import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { fetchMovie, fetchMovies } from "../movies.service";

export const useMovies = () => {
    const [page, setPage] = React.useState(1)

    // useQuery takes in 2 args => query key, query function 
        // query key is used internally for refetching, caching, sharing data across the app
        // require array as key => page is a dependency
        // query function returns a promise => usually the api call
    const query = useQuery(["movies", page], () => {
        const controller = new AbortController()
        const request = fetchMovies(page, controller.signal)

        // attach the cancel function to the promise => react query will call the cancel function if needed (like when the query key changes before the promise is resolved)
        request.cancel = () => controller.abort()
        return request
    }, {
        keepPreviousData: true
    })
    
    return {
        ...query,
        page,
        setPage 
    }
}


export const useMovieDetails = () => {
    const { movieId } = useParams()
    const queryClient = useQueryClient()

    const movieDetailsQuery = useQuery(["movieDetails", movieId], () => {
        const controller = new AbortController()
        const request = fetchMovie(movieId, controller.signal)
        request.cancel = () => controller.abort()
        return request
    }, {
        placeholderData: () => {
            return queryClient
            .getQueryData("movies")
            ?.find(cachedData => cachedData._id === movieId)
        }
    })

    return movieDetailsQuery
}
