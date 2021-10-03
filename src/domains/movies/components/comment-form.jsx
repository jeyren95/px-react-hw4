import React from "react";
import { TextField } from "components/text-field";
import { TextAreaField } from "components/textarea-field";
import { Button } from "components/button";
import { useSubmitComment } from "domains/movies";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    rating: Yup.number().min(1).max(5).required(),
    content: Yup.string()
})


export const CommentForm = ({ movieId }) => {
    const submitCommentMutation = useSubmitComment()
    const ratingRef = React.createRef()

    const formik = useFormik({
        initialValues: {
            rating: "",
            content: ""
        },
        validationSchema,
        onSubmit: (values) => {
            submitCommentMutation.mutate({ rating: Number(values.rating), movieId, content: values.content }, {
                onSuccess: () => {   
                    formik.resetForm()
                    ratingRef.current && ratingRef.current.focus()
                }
            })              
        }
    })


    return (
        <div className="max-w-md">
            {submitCommentMutation.data && submitCommentMutation.data.message && <p className="m-3 text-pink-600">Sorry, {submitCommentMutation.data.message}, please try again.</p>} 
            <form className="p-6" onSubmit={formik.handleSubmit}>
                <div className="space-y-6">
                    <TextField 
                    id="rating"
                    ref={ratingRef}
                    value={formik.values.rating}
                    name="rating"
                    label="Rating (1 to 5)"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorMessage={formik.errors.rating}
                    touched={formik.touched.rating}
                    />
                    <TextAreaField
                    id="content"
                    value={formik.values.content}                
                    name="content"
                    label="Comment"
                    className="w-full"
                    onChange={formik.handleChange}
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