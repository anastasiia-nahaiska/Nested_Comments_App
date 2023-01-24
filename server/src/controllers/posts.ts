'use strict';

import { Request, Response } from 'express';
import * as postsServices from '../services/posts.js';
import { IPost } from '../types/Post.js';
import { emailRegex, urlRegex } from '../utils/constants.ts/regexs/regexs.js';

export const getPageOfPosts = async(req: Request, res: Response) => {
  const { field = 'date', order = 'asc', page = '1' } = req.query;
  const limit = 25;

  const posts = await postsServices.getPostsByQueries(
    field,
    order,
    +page,
    limit,
    );

  if (posts.count < +limit * (+page - 1)) {
    res.sendStatus(404);

    return;
  }

  res.send(posts);

  return;
};

export const getPostById = async(req: Request, res: Response) => {
  const { postId } = req.params;

  if (isNaN(+postId)) {
    res.sendStatus(400);

    return;
  }

  const post = await postsServices.getPostById(+postId);

  if (!post) {
    res.sendStatus(404);

    return;
  }

  res.send(post);
};


export const addPost = async(req: Request, res: Response) => {
  const {
    username,
    email,
    text,
    homepage
  } = req.body;

  const isValidData = username && text && emailRegex.test(email) && urlRegex.test(homepage);

  if (!isValidData) {
    res.sendStatus(400);

    return;
  }

  const newPost = await postsServices.addPost({
    username,
    email,
    text,
    homepage
  });

  res.statusCode = 201;
  res.send(newPost);
};

export const updatePost = async(req: Request, res: Response) => {
  const { postId } = req.params;
  const {
    username,
    email,
    text,
    homepage
  } = req.body;

  const dataToUpdate: Partial<IPost> = {};

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

  const post = await postsServices.getPostById(+postId);

  if (!post) {
    res.sendStatus(404);

    return;
  }

  await postsServices.updatePost(+postId, dataToUpdate);

  const updatedPost = await postsServices.getPostById(+postId);

  res.send(updatedPost);
};

export const removePost = async(req: Request, res: Response) => {
  const { postId } = req.params;

  if (isNaN(+postId)) {
    res.sendStatus(400);

    return;
  }

  const post = await postsServices.getPostById(+postId);

  if (!post) {
    res.sendStatus(404);

    return;
  }

  await postsServices.removePost(+postId);
  res.sendStatus(204);
};