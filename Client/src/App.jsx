import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Modules/Auth/Pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Modules/Home/Pages/Home";
import Signin from "../src/Modules/Auth/Pages/Signin";
import SearchHistory from "./Modules/SearchHistory/Pages/SearchHistory";
import OpenverseResults from "./Modules/Openverse/Pages/OpenverseResults";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route element={<MainLayout />} path="">
          <Route element={<Home />} path="" />
          <Route element={<OpenverseResults/>} path="openverse-results" />
          <Route element={<SearchHistory />} path="search-history" />
        </Route>
        <Route element={<Signup />} path="/register" />
        <Route element={<Signin />} path="/login" />
      </Routes>
    </>
  );
};

export default App;
