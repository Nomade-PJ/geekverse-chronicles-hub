-- Tabela para categorias
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela para autores
CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela para posts
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  read_time VARCHAR(50),
  published BOOLEAN NOT NULL DEFAULT FALSE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Tabela para perfis de usuário (extensão da tabela auth.users do Supabase)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'editor', 'user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Criar RLS (Row Level Security) para segurança

-- Políticas para categorias
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categorias visíveis para todos"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Apenas admins podem criar categorias"
  ON categories FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Apenas admins podem atualizar categorias"
  ON categories FOR UPDATE
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Apenas admins podem excluir categorias"
  ON categories FOR DELETE
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- Políticas para autores
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Autores visíveis para todos"
  ON authors FOR SELECT
  USING (true);

CREATE POLICY "Apenas admins podem criar autores"
  ON authors FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Apenas admins podem atualizar autores"
  ON authors FOR UPDATE
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Apenas admins podem excluir autores"
  ON authors FOR DELETE
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- Políticas para posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts publicados visíveis para todos"
  ON posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admins podem ver todos os posts"
  ON posts FOR SELECT
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'editor'))
  );

CREATE POLICY "Apenas admins e editores podem criar posts"
  ON posts FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'editor'))
  );

CREATE POLICY "Apenas admins e editores podem atualizar posts"
  ON posts FOR UPDATE
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'editor'))
  );

CREATE POLICY "Apenas admins podem excluir posts"
  ON posts FOR DELETE
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- Políticas para perfis
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seus próprios perfis"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins podem ver todos os perfis"
  ON profiles FOR SELECT
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Apenas admins podem criar perfis"
  ON profiles FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Usuários podem atualizar seus próprios perfis"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins podem atualizar qualquer perfil"
  ON profiles FOR UPDATE
  USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- Trigger para criar perfil automático quando um usuário é criado
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (new.id, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Inserir dados iniciais
INSERT INTO categories (name, slug) VALUES
  ('Gaming', 'gaming'),
  ('Tecnologia', 'tecnologia'),
  ('Cultura Geek', 'cultura-geek'),
  ('Tutoriais', 'tutoriais'),
  ('Reviews', 'reviews'),
  ('Notícias', 'noticias')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO authors (name, email, avatar_url) VALUES
  ('Admin', 'admin@topnerd.com', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300'),
  ('Alex Rodriguez', 'alex@topnerd.com', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300'),
  ('Marina Silva', 'marina@topnerd.com', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300')
ON CONFLICT (email) DO NOTHING; 