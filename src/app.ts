import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index";
import { setupSwagger } from "./swagger";
import errorMiddleware from "./middlewares/errorHandle";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/nfe", routes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
