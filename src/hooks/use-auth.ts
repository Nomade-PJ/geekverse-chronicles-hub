
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
        
        console.log('Verificando sessão ativa...');
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Erro ao verificar sessão:', sessionError);
          throw sessionError;
        }
        
        if (sessionData?.session) {
          console.log('Sessão encontrada, buscando dados do usuário...');
          const { data: userData, error: userError } = await supabase.auth.getUser();
          
          if (userError) {
            console.error('Erro ao buscar dados do usuário:', userError);
            throw userError;
          }
          
          console.log('Buscando perfil do usuário na tabela profiles...');
          // Fetch user role from profiles table
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userData.user.id)
            .single();
          
          if (profileError) {
            console.error('Erro ao buscar perfil:', profileError);
            // Se o perfil não existir, vamos criar um com role 'user'
            if (profileError.code === 'PGRST116') {
              console.log('Perfil não encontrado, criando perfil padrão...');
              const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .insert([{ id: userData.user.id, role: 'user' }])
                .select('role')
                .single();
              
              if (createError) {
                console.error('Erro ao criar perfil:', createError);
                throw createError;
              }
              
              setUser({
                id: userData.user.id,
                email: userData.user.email || '',
                role: (newProfile?.role as 'admin' | 'editor' | 'user') || 'user',
                created_at: userData.user.created_at
              });
            } else {
              throw profileError;
            }
          } else {
            console.log('Perfil encontrado:', profileData);
            setUser({
              id: userData.user.id,
              email: userData.user.email || '',
              role: (profileData?.role as 'admin' | 'editor' | 'user') || 'user',
              created_at: userData.user.created_at
            });
          }
        } else {
          console.log('Nenhuma sessão ativa encontrada');
        }
      } catch (err: any) {
        console.error('Erro na verificação de sessão:', err);
        setError(err.message || 'Erro ao verificar autenticação');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Mudança no estado de autenticação:', event);
      
      if (event === 'SIGNED_IN' && session) {
        console.log('Usuário logado, buscando perfil...');
        try {
          // Fetch user role from profiles table
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Erro ao buscar perfil no login:', profileError);
          }
          
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: (profileData?.role as 'admin' | 'editor' | 'user') || 'user',
            created_at: session.user.created_at
          });
          
          setError(null);
        } catch (err: any) {
          console.error('Erro ao processar login:', err);
          setError(err.message);
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('Usuário deslogado');
        setUser(null);
        setError(null);
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
      
      console.log('Tentando fazer login com:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Erro no login:', error);
        throw error;
      }
      
      console.log('Login realizado com sucesso:', data);
      return true;
    } catch (err: any) {
      console.error('Erro no signIn:', err);
      setError(err.message || 'Falha ao fazer login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fazendo logout...');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Erro no logout:', error);
        throw error;
      }
      
      console.log('Logout realizado com sucesso');
      return true;
    } catch (err: any) {
      console.error('Erro no signOut:', err);
      setError(err.message || 'Falha ao fazer logout');
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
