import React from "react";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {usePasswordResetMutation} from "../../store/api/authApi";
import {Form, Input, SubmitButton} from "formik-antd";
import { SendOutlined } from "@ant-design/icons";

const PasswordResetForm = (props) => {
    const [passwordReset, {data, isLoading, error, isError, isSuccess}] = usePasswordResetMutation();

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
    toast.success(data.data, {
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


  return (
    <div>

    <Formik
      initialValues={{password: "", confirm: "", resetToken: String(props.token)}}
      onSubmit={(values) => {
        passwordReset({...values});
      }}
      validate={values => {
          if(!values.confirm && !values.password){
            return { confirm: "Required", password: "Required" }
          }
          if (!values.confirm) {
            return { confirm: "Required" }
          }
          if (!values.password) {
            return { password: "Required" }
          }
          return undefined
        }}
      render={() => (
        <Form>
          <Form.Item
            name="password"
            hasFeedback={true} showValidateSuccess={true}
          >
            <Input.Password name="password" placeholder="Enter new password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            hasFeedback={true} showValidateSuccess={true}
          >
            <Input.Password name="confirm" placeholder="Confirm your new password" />
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

export default PasswordResetForm
