import React from "react";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForgotPasswordMutation} from "../../store/api/authApi";
import {Form, Input, SubmitButton} from "formik-antd";
import { SendOutlined } from "@ant-design/icons"

const ForgotPasswordForm = () => {
    const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

  return (
    <div>

    <Formik
      initialValues={{email: ""}}
      onSubmit={ async (values) => {
        const result = await forgotPassword({...values});
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
          toast.success(result.data.data, {
            toastId: "success",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        }
      }}
      validate={values => {
          if(!values.email && !values.password){
            return { email: "Required", password: "Required" }
          }
          if (!values.email) {
            return { email: "Required" }
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

          <SubmitButton type="primary" loading={isLoading} icon={<SendOutlined />} disabled={false}>
            Send Email
          </SubmitButton>
        </Form>
      )}
    />
    </div>
  )
}

export default ForgotPasswordForm
