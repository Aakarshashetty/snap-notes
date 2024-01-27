const express = require("express");
const notes = require("./data/notes");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
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

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
