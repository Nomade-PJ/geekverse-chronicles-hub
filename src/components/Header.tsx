
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

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
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TN</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Top Nerd Universe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-purple-400">
              <Search className="w-4 h-4" />
            </Button>
            <Link to="/admin">
              <Button variant="outline" size="sm" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                <User className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-purple-500/30">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="block text-gray-300 hover:text-purple-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pt-4 border-t border-purple-500/30">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-purple-400">
                <Search className="w-4 h-4" />
              </Button>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                  <User className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
