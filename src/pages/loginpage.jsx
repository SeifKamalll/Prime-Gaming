import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "Yup";
import { domain } from "../store";

export default function Loginpage() {
  const navigate = useNavigate()

  const Schema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(5)
  })

  const handleSubmit = (values) => {
    let url = domain + "/api/auth/local"
    let dataToSend = { identifier: values.email, password: values.password };
    axios.post(url, dataToSend).then((res) => {
      let token = res.data.jwt;
      values.isChecked ? localStorage.setItem("token", token) : sessionStorage.setItem("token", token);
      toast.success('Logged in Successfully');
      navigate("/");
    }).catch((err) => {
      toast.error(err.response.data.error.message);
    })
  }

  useEffect(() => {
    let token = localStorage.getItem('token') || sessionStorage.getItem("token");
    token && navigate("/")
  }, [])

  return (

    <div data-theme="dark" className="w-full h-dvh flex items-center justify-center">
      <Formik initialValues={{ email: "", password: "", isChecked: false }} onSubmit={handleSubmit} validationSchema={Schema}>
        <Form className="shadow rounded-2xl p-4 flex flex-col gap-3 w-[400px] border">
          <h1 className="text-2xl">Welcome , Please login</h1>
          <Field name="email" type="text" className="w-full input outline-0" placeholder="Enter Your Email" />
          <ErrorMessage name="email" component={'p'} className="text-red-500" />
          <Field name="password" type="text" className="w-full input outline-0" placeholder="Enter Your Password" />
          <ErrorMessage name="password" component={'p'} className="text-red-500" />
          <label className="flex gap-3 w-max">
            <Field name="isChecked" className="checkbox checkbox-primary cursor-pointer" type="checkbox" />
            Remember Me
          </label>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
          <Link to={'/register'} className="btn btn-success">
            Don't have an Account ? Register now
          </Link>
        </Form>
      </Formik>
    </div>
  )
}
