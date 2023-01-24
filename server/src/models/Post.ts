import { Blob } from "buffer";

import { 
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  HasManyHasAssociationMixin,
} from 'sequelize';
import { sequelize } from '../db/db.js';
import Comment from './Comment.js';

class Post extends Model<
  InferAttributes<Post>,
  InferCreationAttributes<Post>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare username: string;
  declare email: string;
  declare text: string;
  declare homepage: string | null;
  declare file: Blob | null;

  declare hasComment: HasManyHasAssociationMixin<Comment, number>;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    file: {
      type: DataTypes.ARRAY(DataTypes.BLOB),
      allowNull: true
    },
    homepage: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    sequelize,
    tableName: 'posts'
  }
)

Post.hasMany(Comment, {
  foreignKey: 'postId'
});

export default Post;
