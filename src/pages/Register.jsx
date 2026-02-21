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
            toast.success('Registerd Successfully',{style: {borderRadius: '10px',background: '#333',color: '#fff',},});
            navigate('/')
        }).catch((err) => {
            toast.error(err.response.data.error.message,{style: {borderRadius: '10px',background: '#333',color: '#fff',},});
        })
    }

    return (

        <div data-theme="dark" className={`w-full h-dvh flex items-center justify-center bg-[#1C1B29] font-Vazirmatn`}>
            <Formik initialValues={{ email: '', password: '', username: '' }} onSubmit={handleSubmit} validationSchema={Schema}>
                <Form className="shadow rounded-2xl p-4 flex flex-col gap-3 w-100 border border-[#FF5733]">
                    <h1 className="text-2xl">Welcome Please Register</h1>
                    <Field className="w-full input outline-0 focus:border-[#FF5733]" name="username" type="text" placeholder="Enter your Username" />
                    <ErrorMessage name="username" component={'p'} className="text-red-500" />

                    <Field className="w-full input outline-0 focus:border-[#FF5733]" name="email" type="text" placeholder="Enter your Email" />
                    <ErrorMessage name="email" component={'p'} className="text-red-500" />
                    <Field className="w-full input outline-0 focus:border-[#FF5733]" name="password" type="text" placeholder="Enter your Password" />
                    <ErrorMessage name="password" component={'p'} className="text-red-500" />
                    <button type="submit" className="btn w-full bg-[#FF5733] hover:bg-gray-950 border-[#FF5733] text-white">
                        Register
                    </button>
                    <Link to={'/login'} className="btn border-[#FF5733] text-[#FF5733] bg-transparent hover:bg-gray-950 hover:text-white">
                        Already have an Account ? Please Login
                    </Link>
                </Form>
            </Formik>
        </div>
    )
}
