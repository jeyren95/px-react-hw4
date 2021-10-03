import React from "react";
import { AuthContext } from "domains/auth";
import { useParams } from "react-router-dom"; 
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchComments, submitComment, deleteComment } from "../movies.service";

export const useComments = () => {
    const { movieId } = useParams()

    const commentsQuery = useQuery(["comments", movieId], () => {
        const controller = new AbortController()
        const request = fetchComments(movieId, controller.signal)
        request.cancel = () => controller.abort()
        return request
    })

    return commentsQuery  
}

export const useSubmitComment = () => {
    const authState = React.useContext(AuthContext)
    const queryClient = useQueryClient()
    
    if (!authState) {
        throw new Error("Your application must be wrapped with Auth Provider")
    } else {
        return useMutation((data) => submitComment(data, authState.token), {
            onSuccess: () => queryClient.invalidateQueries("comments")
        })
    } 
}


export const useDeleteComment = () => {
    const authState = React.useContext(AuthContext)
    const queryClient = useQueryClient()

    if (!authState) {
        throw new Error ("Your application must be wrapped with Auth Provider")
    } else {
        return useMutation((commentId) => deleteComment(commentId, authState.token), {
            onSuccess: () => queryClient.invalidateQueries("comments")
        })
    }
}


