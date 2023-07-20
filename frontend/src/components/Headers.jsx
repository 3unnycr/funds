import React from "react";
import {Button, Typography, Row, Col, Layout} from "antd";
import {MenuUnfoldOutlined} from "@ant-design/icons";
import Logo from "../images/logo.png";
const Headers = (props) => {
  const { Header } = Layout;
  const {Title} = Typography;
  return (
    <Header>
      <Row>
        <Col span={18} style={{marginTop: "10px"}}>
          <div className="sidebarlogodiv">
            <img src={Logo} className="dashboardlogo" alt="dashlogo"/>
            <Title level={3} style={{padding: "5px", color: "#2980b9" }}> INO FUNDS</Title>
          </div>
        </Col>
        <Col span={6} style={{marginTop: "10px"}}>
          <div className="headerbutton">
            <Button className="sb-button" onClick={() =>
              props.setToggled(!props.toggled)}>
              <MenuUnfoldOutlined />
            </Button>
          </div>
        </Col>
      </Row>
      <div>
      </div>
    </Header>
  )
}
export default Headers;
