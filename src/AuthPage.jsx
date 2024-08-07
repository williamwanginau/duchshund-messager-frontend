import { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { loginAPI, registerAPI } from "./api/authAPI";

const AuthPage = () => {
  const { setUserData } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
        } else {
          setUsername(decodedToken.username);
          setUserData({
            username: decodedToken.username,
            email: decodedToken.email,
            id: decodedToken.userId,
          });
          navigate("/chat");
        }
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("jwtToken");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const response = await loginAPI(email, password);

        console.log(response);

        if (!response.ok) {
          throw new Error(response.message || "Network response was not ok");
        }

        localStorage.setItem("token", response.data.token);
        navigate("/chat");
      } catch (err) {
        console.log("Error registering:", err);
      }
    } else {
      try {
        const response = await registerAPI(username, email, password);

        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        console.log("Registration successful with data:", data);
      } catch (err) {
        console.log("Error registering:", err);
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label htmlFor="username">username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={!isLogin}
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default AuthPage;
