import React from "react";
import Headers from "../../../components/Headers";
import SidebarMenu from "../../../components/Sidebar";
import "./dashboard.css";
import { DashboardOutlined }from  "@ant-design/icons";
import {Row, Typography, Divider, Card, Statistic, Slider, Descriptions, Carousel, InputNumber} from "antd";
import {ArrowUpOutlined} from "@ant-design/icons";
import {useState} from "react";
import Dashbanner from "../../../images/dashboardbanner.jpg";

const Dashboard = () => {

  const [principal, setPrincipal]  = useState(500);
  const [total, setTotal] = useState(520.20);
  const [months, setMonths]  = useState(2);
  const [roi, setRoi]  = useState(20.20);
  const {Title} = Typography;
  const [toggled, setToggled] = React.useState(false);
  const handleRoi = (principal, months) => {
    let sumRoi = 0;
    let initalroi = 0;
    let newprincipal = parseFloat(principal);
    for (let i = 0; i < parseInt(months); i++) {
      initalroi = newprincipal * 0.02;
      newprincipal = initalroi + newprincipal;
      sumRoi = sumRoi + parseFloat(initalroi);
    }
    setRoi(sumRoi);
    setTotal(newprincipal);
  }
  const onChangePrincipal = (newValue) => {
    setPrincipal(newValue)
    handleRoi(newValue, months);
  }
  const onChangeMonths = (newValue) => {
    setMonths(newValue)
    handleRoi(principal, newValue);
  }
  return (
    <>
    <Row style={{backgroundColor: "#ffffff"}}>

        <SidebarMenu toggled={toggled} setToggled={setToggled}/>

    </Row>
    <main>
      <div>
        <Headers setToggled={setToggled} toggled={toggled} pathnameofdash={"Dashboard"} />
      </div>
    </main>
    <Title level={2} style={{ margin: "10px", color: "#2980b9"}}><DashboardOutlined style={{marginRight: "10px"}} />Dashboard</Title>
    <Divider style={{margin: 0}}/>
    <div className="container-fluid p-1" style={{backgroundColor: "dfdfdf73"}}>
    <div className="row" >

      <div className="col-md-3 bg-light p-2">
        <Card bordered={true} className="bgden">
            <Statistic
              title="Portfoilo"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="$"
            />
          </Card>
        </div>
        <div className="col-md-3 bg-light p-2">
          <Card bordered={true} className="bgden">
              <Statistic
                title="ROI"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="$"
              />
          </Card>
        </div>
        <div className="col-md-3 bg-light p-2">
          <Card bordered={true} className="bgden">
              <Statistic
                title="Balance"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="$"
              />
            </Card>
        </div>
        <div className="col-md-3 bg-light p-2">
          <Card bordered={true} className="bgden">
              <Statistic
                title="Withdrawable"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="$"
              />
            </Card>
        </div>
      </div>
      <div className="row">
      <div className="col-md-6 bg-light">
      <Carousel>
          <div>
            <img src={Dashbanner} className="img-fluid" alt="dashbanner"/>
          </div>
      </Carousel>
      </div>
      <div className="col-md-3 bg-light">
        <div className="card p-5 bg-white border rounded" >
          <Title level={3} style={{color: "#2980b9"}}>Calculation CFD</Title>
          <Descriptions
              bordered
              size={"small"}
              column={{
                xxl: 1,
                xl: 1,
                lg: 1,
                md: 1,
                sm: 1,
                xs: 1,
              }}
          >
            <Descriptions.Item label="Principal">{principal} $</Descriptions.Item>
            <Descriptions.Item label="Months">{months}</Descriptions.Item>
            <Descriptions.Item label="ROI">{Number(roi).toFixed(2)} $</Descriptions.Item>
            <Descriptions.Item label="Total">{Number(total).toFixed(2)} $</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
      <div className="col-md-3 bg-light">
        <div className="card p-5 bg-white border rounded">
          <Title level={3} style={{color: "#2980b9"}}>Interest Calculator</Title>
          <label>Intrest Rate: 2% (Monthly)</label>
          <br/>
          <label>Principal Amount:</label>
          <InputNumber name="principal" value={principal} onChange={onChangePrincipal} formatter={value => `$ ${value}`} style={{width: "100%"}}/>
          <Slider range defaultValue={principal} min={100} max={5000} onChange={onChangePrincipal}/>
          <label>Months: {months} Months</label>
          <Slider range defaultValue={months} min={2} max={36} onChange={onChangeMonths}/>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}
export default Dashboard;
