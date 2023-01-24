export interface IComment {
  postId: number;
  parentId?: number;
  username: string;
  email: string;
  text: string;
  file?: Blob;
  homepage?: string;
}

export interface CommentFromDB extends IComment {
  id: number;
  createdAt: Date;
  updateAt: Date;
}
