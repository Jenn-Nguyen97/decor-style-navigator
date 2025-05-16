
import { apiRequest } from './api';
import { Product } from '@/types/api';

// Get all products from the API
export async function getAllProducts(): Promise<Product[]> {
  try {
    return await apiRequest<Product[]>('/products', 'GET');
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Get a single product by ID
export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const products = await getAllProducts();
    const product = products.find(p => p.id === productId);
    return product || null;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
}

// Get products by style
export async function getProductsByStyle(style: string): Promise<Product[]> {
  try {
    const products = await getAllProducts();
    return products.filter(p => p.style === style);
  } catch (error) {
    console.error(`Error fetching products with style ${style}:`, error);
    throw error;
  }
}

// Get products by position/room
export async function getProductsByPosition(position: string): Promise<Product[]> {
  try {
    const products = await getAllProducts();
    return products.filter(p => p.position === position);
  } catch (error) {
    console.error(`Error fetching products for position ${position}:`, error);
    throw error;
  }
}
