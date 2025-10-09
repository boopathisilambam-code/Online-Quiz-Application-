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
} from "@mui/material";

const Home = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = `${process.env.CLIENT_URL }`; // <-- backend URL

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/quiz`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(res.data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchQuizzes();
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
        Welcome {user?.name || "User"} 👋
      </Typography>

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
