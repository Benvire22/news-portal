export interface New {
  id: string;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
}

export type NewMutation = Omit<New, 'id'>;

export interface NewComment {
  id: string;
  newId: string;
  author: string;
  message: string | null;
}

export type CommentMutation = Omit<Comment, 'id'>;