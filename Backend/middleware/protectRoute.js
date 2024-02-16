import jwt, { decode } from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;

        if(!token){
        res.status(401).json({ error: "Unauthorized, No token provided. " });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
        res.status(401).json({ error: "Unauthorized, Invalid Token." });
        }

        const user  = await User.findById(decoded.userId).select("-password");

        if(!user) {
        res.status(404).json({ error: "User Not Found." });
        }

        req.user = user;

        next();
        
    } catch (error) {
        console.log("Error in protectRoute", error.message);
        res.status(500).json({ error: "Internal Server Error. " });
    }
};

export default protectRoute;