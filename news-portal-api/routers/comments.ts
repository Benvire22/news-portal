import express from 'express';
import fileDb from '../fileDb';
import { NewComment, NewCommentMutation } from '../types';
import newsRouter from './news';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
  const postId = req.query.postId as string;
  const comments: NewComment[] = await fileDb.getComments(postId);

  if (!comments) {
    return res.status(400).send([]);
  }

  res.send(comments);
});

commentsRouter.post('/', async (req, res) => {
  const postId = req.query.postId as string;
  if (!req.body.message) {
    return res.status(400).send({ error: 'Message are required!' });
  }

  const author = req.body.author ? req.body.author : 'Anonymous';

  const newComment: NewCommentMutation = {
    postId,
    author,
    message: req.body.message,
  };

  const savedPost = await fileDb.addNewComment(newComment);
  return res.send(savedPost);
});

newsRouter.delete('/:id', async (req, res) => {
  const commentId = req.params.id;
  const deletedComment = await fileDb.deleteComment(commentId);

  if (!deletedComment) {
    return res
      .status(400)
      .send({ error: 'This comment is not deleted or not found!' });
  }

  return res.send(deletedComment);
});

export default commentsRouter;
