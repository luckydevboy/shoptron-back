import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  console.log("MongoDB connected");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
