import React from "react";
import { TextField } from "components/text-field";
import { Button } from "components/button";
import { useLogin } from "domains/auth";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required()
})

export const LoginForm = () => {
    const usernameRef = React.createRef()
    const { attemptLogin, loginError } = useLogin()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => {
            attemptLogin(values)
            formik.resetForm()
            usernameRef.current && usernameRef.current.focus()
        }
    })

    return (
        <div className="max-w-md mx-auto m-6 shadow">   
            <form className="p-6" onSubmit={formik.handleSubmit}>
                <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
                    Login 
                </div>
                {loginError !== "" && <p className="m-3 text-pink-600">{loginError}</p>} 
                <div className="space-y-6">
                    <TextField 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    touched={formik.touched.username}
                    value={formik.values.username}
                    type="text" 
                    id="username"
                    name="username"
                    label="Username (as in email address)"
                    ref={usernameRef}   
                    errorMessage={formik.errors.username}
                    />
                    <TextField 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    touched={formik.touched.password}
                    type="password" 
                    value={formik.values.password}
                    id="password"
                    name="password"
                    label="Password"
                    errorMessage={formik.errors.password}
                    />
                    <Button 
                    type="submit"
                    className="w-full"
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}