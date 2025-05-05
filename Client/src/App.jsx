import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Modules/Auth/Pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route element={<Signup />} path="/" />
      </Routes>
    </>
  );
};

export default App;
