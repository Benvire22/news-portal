import express from 'express';
import cors from 'cors';
import fileDb from './fileDb';
import { corsOptions } from './corsConfig';
import newsRouter from './routers/news';
import commentsRouter from './routers/comments';

const app = express();
const port = 8000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

void run().catch(console.error);
