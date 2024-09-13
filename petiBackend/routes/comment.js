const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { 
    createCommentController,
    createCommentReplyController,
    updateCommentController,
    updateReplyCommentController,
} = require('../commentControllers/commentController');
const { 
    deleteCommentController,
    deleteReplyCommentController,
} = require('../commentControllers/deleteCommentController');
const getCommentsByPostController = require('../commentControllers/fetchCommentController');
const { 
    likeCommentController,
    dislikeCommentController,
    likeReplyCommentController,
    dislikeRelpyCommentController,
} = require('../commentControllers/likeCommentController');
const router = express.Router();


// CREATE COMMENT
router.post("/create/:postId", verifyToken, createCommentController);

// CREATE COMMENT REPLY
router.post("/reply/:commentId", verifyToken, createCommentReplyController);

// UPDATE COMMENT
router.put("/update/:commentId", verifyToken, updateCommentController);

// UPDATE REPLY COMMENT
router.put("/update/:commentId/replies/:replyId", verifyToken, updateReplyCommentController);

// GET ALL POST COMMENTS
router.get("/post/:postId", verifyToken, getCommentsByPostController);

// DELETE COMMENT
router.delete("/delete/:commentId",verifyToken, deleteCommentController);

// DELETE REPLY COMMENT
router.delete("/delete/:commentId/replies/:replyId", verifyToken, deleteReplyCommentController);

// LIKE A COMMENT
router.post("/like/:commentId", verifyToken, likeCommentController);

// UNLIKE COMMENT
router.post("/dislike/:commentId", verifyToken, dislikeCommentController);

// LIKE A REPLY COMMENT 
router.post("/:commentId/replies/like/:replyId", verifyToken, likeReplyCommentController);

// UNLIKE REPLY COMMENT
router.post("/:commentId/replies/dislike/:replyId", verifyToken, dislikeRelpyCommentController);

module.exports = router;
