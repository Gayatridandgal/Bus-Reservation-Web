const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5006;

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bus_reservation", // Update with your actual database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
    return;
  }
  console.log("Connected to MySQL database");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Bus Reservation System API");
});

// Get all buses
app.get("/buses", (req, res) => {
  const sql = "SELECT * FROM buses";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching buses:", err.message);
      res.status(500).json({ error: "Failed to fetch buses" });
      return;
    }
    res.json(results);
  });
});

// Handle ticket booking
app.post("/book", (req, res) => {
  const { username, phonenumber, busId, seats, date } = req.body;
  const sql =
    "INSERT INTO bookings (username, phonenumber, busId, seats, date) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [username, phonenumber, busId, seats, date], (err, results) => {
    if (err) {
      console.error("Error creating booking:", err.message);
      res.status(500).json({ error: "Failed to create booking" });
    } else {
      res.json({ message: "Booking successful!", bookingId: results.insertId });
    }
  });
});

// Display all bookings
app.get("/bookings", (req, res) => {
  const sql = "SELECT * FROM bookings";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err.message);
      res.status(500).json({ error: "Failed to fetch bookings" });
      return;
    }
    res.json(results);
  });
});

// Update booking details
app.put("/bookings/:id", (req, res) => {
  const { username, phonenumber, busId, seats, date } = req.body;
  const { id } = req.params;
  const sql = `
    UPDATE bookings 
    SET username = ?, phonenumber = ?, busId = ?, seats = ?, date = ?
    WHERE id = ?`;
  db.query(sql, [username, phonenumber, busId, seats, date, id], (err, results) => {
    if (err) {
      console.error("Error updating booking:", err.message);
      res.status(500).json({ error: "Failed to update booking" });
    } else {
      res.json({ message: "Booking updated successfully!" });
    }
  });
});

// Delete a booking
app.delete("/bookings/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM bookings WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error deleting booking:", err.message);
      res.status(500).json({ error: "Failed to delete booking" });
    } else {
      res.json({ message: "Booking deleted successfully!" });
    }
  });
});

// Start server on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
