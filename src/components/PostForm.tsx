import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import ImageUploader from '@/components/ImageUploader';
import { useToast } from '@/hooks/use-toast';
import { usePosts } from '@/hooks/use-posts';
import { useCategories } from '@/hooks/use-categories';
import { Post } from '@/lib/types';

interface PostFormProps {
  post?: Post;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PostForm = ({ post, onSuccess, onCancel }: PostFormProps) => {
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [categoryId, setCategoryId] = useState<number | null>(post?.category_id || null);
  const [authorId, setAuthorId] = useState<number | null>(post?.author_id || null);
  const [imageUrl, setImageUrl] = useState(post?.image_url || '');
  const [readTime, setReadTime] = useState(post?.read_time || '');
  const [published, setPublished] = useState(post?.published || false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const { createPost, updatePost } = usePosts();
  const { categories, isLoading: categoriesLoading } = useCategories();

  // Gera um slug a partir do título
  useEffect(() => {
    if (!post && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  }, [title, post]);

  // Estima o tempo de leitura com base no conteúdo
  useEffect(() => {
    if (content) {
      const words = content.trim().split(/\s+/).length;
      const minutes = Math.ceil(words / 200); // Média de 200 palavras por minuto
      setReadTime(`${minutes} min`);
    }
  }, [content]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!title || !excerpt || !content || !categoryId || !authorId) {
      toast({
        title: 'Campos incompletos',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const postData = {
        title,
        slug,
        excerpt,
        content,
        category_id: categoryId,
        author_id: authorId,
        image_url: imageUrl,
        read_time: readTime,
        published
      };
      
      if (post) {
        // Atualizar post existente
        await updatePost(post.id, postData);
        toast({
          title: 'Post atualizado',
          description: 'O post foi atualizado com sucesso.',
        });
      } else {
        // Criar novo post
        await createPost(postData);
        toast({
          title: 'Post criado',
          description: 'O post foi criado com sucesso.',
        });
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar o post. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-300">
              Título*
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black/40 border-purple-500/30 text-white"
              placeholder="Título do post"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium text-gray-300">
              Slug
            </label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="bg-black/40 border-purple-500/30 text-white"
              placeholder="slug-do-post"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-sm font-medium text-gray-300">
              Resumo*
            </label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="bg-black/40 border-purple-500/30 text-white h-24"
              placeholder="Breve resumo do post"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium text-gray-300">
              Conteúdo*
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-black/40 border-purple-500/30 text-white min-h-[300px]"
              placeholder="Conteúdo completo do post"
              required
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <ImageUploader
            onImageUploaded={setImageUrl}
            currentImageUrl={imageUrl}
          />
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-gray-300">
              Categoria*
            </label>
            <Select
              value={categoryId?.toString()}
              onValueChange={(value) => setCategoryId(Number(value))}
              disabled={categoriesLoading}
            >
              <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-purple-500/30 text-white">
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium text-gray-300">
              Autor*
            </label>
            <Select
              value={authorId?.toString()}
              onValueChange={(value) => setAuthorId(Number(value))}
            >
              <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                <SelectValue placeholder="Selecione um autor" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-purple-500/30 text-white">
                <SelectItem value="1">Admin</SelectItem>
                <SelectItem value="2">Alex Rodriguez</SelectItem>
                <SelectItem value="3">Marina Silva</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="readTime" className="text-sm font-medium text-gray-300">
              Tempo de leitura
            </label>
            <Input
              id="readTime"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className="bg-black/40 border-purple-500/30 text-white"
              placeholder="5 min"
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-4">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published" className="text-white">
              Publicar
            </Label>
          </div>
          
          <div className="pt-6 flex space-x-2">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : post ? 'Atualizar' : 'Criar'}
            </Button>
            
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostForm; 