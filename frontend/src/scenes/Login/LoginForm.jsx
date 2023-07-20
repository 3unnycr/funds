import React from "react";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLoginUserMutation} from "../../store/api/authApi";
import {Form, Input, SubmitButton} from "formik-antd";
import { LoginOutlined } from "@ant-design/icons"
import {Link} from "react-router-dom";

const LoginForm = () => {
  const [loginUser , {isLoading}] = useLoginUserMutation();

  return (
    <div>

    <Formik
      initialValues={{email: "", password: ""}}
      onSubmit={ async (values) => {
        const result = await loginUser({...values});
        if (result.error){
          toast.error(result.error.data.error, {
          toastId: "error-cfd",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme:"colored"
          });
        }else{
          sessionStorage.setItem("token", result.data.token);
          window.location.href = "/authchecker";
        }
      }}
      validate={values => {
          if(!values.email && !values.password){
            return { email: "Required", password: "Required" }
          }
          if (!values.email) {
            return { email: "Required" }
          }
          if (!values.password) {
            return { password: "Required" }
          }
          return undefined
        }}
      render={() => (
        <Form>
          <Form.Item
            name="email"
            hasFeedback={true} showValidateSuccess={true}
          >
            <Input name="email" placeholder="Enter you email id" />
          </Form.Item>
          <Form.Item
            name="password"
            hasFeedback={true} showValidateSuccess={true}
          >
            <Input.Password name="password" placeholder="Enter your password" />
          </Form.Item>
            <div className="rightaligndiv">
              <Link to="/Forgotpassword">Forgot password!</Link>
            </div>
            <br/>
            <SubmitButton type="primary" loading={isLoading} icon={<LoginOutlined />} disabled={false}>
              Login
            </SubmitButton>
        </Form>
      )}
    />
    </div>
  )
}

export default LoginForm
