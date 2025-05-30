import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import FeaturedPostsCarousel from "@/components/FeaturedPostsCarousel";
import CodeSnippetCard from "@/components/CodeSnippetCard";

const Index = () => {
  const [featuredPosts] = useState([
    {
      id: 1,
      title: "Cyberpunk 2077: Phantom Liberty - A Redenção da CD Projekt RED",
      excerpt: "Após anos de críticas, a expansão Phantom Liberty prova que Cyberpunk 2077 finalmente atingiu seu potencial. Descubra como a Night City evoluiu e se tornou o jogo que sempre deveria ter sido desde o lançamento.",
      category: "Gaming",
      author: "Alex Rodriguez",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
      readTime: "8 min"
    },
    {
      id: 7,
      title: "PlayStation 6: Rumores Apontam para Lançamento em 2026",
      excerpt: "Documentos vazados sugerem que a Sony já está trabalhando no sucessor do PS5. Confira tudo o que sabemos até agora sobre o próximo console.",
      category: "Gaming",
      author: "Sarah Johnson",
      date: "2024-01-16",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800",
      readTime: "5 min"
    },
    {
      id: 8,
      title: "Windows 12: Microsoft Prepara Grande Atualização com IA Integrada",
      excerpt: "O próximo sistema operacional da Microsoft promete revolucionar a experiência do usuário com recursos avançados de inteligência artificial.",
      category: "Tecnologia",
      author: "Tech Explorer",
      date: "2024-01-17",
      image: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?w=800",
      readTime: "7 min"
    },
    {
      id: 9,
      title: "Starfield: Bethesda Anuncia Primeira Expansão para Março",
      excerpt: "A aguardada expansão do RPG espacial trará novos planetas, missões e tecnologias para os jogadores explorarem.",
      category: "Gaming",
      author: "Cosmic Gamer",
      date: "2024-01-18",
      image: "https://images.unsplash.com/photo-1532289608746-8aaaa2b6a861?w=800",
      readTime: "6 min"
    }
  ]);

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
      
      {/* Featured Posts Carousel */}
      <section className="relative py-4 md:py-6">
        <div className="w-[90%] max-w-[400px] md:max-w-[500px] mx-auto">
          <FeaturedPostsCarousel posts={featuredPosts} />
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto">
          
          {/* Code snippet style posts */}
          <div className="max-w-md mx-auto">
            {posts.slice(0, 3).map((post) => (
              <div key={post.id}>
                <CodeSnippetCard post={post} />
              </div>
            ))}
            
            {/* Load More Button */}
            <div className="text-center mt-6 mb-8">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium text-sm">
                Ver Mais
              </button>
            </div>
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
