export interface Post {
  id: string;
  title: string;
  image: string | null;
  createdAt: string;
}

export interface FullPost extends Post {
  description: string;
}

export interface PostMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface PostComment {
  id: string;
  postId: string;
  author: string;
  message: string;
}

export type PostCommentMutation = Omit<PostComment, 'id'>;
