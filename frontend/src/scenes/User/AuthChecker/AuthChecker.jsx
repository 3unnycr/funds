import React from "react";
import {useEffect} from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import {setUser} from "../../../store/state/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import axios from 'axios';
import {defaultState} from "../../../store/state/authSlice";

const AuthChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let loading= true;
  let color = "#000000";

  const user = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/user`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    }
    }).then((resp) => {
      dispatch(setUser({firstname: resp.data.user.firstname, lastname: resp.data.user.lastname, email: resp.data.user.email, token: resp.data.token}));

      localStorage.setItem("firstname", resp.data.user.firstname);
      localStorage.setItem("lastname", resp.data.user.lastname);
      localStorage.setItem("email", resp.data.user.email);
      localStorage.setItem("token", resp.data.user.token);
      navigate("/user/dashboard");
    }).catch((error) => {
      dispatch(defaultState());
      window.location.href = "/login";
    });
 }

  useEffect(() => {
    user();
  });
  return (
    <>
      <h1> Checking if connection is secure </h1>
      <ScaleLoader
        color={color}
        loading={loading}
        height={20}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
    </>
  )
}
export default AuthChecker;
