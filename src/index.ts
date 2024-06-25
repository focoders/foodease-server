import express from 'express';
import router from './api/api.route'
import cors from "cors"

const app = express();
const port = 8080;

app.use(cors({
  origin: ["https://localhost:3000", "https://foodease-web-client.vercel.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
  }))
app.use(express.json())
app.use("/api", router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});