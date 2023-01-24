'use strict';

import QueryString from 'qs';

import Post from '../models/Post.js';
import { IPost } from '../types/Post.js';
import { formatField } from '../utils/formatField.js';
import { formatOrder } from '../utils/formatOrder.js';

export const getAllPosts = async() => {
  return Post.findAll();
};

export const getPostsByQueries = async(
  field: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[],
  order: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[],
  page: number,
  limit: number,
) => {
  const offset = limit * (page - 1);

  return Post.findAndCountAll({
    order: [ [ formatField(field), formatOrder(order) ] ],
    limit,
    offset,
  });
};

export const getPostById = async(id: number) => {
  return Post.findByPk(id);
};

export const addPost = async(data: IPost) => {
  return Post.create(data);
};

export const updatePost = async(id: number, data: Partial<IPost>) => {
  return Post.update(data, {
    where: { id },
  });
};

export const removePost = async(id: number) => {
  return Post.destroy({
    where: { id },
  });
};

