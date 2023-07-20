import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";

const PrivateRoute = () => {
let  auth = sessionStorage.getItem("token");

  return (
    (auth != null) ? <Outlet /> : <Spinner />
  )
}

export default PrivateRoute
