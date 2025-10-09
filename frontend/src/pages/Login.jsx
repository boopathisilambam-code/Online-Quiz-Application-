const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  if (!formData.email || !formData.password) {
    setError("Please enter both email and password.");
    setLoading(false);
    return;
  }

  try {
    const user = await login(formData);
    toast.success("Login successful!");

    // Small delay ensures toast and context sync
    setTimeout(() => navigate("/home"), 800);
  } catch (err) {
    console.error("Login error:", err);
    const errorMessage = err.response?.data?.message || err.message || "Login failed. Please try again.";
    setError(errorMessage);
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};
