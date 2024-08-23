import express from "express";
import cors from "cors";
import "dotenv/config";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 8000;
const FE_URL = process.env.FE_URL || "";

app.use(
  cors({
    origin: [FE_URL],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }),
);
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 1000,
  max: 10,
  message: {
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/api", apiLimiter, (req, res) => {
  const randomDelay = Math.floor(Math.random() * 1000) + 1;

  setTimeout(() => {
    if (typeof req.query.index === "string") {
      const requestIndex = parseInt(req.query.index, 10);
      res.json({ index: requestIndex });
    } else {
      res.status(400).json({ error: "Invalid request index" });
    }
  }, randomDelay);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
