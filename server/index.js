import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoute from "./routes/AuthRoute.js";
import contactRoute from "./routes/ContactRoute.js";
import setUpSocket from "./socket.js";
import messageRoute from "./routes/MessageRoute.js";
import channelRoute from "./routes/ChannelRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use("/uploads/profile", express.static("uploads/profile"))
app.use("/uploads/files",express.static("uploads/files"))

app.use(cookieParser())
app.use(express.json())

// routes
app.use("/api/auth",authRoute)
app.use("/api/users",contactRoute)
app.use("/api/messages",messageRoute)
app.use("/api/channels",channelRoute) 
const server = app.listen(port, () => {
  console.log("server started");
});
setUpSocket(server)
mongoose
  .connect(databaseURL)
  .then(() => console.log("mongodb connected"))
  .catch(() => console.log("error occurred"));
