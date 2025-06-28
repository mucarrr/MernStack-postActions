const AuthSchema = require("../models/AuthModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function isEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const register = async (req, res) => {
    try{
const {username, email, password} = req.body;

const user = await AuthSchema.findOne({email});
if(user){
    return res.status(400).json({message: "User already exists"});
}

if(password.length < 6){
    return res.status(400).json({message: "Password must be at least 6 characters long"});
}

if(!isEmail(email)){
    return res.status(400).json({message: "Invalid email"});
}
 const passwordHash = await bcrypt.hash(password, 10);

 const newUser = await AuthSchema.create({username, email, password: passwordHash});

 const token = await jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

res.status(201).json({message: "User created successfully", newUser, token});
    }catch(error){
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}
const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await AuthSchema.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if(!passwordcompare){
            return res.status(400).json({message: "Invalid password"});
        }
        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.status(200).json({message: "Login successful", user, token});
    
    }catch(error){
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

module.exports = { register, login };