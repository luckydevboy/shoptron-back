import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import globalErrorHandler from "@/controllers/error.controller";
import userRoute from "@/routes/user.route";

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/users", userRoute);

app.use(globalErrorHandler);

export default app;
