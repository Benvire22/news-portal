import fs, { promises as fsPromises } from 'fs';
import { NewComment, NewCommentMutation, Post, PostMutation } from './types';
import { randomUUID } from 'node:crypto';
import path from 'path';
import config from './config';

const fileName = './db.json';

interface FileDb {
  posts: Post[];
  comments: NewComment[];
}

let data: FileDb = {
  posts: [],
  comments: [],
};

const fileDb = {
  async init() {
    try {
      const fileContents = await fsPromises.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      console.error(e);
      data = {
        posts: [],
        comments: [],
      };
    }
  },
  async getPosts() {
    return data.posts;
  },
  async getOnePost(id: string) {
    const onePost = data.posts.find((post) => post.id === id);

    if (!onePost) {
      return null;
    }

    return onePost;
  },
  async deletePost(id: string) {
    const posts = [...data.posts];
    const comments = [...data.comments];
    const index = posts.findIndex((post) => post.id === id);
    const imagePath = posts[index].image;

    if (index > -1) {
      data.posts.splice(index, 1);

      if (imagePath) {
        fs.unlink(path.join(config.publicPath, imagePath), (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }

      data.comments = comments.filter((comment) => comment.postId !== id);

      await this.save();
      return posts[index];
    }

    return null;
  },
  async save() {
    await fsPromises.writeFile(fileName, JSON.stringify(data, null, 2));
  },
  async addNewPost(post: PostMutation) {
    const newPost: Post = {
      id: randomUUID(),
      ...post,
      createdAt: new Date().toISOString(),
    };

    data.posts.push(newPost);
    await this.save();
    return newPost;
  },
  async getComments(id: string) {
    return data.comments.filter((comment) => comment.postId === id);
  },
  async addNewComment(comment: NewCommentMutation) {
    const newComment: NewComment = {
      id: randomUUID(),
      ...comment,
    };

    data.comments.push(newComment);
    await this.save();
    return newComment;
  },
  async deleteComment(id: string) {
    const comments = [...data.comments];
    const index = comments.findIndex((comment) => comment.id === id);

    if (index > -1) {
      const deletedComment = data.comments.splice(index, 1);

      await this.save();
      return deletedComment[index];
    }

    return null;
  },
};

export default fileDb;
