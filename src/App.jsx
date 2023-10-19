import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import NoMatchPage from "./pages/NoMatchPage";
import CountryInfoPage from "./pages/CountryInfoPage";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="country/:id" element={<CountryInfoPage />} />
        <Route path="*" element={<NoMatchPage />} />
      </Routes>
    </>
  );
};

export default App;
