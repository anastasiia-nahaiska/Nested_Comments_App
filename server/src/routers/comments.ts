'use strict';

import express from 'express';
import * as commentsController from '../controllers/comments.js';

export const commentsRouter = express.Router();

commentsRouter.get('/', commentsController.getPageOfComments);
commentsRouter.get('/:commentId', commentsController.getCommentById);
commentsRouter.post('/', commentsController.addComment);
commentsRouter.delete('/:commentId', commentsController.removeComment);
commentsRouter.patch('/:commentId', commentsController.updateComment);