import express from 'express';
import fileDb from '../fileDb';
import { PostMutation } from '../types';
import { imageUpload } from '../multer';

const newsRouter = express.Router();

newsRouter.get('/', async (_, res) => {
  const news = await fileDb.getPosts();

  return res.send(
    news.map((newItem) => ({
      id: newItem.id,
      title: newItem.title,
      image: newItem.image,
      createdAt: newItem.createdAt,
    })),
  );
});

newsRouter.get('/:id', async (req, res) => {
  const postId = req.params.id;
  const onePost = await fileDb.getOnePost(postId);

  if (!onePost) {
    return res.status(400).send({ error: 'This post is not found!' });
  }

  return res.send(onePost);
});

newsRouter.post('/', imageUpload.single('image'), async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res
      .status(400)
      .send({ error: 'Title and description are required!' });
  }

  const newPost: PostMutation = {
    title: req.body.title,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
  };

  return await fileDb.addNewPost(newPost);
});

newsRouter.delete('/:id', async (req, res) => {
  const postId = req.params.id;
  const deletedPost = await fileDb.deletePost(postId);

  if (!deletedPost) {
    return res.status(400).send({ error: 'This post is not deleted or not found!' });
  }

  return res.send(deletedPost);
});


export default newsRouter;
