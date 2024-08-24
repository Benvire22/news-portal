import fs, { promises as fsPromises } from 'fs';
import {
  New, NewComment
} from './types';

const fileName = './db.json';

interface FileDb {
  news: New[];
  comments: NewComment[];
}

let data: FileDb = {
  news: [],
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
        news: [],
        comments: [],
      };
    }
  },
  async getNews() {
    return data.news;
  },
  async getComments(id: string) {
    return data.comments.map((comment) => comment.newId === id);
  },
  async save() {
    await fsPromises.writeFile(fileName, JSON.stringify(data, null, 2));
  },
};

export default fileDb;