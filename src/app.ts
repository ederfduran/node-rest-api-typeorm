import express from "express"
import cors from "cors"
import { routes } from "./routes";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

routes(app)

export default app;