// fetch movie
export const fetchMovie = (id, signal) => 
    fetch(`https://ecomm-service.herokuapp.com/movie/movie/${id}`, {signal})
    .then((res) => res.json())

// fetch movies
export const fetchMovies = (page, signal) => 
    fetch(`https://ecomm-service.herokuapp.com/movie?page=${page}&limit=6`, {signal})
    .then((res) => res.json())

// fetch movie comments
export const fetchComments = (id, signal) => 
    fetch(`https://ecomm-service.herokuapp.com/movie/movie/${id}/comment`, {signal})
    .then((res) => res.json())

// submit comment
export const submitComment = (commentDetails, token) => 
    fetch("https://ecomm-service.herokuapp.com/movie/comment", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify(commentDetails)
    })
    .then((res) => res.json()) 


// delete comment
export const deleteComment = (commentId, token) => 
    fetch(`https://ecomm-service.herokuapp.com/movie/comment/${commentId}`, {
        method: "DELETE",
        headers: {
            accept: "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then((res) => res.json())