import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./AuthPage";
import Chat from "./Chat";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";
import { AppProvider } from "./context/AppContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AppProvider>
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
    </AppProvider>
  );
}

export default App;
