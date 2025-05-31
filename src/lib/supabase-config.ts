
// Configuração do Supabase para debug
export const SUPABASE_CONFIG = {
  url: 'https://qyigukjmmqrpapehfwoy.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5aWd1a2ptbXFycGFwZWhmd295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzI2OTMsImV4cCI6MjA2NDIwODY5M30.yIPQY2ELY4OLimVpQpoEMPGvWHhsJnjbGZHxkHabBco'
};

// Função para testar a conexão
export const testSupabaseConnection = async () => {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    console.log('Testando conexão com Supabase...');
    
    // Teste básico de conexão
    const { data, error } = await supabase.from('categories').select('count').limit(1);
    
    if (error) {
      console.error('Erro na conexão:', error);
      return false;
    }
    
    console.log('Conexão com Supabase funcionando!', data);
    return true;
  } catch (err) {
    console.error('Erro ao importar cliente Supabase:', err);
    return false;
  }
};
