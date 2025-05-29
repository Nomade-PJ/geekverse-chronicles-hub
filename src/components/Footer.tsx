
import { Heart, Github, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black/60 border-t border-purple-500/30 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TN</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Top Nerd Universe
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Seu portal definitivo para o mundo dos games, tecnologia e cultura geek. 
              Mantemos você atualizado com as últimas notícias, reviews e tutoriais.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/gaming" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Gaming
                </Link>
              </li>
              <li>
                <Link to="/category/tecnologia" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Tecnologia
                </Link>
              </li>
              <li>
                <Link to="/category/reviews" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/category/tutoriais" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Tutoriais
                </Link>
              </li>
              <li>
                <Link to="/category/noticias" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Notícias
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Legais */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-purple-500/30 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Top Nerd Universe. Todos os direitos reservados. 
            Feito com <Heart className="w-4 h-4 inline text-red-500" /> por uma equipe apaixonada por tecnologia.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Este site é destinado exclusivamente para fins educacionais e de entretenimento. 
            Todas as marcas registradas pertencem aos seus respectivos proprietários.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
