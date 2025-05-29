
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialShare from "@/components/SocialShare";
import { Link } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de posts por categoria
    setLoading(true);
    setTimeout(() => {
      const mockPosts = [
        {
          id: 1,
          title: "Cyberpunk 2077: Phantom Liberty - A Redenção da CD Projekt RED",
          excerpt: "Após anos de críticas, a expansão Phantom Liberty prova que Cyberpunk 2077 finalmente atingiu seu potencial.",
          category: "Gaming",
          author: "Alex Rodriguez",
          date: "2024-01-15",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600",
          readTime: "8 min"
        },
        {
          id: 2,
          title: "Apple Vision Pro: O Futuro da Realidade Mista",
          excerpt: "Análise completa do novo headset da Apple que promete revolucionar a forma como interagimos com a tecnologia.",
          category: "Tecnologia",
          author: "Marina Silva",
          date: "2024-01-14",
          image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600",
          readTime: "6 min"
        }
      ].filter(post => post.category.toLowerCase() === category?.toLowerCase());
      
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, [category]);

  const getCategoryColor = (category: string) => {
    const colors = {
      "gaming": "bg-purple-500",
      "tecnologia": "bg-blue-500",
      "tutoriais": "bg-green-500",
      "noticias": "bg-orange-500",
      "reviews": "bg-red-500"
    };
    return colors[category.toLowerCase() as keyof typeof colors] || "bg-gray-500";
  };

  const getCategoryName = (category: string) => {
    const names = {
      "gaming": "Gaming",
      "tecnologia": "Tecnologia",
      "tutoriais": "Tutoriais",
      "noticias": "Notícias",
      "reviews": "Reviews"
    };
    return names[category.toLowerCase() as keyof typeof names] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <Header />
        <div className="container mx-auto max-w-7xl py-16 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-2xl text-purple-400 animate-pulse">Carregando posts...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header />
      
      <section className="container mx-auto max-w-7xl py-16 px-4">
        {/* Return Link */}
        <Link to="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Home
        </Link>

        {/* Category Header */}
        <div className="text-center mb-12">
          <Badge className={`${getCategoryColor(category || "")} text-white mb-4 text-lg px-4 py-2`}>
            {getCategoryName(category || "")}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Posts de {getCategoryName(category || "")}
          </h1>
          <p className="text-gray-300 text-lg">
            Explore todos os nossos conteúdos sobre {getCategoryName(category || "").toLowerCase()}
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="bg-black/40 border-purple-500/30 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 group">
                <CardHeader className="p-0">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <Badge className={`${getCategoryColor(post.category)} text-white mb-3`}>
                    {post.category}
                  </Badge>
                  <CardTitle className="text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-400">
                      {new Date(post.date).toLocaleDateString('pt-BR')}
                    </span>
                    <div className="flex items-center space-x-2">
                      <SocialShare 
                        url={`/post/${post.id}`} 
                        title={post.title}
                      />
                      <Link to={`/post/${post.id}`}>
                        <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                          Ler
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl text-gray-400 mb-4">Nenhum post encontrado</h2>
            <p className="text-gray-500">
              Ainda não temos posts nesta categoria. Volte em breve!
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Category;
