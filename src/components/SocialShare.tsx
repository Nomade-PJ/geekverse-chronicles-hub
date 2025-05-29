
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, Twitter, Facebook, Instagram } from "lucide-react";

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare = ({ url, title }: SocialShareProps) => {
  const shareUrl = `${window.location.origin}${url}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    instagram: `https://www.instagram.com/` // Instagram doesn't have direct sharing, but we'll link to the platform
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (platform === 'instagram') {
      // For Instagram, we'll just open their website since they don't have direct sharing
      window.open(shareLinks[platform], '_blank');
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    // You could add a toast notification here
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-purple-400"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black/90 border-purple-500/30">
        <DropdownMenuItem 
          onClick={() => handleShare('twitter')}
          className="text-gray-300 hover:text-white hover:bg-purple-500/20"
        >
          <Twitter className="w-4 h-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleShare('facebook')}
          className="text-gray-300 hover:text-white hover:bg-purple-500/20"
        >
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleShare('instagram')}
          className="text-gray-300 hover:text-white hover:bg-purple-500/20"
        >
          <Instagram className="w-4 h-4 mr-2" />
          Instagram
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={copyToClipboard}
          className="text-gray-300 hover:text-white hover:bg-purple-500/20"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Copiar Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShare;
