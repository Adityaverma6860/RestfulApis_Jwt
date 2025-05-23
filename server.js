const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDb();

// Middleware to parse JSON
app.use(express.json());

//Global Routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
