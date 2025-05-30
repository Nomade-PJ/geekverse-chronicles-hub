import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import LoadingSpinner from "@/components/LoadingSpinner";

const AdminExample = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const { user, isLoading, error, isAuthenticated, isAdmin, signIn, signOut } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    const success = await signIn(username, password);
    
    if (success) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
    } else {
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
                <span className="text-white font-bold text-lg">GU</span>
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Painel Admin
              </CardTitle>
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
                  placeholder="admin@exemplo.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black/40 border-purple-500/30 text-white"
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
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Entrar
              </Button>
              
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
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
                <span className="text-white font-bold text-lg">GU</span>
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Painel Admin
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
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg text-white mb-4">Funcionalidades implementadas com Supabase:</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✅ Autenticação de usuários</li>
              <li>✅ Controle de perfis e funções (admin, editor, usuário)</li>
              <li>✅ Banco de dados PostgreSQL para posts, categorias e autores</li>
              <li>✅ Armazenamento de imagens</li>
              <li>✅ Políticas de segurança para controle de acesso</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminExample; 