
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar, Clock } from "lucide-react";
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
      <Card className="mb-12 bg-black/40 border-purple-500/30 overflow-hidden backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <Badge className={`${getCategoryColor(post.category)} text-white mb-4`}>
              {post.category}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 hover:text-purple-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-300 mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-400 space-x-4">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {post.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString('pt-BR')}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <SocialShare url={`/post/${post.id}`} title={post.title} />
                <Link to={`/post/${post.id}`}>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Ler mais
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 group">
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
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <span className="flex items-center">
            <User className="w-3 h-3 mr-1" />
            {post.author}
          </span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {post.readTime}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {new Date(post.date).toLocaleDateString('pt-BR')}
          </span>
          <div className="flex items-center space-x-2">
            <SocialShare url={`/post/${post.id}`} title={post.title} />
            <Link to={`/post/${post.id}`}>
              <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
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
