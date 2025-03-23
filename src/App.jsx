import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/LoginPage";
import LandingPage from "./Pages/LandingPage";
import AdminDashboard from "./Pages/Admin";
import Profile from "./Pages/Profile";
import Blog from "./Pages/Blog";
import BlogPost from "./Pages/BlogPost";
import BlogList from "./Pages/BlogList";
import BlogDetail from "./Pages/BlogDetail";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* Fixed here */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/blogs" element={< BlogList/>} />
        <Route path="/blogs/:id" element={< BlogDetail/>} />
      </Routes>
    </>
  );
}

export default App;
