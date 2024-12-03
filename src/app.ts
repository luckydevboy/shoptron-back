import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import globalErrorHandler from "@/controllers/error.controller";

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

// app.use("/api/v1/users", userRoute);

app.use(globalErrorHandler);

export default app;
