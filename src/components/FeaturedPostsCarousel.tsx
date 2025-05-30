import { useState, useEffect } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

interface FeaturedPostsCarouselProps {
  posts: Post[];
  autoPlay?: boolean;
  interval?: number;
}

const FeaturedPostsCarousel = ({ 
  posts, 
  autoPlay = true, 
  interval = 5000 
}: FeaturedPostsCarouselProps) => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  
  // Handle automatic sliding
  useEffect(() => {
    if (!autoPlay || !api) return;
    
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, interval);
    
    return () => {
      clearInterval(autoplayInterval);
    };
  }, [api, autoPlay, interval]);
  
  // Update current slide index when carousel changes
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

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
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-1 md:-ml-2">
          {posts.map((post) => (
            <CarouselItem key={post.id} className="pl-1 md:pl-2 md:basis-full">
              <div className="bg-black/40 border border-purple-500/30 overflow-hidden backdrop-blur-sm rounded-xl h-[220px] md:h-[250px]">
                <div className="relative h-full">
                  {/* Image as background with overlay */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full p-4 justify-end">
                    <Badge className={`${getCategoryColor(post.category)} self-start text-white text-xs px-3 py-1 rounded-full mb-2`}>
                      {post.category}
                    </Badge>
                    
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-300 mb-3 text-xs md:text-sm line-clamp-2 max-w-3xl">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center text-xs text-gray-400">
                        <span className="mr-3">{post.author}</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <Link to={`/post/${post.id}`}>
                        <Button className="bg-purple-500 hover:bg-purple-600 text-xs px-4 py-1 h-7 rounded-full">
                          Ler mais
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious 
          className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border-none text-white h-6 w-6 md:h-8 md:w-8"
          variant="ghost"
        >
          <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
        </CarouselPrevious>
        
        <CarouselNext 
          className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border-none text-white h-6 w-6 md:h-8 md:w-8"
          variant="ghost"
        >
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
        </CarouselNext>
      </Carousel>
      
      {/* Indicators */}
      <div className="flex justify-center gap-1 mt-2">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all",
              index === current ? "bg-purple-500 w-3" : "bg-gray-400/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPostsCarousel; 