import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer";

const Root = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
