'use strict';

import { Request, Response } from 'express';
import * as commentsServices from '../services/comments.js';
import * as postsServices from '../services/posts.js';
import { IComment } from '../types/Comment.js';
import { emailRegex, urlRegex } from '../utils/constants.ts/regexs/regexs.js';

export const getPageOfComments = async(req: Request, res: Response) => {
  const { page = '1' } = req.query;
  const limit = 25;

  const comments = await commentsServices.getPageOfComments(+page, limit);

  if (comments.count < +limit * (+page - 1)) {
    res.sendStatus(404);

    return;
  }

  res.send(comments);

  return;
};

export const getCommentById = async(req: Request, res: Response) => {
  const { commentId } = req.params;

  if (isNaN(+commentId)) {
    res.sendStatus(400);

    return;
  }

  const comment = await commentsServices.getCommentById(+commentId);

  if (!comment) {
    res.sendStatus(404);

    return;
  }

  res.send(comment);
};

export const addComment =  async(req: Request, res: Response) => {
  const {
    postId,
    username,
    email,
    text,
    homepage
  } = req.body;

  const isValidData = username 
    && text
    && emailRegex.test(email) 
    && urlRegex.test(homepage) 
    && isNaN(+postId);

  if (!isValidData) {
    res.sendStatus(400);

    return;
  }

  const targetPost = await postsServices.getPostById(+postId);

  if (!targetPost) {
    res.sendStatus(404);

    return;
  }

  const newComment = await commentsServices.addComment(req.body);

  res.statusCode = 201;
  res.send(newComment);
};

export const updateComment = async(req: Request, res: Response) => {
  const { commentId } = req.params;
  const {
    username,
    email,
    text,
    homepage
  } = req.body;

  const dataToUpdate: Partial<IComment> = {};

  if (username) {
    dataToUpdate.username = username;
  }

  if (text) {
    dataToUpdate.text = text;
  }

  if (emailRegex.test(email)) {
    dataToUpdate.email = email;
  }

  if (urlRegex.test(homepage)) {
    dataToUpdate.homepage = homepage;
  }


  if (isNaN(+commentId)) {
    res.sendStatus(400);

    return;
  }

  const comment = await commentsServices.getCommentById(+commentId);

  if (!comment) {
    res.sendStatus(404);

    return;
  }

  await commentsServices.updateComment(+commentId, req.body);
  const updatedComment = await commentsServices.getCommentById(+commentId);

  res.send(updatedComment);
};

export const removeComment = async(req: Request, res: Response) => {
  const { commentId } = req.params;

  if (isNaN(+commentId)) {
    res.sendStatus(400);

    return;
  }

  const comment = await commentsServices.getCommentById(+commentId);

  if (!comment) {
    res.sendStatus(404);

    return;
  }

  await commentsServices.removeComment(+commentId);
  res.sendStatus(204);
};