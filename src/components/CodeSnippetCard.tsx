import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}

interface CodeSnippetCardProps {
  post: Post;
}

const CodeSnippetCard = ({ post }: CodeSnippetCardProps) => {
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
    <div className="bg-black/40 border border-purple-500/20 backdrop-blur-sm rounded-lg overflow-hidden mb-4 relative hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 h-full group">
      <div className="w-full h-full relative">
        {/* Post image background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 p-4 md:p-5 lg:p-6">
          <div className="mb-3">
            <Badge className={`${getCategoryColor(post.category)} text-white text-xs px-3 py-1 rounded-md`}>
              {post.category}
            </Badge>
          </div>
          
          <Link to={`/post/${post.id}`}>
            <h2 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
              {post.title}
            </h2>
          </Link>
          
          <p className="text-gray-300 text-sm mb-3 line-clamp-2 md:line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
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
            
            <Link to={`/post/${post.id}`}>
              <Button 
                size="sm" 
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-4 py-1 h-7 rounded-full md:px-5 transition-all duration-300 hover:shadow-md hover:shadow-purple-500/30"
              >
                Ler mais
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippetCard; 