
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    // Simulação de busca
    if (term.length > 2) {
      const mockResults = [
        {
          id: 1,
          title: "Cyberpunk 2077: Phantom Liberty",
          excerpt: "A redenção da CD Projekt RED",
          category: "Gaming"
        },
        {
          id: 2,
          title: "Apple Vision Pro",
          excerpt: "O futuro da realidade mista",
          category: "Tecnologia"
        }
      ].filter(post => 
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-purple-400">
          <Search className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/90 border-purple-500/30 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Buscar no Top Nerd Universe</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Digite sua pesquisa..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-black/40 border-purple-500/30 text-white pl-10"
              autoFocus
            />
          </div>
          
          {searchResults.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="p-3 bg-black/40 border border-purple-500/20 rounded-lg hover:bg-purple-500/10 cursor-pointer transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to post
                  }}
                >
                  <h3 className="text-white font-medium">{result.title}</h3>
                  <p className="text-gray-400 text-sm">{result.excerpt}</p>
                  <span className="text-purple-400 text-xs">{result.category}</span>
                </div>
              ))}
            </div>
          )}
          
          {searchTerm.length > 2 && searchResults.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              Nenhum resultado encontrado para "{searchTerm}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
