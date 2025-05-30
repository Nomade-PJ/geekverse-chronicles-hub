import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  Share2, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Copy, 
  CheckCircle2, 
  MessageSquare,
  MessageCircle, 
  Link as LinkIcon
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

interface SocialShareProps {
  url: string;
  title: string;
  onShare?: () => void; // Optional callback for when sharing is completed
}

const SocialShare = ({ url, title, onShare }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}${url}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    instagram: `https://www.instagram.com/`, // Instagram doesn't have direct sharing
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=Confira%20este%20artigo:%20${encodedUrl}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    // Call the onShare callback if provided
    if (onShare) {
      onShare();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    
    // Show toast notification
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência.",
      duration: 2000,
    });
    
    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
    
    // Call the onShare callback if provided
    if (onShare) {
      onShare();
    }
  };

  // Verificar se o navegador suporta a API de compartilhamento nativa
  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  // Função para usar o compartilhamento nativo do dispositivo
  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: title,
        url: shareUrl,
      });
      
      // Call the onShare callback if provided
      if (onShare) {
        onShare();
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  return (
    <div className="flex items-center">
      {/* Em dispositivos móveis, usar o botão de compartilhamento nativo se disponível */}
      {hasNativeShare ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          className="rounded-full w-9 h-9 p-0 border-purple-500/50 bg-black/30 text-purple-400 hover:bg-purple-500/20 shadow-lg"
        >
          <Share2 className="w-4 h-4 text-violet-400" />
        </Button>
      ) : (
        <>
          {/* Botões de compartilhamento visíveis apenas em telas maiores */}
          <div className="hidden sm:flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="rounded-full w-9 h-9 p-0 border-purple-500/50 bg-black/30 backdrop-blur-sm text-purple-400 hover:bg-blue-500/20 transition-all duration-300 shadow-lg hover:border-blue-400/50"
                  >
                    <Twitter className="w-4 h-4 text-blue-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Compartilhar no Twitter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="rounded-full w-9 h-9 p-0 border-purple-500/50 bg-black/30 backdrop-blur-sm text-purple-400 hover:bg-blue-600/20 transition-all duration-300 shadow-lg hover:border-blue-600/50"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Compartilhar no Facebook</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('whatsapp')}
                    className="rounded-full w-9 h-9 p-0 border-purple-500/50 bg-black/30 backdrop-blur-sm text-purple-400 hover:bg-green-500/20 transition-all duration-300 shadow-lg hover:border-green-500/50"
                  >
                    <MessageSquare className="w-4 h-4 text-green-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Compartilhar no WhatsApp</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Menu dropdown para todos os tamanhos de tela */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full w-9 h-9 p-0 border-purple-500/50 bg-black/30 text-purple-400 hover:bg-purple-500/20 shadow-lg"
              >
                <Share2 className="w-4 h-4 text-violet-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/90 border-purple-500/30 backdrop-blur-md w-60 shadow-xl shadow-purple-500/10 rounded-xl p-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-purple-500/20 mb-1">
                Compartilhar via
              </div>
              
              {/* Opções extras para dispositivos móveis */}
              <div className="sm:hidden">
                <DropdownMenuItem 
                  onClick={() => handleShare('twitter')}
                  className="text-gray-300 hover:text-white hover:bg-blue-500/20 cursor-pointer rounded-lg flex items-center gap-3 px-3 py-2.5"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Twitter className="w-5 h-5 text-blue-400" />
                  </div>
                  <span>Twitter</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleShare('facebook')}
                  className="text-gray-300 hover:text-white hover:bg-blue-600/20 cursor-pointer rounded-lg flex items-center gap-3 px-3 py-2.5"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>Facebook</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleShare('whatsapp')}
                  className="text-gray-300 hover:text-white hover:bg-green-500/20 cursor-pointer rounded-lg flex items-center gap-3 px-3 py-2.5"
                >
                  <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                  </div>
                  <span>WhatsApp</span>
                </DropdownMenuItem>
              </div>
              
              <DropdownMenuItem 
                onClick={() => handleShare('linkedin')}
                className="text-gray-300 hover:text-white hover:bg-blue-700/20 cursor-pointer rounded-lg flex items-center gap-3 px-3 py-2.5"
              >
                <div className="w-9 h-9 rounded-full bg-blue-700/20 flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-blue-700" />
                </div>
                <span>LinkedIn</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleShare('telegram')}
                className="text-gray-300 hover:text-white hover:bg-blue-400/20 cursor-pointer rounded-lg flex items-center gap-3 px-3 py-2.5"
              >
                <div className="w-9 h-9 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                </div>
                <span>Telegram</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleShare('email')}
                className="text-gray-300 hover:text-white hover:bg-purple-400/20 cursor-pointer rounded-lg flex items-center gap-3 px-3 py-2.5"
              >
                <div className="w-9 h-9 rounded-full bg-purple-400/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <span>Email</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-purple-500/20 my-1" />
              
              <DropdownMenuItem 
                onClick={copyToClipboard}
                className="text-gray-300 hover:text-white hover:bg-violet-500/20 cursor-pointer rounded-lg flex items-center gap-3 px-3 py-2.5"
              >
                {copied ? (
                  <>
                    <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <div className="w-9 h-9 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <LinkIcon className="w-5 h-5 text-violet-400" />
                    </div>
                    <span>Copiar Link</span>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
};

export default SocialShare;
