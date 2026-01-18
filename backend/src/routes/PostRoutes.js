import express from 'express';
import protect from '../middlewares/Auth.js'
import { addPost,deletePost,updatePost,getAllPosts } from "../controller/PostController.js";
const router=express.Router();

router.get('/getpost',getAllPosts);
router.route('/addpost').post(protect,addPost);
router.route('/deletepost/:id').delete(protect,deletePost);
router.route('/updatepost/:id').patch(protect,updatePost);


export default router;

