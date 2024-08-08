import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./AuthPage";
import Chat from "./Chat";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </Router>

      <ToastContainer />
    </UserProvider>
  );
}

export default App;
