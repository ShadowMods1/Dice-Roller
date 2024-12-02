const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files (e.g., HTML)

// Admin Key Validation
app.post("/admin-login", (req, res) => {
  const { key } = req.body;
  if (key === process.env.ADMIN_KEY) {
    return res.json({ success: true });
  }
  res.status(403).json({ success: false, message: "Forbidden" });
});

// Serve Admin Panel
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/admin.html");
});

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
