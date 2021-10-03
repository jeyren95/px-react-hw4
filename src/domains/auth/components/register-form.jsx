import React from "react";
import { TextField } from "components/text-field";
import { Button } from "components/button";
import { useRegister } from "domains/auth";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().min(8, "Password must be at least 8 characters.").required(),
    avatar: Yup.string().required()
})

export const RegisterForm = () => {
    const nameRef = React.useRef()
    const { attemptRegister, registerError } = useRegister()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            avatar: ""
        },
        validationSchema,
        onSubmit: (values) => {
            attemptRegister(values)
            formik.resetForm()
            nameRef.current && nameRef.current.focus()
        }
    })

    // on load, focus on name input
    React.useEffect(() => {
        nameRef.current.focus()
    }, [])


    return (
        <div className="max-w-md mx-auto m-6 shadow">
            <form className="p-6" onSubmit={formik.handleSubmit}>
                <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
                    Register
                </div>
                {registerError !== [] && <p className="m-3 text-pink-600">{registerError}</p>} 
                <div className="space-y-6">
                    <TextField 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.name}
                    type="text"
                    value={formik.values.name}
                    id="name"
                    name="name"
                    label="Name"
                    ref={nameRef}
                    errorMessage={formik.errors.name}
                    />
                    <TextField 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    touched={formik.touched.email}
                    type="text" 
                    value={formik.values.email}
                    id="email"
                    name="email"
                    label="Email"
                    errorMessage={formik.errors.email}
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
                    <TextField 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.avatar}
                    type="text"
                    value={formik.values.avatar}
                    id="avatar"
                    name="avatar"
                    label="Your Avatar Link"
                    errorMessage={formik.errors.avatar}
                    />
                    <Button 
                    type="submit"
                    className="w-full"
                    >        
                        Register       
                    </Button>
                    
                </div>
            </form>
        </div>
    )
}