import React from "react";
import { Link, useParams } from "react-router-dom";
import { Comment } from "./comment";
import { useMovieDetails, useComments } from "domains/movies";
import { CommentForm } from "./comment-form";
import { AuthContext } from "domains/auth";
import { Button } from "components/button";


export const MovieDetails = () => {
    const movieQuery = useMovieDetails()
    const commentsQuery = useComments()
    const { movieId } = useParams()
    const authState = React.useContext(AuthContext)

    const renderComments = () => {
        return commentsQuery.data.map((comment) => {
            return (
                <Comment 
                key={comment._id}
                commentId={comment._id}
                userName={comment.userName}
                rating={comment.rating}
                content={comment.content}
                userId={comment.userId}
                />
            )
        })
    }

    return (
        <div
        className="
        max-w-2xl 
        mx-auto 
        py-16 
        px-4 
        sm:py-24 
        sm:px-6 
        lg:max-w-7xl 
        lg:px-8 
        lg:grid 
        lg:grid-cols-2 
        lg:gap-x-8
        "
        >
            {movieQuery.isLoading ? <p>Loading...</p> 
            : movieQuery.isError ? <p>Error: {movieQuery.error.message}</p>
            :
            <>  
                <div className="lg:max-w-lg lg:self-end">
                    <div className="mt-4">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{movieQuery.data.title}</h1>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center">
                            <p className="text-lg text-gray-900 sm:text-xl">Release Date: {movieQuery.data.releaseDate}</p>
                        </div>
                        <div className="mt-4 space-y-6">
                            <p className="text-base text-gray-500">{movieQuery.data.overview}</p>
                        </div>
                    </div>
                    {commentsQuery.data &&
                        <div className="mt-4">
                            {renderComments()}
                        </div>                    
                    }
                </div> 
                <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
                    <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                        <img src={movieQuery.data.posterUrl} alt="" />
                    </div>
                </div>
                
                <div className="lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
                    {authState.token !== null ?
                    <div className="mt-10">
                        <div className="mt-4">
                            <CommentForm movieId={movieId} />
                        </div>
                    </div>
                    :
                    <Button type="button"><Link to="/login">Login to comment!</Link></Button> 
                    }
                </div> 
            </>     
            }            
        </div>
    )
}