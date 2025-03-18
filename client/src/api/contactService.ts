import axios from 'axios';

// Define the base API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Submit contact form data to the API
 * @param contactData The contact form data
 * @returns Promise with the response data
 */
export const submitContact = async (contactData: ContactInput): Promise<{ message: string }> => {
  try {
    const response = await axios.post(`${API_URL}/contact`, contactData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to submit contact form');
    }
    throw new Error('Network error occurred while submitting the form');
  }
};

export const getAllContacts = async (): Promise<Contact[]> => {
  const response = await axios.get(`${API_URL}/contact`);
  return response.data;
};

export const getContactById = async (id: string): Promise<Contact> => {
  const response = await axios.get(`${API_URL}/contact/${id}`);
  return response.data;
};

export const markContactAsRead = async (id: string): Promise<Contact> => {
  const response = await axios.put(`${API_URL}/contact/${id}/read`);
  return response.data;
};

export const deleteContact = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${API_URL}/contact/${id}`);
  return response.data;
}; 