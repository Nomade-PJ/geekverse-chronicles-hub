import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/lib/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check active session when the component mounts
    const checkSession = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (sessionData?.session) {
          const { data: userData, error: userError } = await supabase.auth.getUser();
          
          if (userError) throw userError;
          
          // Fetch user role from custom table if needed
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userData.user.id)
            .single();
          
          if (profileError && profileError.code !== 'PGRST116') {
            // PGRST116 is the error code for "no rows returned"
            throw profileError;
          }
          
          setUser({
            id: userData.user.id,
            email: userData.user.email || '',
            role: profileData?.role || 'user',
            created_at: userData.user.created_at
          });
        }
      } catch (err) {
        console.error('Error checking session:', err);
        setError('Failed to check authentication session');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Fetch user role from custom table if needed
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching user profile:', profileError);
        }
        
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: profileData?.role || 'user',
          created_at: session.user.created_at
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    
    // Cleanup on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      return true;
    } catch (err: any) {
      console.error('Error signing in:', err);
      setError(err.message || 'Failed to sign in');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      return true;
    } catch (err: any) {
      console.error('Error signing out:', err);
      setError(err.message || 'Failed to sign out');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    signIn,
    signOut
  };
} 