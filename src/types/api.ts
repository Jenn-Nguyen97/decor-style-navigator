
// API Request/Response Types based on Swagger documentation

// Auth Types
export interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// Product Types
export interface Product {
  name: string;
  description: string;
  images: string[];
  style: string;
  position: string;
  price: number;
}

// AI Decor Types
export interface ColorPalette {
  name: string;
  hex: string;
  percentage: number;
}

export interface RoomAnalysis {
  styles: string[];
  colorPalette: ColorPalette[];
  suitablePositions: string[];
}

export interface DecorSuggestion {
  analysis: RoomAnalysis;
  suggestedProducts: Product[];
}

export interface DecorSuggestionRequest {
  image: string;  // Base64 encoded image
}
