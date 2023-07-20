import React from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Logo from "../images/logo.png";
import {NavLink} from "react-router-dom";
import {Typography} from "antd";
import Useravatar from "../images/user.png";
import {useAppSelector} from "../store/hook";
import {setUser} from "../store/state/authSlice";
import {useDispatch} from "react-redux";

const SidebarMenu = (props) => {
const { Title } = Typography;
const {firstname, lastname, email} = useAppSelector((state) => state.auth);
const dispatch = useDispatch();

if (!firstname){
    dispatch(setUser({firstname: localStorage.getItem("firstname"), lastname: localStorage.getItem("lastname"), email: localStorage.getItem("email"), token: localStorage.getItem("token")}));
}
return (
  <Sidebar backgroundColor="rgba(236, 240, 241,1.0)" width="300px" breakPoint="always" onBackdropClick={() => props.setToggled(false)} toggled={props.toggled}>
    <Menu
      menuItemStyles={{
        button: {
          // the active class will be added automatically by react router
          // so we can use it to style the active menu item
          [`&.active`]: {
            backgroundColor: 'rgb(41, 128, 185)',
            color: 'rgb(236, 240, 241)',
          },
          ['&:hover']: {
                backgroundColor: 'rgb(41, 128, 185)',
                color: "rgb(236, 240, 241)"
              },
        },
      }}
    >
      <div className="sidebarlogodiv" style={{padding: "20px"}}>
        <img src={Logo} className="logo" style={{ height: "40px"}} alt="logo"/>
        <Title level={3} style={{padding: "5px", color: "#2980b9" }}> INO FUNDS</Title>
      </div>
      <div style={{border: "2px solid rgb(41, 128, 185, 0.3)", borderTopStyle: "dotted", borderBottomStyle: "dotted", borderRadius: "5px", margin: "5px", padding: "5px"}}>
        <center>
          <img src={Useravatar} className="useravatar" alt="avatar" />
          <Title level={4} style={{color: "#2c3e50" }}>
            {firstname + ' ' + lastname}
          </Title>
            <span style={{color: "#2980b9"}}>({email})</span>
        </center>
      </div>
      <MenuItem component={<NavLink to="/user/dashboard" />}> Dashboard</MenuItem>
      <MenuItem component={<NavLink to="/user/inocfd" />}> INO Funds CFD</MenuItem>
      <MenuItem component={<NavLink to="/e-commerce" />}> E-commerce</MenuItem>
    </Menu>
  </Sidebar>
)
}
export default SidebarMenu;
