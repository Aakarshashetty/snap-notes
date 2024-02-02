const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Helloooooooooo............");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const foundNote = notes.find((note) => note._id === req.params.id);
  res.send(foundNote);
});

app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
