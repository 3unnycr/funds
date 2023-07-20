import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const exitn = () => {
    window.location.href = "/login";
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      exitn();
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  let loading = true;
  let color = "#ffffff";

  return (
    <>
      <h1 >This page is Forbidden 403 Redirecting you in {count} second </h1>
      <div>
        <span className="visually-hidden">Loading...
        <ScaleLoader
          color={color}
          loading={loading}
          height={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
        </span>
      </div>
    </>
  );
};

export default Spinner;
