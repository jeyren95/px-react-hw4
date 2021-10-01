import React from "react";
import { TextField } from "components/text-field";
import { TextAreaField } from "components/textarea-field";
import { Button } from "components/button";
import { useSubmitComment } from "domains/movies";


export const CommentForm = ({ movieId }) => {
    const [rating, setRating] = React.useState("")
    const [content, setContent] = React.useState("")
    const { attemptComment, commentError } = useSubmitComment()

    const ratingRef = React.createRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        attemptComment({ rating, movieId, content })

        setRating("")
        setContent("")
        ratingRef.current.focus()
    }

    return (
        <div className="max-w-md">
            {commentError !== "" && <p className="m-3 text-pink-600">Sorry, {commentError}</p>} 
            <form className="p-6" onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <TextField 
                    id="rating"
                    ref={ratingRef}
                    value={rating}
                    name="rating"
                    label="Rating (1 to 5)"
                    type="number"
                    onChange={(e) => setRating(e.target.value)}
                    />
                    <TextAreaField
                    id="content"
                    value={content}
                    name="content"
                    label="Comment"
                    className="w-full"
                    onChange={(e) => setContent(e.target.value)}
                    />
                    <Button 
                    type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}