import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <div className="bg-black/40 border border-purple-500/20 backdrop-blur-sm rounded-lg overflow-hidden mb-4 relative">
      <div className="w-full h-full relative">
        {/* Post image background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 p-4">
          <div className="mb-3">
            <Badge className={`${getCategoryColor(post.category)} text-white text-xs px-3 py-1 rounded-md`}>
              {post.category}
            </Badge>
          </div>
          
          <h2 className="text-lg font-bold text-white mb-2 line-clamp-2">
            {post.title}
          </h2>
          
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
            <div className="flex items-center">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
            
            <Link to={`/post/${post.id}`}>
              <Button 
                size="sm" 
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-4 py-1 h-7 rounded-full"
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