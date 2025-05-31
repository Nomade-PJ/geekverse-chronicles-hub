
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useStorage() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  /**
   * Faz upload de uma imagem para o bucket de armazenamento
   * @param file O arquivo a ser enviado
   * @param bucketName Nome do bucket (padrão: 'post-images')
   * @param path Caminho dentro do bucket (opcional)
   * @returns URL pública da imagem ou null em caso de erro
   */
  const uploadImage = async (
    file: File,
    bucketName = 'post-images',
    path?: string
  ): Promise<string | null> => {
    try {
      setIsUploading(true);
      setProgress(0);
      setError(null);

      // Gera um nome de arquivo único com timestamp
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = path ? `${path}/${fileName}` : fileName;

      // Simula progresso durante o upload
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 0.1, 0.9));
      }, 100);

      // Upload do arquivo
      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      clearInterval(progressInterval);
      setProgress(1);

      if (uploadError) throw uploadError;

      // Obter URL pública
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.message || 'Failed to upload image');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Exclui uma imagem do bucket de armazenamento
   * @param path Caminho completo da imagem
   * @param bucketName Nome do bucket (padrão: 'post-images')
   * @returns true se excluído com sucesso, false caso contrário
   */
  const deleteImage = async (
    path: string,
    bucketName = 'post-images'
  ): Promise<boolean> => {
    try {
      setError(null);

      // Extrai o nome do arquivo da URL
      const urlParts = path.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // Exclui o arquivo
      const { error: deleteError } = await supabase.storage
        .from(bucketName)
        .remove([fileName]);

      if (deleteError) throw deleteError;

      return true;
    } catch (err: any) {
      console.error('Error deleting image:', err);
      setError(err.message || 'Failed to delete image');
      return false;
    }
  };

  /**
   * Lista todas as imagens em um bucket
   * @param bucketName Nome do bucket (padrão: 'post-images')
   * @param path Caminho dentro do bucket (opcional)
   * @returns Array de objetos de imagem ou array vazio em caso de erro
   */
  const listImages = async (
    bucketName = 'post-images',
    path?: string
  ): Promise<any[]> => {
    try {
      setError(null);

      const { data, error: listError } = await supabase.storage
        .from(bucketName)
        .list(path || '');

      if (listError) throw listError;

      // Adiciona URLs públicas aos itens
      const itemsWithUrls = data.map((item) => {
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(path ? `${path}/${item.name}` : item.name);

        return {
          ...item,
          publicUrl: urlData.publicUrl
        };
      });

      return itemsWithUrls;
    } catch (err: any) {
      console.error('Error listing images:', err);
      setError(err.message || 'Failed to list images');
      return [];
    }
  };

  return {
    uploadImage,
    deleteImage,
    listImages,
    isUploading,
    progress,
    error
  };
}
