
/**
 * Utility functions for making authenticated API requests to your FastAPI backend
 */

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: RequestMethod;
  body?: any;
  headers?: Record<string, string>;
}

// Base API URL - replace with your FastAPI endpoint
const API_BASE_URL = 'http://localhost:8000'; // Update this with your actual FastAPI URL

/**
 * Makes an authenticated request to the API
 * @param endpoint The API endpoint
 * @param options Request options
 * @returns Promise with the response data
 */
export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = localStorage.getItem('auth_token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add token to headers if it exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const requestOptions: RequestInit = {
    method: options.method || 'GET',
    headers,
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  };
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
  
  // Handle 401 Unauthorized errors (token expired or invalid)
  if (response.status === 401) {
    // Clear the token and redirect to login
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'An error occurred');
  }
  
  // For 204 No Content responses
  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json();
}

/**
 * Shorthand for GET requests
 */
export function get<T>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}) {
  return apiRequest<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * Shorthand for POST requests
 */
export function post<T>(endpoint: string, data: any, options: Omit<RequestOptions, 'method' | 'body'> = {}) {
  return apiRequest<T>(endpoint, { ...options, method: 'POST', body: data });
}

/**
 * Shorthand for PUT requests
 */
export function put<T>(endpoint: string, data: any, options: Omit<RequestOptions, 'method' | 'body'> = {}) {
  return apiRequest<T>(endpoint, { ...options, method: 'PUT', body: data });
}

/**
 * Shorthand for DELETE requests
 */
export function del<T>(endpoint: string, options: Omit<RequestOptions, 'method'> = {}) {
  return apiRequest<T>(endpoint, { ...options, method: 'DELETE' });
}

/**
 * Shorthand for PATCH requests
 */
export function patch<T>(endpoint: string, data: any, options: Omit<RequestOptions, 'method' | 'body'> = {}) {
  return apiRequest<T>(endpoint, { ...options, method: 'PATCH', body: data });
}
