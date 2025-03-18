import api from './axios';

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  tags: string[];
  published: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogInput {
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  tags: string[];
  published?: boolean;
  author: string;
}

export const getAllBlogs = async (): Promise<Blog[]> => {
  const response = await api.get('/api/blogs');
  return response.data;
};

export const getAllBlogsAdmin = async (): Promise<Blog[]> => {
  const response = await api.get('/api/blogs/admin');
  return response.data;
};

export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  const response = await api.get(`/api/blogs/${slug}`);
  return response.data;
};

export const createBlog = async (blog: BlogInput): Promise<Blog> => {
  const response = await api.post('/api/blogs', blog);
  return response.data;
};

export const updateBlog = async (id: string, blog: Partial<BlogInput>): Promise<Blog> => {
  const response = await api.put(`/api/blogs/${id}`, blog);
  return response.data;
};

export const deleteBlog = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/api/blogs/${id}`);
  return response.data;
}; 