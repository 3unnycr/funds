import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  const exitn = () => {
    window.location.href = "/login";
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1666);
    count === 0 &&
      exitn();
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  let loading = true;
  let color = "#2980b9";

  return (
    <>
      <div className="loginbg">
        <div className="logindiv p-5" >
          <h5>This page is Forbidden 403</h5>
          <p>Redirecting you in {count} second ... </p>
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

  );
};

export default Spinner;
