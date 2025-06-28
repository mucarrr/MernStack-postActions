const PostSchema = require("../models/PostModel");

const createPost = async (req, res) => {
    try{
        const {username, title, message} = req.body;
        if(!username || !title || !message){
            return res.status(400).json({message: "All fields are required"});
        }
        const post = await PostSchema.create({username, title, message});
        res.status(201).json({message: "Post created successfully", post});
    }catch(error){
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}
const getPosts = async (req, res) => {
    try{
        const posts = await PostSchema.find().sort({ createdAt: -1 });
        res.status(200).json({posts});
    }catch(error){
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}
const updatePost = async (req, res) => {
    try{
        const {id} = req.params;
        const {username, title, message} = req.body;
        const updatedPost = await PostSchema.findByIdAndUpdate(
            id, 
            {username, title, message},
            { new: true }
        );
        res.status(200).json({message: "Post updated successfully", post: updatedPost});
    }catch(error){  
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}
const deletePost = async (req, res) => {
    try{
        const {id} = req.params;
        await PostSchema.findByIdAndDelete(id);
        res.status(200).json({message: "Post deleted successfully"});
    }catch(error){
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}
module.exports = {createPost, getPosts, deletePost, updatePost};