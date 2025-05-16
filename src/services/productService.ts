
import { apiRequest } from './api';
import { Product } from '@/types/api';

export async function getAllProducts(): Promise<Product[]> {
  return apiRequest<Product[]>('/products');
}
