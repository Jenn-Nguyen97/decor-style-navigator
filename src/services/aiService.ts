
// This is a simulated AI service for decor recommendations
// In a real application, this would connect to a backend AI service

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

// Mock decor items database
const decorItems: DecorItem[] = [
  {
    id: '1',
    name: 'Vintage Brass Floor Lamp',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    description: 'Elegant brass floor lamp with adjustable arm and glass shade.',
    price: 299,
    styles: ['vintage', 'traditional', 'art deco'],
    colors: ['gold', 'brass'],
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
    dimensions: { width: 120, height: 45, depth: 60 },
    suitableRooms: ['living']
  }
];

// Mock function to analyze a room image
export const analyzeRoomImage = async (imageFile: File): Promise<Room> => {
  // In a real app, this would upload the image to a backend service for analysis
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulated room analysis result
      resolve({
        id: Math.random().toString(36).substr(2, 9),
        imageUrl: URL.createObjectURL(imageFile),
        style: ['modern', 'traditional', 'minimalist', 'scandinavian'][Math.floor(Math.random() * 4)],
        dominantColors: ['#E8DFD0', '#9E9A94', '#C9846B'].map(color => color), // Fixed: Convert to array
        size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large',
        type: ['living', 'bedroom', 'dining', 'office'][Math.floor(Math.random() * 4)] as 'living' | 'bedroom' | 'dining' | 'office'
      });
    }, 2000); // Simulate processing time
  });
};

// Mock function to get decor recommendations for a room
export const getDecorRecommendations = async (
  roomId: string,
  decorItemId: string
): Promise<AIRecommendation> => {
  // In a real app, this would call a backend AI service with the room and item IDs
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find the selected decor item
      const decorItem = decorItems.find((item) => item.id === decorItemId);
      
      if (!decorItem) {
        throw new Error('Decor item not found');
      }
      
      // Generate random match score between 55 and 95
      const matchScore = Math.floor(Math.random() * 41) + 55;
      
      // Get alternative suggestions (excluding the current item)
      const alternatives = decorItems
        .filter((item) => item.id !== decorItemId)
        .slice(0, 3);
      
      // Generate placement suggestion based on item type
      let placement = '';
      if (decorItem.name.includes('Lamp')) {
        placement = 'by the reading chair in the corner';
      } else if (decorItem.name.includes('Chair') || decorItem.name.includes('Armchair')) {
        placement = 'opposite the sofa near the window';
      } else if (decorItem.name.includes('Shelf') || decorItem.name.includes('Wall')) {
        placement = 'on the empty wall to the right of the window';
      } else if (decorItem.name.includes('Table')) {
        placement = 'in the center of the conversational area';
      } else {
        placement = 'near the focal point of the room';
      }
      
      // Create reason for the score
      let reason = '';
      if (matchScore >= 85) {
        reason = `The ${decorItem.name.toLowerCase()} complements your existing design aesthetic perfectly. Its ${decorItem.colors.join('/')} tones harmonize with your room's color palette.`;
      } else if (matchScore >= 70) {
        reason = `The ${decorItem.name.toLowerCase()} generally works well with your space, though the colors could be a slightly better match. The style fits your room's overall aesthetic.`;
      } else {
        reason = `While the ${decorItem.name.toLowerCase()} is a beautiful piece, it may not be the ideal match for your current room style and color scheme. Consider our alternative suggestions.`;
      }
      
      // Simulated AI recommendation
      resolve({
        matchScore,
        recommendedPlacement: placement,
        alternatives,
        reasonForScore: reason
      });
    }, 1500); // Simulate processing time
  });
};

// Get all decor items
export const getAllDecorItems = async (): Promise<DecorItem[]> => {
  // In a real app, this would fetch from a database
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(decorItems);
    }, 1000);
  });
};

// Get decor item by id
export const getDecorItemById = async (id: string): Promise<DecorItem | undefined> => {
  // In a real app, this would fetch from a database
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(decorItems.find(item => item.id === id));
    }, 500);
  });
};
