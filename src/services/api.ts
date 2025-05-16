
// Base API configuration

const API_URL = 'http://localhost:5000/api';

// Error handling for API responses
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }
  return response.json();
}

// Create API request with optional headers
export async function apiRequest<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  headers?: HeadersInit
): Promise<T> {
  const token = localStorage.getItem('decor_token');
  
  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers
  };
  
  const config: RequestInit = {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined
  };
  
  const response = await fetch(`${API_URL}${endpoint}`, config);
  return handleApiResponse<T>(response);
}
