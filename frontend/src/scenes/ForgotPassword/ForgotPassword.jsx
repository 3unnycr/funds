import React from 'react';
import { Typography, Divider } from 'antd';
import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotPasswordbanner from "../../images/loginbanner.jpg";
import {Link} from "react-router-dom";
const ForgotPassword = () => {
  const { Title } = Typography;
    return (
      <div className="loginbg">
        <div className="logindiv">
          <img src={ForgotPasswordbanner} className="loginbanner" alt="login"/>
          <div className="loginwrap">
            <div>
              <Title level={3}>Forgot Password</Title>
              <Divider/>
            </div>
            <ForgotPasswordForm />
            Don't have an account! <Link to="/register">Create new account.</Link>
          </div>
        </div>
      </div>
    )

}

export default ForgotPassword
