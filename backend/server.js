require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const lapanganRoutes = require("./routes/lapanganRoutes");
const jadwalRoutes = require("./routes/jadwalRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/lapangan", lapanganRoutes);
app.use("/api/jadwal", jadwalRoutes);
app.use("/api/booking", bookingRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "SportBook API Running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});