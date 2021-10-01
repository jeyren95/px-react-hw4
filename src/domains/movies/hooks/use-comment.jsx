import React from "react";
import { AuthContext } from "domains/auth";

// submit comment
const submitComment = (commentDetails, token) => 
    fetch("https://ecomm-service.herokuapp.com/movie/comment", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify(commentDetails)
    })
    .then((res) => Promise.all([res.status, res.json()]))


export const useSubmitComment = () => {
    const [commentError, setCommentError] = React.useState("")
    const authState = React.useContext(AuthContext)

    const attemptComment = ({ rating, movieId, content }) => {
        submitComment({ rating: Number(rating), movieId, content }, authState.token)
        .then((data) => {
            if (data[0] === 201) {
                if (commentError !== "") {
                    setCommentError("")
                }
            } else {
                setCommentError(data[1].message)
            }
        })
        .catch((err) => console.log(err))
    }

    if (!authState) {
        throw new Error("Your application must be wrapped with Auth Provider")
    } else {
        return {
            attemptComment,
            commentError
        }
    } 
}


// get user
const getUser = (token) => 
    fetch("https://ecomm-service.herokuapp.com/whoami", {
        headers: {
            accept: "application/json",
            "Authorization": `Bearer ${token}`    
        }
    })
    .then((res) => res.json())

// delete comment
const deleteComment = (commentId, token) => 
    fetch(`https://ecomm-service.herokuapp.com/movie/comment/${commentId}`, {
        method: "DELETE",
        headers: {
            accept: "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then((res) => res.json())

export const useDeleteComment = () => {
    const [associatedUser, setAssociatedUser] = React.useState("")
    const authState = React.useContext(AuthContext)

    React.useEffect(() => {
        getUser(authState.token)
        .then((data) => setAssociatedUser(data.userId))
        .catch((err) => console.log(err))
    }, [authState.token])

    const attemptDeleteComment = (commentId) => 
        deleteComment(commentId, authState.token)
        .catch((err) => console.log(err))

    return {
        associatedUser,
        attemptDeleteComment
    }
}

