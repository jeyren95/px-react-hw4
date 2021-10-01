import React from "react";
import { useParams } from "react-router-dom";

// fetch movie
const fetchMovie = (id, signal) => 
    fetch(`https://ecomm-service.herokuapp.com/movie/movie/${id}`, {signal})
    .then((res) => res.json())

// fetch movie comments
const fetchComments = (id, signal) => 
    fetch(`https://ecomm-service.herokuapp.com/movie/movie/${id}/comment`, {signal})
    .then((res) => res.json())


export const useMovieDetails = () => {
    const { movieId } = useParams()
    const [movie, setMovie] = React.useState(undefined)
    const [comments, setComments] = React.useState(undefined)

    React.useEffect(() => {
        let controller = new AbortController()
        fetchMovie(movieId, controller.signal)
        .then((data) => setMovie(data))   
        .catch((err) => console.log(err))

        return () => {
            controller.abort()
        }
    }, [movieId])

    React.useEffect(() => {
        let controller = new AbortController()
        fetchComments(movieId, controller.signal)
        .then((data) => setComments(data))
        .catch((err) => console.log(err))

        return () => {
            controller.abort()
        }
    }, [movieId, comments])

    return {
        movie, 
        comments
    }

}