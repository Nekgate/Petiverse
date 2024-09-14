const likePostController = async (req, res, next) => {
    // get the postId from the params
    const { postId } = req.params;
    // get the user to like the post from body
    const { userId } = req.body;
    try {
        // find the postId in database
        const post = await Post.findById(postId);
        // throw error if not found
        if (!post) {
            throw new CustomError("Post not found", 404);
        }
        // find user with userId
        const user = User.findById(userId);
        // found user not found throw error
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // check if user have liked before
        if (post.likes.includes(userId)) {
            throw new CustomError("You have liked this post already!", 404);
        }
        // push userid to like post array
        post.likes.push(userId);
        // save the post again
        await post.save();
        res.status(200).json({message:"post liked", post});

    } catch (error) {
        next(error);
    }
}

const dislikePostController = async (req, res, next) => {
    // get the postId from the params
    const { postId } = req.params;
    // get the user to like the post from body
    const { userId } = req.body;
    try {
        // find the postId in database
        const post = await Post.findById(postId);
        // throw error if not found
        if (!post) {
            throw new CustomError("Post not found", 404);
        }
        // find user with userId
        const user = User.findById(userId);
        // found user not found throw error
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        // check if user have liked before
        if (!post.likes.includes(userId)) {
            throw new CustomError("You have not liked the post before!", 404);
        }
        // remove the userId from likes array and save
        post.likes=post.likes.filter(id=>id.toString()!==userId);
        // save the post again
        await post.save();
        res.status(200).json({message:"post disliked", post});

    } catch (error) {
        next(error);
    }
}