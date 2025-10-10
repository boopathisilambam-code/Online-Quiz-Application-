import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Grid, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(formData);
      toast.success("Login successful!");
      navigate("/home");
    } catch (err) {
      setError(err.message); // Now properly shows backend msg like "Invalid credentials"
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Sign In</Typography>

        {error && <Alert severity="error" sx={{ width: "100%", mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField 
            label="Email Address" 
            name="email" 
            fullWidth 
            required 
            margin="normal" 
            value={formData.email} 
            onChange={handleChange} 
            autoFocus 
            disabled={loading}
          />
          <TextField 
            label="Password" 
            name="password" 
            type="password" 
            fullWidth 
            required 
            margin="normal" 
            value={formData.password} 
            onChange={handleChange} 
            disabled={loading}
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            color="primary" 
            sx={{ mt: 3, mb: 2 }} 
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => navigate("/register")} sx={{ textTransform: "none" }}>
              Don't have an account? Sign up
            </Button>
          </Grid>
        </form>
      </Paper>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Login;
