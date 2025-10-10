import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

const Home = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch quizzes (public endpoint, but we check token for consistency)
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setError(null); // Clear previous errors
        const res = await axios.get("/api/quiz"); // Relative path - no headers needed (uses AuthContext default if token exists)
        setQuizzes(res.data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchQuizzes();
    } else {
      setLoading(false); // No token? Stop loading (will redirect anyway)
    }
  }, [token]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading quizzes...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8, mb: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        Welcome {user?.name || "User "} 👋
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, textAlign: "center" }}>
          {error}
        </Alert>
      )}

      {quizzes.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          No quizzes available right now.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz._id}>
              <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {quiz.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {quiz.description || "No description provided."}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate(`/quiz/${quiz._id}`)}
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
