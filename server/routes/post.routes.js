import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// update query frequency (ref drug) by query id (ingred)
router.route('/posts/:id').put(PostController.updatePost);

// // Add a new Post
// router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
//router.route('/posts/:cuid').delete(PostController.deletePost);

export default router;
