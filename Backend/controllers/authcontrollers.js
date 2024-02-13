import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async(req, res) =>{ 
    
        try {
           const {fullName, username, password, confirmPassword, gender} = req.body;

           if(password !== confirmPassword){
            return res.status(400).json({ error: "Password do not match. "})
           }

           const user = await User.findOne({username});

           if(user){
            return res.status(400).json({ error: "Username already exists." })
           }

        //    hash the password

           const salt  = await bcrypt.genSalt(10);
           const hashPassword = await bcrypt.hash(password, salt);
 
           const boyProfilePic = `https://avatar.iran.liara.run/public/31?username=${username}`;
           const girlProfilePic = `https://avatar.iran.liara.run/public/99?username=${username}`;

           const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
           });

           if(newUser){
            // generate jwt token
            generateTokenAndSetCookie(newUser._id, res);


           await newUser.save();

           res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
            });
        }
        else{
            return res.status(400).json({ error: "Invalid user data." })
        }
        } catch (error) {
            console.log("Error in signup.", error.message);
            return res.status(500).json({ error: "Internal Server Error." })
    }           
};


export const login = async (req, res) =>{
    try {
        const { username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({ error: "Invalid Credentials." });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });


    } catch (error) {
        console.log("Error in login.", error.message);
        return res.status(500).json({ error: "Internal Server Error." });
    }    
};


export const logout = (req, res) =>{ 
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({ message: "Logged out Successfully."});
    } catch (error) {
        console.log("Error in logout.", error.message);
        return res.status(500).json({ error: "Internal Server Error." });
    }
}