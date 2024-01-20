const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const axios = require("axios");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "techstoredb",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL server:", err);
  } else {
    console.log("Connected to MySQL server.");
  }
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Registration endpoint
app.post("/api/register", async (req, res) => {
  try {
    const { username, password, email, firstName, lastName, address, phoneNumber } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const sqlInsert = `
      INSERT INTO user (Username, Password, Email, FirstName, LastName, Address, PhoneNumber)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    // Insert the user into the database
    db.query(
      sqlInsert,
      [username, hashedPassword, email, firstName, lastName, address, phoneNumber],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "An error occurred during registration." });
        } else {
          console.log("User registered successfully");
          res.status(201).json({ message: "Registration successful" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during registration." });
  }
});

// Existing endpoint to get users
app.get("/api/getUsers", (req, res) => {
  const sqlGet = "SELECT * FROM user;";
  db.query(sqlGet, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred." });
    } else {
      res.status(200).json({ msg: "User pulled successfully", results });
    }
  });
});
