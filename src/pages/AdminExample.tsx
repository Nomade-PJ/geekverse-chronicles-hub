
import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { testSupabaseConnection } from "@/lib/supabase-config";

const AdminExample = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<string>("checking");
  const { toast } = useToast();
  const { user, isLoading, error, isAuthenticated, isAdmin, signIn, signOut } = useAuth();

  // Teste de conexão ao carregar o componente
  useEffect(() => {
    const checkConnection = async () => {
      console.log('Verificando conexão com Supabase...');
      const isConnected = await testSupabaseConnection();
      setConnectionStatus(isConnected ? 'connected' : 'error');
    };
    checkConnection();
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    console.log('Tentativa de login para:', username);
    
    const success = await signIn(username, password);
    
    if (success) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
    } else {
      console.error('Erro no login:', error);
      toast({
        title: "Erro de autenticação",
        description: error || "Usuário ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    const success = await signOut();
    
    if (success) {
      toast({
        title: "Logout realizado com sucesso!",
        description: "Você foi desconectado.",
      });
    } else {
      toast({
        title: "Erro ao fazer logout",
        description: error || "Não foi possível desconectar.",
        variant: "destructive",
      });
    }
  };

  // Se o usuário estiver autenticado mas não for admin, redirecione
  if (isAuthenticated && !isAdmin && !isLoading) {
    return <Navigate to="/" />;
  }

  // Exibe um spinner enquanto verifica a autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col justify-center items-center">
        <LoadingSpinner size="lg" />
        <p className="text-white mt-4">Verificando autenticação...</p>
      </div>
    );
  }

  // Se não estiver autenticado, exiba o formulário de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col justify-center items-center px-4">
        <Card className="w-full max-w-md bg-black/40 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">TN</span>
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Top Nerd Admin
              </CardTitle>
            </div>
            
            {/* Status da conexão */}
            <div className="mb-4 p-3 rounded-lg bg-black/20 border border-purple-500/20">
              <p className="text-sm text-gray-300">Status da conexão:</p>
              <p className={`text-sm font-medium ${
                connectionStatus === 'connected' ? 'text-green-400' : 
                connectionStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {connectionStatus === 'connected' ? '✅ Conectado ao Supabase' : 
                 connectionStatus === 'error' ? '❌ Erro na conexão' : '⏳ Verificando...'}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm text-gray-300">
                  Email
                </label>
                <Input
                  id="username"
                  type="email"
                  placeholder="portaltopnerduniverse@gmail.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black/40 border-purple-500/30 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-gray-300">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/40 border-purple-500/30 text-white"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={connectionStatus !== 'connected'}
              >
                {connectionStatus === 'connected' ? 'Entrar' : 'Aguarde...'}
              </Button>
              
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              
              <div className="text-xs text-gray-400 mt-4">
                <p>Credenciais do projeto:</p>
                <p>Project ID: qyigukjmmqrpapehfwoy</p>
                <p>URL: https://qyigukjmmqrpapehfwoy.supabase.co</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Se estiver autenticado e for admin, exiba o painel
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col items-center p-4">
      <Card className="w-full max-w-4xl bg-black/40 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">TN</span>
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Top Nerd Admin Panel
              </CardTitle>
            </div>
            <Button 
              variant="outline" 
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              onClick={handleLogout}
            >
              Sair
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-black/20 rounded-lg border border-purple-500/20 mb-4">
            <h2 className="text-xl text-white mb-2">Bem-vindo, {user?.email}</h2>
            <p className="text-gray-300">Cargo: {user?.role}</p>
            <p className="text-gray-300">ID: {user?.id}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <h3 className="text-green-400 font-semibold">✅ Conexão Supabase</h3>
              <p className="text-gray-300 text-sm">Conectado e funcionando</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <h3 className="text-blue-400 font-semibold">🔐 Autenticação</h3>
              <p className="text-gray-300 text-sm">Login realizado com sucesso</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg text-white mb-4">Funcionalidades implementadas:</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✅ Autenticação de usuários com Supabase</li>
              <li>✅ Controle de perfis e funções (admin, editor, usuário)</li>
              <li>✅ Banco de dados PostgreSQL para posts, categorias e autores</li>
              <li>✅ Armazenamento de imagens</li>
              <li>✅ Políticas de segurança para controle de acesso</li>
              <li>✅ Interface administrativa responsiva</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminExample;
