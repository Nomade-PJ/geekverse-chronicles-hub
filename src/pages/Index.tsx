
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Share2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialShare from "@/components/SocialShare";
import { Link } from "react-router-dom";

const Index = () => {
  const [featuredPost] = useState({
    id: 1,
    title: "Cyberpunk 2077: Phantom Liberty - A Redenção da CD Projekt RED",
    excerpt: "Após anos de críticas, a expansão Phantom Liberty prova que Cyberpunk 2077 finalmente atingiu seu potencial. Descubra como a Night City evoluiu...",
    content: "A jornada de Cyberpunk 2077 tem sido uma montanha-russa emocional para gamers ao redor do mundo...",
    category: "Gaming",
    author: "Alex Rodriguez",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
    readTime: "8 min"
  });

  const [posts] = useState([
    {
      id: 2,
      title: "Apple Vision Pro: O Futuro da Realidade Mista Chegou",
      excerpt: "Análise completa do novo headset da Apple que promete revolucionar a forma como interagimos com a tecnologia.",
      category: "Tecnologia",
      author: "Marina Silva",
      date: "2024-01-14",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600",
      readTime: "6 min"
    },
    {
      id: 3,
      title: "Tutorial: Como Montar seu Setup Gamer Perfeito em 2024",
      excerpt: "Guia completo com dicas de hardware, periféricos e configuração para criar o setup gamer dos seus sonhos.",
      category: "Tutoriais",
      author: "Carlos Tech",
      date: "2024-01-13",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
      readTime: "12 min"
    },
    {
      id: 4,
      title: "Nintendo Direct: Todos os Anúncios e Novidades",
      excerpt: "Resumo completo do último Nintendo Direct com todos os jogos anunciados e datas de lançamento.",
      category: "Notícias",
      author: "GameMaster",
      date: "2024-01-12",
      image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=600",
      readTime: "5 min"
    },
    {
      id: 5,
      title: "Review: ASUS ROG Strix 4090 - Performance Máxima",
      excerpt: "Testamos a mais nova placa de vídeo topo de linha da ASUS. Vale o investimento?",
      category: "Reviews",
      author: "TechReviewer",
      date: "2024-01-11",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600",
      readTime: "10 min"
    }
  ]);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Gaming": "bg-purple-500",
      "Tecnologia": "bg-blue-500",
      "Tutoriais": "bg-green-500",
      "Notícias": "bg-orange-500",
      "Reviews": "bg-red-500"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-6">
              TOP NERD UNIVERSE
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Seu portal definitivo para o mundo dos games, tecnologia e cultura geek
            </p>
          </div>

          {/* Featured Post */}
          <Card className="mb-12 bg-black/40 border-purple-500/30 overflow-hidden backdrop-blur-sm">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className={`${getCategoryColor(featuredPost.category)} text-white mb-4`}>
                  {featuredPost.category}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-300 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-400 space-x-4">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <Link to={`/post/${featuredPost.id}`}>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Ler mais <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Últimas Postagens
          </h2>
          
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
