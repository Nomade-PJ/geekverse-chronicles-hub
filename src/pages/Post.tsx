
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, User, Clock, ArrowLeft, MessageCircle, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialShare from "@/components/SocialShare";
import { Link } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Simulação de carregamento do post
    const mockPost = {
      id: parseInt(id || "1"),
      title: "Cyberpunk 2077: Phantom Liberty - A Redenção da CD Projekt RED",
      content: `
        <p>A jornada de Cyberpunk 2077 tem sido uma montanha-russa emocional para gamers ao redor do mundo. Desde seu lançamento conturbado em dezembro de 2020, o jogo da CD Projekt RED enfrentou críticas devastadoras devido aos inúmeros bugs, problemas de performance e funcionalidades prometidas que não foram entregues.</p>

        <h2>O Caminho da Redenção</h2>
        <p>Após quase três anos de atualizações constantes, patches e melhorias, a expansão Phantom Liberty chega como um marco definitivo na evolução do jogo. Esta não é apenas uma expansão - é uma declaração de que Cyberpunk 2077 finalmente se tornou o que sempre deveria ter sido.</p>

        <h2>Phantom Liberty: Uma Nova Era</h2>
        <p>A expansão apresenta uma história envolvente protagonizada por Keanu Reeves (Johnny Silverhand) e introduz novos personagens memoráveis, incluindo uma performance excepcional de Idris Elba como Solomon Reed. A narrativa é mais madura, os diálogos são mais afiados, e as escolhas do jogador realmente importam.</p>

        <h2>Melhorias Técnicas Impressionantes</h2>
        <p>O que mais impressiona em Phantom Liberty são as melhorias técnicas. O jogo agora roda de forma estável em todas as plataformas, os bugs foram drasticamente reduzidos, e a IA dos NPCs finalmente funciona como deveria. Night City agora pulsa com vida real.</p>

        <h2>Conclusão</h2>
        <p>Phantom Liberty não é apenas uma expansão - é a redenção completa de Cyberpunk 2077. A CD Projekt RED provou que é possível recuperar a confiança da comunidade através de trabalho árduo, dedicação e um compromisso genuíno com a qualidade.</p>
      `,
      category: "Gaming",
      author: "Alex Rodriguez",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200",
      readTime: "8 min",
      tags: ["Cyberpunk 2077", "CD Projekt RED", "Review", "Gaming", "RPG"]
    };
    setPost(mockPost);

    // Comentários mockados
    setComments([
      {
        id: 1,
        author: "GamerPro123",
        content: "Finalmente! Estava esperando por essa análise. Concordo totalmente, o jogo realmente evoluiu muito.",
        date: "2024-01-15",
        likes: 12
      },
      {
        id: 2,
        author: "CyberFan",
        content: "Phantom Liberty é incrível mesmo. A história com o Idris Elba é sensacional!",
        date: "2024-01-15",
        likes: 8
      }
    ]);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Usuário Anônimo",
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

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

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex justify-center items-center">
        <div className="text-2xl text-purple-400">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header />
      
      <article className="container mx-auto max-w-4xl py-16 px-4">
        {/* Return Link */}
        <Link to="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Home
        </Link>

        {/* Post Header */}
        <div className="mb-8">
          <Badge className={`${getCategoryColor(post.category)} text-white mb-4`}>
            {post.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center text-gray-400 gap-4 mb-8">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.date).toLocaleDateString('pt-BR')}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime}
            </div>
          </div>

          {/* Featured Image */}
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-xl mb-8"
          />

          {/* Social Share and Likes */}
          <div className="flex justify-between items-center mb-8 border-y border-purple-500/30 py-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant={isLiked ? "default" : "outline"} 
                size="sm" 
                onClick={handleLike}
                className={isLiked ? "bg-purple-500 hover:bg-purple-600" : "border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-white" : ""}`} />
                {likes}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                onClick={() => document.getElementById('comments')?.scrollIntoView({behavior: 'smooth'})}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {comments.length}
              </Button>
            </div>
            <SocialShare url={`/post/${post.id}`} title={post.title} />
          </div>
        </div>

        {/* Post Content */}
        <div 
          className="prose prose-invert prose-purple max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="mb-12">
          <h3 className="text-white text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <Link key={tag} to={`/tag/${tag.toLowerCase()}`}>
                <Badge variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20">
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div id="comments" className="border-t border-purple-500/30 pt-8">
          <h3 className="text-white text-2xl font-semibold mb-8">
            Comentários ({comments.length})
          </h3>

          {/* Comment Form */}
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <h4 className="text-white text-lg mb-4">Deixe seu comentário</h4>
              <Textarea
                placeholder="Digite seu comentário aqui..."
                className="bg-black/40 border-purple-500/30 text-white mb-4"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button 
                onClick={handleComment}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Comentar
              </Button>
            </CardContent>
          </Card>

          {/* Comments List */}
          {comments.map((comment) => (
            <Card key={comment.id} className="bg-black/40 border-purple-500/30 backdrop-blur-sm mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs">{comment.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{comment.author}</p>
                      <p className="text-gray-400 text-xs">{new Date(comment.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400">
                    <Heart className="w-4 h-4 mr-1" />
                    {comment.likes}
                  </Button>
                </div>
                <p className="text-gray-300 mt-3">{comment.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default Post;
