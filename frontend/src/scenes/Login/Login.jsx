import React from 'react';
import { Typography, Divider } from 'antd';
import "./Login.css";
import LoginForm from "./LoginForm";
import Loginbanner from "../../images/loginbanner.jpg";
import {Link} from "react-router-dom";
const Login = () => {
  const { Title } = Typography;
    return (
      <div className="loginbg">
        <div className="logindiv">
          <img src={Loginbanner} className="loginbanner" alt="login"/>
          <div className="loginwrap">
            <div>
              <Title level={3}>Login</Title>
              <Divider/>
            </div>
            <LoginForm />
            Don't have an account! <Link to="/register">Create new account.</Link>
          </div>
        </div>
      </div>
    )

}

export default Login
