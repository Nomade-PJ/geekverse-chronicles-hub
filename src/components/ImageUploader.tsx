import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useStorage } from '@/hooks/use-storage';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  label?: string;
}

const ImageUploader = ({
  onImageUploaded,
  currentImageUrl,
  label = 'Imagem de destaque'
}: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, deleteImage, isUploading, progress, error } = useStorage();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview local
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload para o Supabase
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      onImageUploaded(imageUrl);
      
      // Se havia uma imagem anterior, exclua-a
      if (currentImageUrl && currentImageUrl !== imageUrl) {
        await deleteImage(currentImageUrl);
      }
    }
  };

  const handleRemoveImage = async () => {
    if (previewUrl && previewUrl === currentImageUrl) {
      await deleteImage(currentImageUrl);
    }
    
    setPreviewUrl(null);
    onImageUploaded('');
    
    // Limpar o input de arquivo
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">
        {label}
      </label>
      
      <div className="border border-dashed border-purple-500/30 rounded-lg p-4 bg-black/20">
        {previewUrl ? (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-md" 
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-black/60 p-1 rounded-full hover:bg-black/80 transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        ) : (
          <div 
            onClick={handleClick}
            className="flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-black/30 transition-colors rounded-md"
          >
            <Upload className="h-8 w-8 text-purple-400 mb-2" />
            <p className="text-sm text-gray-400">Clique para fazer upload</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG ou GIF, máximo 5MB</p>
          </div>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      
      {isUploading && (
        <div className="space-y-1">
          <Progress value={progress * 100} className="h-2" />
          <p className="text-xs text-gray-400 text-right">{Math.round(progress * 100)}%</p>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-400 mt-1">{error}</p>
      )}
      
      {!previewUrl && !isUploading && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full mt-2 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
          onClick={handleClick}
        >
          Escolher imagem
        </Button>
      )}
    </div>
  );
};

export default ImageUploader; 