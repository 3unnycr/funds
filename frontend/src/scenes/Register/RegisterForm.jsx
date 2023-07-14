import React from "react";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRegisterUserMutation} from "../../store/api/authApi";
import {Form, Input, SubmitButton} from "formik-antd";
import { UserAddOutlined } from "@ant-design/icons"

const RegisterForm = () => {
  const [registerUser , {data, isLoading, error, isError, isSuccess}] = useRegisterUserMutation();

  if(isError){
    console.log(error);
    toast.error(error.data.error, {
      toastId: "error",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  if(isSuccess){
    sessionStorage.setItem("token", data.token);
    window.location.href = "/dashboard";
  }


  return (
    <div>

    <Formik
      initialValues={{firstname: "", lastname: "",email: "", password: ""}}
      onSubmit={(values) => {
        registerUser({...values});
      }}
      validate={values => {

          if(!values.firstname && !values.lastname && !values.email && !values.password){
            return { firstname: "Required", lastname: "Required", email: "Required", password: "Required" }
          }
          if(!values.lastname && !values.email && !values.password){
            return { lastname: "Required", email: "Required", password: "Required" }
          }
          if(!values.email && !values.password){
            return { email: "Required", password: "Required" }
          }
          if(!values.firstname && !values.lastname && !values.email){
            return { firstname: "Required", lastname: "Required", email: "Required" }
          }
          if(!values.firstname && !values.lastname){
            return { firstname: "Required", lastname: "Required" }
          }
          if (!values.firstname) {
            return { firstname: "Required" }
          }
          if (!values.lastname) {
            return { lastname: "Required" }
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
              name="firstname"
              hasFeedback={true} showValidateSuccess={true}
            >
              <Input name="firstname" placeholder="Enter First Name"  />
            </Form.Item>
            <Form.Item
              name="lastname"
              hasFeedback={true} showValidateSuccess={true}
            >
              <Input name="lastname" placeholder="Enter Last Name" />
            </Form.Item>
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
              <Input.Password name="password" placeholder="Enter your password" hasFeedback={true} showValidateSuccess={true} />
            </Form.Item>
            <br/>
            <br/>
            <SubmitButton type="primary" loading={isLoading} icon={<UserAddOutlined />} disabled={false}>
              Register
            </SubmitButton>
        </Form>
      )}
    />
    </div>
  )
}

export default RegisterForm
