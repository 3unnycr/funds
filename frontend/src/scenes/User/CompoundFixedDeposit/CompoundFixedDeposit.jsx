import React from 'react';
import {useState, useEffect} from 'react';
import Headers from "../../../components/Headers";
import SidebarMenu from "../../../components/Sidebar";
import CfdTable from "./CfdTable";
import {Row, Typography, Divider} from "antd";
import { DashboardOutlined }from  "@ant-design/icons";
import CfdForm from "./CfdForm";
import axios from 'axios';
import "./compound.css";

const CompoundFixedDeposit = () => {
    const {Title} = Typography;
    const [data, setData] = useState();
    const [toggled, setToggled] = useState(false);
    const [loading, setLoading] = useState(true);
    const dataget = async () => {
      setLoading(true);
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/cfd/history`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
      }
      }).then((resp) => {
        setData(resp.data.newcfds);
        setLoading(false);
      }).catch((error) => {
        if(error.response.data.error === "Not authorized to access this route"){
            sessionStorage.clear();
            window.location.href = "/login";
        }
      });
    }

    const onHandlegetdata = () => {
      dataget();
    }

  useEffect(() => {
    dataget();
  }, []);

  return (
    <>
      <Row style={{backgroundColor: "#ffffff"}}>
          <SidebarMenu toggled={toggled} setToggled={setToggled}/>
      </Row>
      <main>
        <div>
        <coingecko-coin-price-marquee-widget  style={{marginTop: "7px"}} coin-ids="bitcoin,ethereum,tether,binance-usd,dogecoin,binancecoin,solana,shiba-inu,litecoin" currency="usd" background-color="#ffffff" locale="en" font-color="#000000"></coingecko-coin-price-marquee-widget>
          <Headers setToggled={setToggled} toggled={toggled} pathnameofdash={"INO FUNDS CFD"} />
        </div>
      </main>
      <Title level={2} style={{ margin: "10px", color: "#2980b9"}}><DashboardOutlined style={{marginRight: "10px"}} />INO FUNDS CFD</Title>
      <Divider style={{margin: 0}}/>
      <div className="container-fluid p-1">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="card-header" style={{ color: "#ffffff", backgroundColor: "#001529" }}>
                <Title level={3} style={{color: "#ffffff"}}>Make CFD</Title>
              </div>
              <div className="card-body" style={{ color: "#ffffff", backgroundColor: "#34495e" }}>
                <CfdForm onHandlegetdata={onHandlegetdata}/>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-header">
                <Title level={3} style={{ color: "#2980b9"}}>CFD HISTORY</Title>
              </div>
              <div className="card-body">
                <CfdTable data={data}  loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CompoundFixedDeposit;
