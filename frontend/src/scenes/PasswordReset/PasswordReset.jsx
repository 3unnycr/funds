import React from 'react';
import { Typography, Divider } from 'antd';
import PasswordResetForm from "./PasswordResetForm";
import PasswordResetbanner from "../../images/loginbanner.jpg";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
const PasswordReset = () => {
   const { token } = useParams();
  const { Title } = Typography;
    return (
      <div className="loginbg">
        <div className="logindiv">
          <img src={PasswordResetbanner} className="loginbanner" alt="login"/>
          <div className="loginwrap">
            <div>
              <Title level={3}>Password Reset</Title>
              <Divider/>
            </div>
            <PasswordResetForm token={token}/>
            Don't have an account! <Link to="/register">Create new account.</Link>
          </div>
        </div>
      </div>
    )

}

export default PasswordReset
