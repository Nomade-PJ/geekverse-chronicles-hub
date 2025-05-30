export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category_id: number;
  author_id: number;
  created_at: string;
  updated_at?: string;
  image_url: string;
  published: boolean;
  slug?: string;
  read_time?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface Author {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  created_at: string;
}

export interface PostWithRelations extends Post {
  category: Category;
  author: Author;
} 