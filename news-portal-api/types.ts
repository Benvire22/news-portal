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
  message: string | null;
}

export type CommentMutation = Omit<Comment, 'id'>;