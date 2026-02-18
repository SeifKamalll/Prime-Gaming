import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "Yup"
import { domain } from "../store";

export default function Register() {
    const navigate = useNavigate();

    const Schema = Yup.object({
        username: Yup.string().required(),

        email: Yup.string().required().email(),

        password: Yup.string()
            .required()
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must be at most 20 characters')
    });

    useEffect(() => {
        let token = localStorage.getItem("token") || sessionStorage.getItem("token")
        token && navigate("/")
    }, [])

    const handleSubmit = (values) => {
        let url = domain + "/api/auth/local/register"
        axios.post(url, values).then((res) => {
            let token = res.data.jwt
            sessionStorage.setItem('token', token);
            toast.success('Registerd Successfully');
            navigate('/')
        }).catch((err) => {
            toast.error(err.response.data.error.message);
        })
    }

    return (

        <div data-theme="dark" className={`w-full h-dvh flex items-center justify-center`}>
            <Formik initialValues={{ email: '', password: '', username: '' }} onSubmit={handleSubmit} validationSchema={Schema}>
                <Form className="shadow rounded-2xl p-4 flex flex-col gap-3 w-100 border">
                    <h1 className="text-2xl">Welcome Please Register</h1>
                    <Field className="w-full input outline-0" name="username" type="text" placeholder="Enter your Username" />
                    <ErrorMessage name="username" component={'p'} className="text-red-500" />

                    <Field className="w-full input outline-0" name="email" type="text" placeholder="Enter your Email" />
                    <ErrorMessage name="email" component={'p'} className="text-red-500" />
                    <Field className="w-full input outline-0" name="password" type="text" placeholder="Enter your Password" />
                    <ErrorMessage name="password" component={'p'} className="text-red-500" />
                    <button type="submit" className="btn btn-success w-full">
                        Register
                    </button>
                    <Link to={'/login'} className="btn btn-primary">
                        Already have an Account ? Please Login
                    </Link>
                </Form>
            </Formik>
        </div>
    )
}
