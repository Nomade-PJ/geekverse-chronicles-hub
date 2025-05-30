import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Post, PostWithRelations } from '@/lib/types';

export function usePosts() {
  const [posts, setPosts] = useState<PostWithRelations[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<PostWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*),
          author:authors(*)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setPosts(data as PostWithRelations[]);
      
      // Set featured posts (for example, the 4 most recent)
      setFeaturedPosts(data.slice(0, 4) as PostWithRelations[]);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  const getPostById = async (id: number): Promise<PostWithRelations | null> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*),
          author:authors(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as PostWithRelations;
    } catch (err) {
      console.error(`Error fetching post with id ${id}:`, err);
      return null;
    }
  };

  const getPostsByCategory = async (categorySlug: string): Promise<PostWithRelations[]> => {
    try {
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();
      
      if (categoryError) throw categoryError;
      
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*),
          author:authors(*)
        `)
        .eq('category_id', categoryData.id)
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as PostWithRelations[];
    } catch (err) {
      console.error(`Error fetching posts for category ${categorySlug}:`, err);
      return [];
    }
  };

  const createPost = async (post: Omit<Post, 'id' | 'created_at'>): Promise<Post | null> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          ...post,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Refresh posts list
      fetchPosts();
      return data as Post;
    } catch (err) {
      console.error('Error creating post:', err);
      return null;
    }
  };

  const updatePost = async (id: number, post: Partial<Post>): Promise<Post | null> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({
          ...post,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      // Refresh posts list
      fetchPosts();
      return data as Post;
    } catch (err) {
      console.error(`Error updating post with id ${id}:`, err);
      return null;
    }
  };

  const deletePost = async (id: number): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Refresh posts list
      fetchPosts();
      return true;
    } catch (err) {
      console.error(`Error deleting post with id ${id}:`, err);
      return false;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    featuredPosts,
    isLoading,
    error,
    fetchPosts,
    getPostById,
    getPostsByCategory,
    createPost,
    updatePost,
    deletePost
  };
} 