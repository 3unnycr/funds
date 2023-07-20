import React from "react";
import {useEffect} from "react";
import HashLoader from "react-spinners/HashLoader";
import {setUser} from "../../../store/state/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import axios from 'axios';
import {defaultState} from "../../../store/state/authSlice";

const AuthChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let loading= true;
  let color = "#2980b9";

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

      setTimeout(function(){
        navigate("/user/dashboard");
      }, 5000);
    }).catch((error) => {
      dispatch(defaultState());
      setTimeout(function(){
        window.location.href = "/login";
      }, 5000);
    });
 }

  useEffect(() => {
    user();
  });
  return (
    <>
      <div className="loginbg">
        <div className="logindiv p-5" >
          <h5>Checking if connection is secure!  </h5>
          <p>Please wait!</p>
          <center>
            <HashLoader
              color={color}
              loading={loading}
              height={20}
              aria-label="Loading Spinner"
              data-testid="loader"
              />
          </center>
        </div>
      </div>
    </>
  )
}
export default AuthChecker;
