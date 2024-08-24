export interface Post {
  id: string;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
}

export type PostMutation = Omit<Post, 'id' | 'createdAt'>;

export interface NewComment {
  id: string;
  postId: string;
  author: string;
  message: string;
}

export type NewCommentMutation = Omit<NewComment, 'id'>;