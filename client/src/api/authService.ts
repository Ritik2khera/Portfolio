import api from './axios';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post('/api/users/login', data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post('/api/users', data);
  return response.data;
};

export const getUserProfile = async (): Promise<Omit<AuthResponse, 'token'>> => {
  const response = await api.get('/api/users/profile');
  return response.data;
}; 