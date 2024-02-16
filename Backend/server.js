
import express from "express";
import 'dotenv/config'
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import  dbConnection from "./db/dbConnection.js";
import {app, server} from './socket/socket.js';




const PORT = process.env.PORT || 5000;



// to parse the incoming requests with json payloads
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);



server.listen(PORT, ()=>{
    dbConnection();
    console.log(`Server is running on port ${PORT}`)
});