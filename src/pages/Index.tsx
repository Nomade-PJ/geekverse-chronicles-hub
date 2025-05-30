
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import LoadingSpinner from "@/components/LoadingSpinner";

const Index = () => {
  const [featuredPost] = useState({
    id: 1,
    title: "Cyberpunk 2077: Phantom Liberty - A Redenção da CD Projekt RED",
    excerpt: "Após anos de críticas, a expansão Phantom Liberty prova que Cyberpunk 2077 finalmente atingiu seu potencial. Descubra como a Night City evoluiu e se tornou o jogo que sempre deveria ter sido desde o lançamento.",
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
    },
    {
      id: 6,
      title: "Steam Deck OLED: Vale a Pena o Upgrade?",
      excerpt: "Comparamos a nova versão OLED do Steam Deck com o modelo original. Descubra todas as melhorias.",
      category: "Reviews",
      author: "PortableGamer",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
      readTime: "7 min"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4 md:mb-6 animate-fade-in">
              TOP NERD UNIVERSE
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in px-4" style={{ animationDelay: '0.2s' }}>
              Seu portal definitivo para o mundo dos games, tecnologia e cultura geek
            </p>
            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4 animate-fade-in px-4" style={{ animationDelay: '0.4s' }}>
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg px-4 md:px-6 py-2 md:py-3">
                <span className="text-purple-400 font-semibold text-sm md:text-base">+1000</span>
                <span className="text-gray-300 ml-2 text-sm md:text-base">Artigos</span>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg px-4 md:px-6 py-2 md:py-3">
                <span className="text-pink-400 font-semibold text-sm md:text-base">+50K</span>
                <span className="text-gray-300 ml-2 text-sm md:text-base">Leitores</span>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg px-4 md:px-6 py-2 md:py-3">
                <span className="text-cyan-400 font-semibold text-sm md:text-base">Daily</span>
                <span className="text-gray-300 ml-2 text-sm md:text-base">Updates</span>
              </div>
            </div>
          </div>

          {/* Featured Post */}
          <PostCard post={featuredPost} featured={true} />
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
            Últimas Postagens
          </h2>
          
          {/* Mobile: Single column, Tablet: 2 columns, Desktop: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8 md:mt-12">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 md:px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 transform text-sm md:text-base">
              Carregar Mais Posts
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 px-4 bg-black/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Fique por Dentro das Novidades
          </h2>
          <p className="text-gray-300 mb-6 md:mb-8 px-4">
            Receba as últimas notícias sobre games, tecnologia e cultura geek direto no seu email
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto px-4">
            <input 
              type="email" 
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 text-sm md:text-base"
            />
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 transform text-sm md:text-base">
              Inscrever-se
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
