import React from "react";
import { Formik } from "formik";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {usePasswordResetMutation} from "../../store/api/authApi";
import {Form, Input, SubmitButton} from "formik-antd";
import { UndoOutlined } from "@ant-design/icons";

const PasswordResetForm = (props) => {
    const [passwordReset, {isLoading}] = usePasswordResetMutation();

  return (
    <div>
    <Formik
      initialValues={{password: "", confirm: "", resetToken: String(props.token)}}
      onSubmit={async (values) => {
        const result = await passwordReset({...values});
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
        }
      }
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
          <SubmitButton type="primary" loading={isLoading} icon={<UndoOutlined />} disabled={false}>
            Reset
          </SubmitButton>
        </Form>
      )}
    />
    </div>
  )
}

export default PasswordResetForm
