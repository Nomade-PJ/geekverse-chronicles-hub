import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/lib/types';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      setCategories(data as Category[]);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as Category;
    } catch (err) {
      console.error(`Error fetching category with slug ${slug}:`, err);
      return null;
    }
  };

  const createCategory = async (category: Omit<Category, 'id' | 'created_at'>): Promise<Category | null> => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{
          ...category,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Refresh categories list
      fetchCategories();
      return data as Category;
    } catch (err) {
      console.error('Error creating category:', err);
      return null;
    }
  };

  const updateCategory = async (id: number, category: Partial<Category>): Promise<Category | null> => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      // Refresh categories list
      fetchCategories();
      return data as Category;
    } catch (err) {
      console.error(`Error updating category with id ${id}:`, err);
      return null;
    }
  };

  const deleteCategory = async (id: number): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Refresh categories list
      fetchCategories();
      return true;
    } catch (err) {
      console.error(`Error deleting category with id ${id}:`, err);
      return false;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory
  };
}
