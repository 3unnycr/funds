// ================= Imports ===================== //
require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandlerMiddleware");
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
app.use('/api/auth', require('./routes/authRoute'));
// app.use('/api/user', require('./routes/user'));
// app.use('/api/superintendent', require('./routes/superintendent'));
// ================= Express Setting for server ===================== //

// ================= Server Connection ===================== //
const PORT = process.env.SERVER_PORT || 3001;

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// ================= Server Connection ===================== //
// ================= Database Connection ===================== //
connectDB(process.env.MONGO_URI);
// ================= Database Connection ===================== //
