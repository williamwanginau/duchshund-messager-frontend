import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { loginAPI, registerAPI } from "./api/authAPI";
import { notify } from "./notifications/notify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const AuthPage = () => {
  const defaultTheme = createTheme();

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
        console.error(err);
        const errorMessage = err.response?.data?.message || "Token invalid";
        notify(errorMessage, "error");
      }
    }
  }, [navigate, setUserData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const response = await loginAPI(email, password);
        if (!response) return;
        localStorage.setItem("token", response.data.data.token);
        notify("Login successful", "success");
        navigate("/chat");
      } catch (err) {
        console.error(err);
        notify(err.response.data.message, "error");
      }
    } else {
      try {
        const response = await registerAPI(username, email, password);
        localStorage.setItem("token", response.data.data.token);
        navigate("/chat");
        notify(response.data.message, "success");
      } catch (err) {
        console.error(err);
        notify(err.response.data.message, "error");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>{" "}
            <Typography component="h1" variant="h5">
              {isLogin ? "Login" : "Sign Up"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isLogin && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  name="Username"
                  autoComplete="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
              <Grid onClick={() => setIsLogin(!isLogin)} item>
                <Link href="#" variant="body2">
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Login"}
                </Link>
              </Grid>
            </Box>
          </Box>
        </CssBaseline>
      </Container>
    </ThemeProvider>
  );
};

export default AuthPage;
