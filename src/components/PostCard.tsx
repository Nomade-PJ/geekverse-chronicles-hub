
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar, Clock, Share2 } from "lucide-react";
import SocialShare from "@/components/SocialShare";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    image: string;
    readTime: string;
  };
  featured?: boolean;
}

const PostCard = ({ post, featured = false }: PostCardProps) => {
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

  if (featured) {
    return (
      <Card className="mb-8 md:mb-12 bg-black/40 border-purple-500/30 overflow-hidden backdrop-blur-sm hover:bg-black/60 transition-all duration-300 rounded-2xl">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-56 md:h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8">
            <Badge className={`${getCategoryColor(post.category)} text-white mb-4 text-sm px-3 py-1 rounded-full`}>
              {post.category}
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 hover:text-purple-400 transition-colors leading-tight">
              {post.title}
            </h2>
            <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center text-xs md:text-sm text-gray-400 space-x-4">
                <span className="flex items-center">
                  <User className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  {post.author}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  {post.readTime}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-purple-400 p-2"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Link to={`/post/${post.id}`}>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-sm px-6 py-2 rounded-full">
                    Ler mais
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              {new Date(post.date).toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 group rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20">
      <CardHeader className="p-0 relative">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className={`${getCategoryColor(post.category)} text-white absolute top-3 left-3 text-xs px-3 py-1 rounded-full`}>
          {post.category}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <CardTitle className="text-white mb-3 group-hover:text-purple-400 transition-colors text-lg md:text-xl leading-tight line-clamp-2">
          {post.title}
        </CardTitle>
        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        
        {/* Author and time info */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              {post.author}
            </span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Date and actions */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {new Date(post.date).toLocaleDateString('pt-BR')}
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-purple-400 p-2"
            >
              <Share2 className="w-3 h-3" />
            </Button>
            <Link to={`/post/${post.id}`}>
              <Button 
                size="sm" 
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-4 py-2 rounded-full transition-colors"
              >
                Ler
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
