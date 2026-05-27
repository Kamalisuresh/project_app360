import React, { useState } from "react";
import axios from "axios";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import EngineerDashboard from "./pages/EngineerDashboard";
import ViewerDashboard from "./pages/ViewerDashboard";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      if(response.data.role === "Admin"){

        window.location.href="/admin";

      }

      else if(response.data.role === "Engineer"){

        window.location.href="/engineer";

      }

      else{

        window.location.href="/viewer";

      }

    } catch (err) {

      alert("Login Failed");

    }

  };

  return (

    <div style={{
      display:"flex",
      flexDirection:"column",
      width:"300px",
      margin:"100px auto",
      gap:"10px"
    }}>

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={loginUser}>
        Login
      </button>

    </div>

  );

}

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/engineer"
          element={<EngineerDashboard />}
        />

        <Route
          path="/viewer"
          element={<ViewerDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;