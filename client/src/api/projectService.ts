import api from './axios';

export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
  featured?: boolean;
  order?: number;
}

export const getAllProjects = async (): Promise<Project[]> => {
  const response = await api.get('/api/projects');
  return response.data;
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  const response = await api.get('/api/projects/featured');
  return response.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await api.get(`/api/projects/${id}`);
  return response.data;
};

export const createProject = async (project: ProjectInput): Promise<Project> => {
  const response = await api.post('/api/projects', project);
  return response.data;
};

export const updateProject = async (id: string, project: Partial<ProjectInput>): Promise<Project> => {
  const response = await api.put(`/api/projects/${id}`, project);
  return response.data;
};

export const deleteProject = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/api/projects/${id}`);
  return response.data;
}; 