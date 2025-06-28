const express = require("express");
const { createPost, getPosts, deletePost, updatePost } = require("../controllers/PostControllers.js");

const router = express.Router();

router.post("/createPost", createPost);
router.get("/getPosts", getPosts);
router.patch("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);

module.exports = router;