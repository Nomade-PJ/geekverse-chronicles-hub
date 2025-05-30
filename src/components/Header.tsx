
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: "Home", path: "/" },
    { name: "Gaming", path: "/category/gaming" },
    { name: "Tecnologia", path: "/category/tecnologia" },
    { name: "Reviews", path: "/category/reviews" },
    { name: "Tutoriais", path: "/category/tutoriais" },
    { name: "Notícias", path: "/category/noticias" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-purple-500/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/14a7b62f-3345-4cfc-9dac-783e1c203574.png" 
              alt="Top Nerd Universe Logo" 
              className="w-16 h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-gray-300 hover:text-purple-400 transition-colors font-medium relative group"
              >
                {category.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-300 hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <div className="fixed top-0 left-0 w-80 h-full bg-gray-900 z-50 md:hidden animate-slide-in-left shadow-2xl border-r border-purple-500/30">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-purple-500/30 bg-black">
                <div className="flex items-center space-x-3">
                  <img 
                    src="/lovable-uploads/14a7b62f-3345-4cfc-9dac-783e1c203574.png" 
                    alt="Logo" 
                    className="w-10 h-10"
                  />
                  <span className="text-white font-bold text-lg">Menu</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-purple-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Menu Content */}
              <div className="p-6 space-y-6 bg-gray-900">
                {/* Search Section */}
                <div className="space-y-3">
                  <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Buscar</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="Buscar conteúdo..."
                      className="w-full bg-black/50 border border-purple-500/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                    />
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="space-y-3">
                  <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Navegação</h3>
                  <nav className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="block px-4 py-3 text-white hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-200 font-medium border-l-2 border-transparent hover:border-purple-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Additional Actions */}
                <div className="pt-6 border-t border-purple-500/30">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      Login
                    </button>
                    <button className="bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500/10 py-2 px-4 rounded-lg font-medium transition-colors">
                      Cadastro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
