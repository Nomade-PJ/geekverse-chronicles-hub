
import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Edit, 
  Trash2, 
  Plus, 
  LogOut, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  ChevronRight
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const { toast } = useToast();

  // Mock data
  useEffect(() => {
    setPosts([
      {
        id: 1,
        title: "Cyberpunk 2077: Phantom Liberty - A Redenção da CD Projekt RED",
        excerpt: "Após anos de críticas, a expansão Phantom Liberty prova que Cyberpunk 2077 finalmente atingiu seu potencial. Descubra como a Night City evoluiu...",
        category: "Gaming",
        author: "Alex Rodriguez",
        date: "2024-01-15",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
        published: true
      },
      {
        id: 2,
        title: "Apple Vision Pro: O Futuro da Realidade Mista Chegou",
        excerpt: "Análise completa do novo headset da Apple que promete revolucionar a forma como interagimos com a tecnologia.",
        category: "Tecnologia",
        author: "Marina Silva",
        date: "2024-01-14",
        image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600",
        published: true
      },
      {
        id: 3,
        title: "Tutorial: Como Montar seu Setup Gamer Perfeito em 2024",
        excerpt: "Guia completo com dicas de hardware, periféricos e configuração para criar o setup gamer dos seus sonhos.",
        category: "Tutoriais",
        author: "Carlos Tech",
        date: "2024-01-13",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
        published: false
      },
    ]);
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
    } else {
      toast({
        title: "Erro de autenticação",
        description: "Usuário ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  const handleOpenDialog = (post: any = null) => {
    setCurrentPost(post || {
      id: Date.now(),
      title: "",
      excerpt: "",
      content: "",
      category: "Gaming",
      author: "Admin",
      date: new Date().toISOString().split('T')[0],
      image: "",
      published: false
    });
    setDialogOpen(true);
  };

  const handleSavePost = () => {
    if (!currentPost.title || !currentPost.content) {
      toast({
        title: "Erro ao salvar",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Se o post já existe, atualize-o
    if (currentPost.id && posts.some(post => post.id === currentPost.id)) {
      setPosts(posts.map(post => post.id === currentPost.id ? currentPost : post));
      toast({
        title: "Post atualizado",
        description: "O post foi atualizado com sucesso.",
      });
    } 
    // Caso contrário, crie um novo
    else {
      setPosts([...posts, currentPost]);
      toast({
        title: "Post criado",
        description: "O post foi criado com sucesso.",
      });
    }
    setDialogOpen(false);
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Post excluído",
      description: "O post foi excluído com sucesso.",
    });
  };

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
                  Usuário
                </label>
                <Input
                  id="username"
                  placeholder="admin"
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
                  placeholder="******"
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
              <div className="text-center mt-4">
                <Link to="/" className="text-purple-400 hover:text-purple-300 text-sm">
                  Voltar para o site
                </Link>
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-400 text-xs">
                  Use "admin" como usuário e senha para teste
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Admin Header */}
      <header className="bg-black/90 backdrop-blur-md border-b border-purple-500/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">GU</span>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Admin
                </span>
              </div>
              <div className="hidden md:flex">
                <span className="text-gray-400">
                  <ChevronRight className="w-4 h-4" />
                </span>
                <span className="text-white ml-2">Painel de Controle</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/">
                <Button variant="outline" size="sm" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                  Visualizar Site
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-300 hover:text-purple-400"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="hidden md:block col-span-3 lg:col-span-2">
            <div className="bg-black/40 border border-purple-500/30 backdrop-blur-sm rounded-lg p-4">
              <nav className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-purple-400"
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  Dashboard
                </Button>
                <Button 
                  variant="default" 
                  className="w-full justify-start bg-purple-500"
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Posts
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-purple-400"
                >
                  <Users className="w-4 h-4 mr-3" />
                  Usuários
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-purple-400"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Configurações
                </Button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="mb-6 flex flex-col md:flex-row justify-between md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Gerenciar Posts</h1>
                <p className="text-gray-400">Crie, edite e exclua posts do blog</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button 
                  onClick={() => handleOpenDialog()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Post
                </Button>
              </div>
            </div>

            <Tabs defaultValue="published">
              <div className="bg-black/40 border border-purple-500/30 backdrop-blur-sm rounded-lg p-4 mb-6">
                <TabsList className="mb-4 bg-black/50">
                  <TabsTrigger value="published">Publicados</TabsTrigger>
                  <TabsTrigger value="draft">Rascunhos</TabsTrigger>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                </TabsList>

                <TabsContent value="published">
                  <PostsTable 
                    posts={posts.filter(post => post.published)} 
                    onEdit={handleOpenDialog} 
                    onDelete={handleDeletePost}
                  />
                </TabsContent>

                <TabsContent value="draft">
                  <PostsTable 
                    posts={posts.filter(post => !post.published)} 
                    onEdit={handleOpenDialog} 
                    onDelete={handleDeletePost}
                  />
                </TabsContent>

                <TabsContent value="all">
                  <PostsTable 
                    posts={posts} 
                    onEdit={handleOpenDialog} 
                    onDelete={handleDeletePost}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Post Editor Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-900 border-purple-500/30 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {currentPost?.id && posts.some(post => post.id === currentPost.id) 
                ? "Editar Post" 
                : "Criar Novo Post"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm text-gray-300">
                Título*
              </label>
              <Input
                id="title"
                value={currentPost?.title || ""}
                onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                placeholder="Digite o título do post"
                className="bg-black/40 border-purple-500/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm text-gray-300">
                Resumo*
              </label>
              <Textarea
                id="excerpt"
                value={currentPost?.excerpt || ""}
                onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                placeholder="Digite um breve resumo do post"
                className="bg-black/40 border-purple-500/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm text-gray-300">
                Conteúdo*
              </label>
              <Textarea
                id="content"
                value={currentPost?.content || ""}
                onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                placeholder="Digite o conteúdo do post"
                className="bg-black/40 border-purple-500/30 text-white min-h-[200px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm text-gray-300">
                  Categoria
                </label>
                <Select 
                  value={currentPost?.category || "Gaming"}
                  onValueChange={(value) => setCurrentPost({...currentPost, category: value})}
                >
                  <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-purple-500/30">
                    <SelectItem value="Gaming">Gaming</SelectItem>
                    <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="Reviews">Reviews</SelectItem>
                    <SelectItem value="Tutoriais">Tutoriais</SelectItem>
                    <SelectItem value="Notícias">Notícias</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="author" className="text-sm text-gray-300">
                  Autor
                </label>
                <Input
                  id="author"
                  value={currentPost?.author || "Admin"}
                  onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})}
                  placeholder="Nome do autor"
                  className="bg-black/40 border-purple-500/30 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm text-gray-300">
                URL da Imagem
              </label>
              <Input
                id="image"
                value={currentPost?.image || ""}
                onChange={(e) => setCurrentPost({...currentPost, image: e.target.value})}
                placeholder="https://exemplo.com/imagem.jpg"
                className="bg-black/40 border-purple-500/30 text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                checked={currentPost?.published || false}
                onChange={(e) => setCurrentPost({...currentPost, published: e.target.checked})}
                className="rounded bg-black/40 border-purple-500"
              />
              <label htmlFor="published" className="text-sm text-gray-300">
                Publicar imediatamente
              </label>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button 
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSavePost}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Posts Table Component
interface PostsTableProps {
  posts: any[];
  onEdit: (post: any) => void;
  onDelete: (id: number) => void;
}

const PostsTable = ({ posts, onEdit, onDelete }: PostsTableProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        Nenhum post encontrado nesta categoria.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-purple-500/30">
            <TableHead className="text-purple-400">Título</TableHead>
            <TableHead className="text-purple-400">Categoria</TableHead>
            <TableHead className="text-purple-400">Data</TableHead>
            <TableHead className="text-purple-400">Status</TableHead>
            <TableHead className="text-purple-400 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id} className="border-purple-500/30">
              <TableCell className="text-white font-medium">{post.title}</TableCell>
              <TableCell className="text-gray-300">{post.category}</TableCell>
              <TableCell className="text-gray-300">{new Date(post.date).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {post.published ? "Publicado" : "Rascunho"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onEdit(post)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onDelete(post.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Admin;
