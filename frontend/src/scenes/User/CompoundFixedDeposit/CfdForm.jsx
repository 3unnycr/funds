import React from "react";
import "./compound.css";
import { Formik } from "formik";
import {Form, InputNumber, SubmitButton} from "formik-antd";
import {useAddCfdMutation} from "../../../store/api/cfdApi";
import { toast } from 'react-toastify';
const CfdForm = (props) => {
  const sessiontoken = sessionStorage.getItem("token");
  const [addCfd , { isLoading }] = useAddCfdMutation();

  return (
    <>
    <Formik
      initialValues={{amount: 50, token: sessiontoken}}
      onSubmit={async (values) => {
        const result = await addCfd({...values});
        console.log(result);
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
          toast.success("CFD Created successfully! ContractId: {"+ result.data.contract + "}  Thankyou!", {
          toastId: "success-cfd",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme:"colored"
          });
          props.onHandlegetdata();
        }

      }}
      validate={values => {
          if (!values.amount) {
            return { amount: "Required" }
          }
          if (values.amount <= 50.00){
            return {amount: "Amount should be greater than 50.00 USD"}
          }
          return undefined
      }}
      render={() => (
        <Form>
          <div style={{color: "white"}}>
            Balance: <span>$ {Number(5000).toFixed(2)}</span>
          </div>
          <Form.Item
            name="amount"
            hasFeedback={true} showValidateSuccess={true}
          >
            <InputNumber name="amount" formatter={value => `$ ${value}`} onChange={(value) => props.setAmount(value)} style={{width: "100%"}}/>
          </Form.Item>
          <SubmitButton type="primary" loading={isLoading} disabled={false}>
            Make
          </SubmitButton>
        </Form>
      )}
      />
    </>
  )
}
export default CfdForm;
