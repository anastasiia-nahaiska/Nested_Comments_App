import Comment from '../models/Comment.js';
import { IComment } from '../types/Comment.js';

export const getPageOfComments = async(page: number, limit: number) => {
  const offset = limit * (page - 1);

  return Comment.findAndCountAll({
    offset,
    limit
  });
};

export const getCommentById = async(id: number) => {
  return Comment.findByPk(id);
};

export const addComment = async(data: IComment) => {
  return Comment.create(data);
};

export const updateComment = async(id: number, data: Partial<IComment>) => {
  return Comment.update(data, {
    where: { id },
  });
};

export const removeComment = async(id: number) => {
  return Comment.destroy({
    where: { id },
  });
};
