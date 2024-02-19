import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

// components
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";

export default function RootLayout() {

  useEffect(() => {
    document.getElementById("initialloading").style.display = "none"
  }, [])

  const [uloggedin] = useState(
    localStorage.getItem("jwt") == '""' ? false : true
  );

  console.log("State2 is " + uloggedin + name);

  return (
    <>
      <Grid>
        <GridItem bg="#03041f">
          <Navbar />
        </GridItem>
      </Grid>
      <Grid >

        {/* main content & navbar */}
        <GridItem
          h="100vh"
          as="main"
          overflowX={"auto"}
        >
          <Outlet />
        </GridItem>
      </Grid>
      <ToastContainer />
    </>
  );
}
