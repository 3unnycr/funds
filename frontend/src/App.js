import {Routes, Route} from "react-router-dom";
import Login from "./scenes/Login/Login";
import Register from "./scenes/Register/Register";
import ForgotPassword from "./scenes/ForgotPassword/ForgotPassword";
import PasswordReset from "./scenes/PasswordReset/PasswordReset";
import Dashboard from "./scenes/User/Dashboard/Dashboard";
import AuthChecker from "./scenes/User/AuthChecker/AuthChecker";
import CompoundFixedDeposit from "./scenes/User/CompoundFixedDeposit/CompoundFixedDeposit";
import PrivateRoute from "./Routes/PrivateRoute";
import 'antd/dist/antd.min.css';
import { ToastContainer} from 'react-toastify';

function App() {
  if (sessionStorage.getItem("token")){

  }
  return (
    <div className="App">
        <ToastContainer/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/passwordreset/:token" element={<PasswordReset />} />
          <Route path="/authchecker" element={<AuthChecker />} />
          <Route element={<PrivateRoute />}>
              <Route path="/user/dashboard" element={<Dashboard />} />
              <Route path="/user/inocfd" element={<CompoundFixedDeposit />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
