'use strict';

import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

Post.sync({ force: true });
Comment.sync({ force: true });
