import { 
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model, CreationOptional,
  ForeignKey,
} from 'sequelize';
import { sequelize } from '../db/db.js';
import Post from './Post.js';

class Comment extends Model<
InferAttributes<Comment>,
InferCreationAttributes<Comment>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare postId: ForeignKey<Post['id']>;
  declare parentId: number | null;
  declare username: string;
  declare email: string;
  declare text: string;
  declare homepage: string | null;
  declare file: Blob | null;
} 

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
    parentId: {
      field: 'parent_id',
      type: DataTypes.INTEGER,
      allowNull: true
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
    tableName: 'comments'
  }
)
 export default Comment;
