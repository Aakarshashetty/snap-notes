import "./App.css";
import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./pages/Landing/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./pages/MyNotes/MyNotes";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mynotes" element={<MyNotes />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
