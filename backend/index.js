//npx nodemon index.js
const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let db;

// Veritabanına bağlan
connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
    db = getDb();
  } else {
    console.log("Failed to connect to the database");
  }
});

// GET route
app.get("/form", async (req, res) => {
  try {
    const form = await db.collection("form").find().toArray();
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST route
app.post("/form", (req, res) => {
  const book = req.body;

  db.collection("form")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "could not create new document" });
    });
});
