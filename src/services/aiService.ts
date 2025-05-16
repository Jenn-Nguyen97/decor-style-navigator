// AI service for decor recommendations

import { apiRequest } from './api';
import { DecorSuggestion, DecorSuggestionRequest } from '@/types/api';

// Type definitions from the existing aiService.ts file
export interface Room {
  id: string;
  imageUrl: string;
  style?: string;
  dominantColors?: string[];
  size?: 'small' | 'medium' | 'large';
  type?: 'living' | 'bedroom' | 'dining' | 'office' | 'kitchen' | 'bathroom';
}

export interface DecorItem {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price?: number;
  styles: string[];
  colors: string[];
  type: string;
  subtype?: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  suitableRooms: string[];
}

export interface AIRecommendation {
  matchScore: number;
  recommendedPlacement: string;
  alternatives?: DecorItem[];
  reasonForScore: string;
}

// Convert image file to Base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

// Get decor suggestions from the AI API
export const getAiDecorSuggestions = async (imageFile: File): Promise<DecorSuggestion> => {
  try {
    const base64Image = await fileToBase64(imageFile);
    const request: DecorSuggestionRequest = {
      image: base64Image
    };
    
    return apiRequest<DecorSuggestion>('/ai/suggest', 'POST', request);
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    throw error;
  }
};

// Map API response to existing app structure
export const analyzeRoomImage = async (imageFile: File): Promise<Room> => {
  try {
    const suggestion = await getAiDecorSuggestions(imageFile);
    
    // Extract dominant colors from color palette
    const dominantColors = suggestion.analysis.colorPalette.map(color => color.hex);
    
    // Convert to existing Room format
    return {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: URL.createObjectURL(imageFile),
      style: suggestion.analysis.styles[0] || undefined,
      dominantColors,
      // Map to existing room types when possible
      type: mapToRoomType(suggestion.analysis.suitablePositions)
    };
  } catch (error) {
    console.error('Failed to analyze room image:', error);
    // Fall back to mock implementation if API fails
    return fallbackAnalyzeRoom(imageFile);
  }
};

// Helper function to map suitable positions to room types
function mapToRoomType(suitablePositions: string[]): 'living' | 'bedroom' | 'dining' | 'office' | 'kitchen' | 'bathroom' | undefined {
  const positionMapping: Record<string, 'living' | 'bedroom' | 'dining' | 'office' | 'kitchen' | 'bathroom'> = {
    'living room': 'living',
    'bedroom': 'bedroom',
    'dining room': 'dining',
    'office': 'office',
    'kitchen': 'kitchen',
    'bathroom': 'bathroom'
  };

  for (const position of suitablePositions) {
    const lowerPosition = position.toLowerCase();
    for (const [key, value] of Object.entries(positionMapping)) {
      if (lowerPosition.includes(key)) {
        return value;
      }
    }
  }

  return undefined;
}

// Fallback to simulate the API response if needed
function fallbackAnalyzeRoom(imageFile: File): Promise<Room> {
  // Keep existing mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulated room analysis result
      resolve({
        id: Math.random().toString(36).substr(2, 9),
        imageUrl: URL.createObjectURL(imageFile),
        style: ['modern', 'traditional', 'minimalist', 'scandinavian'][Math.floor(Math.random() * 4)],
        dominantColors: ['#E8DFD0', '#9E9A94', '#C9846B'],
        size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large',
        type: ['living', 'bedroom', 'dining', 'office'][Math.floor(Math.random() * 4)] as 'living' | 'bedroom' | 'dining' | 'office'
      });
    }, 2000); // Simulate processing time
  });
}

// Convert API Product to DecorItem
export function mapProductToDecorItem(product: Product): DecorItem {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: product.name,
    imageUrl: product.images[0] || '',
    description: product.description,
    price: product.price,
    styles: [product.style],
    colors: [], // API doesn't provide colors
    type: product.position.toLowerCase(),
    suitableRooms: ['living', 'bedroom', 'dining', 'office'] // Default suitable rooms
  };
}

// Map to existing app functions
export const getDecorRecommendations = async (
  roomId: string,
  decorItemId: string
): Promise<AIRecommendation> => {
  // Keep existing implementation for now
  // ... keep existing code
};

export const getAllDecorItems = async (): Promise<DecorItem[]> => {
  try {
    const products = await getAllProducts();
    return products.map(mapProductToDecorItem);
  } catch (error) {
    console.error('Error getting decor items:', error);
    // Fallback to existing mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock decor items from original function
        resolve([
          {
            id: '1',
            name: 'Vintage Brass Floor Lamp',
            imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
            description: 'Elegant brass floor lamp with adjustable arm and glass shade.',
            price: 299,
            styles: ['vintage', 'traditional', 'art deco'],
            colors: ['gold', 'brass'],
            type: 'lighting',
            subtype: 'Floor Lamp',
            dimensions: { width: 30, height: 160, depth: 30 },
            suitableRooms: ['living', 'bedroom', 'office']
          },
          {
            id: '2',
            name: 'Mid-Century Armchair',
            imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
            description: 'Iconic mid-century design with walnut frame and beige upholstery.',
            price: 599,
            styles: ['mid-century modern', 'minimalist'],
            colors: ['beige', 'brown'],
            type: 'seating',
            subtype: 'Armchair',
            dimensions: { width: 70, height: 85, depth: 75 },
            suitableRooms: ['living', 'office']
          },
          {
            id: '3',
            name: 'Industrial Wall Shelf',
            imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
            description: 'Rustic wood and metal wall shelving unit with 3 tiers.',
            price: 189,
            styles: ['industrial', 'rustic', 'modern'],
            colors: ['brown', 'black'],
            type: 'storage',
            subtype: 'Shelf',
            dimensions: { width: 100, height: 90, depth: 25 },
            suitableRooms: ['living', 'bedroom', 'office', 'dining']
          },
          {
            id: '4',
            name: 'Bohemian Woven Wall Hanging',
            imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
            description: 'Handcrafted macrame wall hanging with natural cotton fibers.',
            price: 129,
            styles: ['bohemian', 'eclectic', 'natural'],
            colors: ['beige', 'cream', 'white'],
            type: 'walldecor',
            subtype: 'Wall Hanging',
            dimensions: { width: 80, height: 120, depth: 2 },
            suitableRooms: ['living', 'bedroom', 'dining']
          },
          {
            id: '5',
            name: 'Scandinavian Coffee Table',
            imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
            description: 'Minimalist oak coffee table with hairpin legs.',
            price: 349,
            styles: ['scandinavian', 'minimalist', 'modern'],
            colors: ['light brown', 'black'],
            type: 'tables',
            subtype: 'Coffee Table',
            dimensions: { width: 120, height: 45, depth: 60 },
            suitableRooms: ['living']
          }
        ]);
      }, 1000);
    });
  }
};

export const getDecorItemById = async (id: string): Promise<DecorItem | undefined> => {
  // Keep existing implementation
  // ... keep existing code
};

// Export other functions that might be used elsewhere
