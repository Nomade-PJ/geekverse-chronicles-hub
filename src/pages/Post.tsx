import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, User, Clock, ArrowLeft, MessageCircle, Heart, Bookmark, Share2, ThumbsUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialShare from "@/components/SocialShare";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [likeActionCompleted, setLikeActionCompleted] = useState(false);
  const [commentActionCompleted, setCommentActionCompleted] = useState(false);
  const [bookmarkActionCompleted, setBookmarkActionCompleted] = useState(false);
  const [shareActionCompleted, setShareActionCompleted] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<{[key: string]: HTMLHeadingElement}>({});
  const lastScrollY = useRef(0);

  const isAnyActionCompleted = () => {
    return likeActionCompleted || commentActionCompleted || bookmarkActionCompleted || shareActionCompleted;
  };

  useEffect(() => {
    // Simulação de carregamento do post
    const mockPost = {
      id: parseInt(id || "1"),
      title: "Cyberpunk 2077: Phantom Liberty - A Redenção da CD Projekt RED",
      content: `
        <p class="text-xl leading-relaxed mb-6">A jornada de <strong class="text-purple-400">Cyberpunk 2077</strong> tem sido uma montanha-russa emocional para gamers ao redor do mundo. Desde seu lançamento conturbado em dezembro de 2020, o jogo da CD Projekt RED enfrentou críticas devastadoras devido aos inúmeros bugs, problemas de performance e funcionalidades prometidas que não foram entregues.</p>

        <h2 id="caminho-redencao" class="text-2xl md:text-3xl font-bold text-white mt-10 mb-6 pb-2 border-b border-purple-500/30">O Caminho da Redenção</h2>
        <p class="leading-relaxed mb-6">Após quase três anos de atualizações constantes, patches e melhorias, a expansão Phantom Liberty chega como um marco definitivo na evolução do jogo. Esta não é apenas uma expansão - é uma declaração de que Cyberpunk 2077 finalmente se tornou o que sempre deveria ter sido.</p>
        
        <div class="my-8 p-6 bg-gradient-to-r from-purple-900/40 to-black/40 border-l-4 border-purple-500 rounded-lg">
          <blockquote class="text-xl italic text-gray-300">
            "Phantom Liberty não é apenas uma expansão - é uma declaração de que a CD Projekt RED aprendeu com seus erros e está comprometida em entregar a melhor experiência possível."
          </blockquote>
        </div>

        <h2 id="nova-era" class="text-2xl md:text-3xl font-bold text-white mt-10 mb-6 pb-2 border-b border-purple-500/30">Phantom Liberty: Uma Nova Era</h2>
        <p class="leading-relaxed mb-6">A expansão apresenta uma história envolvente protagonizada por Keanu Reeves (Johnny Silverhand) e introduz novos personagens memoráveis, incluindo uma performance excepcional de Idris Elba como Solomon Reed. A narrativa é mais madura, os diálogos são mais afiados, e as escolhas do jogador realmente importam.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <img src="https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600" alt="Night City" class="rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]" />
          <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600" alt="Cyberpunk Gameplay" class="rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]" />
        </div>

        <h2 id="melhorias-tecnicas" class="text-2xl md:text-3xl font-bold text-white mt-10 mb-6 pb-2 border-b border-purple-500/30">Melhorias Técnicas Impressionantes</h2>
        <p class="leading-relaxed mb-6">O que mais impressiona em Phantom Liberty são as melhorias técnicas. O jogo agora roda de forma estável em todas as plataformas, os bugs foram drasticamente reduzidos, e a IA dos NPCs finalmente funciona como deveria. Night City agora pulsa com vida real.</p>
        
        <div class="bg-black/50 border border-purple-500/30 rounded-lg p-6 my-8">
          <h3 class="text-xl font-bold text-white mb-4">Principais Melhorias:</h3>
          <ul class="list-disc pl-6 space-y-2 text-gray-300">
            <li>Sistema de combate rebalanceado e mais fluido</li>
            <li>Inteligência artificial dos NPCs completamente refeita</li>
            <li>Novo sistema de habilidades e progressão</li>
            <li>Performance otimizada em todas as plataformas</li>
            <li>Novos distritos para explorar em Night City</li>
          </ul>
        </div>

        <h2 id="conclusao" class="text-2xl md:text-3xl font-bold text-white mt-10 mb-6 pb-2 border-b border-purple-500/30">Conclusão</h2>
        <p class="leading-relaxed mb-6">Phantom Liberty não é apenas uma expansão - é a redenção completa de Cyberpunk 2077. A CD Projekt RED provou que é possível recuperar a confiança da comunidade através de trabalho árduo, dedicação e um compromisso genuíno com a qualidade.</p>
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
    
    // Configurar o observador de rolagem para a barra de progresso
    const handleScroll = () => {
      if (articleRef.current) {
        const element = articleRef.current;
        const totalHeight = element.scrollHeight - element.clientHeight;
        const windowScrollTop = window.scrollY - element.offsetTop;
        
        if (windowScrollTop >= 0) {
          const scrolled = Math.min(100, Math.max(0, (windowScrollTop / totalHeight) * 100));
          setReadingProgress(scrolled);
        }
      }
      
      // Atualizar a seção ativa baseada na posição de rolagem
      const headings = Object.values(headingsRef.current);
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.getBoundingClientRect().top <= 150) {
          setActiveSection(heading.id);
          break;
        }
      }
      
      // Controlar a exibição da barra de interação móvel
      const currentScrollY = window.scrollY;
      
      // Only show the mobile bar if no actions have been completed
      if (currentScrollY > 300 && !isAnyActionCompleted()) {
        setShowMobileBar(true);
      } else {
        setShowMobileBar(false);
      }
      
      // Detectar direção da rolagem para esconder/mostrar a barra
      // Only apply this logic if no actions have been completed
      if (!isAnyActionCompleted()) {
        if (currentScrollY > lastScrollY.current + 30) {
          // Rolando para baixo
          setShowMobileBar(false);
        } else if (currentScrollY < lastScrollY.current - 30) {
          // Rolando para cima
          setShowMobileBar(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id, likeActionCompleted, commentActionCompleted, bookmarkActionCompleted, shareActionCompleted]);

  useEffect(() => {
    // Registrar as referências dos cabeçalhos após o conteúdo ser carregado
    if (post) {
      setTimeout(() => {
        const headingElements = document.querySelectorAll('h2[id]');
        const headingsObj: {[key: string]: HTMLHeadingElement} = {};
        headingElements.forEach((heading: Element) => {
          if (heading.id) {
            headingsObj[heading.id] = heading as HTMLHeadingElement;
          }
        });
        headingsRef.current = headingsObj;
      }, 100);
    }
  }, [post]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    // Mark like action as completed
    setLikeActionCompleted(true);
    // Hide mobile bar with a smooth transition
    setTimeout(() => setShowMobileBar(false), 300);
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Mark bookmark action as completed
    setBookmarkActionCompleted(true);
    // Hide mobile bar with a smooth transition
    setTimeout(() => setShowMobileBar(false), 300);
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
      // Mark comment action as completed
      setCommentActionCompleted(true);
      // Hide mobile bar with a smooth transition
      setTimeout(() => setShowMobileBar(false), 300);
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

  // Extrair os títulos das seções para o índice
  const extractHeadings = () => {
    const headings: {id: string, text: string}[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, 'text/html');
    doc.querySelectorAll('h2[id]').forEach((heading) => {
      headings.push({
        id: heading.id,
        text: heading.textContent || ''
      });
    });
    return headings;
  };

  const tableOfContents = extractHeadings();

  // Barra de interação flutuante para mobile
  // The mobile bar will only show if no actions have been completed
  const mobileBarVisible = showMobileBar && !isAnyActionCompleted();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header />
      
      {/* Barra de progresso de leitura */}
      <div className="fixed top-16 left-0 w-full h-1 bg-gray-800 z-30">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>
      
      <div className="container mx-auto max-w-7xl py-16 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Artigo Principal */}
          <article ref={articleRef} className="lg:w-3/4">
            {/* Return Link */}
            <Link to="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 group">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Voltar para Home
            </Link>

            {/* Post Header */}
            <div className="mb-8">
              <Badge className={`${getCategoryColor(post.category)} text-white mb-4 px-3 py-1 text-sm`}>
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
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

              {/* Featured Image with overlay gradient */}
              <div className="relative rounded-lg overflow-hidden shadow-xl mb-8 group">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-white text-2xl font-bold">{post.title}</h2>
                  <p className="text-gray-300">{post.excerpt}</p>
                </div>
              </div>

              {/* Social Share and Likes */}
              <div className="flex flex-wrap justify-between items-center mb-8 border-y border-purple-500/30 py-4 gap-y-3">
                <div className="flex items-center flex-wrap gap-3">
                  <Button 
                    variant={isLiked ? "default" : "outline"} 
                    size="sm" 
                    onClick={handleLike}
                    className={`${isLiked ? "bg-gradient-to-r from-pink-500 to-purple-600 border-0" : "border-purple-500/50 bg-black/30 backdrop-blur-sm text-purple-400 hover:bg-purple-500/20"} px-4 h-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25`}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isLiked ? "fill-white text-white" : "text-pink-400"} transition-all duration-300`} />
                    <span className="text-sm font-medium">{likes}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500/50 bg-black/30 backdrop-blur-sm text-purple-400 hover:bg-purple-500/20 px-4 h-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                    onClick={() => document.getElementById('comments')?.scrollIntoView({behavior: 'smooth'})}
                  >
                    <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
                    <span className="text-sm font-medium">{comments.length}</span>
                  </Button>
                  <Button
                    variant={isBookmarked ? "default" : "outline"}
                    size="sm"
                    onClick={handleBookmark}
                    className={`${isBookmarked ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-0" : "border-purple-500/50 bg-black/30 backdrop-blur-sm text-purple-400 hover:bg-purple-500/20"} px-4 h-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25`}
                  >
                    <Bookmark className={`w-5 h-5 mr-2 ${isBookmarked ? "fill-white text-white" : "text-indigo-400"} transition-all duration-300`} />
                    <span className="text-sm font-medium hidden sm:inline">Salvar</span>
                  </Button>
                </div>
                <div className="flex items-center">
                  <SocialShare url={`/post/${post.id}`} title={post.title} />
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div 
              className="prose prose-invert prose-purple max-w-none mb-12 text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Autor Bio */}
            <div className="bg-black/40 border border-purple-500/30 rounded-lg p-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-1">{post.author}</h3>
                  <p className="text-gray-400 mb-3">Editor & Crítico de Games</p>
                  <p className="text-gray-300">Especialista em RPGs e jogos de mundo aberto, com mais de 10 anos de experiência na indústria de games. Apaixonado por narrativas imersivas e mecânicas de jogo inovadoras.</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-12">
              <h3 className="text-white text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Link key={tag} to={`/tag/${tag.toLowerCase()}`}>
                    <Badge variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20 transition-colors">
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
                    className="bg-black/40 border-purple-500/30 text-white mb-4 min-h-[120px]"
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
                <Card key={comment.id} className="bg-black/40 border-purple-500/30 backdrop-blur-sm mb-4 hover:border-purple-500/50 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">{comment.author.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{comment.author}</p>
                          <p className="text-gray-400 text-xs">{new Date(comment.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-purple-400">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {comment.likes}
                      </Button>
                    </div>
                    <p className="text-gray-300 mt-3 pl-12">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </article>
          
          {/* Sidebar - Visível apenas em desktop */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-20">
              {/* Índice do artigo */}
              <div className="bg-black/40 border border-purple-500/30 rounded-lg p-6 mb-6">
                <h3 className="text-white text-lg font-semibold mb-4">Neste artigo</h3>
                <nav>
                  <ul className="space-y-2">
                    {tableOfContents.map((heading) => (
                      <li key={heading.id}>
                        <a 
                          href={`#${heading.id}`}
                          className={cn(
                            "text-gray-400 hover:text-purple-400 transition-colors block py-1 border-l-2 pl-3",
                            activeSection === heading.id 
                              ? "border-purple-500 text-purple-400 font-medium" 
                              : "border-transparent"
                          )}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              
              {/* Artigos relacionados */}
              <div className="bg-black/40 border border-purple-500/30 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Artigos Relacionados</h3>
                <div className="space-y-4">
                  <div className="group">
                    <Link to="/post/7" className="flex gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200" 
                        alt="PlayStation 6" 
                        className="w-16 h-16 object-cover rounded group-hover:ring-2 ring-purple-500"
                      />
                      <div>
                        <h4 className="text-white text-sm font-medium group-hover:text-purple-400 transition-colors">PlayStation 6: Rumores Apontam para Lançamento em 2026</h4>
                        <p className="text-gray-400 text-xs mt-1">5 min de leitura</p>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="group">
                    <Link to="/post/8" className="flex gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1624953587687-daf255b6b80a?w=200" 
                        alt="Windows 12" 
                        className="w-16 h-16 object-cover rounded group-hover:ring-2 ring-purple-500"
                      />
                      <div>
                        <h4 className="text-white text-sm font-medium group-hover:text-purple-400 transition-colors">Windows 12: Microsoft Prepara Grande Atualização com IA</h4>
                        <p className="text-gray-400 text-xs mt-1">7 min de leitura</p>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="group">
                    <Link to="/post/9" className="flex gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1532289608746-8aaaa2b6a861?w=200" 
                        alt="Starfield" 
                        className="w-16 h-16 object-cover rounded group-hover:ring-2 ring-purple-500"
                      />
                      <div>
                        <h4 className="text-white text-sm font-medium group-hover:text-purple-400 transition-colors">Starfield: Bethesda Anuncia Primeira Expansão para Março</h4>
                        <p className="text-gray-400 text-xs mt-1">6 min de leitura</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Barra de interação flutuante para mobile */}
      <div 
        className={cn(
          "fixed bottom-2 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-black/90 backdrop-blur-md border border-purple-500/30 py-1.5 px-3 flex justify-between items-center z-50 transition-all duration-300 rounded-full shadow-lg shadow-purple-500/10 lg:hidden",
          mobileBarVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        )}
      >
        <div className="flex items-center gap-2">
          <Button 
            variant={isLiked ? "default" : "outline"} 
            size="sm" 
            onClick={handleLike}
            className={`${isLiked ? "bg-gradient-to-r from-pink-500 to-purple-600 border-0" : "border-purple-500/50 bg-black/30 text-purple-400"} w-9 h-9 p-0 rounded-full shadow-lg ${isLiked ? "shadow-pink-500/30" : ""}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-white text-white" : "text-pink-400"}`} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500/50 bg-black/30 text-purple-400 w-9 h-9 p-0 rounded-full shadow-lg"
            onClick={() => {
              document.getElementById('comments')?.scrollIntoView({behavior: 'smooth'});
              // Mark comment navigation as completed
              setCommentActionCompleted(true);
              // Hide mobile bar after a short delay to allow animation
              setTimeout(() => setShowMobileBar(false), 500);
            }}
          >
            <MessageCircle className="w-4 h-4 text-blue-400" />
          </Button>
        </div>
        
        <div className="flex-1 mx-2">
          <div className="w-full bg-gray-800/50 h-1 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={isBookmarked ? "default" : "outline"}
            size="sm"
            onClick={handleBookmark}
            className={`${isBookmarked ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-0" : "border-purple-500/50 bg-black/30 text-purple-400"} w-9 h-9 p-0 rounded-full shadow-lg ${isBookmarked ? "shadow-indigo-500/30" : ""}`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-white text-white" : "text-indigo-400"}`} />
          </Button>
          <div className="scale-100">
            <SocialShare 
              url={`/post/${post.id}`} 
              title={post.title} 
              onShare={() => {
                // Mark share action as completed
                setShareActionCompleted(true);
                // Hide mobile bar with a smooth transition
                setTimeout(() => setShowMobileBar(false), 300);
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Post;
