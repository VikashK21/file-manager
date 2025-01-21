require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const connectDB = require("./db/db");
const cors = require("cors");

const app = express();

connectDB();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("dev"));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://file-manager-six-theta.vercel.app",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api", require("./routes/api.routes"));
app.use("/api/uploads", express.static("uploads"));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
