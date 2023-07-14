import React from 'react';
import { Typography, Divider } from 'antd';
import "./Register.css";
import RegisterForm from "./RegisterForm";
import Registerbanner from "../../images/loginbanner.jpg";
import {Link} from "react-router-dom";
const Register = () => {
  const { Title } = Typography;
    return (
      <div className="loginbg">
        <div className="logindiv">
          <img src={Registerbanner} className="loginbanner" alt="register"/>
          <div className="loginwrap">
            <div>
              <Title level={3}>Register</Title>
              <Divider/>
            </div>
            <RegisterForm />
            Already have an account! <Link to="/login">Login here.</Link>
          </div>
        </div>
      </div>
    )

}

export default Register
