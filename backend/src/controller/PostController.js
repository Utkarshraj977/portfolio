import Post from "../models/Post.js"; 
import expressAsyncHandler from "express-async-handler";


const getAllPosts = expressAsyncHandler(async (req, res) => {
    const { category } = req.query;

    const limit = parseInt(req.query.limit) || 6;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    let query = {};
    if (category) {
        query.category = category; 
    }

    const [posts, total] = await Promise.all([
        Post.find(query)
            .sort({ dateString: -1 }) 
            .skip(skip)
            .limit(limit),
        
        Post.countDocuments(query) 
    ]);

    res.status(200).json({
        success: true,
        count: posts.length,
        totalPosts: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: posts
    });
});

const addPost = expressAsyncHandler(async (req, res) => {
    const { category, content } = req.body;

    if (!content || !category) {
        res.status(400); 
        throw new Error("All fields (category, content) are required");
    }
    const validCategories = ["Project", "Blog", "Tutorial", "Case-Study", "Experience"];
    if (!validCategories.includes(category)) {
        res.status(400);
        throw new Error("Invalid category");
    }

    const post = new Post({
        category,
        content
    });

    await post.save();

    res.status(201).json({ 
        success: true,
        data: post
    });
});

const deletePost = expressAsyncHandler(async (req, res) => {
    const { id } = req.params; 

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    res.status(200).json({
        success: true,
        message: "Post successfully deleted",
        deletedId: id
    });
});


const updatePost = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true } 
    );

    if (!updatedPost) {
        res.status(404);
        throw new Error("Post not found");
    } 

    res.status(200).json({
        success: true,
        message: "Post successfully updated",
        data: updatedPost
    });
});

export  {getAllPosts,updatePost,deletePost,addPost};
