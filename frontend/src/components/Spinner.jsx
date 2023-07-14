import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import {Grid, Box} from "@mui/material";
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
    count == 0 &&
      exitn();
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <>

    <Grid container className="wallpaper" direction="row" justifyContent="center" alignItems="center" sx={{height: "100vh"}}>
      <Grid item xs={10} md={3}>
      <Box p="20px" sx={{backgroundColor: `#111214bf`}}>
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
        </Box>
      </Grid>
    </Grid>
    </>
  );
};

export default Spinner;
