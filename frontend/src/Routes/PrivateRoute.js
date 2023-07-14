import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState} from "react";
import Spinner from "../Spinner";
import axios from "axios";
const PrivateRoute = () => {
let  auth = sessionStorage.getItem("token");

  return (
    (auth != null) ? <Outlet /> : <Spinner />
  )
}

export default PrivateRoute
