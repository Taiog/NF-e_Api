import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/nfe", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
