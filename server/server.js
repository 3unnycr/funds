// ================= Imports ===================== //
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');
const http = require("http");
// ================= Imports ===================== //

// ================= Cors Proxy ===================== //
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200
}
// ================= Cors Proxy ===================== //

// ================= Express Setting for server ===================== //
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(errorHandler);
// ================= Express Setting for server ===================== //

// ================= Server Connection ===================== //
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// ================= Server Connection ===================== //
