
export interface Post {
  id: string;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
}

export type PostMutation = Omit<Post, 'id' | 'createdAt'>;