'use strict';

import express from 'express';
import * as postsController from '../controllers/posts.js';

export const postsRouter = express.Router();

postsRouter.get('/', postsController.getPageOfPosts);
postsRouter.get('/:postId', postsController.getPostById);
postsRouter.post('/', postsController.addPost);
postsRouter.delete('/:postId', postsController.removePost);
postsRouter.patch('/:postId', postsController.updatePost);

