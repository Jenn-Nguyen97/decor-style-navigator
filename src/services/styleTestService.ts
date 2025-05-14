
// Service for the personality style test

export interface StyleQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    image?: string;
    style: string;
  }[];
}

export interface StyleResult {
  name: string;
  description: string;
  characteristics: string[];
  image: string;
  recommendations: {
    colors: string[];
    materials: string[];
    furniture: string[];
    decor: string[];
  };
}

// Style test questions
export const styleQuestions: StyleQuestion[] = [
  {
    id: 1,
    question: "Which color palette most appeals to you for a living space?",
    options: [
      {
        id: "1a",
        text: "Warm neutrals with patina and aged metals",
        style: "vintage"
      },
      {
        id: "1b",
        text: "Raw metals, dark woods, and brick tones",
        style: "industrial"
      },
      {
        id: "1c",
        text: "Earthy tones with pops of color and patterns",
        style: "boho"
      },
      {
        id: "1d",
        text: "Clean whites and blacks with minimal color",
        style: "minimalist"
      },
      {
        id: "1e",
        text: "Light woods with soft grays and blues",
        style: "scandinavian"
      },
      {
        id: "1f",
        text: "Warm woods with orange, olive, and mustard",
        style: "mid-century"
      }
    ]
  },
  {
    id: 2,
    question: "What kind of materials do you prefer in your furniture?",
    options: [
      {
        id: "2a",
        text: "Antique woods, velvet, and brass",
        style: "vintage"
      },
      {
        id: "2b",
        text: "Exposed steel, reclaimed wood, and leather",
        style: "industrial"
      },
      {
        id: "2c",
        text: "Natural fibers, rattan, and global textiles",
        style: "boho"
      },
      {
        id: "2d",
        text: "Sleek, clean materials with simple lines",
        style: "minimalist"
      },
      {
        id: "2e",
        text: "Light woods, wool, and natural textiles",
        style: "scandinavian"
      },
      {
        id: "2f",
        text: "Walnut wood, tweed, and geometric patterns",
        style: "mid-century"
      }
    ]
  },
  {
    id: 3,
    question: "How would you describe your ideal room atmosphere?",
    options: [
      {
        id: "3a",
        text: "Elegant with history and character",
        style: "vintage"
      },
      {
        id: "3b",
        text: "Raw, edgy, and utilitarian",
        style: "industrial"
      },
      {
        id: "3c",
        text: "Free-spirited, layered, and organic",
        style: "boho"
      },
      {
        id: "3d",
        text: "Clean, uncluttered, and serene",
        style: "minimalist"
      },
      {
        id: "3e",
        text: "Cozy, bright, and functional",
        style: "scandinavian"
      },
      {
        id: "3f",
        text: "Retro-inspired with clean lines",
        style: "mid-century"
      }
    ]
  },
  {
    id: 4,
    question: "Which patterns are you most drawn to?",
    options: [
      {
        id: "4a",
        text: "Florals, damask, and ornate designs",
        style: "vintage"
      },
      {
        id: "4b",
        text: "Minimal to no patterns, focus on textures",
        style: "industrial"
      },
      {
        id: "4c",
        text: "Global patterns, ikat, and macramé",
        style: "boho"
      },
      {
        id: "4d",
        text: "Solid colors or very subtle patterns",
        style: "minimalist"
      },
      {
        id: "4e",
        text: "Simple geometric or nature-inspired motifs",
        style: "scandinavian"
      },
      {
        id: "4f",
        text: "Geometric, atomic, and starburst patterns",
        style: "mid-century"
      }
    ]
  },
  {
    id: 5,
    question: "What's your approach to decorating?",
    options: [
      {
        id: "5a",
        text: "Curated collections of antiques and heirlooms",
        style: "vintage"
      },
      {
        id: "5b",
        text: "Exposed elements with functional décor pieces",
        style: "industrial"
      },
      {
        id: "5c",
        text: "Eclectic mix of global finds and handcrafted items",
        style: "boho"
      },
      {
        id: "5d",
        text: "Only essential pieces with plenty of open space",
        style: "minimalist"
      },
      {
        id: "5e",
        text: "Thoughtful, functional pieces with meaningful touches",
        style: "scandinavian"
      },
      {
        id: "5f",
        text: "Iconic design pieces mixed with bold graphics",
        style: "mid-century"
      }
    ]
  },
  {
    id: 6,
    question: "Which historical era inspires you most?",
    options: [
      {
        id: "6a",
        text: "Victorian or Art Deco periods",
        style: "vintage"
      },
      {
        id: "6b",
        text: "Early 20th century factories and warehouses",
        style: "industrial"
      },
      {
        id: "6c",
        text: "Global cultures and 1970s bohemian",
        style: "boho"
      },
      {
        id: "6d",
        text: "Contemporary, present-focused design",
        style: "minimalist"
      },
      {
        id: "6e",
        text: "Nordic design of the 20th century",
        style: "scandinavian"
      },
      {
        id: "6f",
        text: "1950s and 1960s American design",
        style: "mid-century"
      }
    ]
  },
  {
    id: 7,
    question: "How do you feel about storage and organization?",
    options: [
      {
        id: "7a",
        text: "Decorative cabinets, armoires, and vintage containers",
        style: "vintage"
      },
      {
        id: "7b",
        text: "Open shelving, metal lockers, and visible organization",
        style: "industrial"
      },
      {
        id: "7c",
        text: "Baskets, decorative boxes, and flexible storage options",
        style: "boho"
      },
      {
        id: "7d",
        text: "Hidden storage to maintain clean lines and surfaces",
        style: "minimalist"
      },
      {
        id: "7e",
        text: "Practical, multi-functional furniture with smart storage",
        style: "scandinavian"
      },
      {
        id: "7f",
        text: "Statement storage pieces that are functional and stylish",
        style: "mid-century"
      }
    ]
  },
  {
    id: 8,
    question: "What lighting style do you prefer?",
    options: [
      {
        id: "8a",
        text: "Chandeliers, sconces, and decorative table lamps",
        style: "vintage"
      },
      {
        id: "8b",
        text: "Exposed bulbs, metal pendants, and adjustable task lighting",
        style: "industrial"
      },
      {
        id: "8c",
        text: "Lanterns, string lights, and eclectic lamp styles",
        style: "boho"
      },
      {
        id: "8d",
        text: "Simple, unobtrusive lighting with clean lines",
        style: "minimalist"
      },
      {
        id: "8e",
        text: "Paper pendants, warm wood, and ambient lighting",
        style: "scandinavian"
      },
      {
        id: "8f",
        text: "Sputnik chandeliers, globe lights, and sculptural lamps",
        style: "mid-century"
      }
    ]
  }
];

// Style results definitions
export const styleResults: Record<string, StyleResult> = {
  vintage: {
    name: "Vintage Classic",
    description: "You appreciate pieces with history and character. Your style combines elegance with nostalgia, featuring antique furniture, ornate details, and classic design elements.",
    characteristics: [
      "Antique and repurposed furniture",
      "Ornate details and craftsmanship",
      "Rich textiles like velvet and brocade",
      "Curated collections and personal treasures"
    ],
    image: "https://images.unsplash.com/photo-1572373548732-1686416eeb55",
    recommendations: {
      colors: ["Rich jewel tones", "Gold", "Cream", "Dusty rose"],
      materials: ["Antique wood", "Brass", "Marble", "Crystal"],
      furniture: ["Wingback chairs", "Claw-foot tables", "Hutch cabinets", "Chesterfield sofas"],
      decor: ["Vintage photographs", "Gilded mirrors", "Antique books", "Heritage art pieces"]
    }
  },
  industrial: {
    name: "Industrial Edge",
    description: "You're drawn to raw, utilitarian spaces with an edge. Your style embraces exposed elements, reclaimed materials, and a workshop-inspired aesthetic that balances form and function.",
    characteristics: [
      "Exposed architectural elements",
      "Raw materials like metal, brick, and concrete",
      "Utilitarian furniture with clean lines",
      "Minimal ornamentation with focus on function"
    ],
    image: "https://images.unsplash.com/photo-1561108861-ecf5135824c8",
    recommendations: {
      colors: ["Charcoal", "Rust", "Black", "Weathered wood tones"],
      materials: ["Reclaimed wood", "Blackened steel", "Concrete", "Exposed brick"],
      furniture: ["Factory stools", "Metal shelving", "Leather sofas", "Workshop tables"],
      decor: ["Vintage signage", "Edison bulb lighting", "Industrial machinery parts", "Metal bins"]
    }
  },
  boho: {
    name: "Bohemian Spirit",
    description: "You embody a free-spirited approach to decor with a global perspective. Your style mixes patterns, textures, and cultural influences in a relaxed, eclectic, and personal way.",
    characteristics: [
      "Eclectic mix of patterns and textures",
      "Global influences and handcrafted elements",
      "Plants and natural elements",
      "Layered textiles and warm atmosphere"
    ],
    image: "https://images.unsplash.com/photo-1617104678098-de229db51175",
    recommendations: {
      colors: ["Terracotta", "Turquoise", "Saffron", "Emerald"],
      materials: ["Natural fibers", "Rattan", "Jute", "Leather"],
      furniture: ["Floor cushions", "Low-slung sofas", "Rattan chairs", "Carved wood pieces"],
      decor: ["Macramé wall hangings", "Moroccan rugs", "Hanging plants", "Global textiles"]
    }
  },
  minimalist: {
    name: "Modern Minimalist",
    description: "You value simplicity, clean lines, and purposeful spaces. Your style focuses on quality over quantity, with a 'less is more' philosophy that creates calm, uncluttered environments.",
    characteristics: [
      "Clean lines and simple forms",
      "Limited color palette",
      "Open space and breathing room",
      "Functional, high-quality pieces"
    ],
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    recommendations: {
      colors: ["White", "Black", "Gray", "Occasional muted accent"],
      materials: ["Glass", "Polished concrete", "Smooth wood", "Metal accents"],
      furniture: ["Platform beds", "Simple sofas", "Floating shelves", "Integrated storage"],
      decor: ["Statement art pieces", "Architectural lighting", "Single dramatic plants", "Negative space"]
    }
  },
  scandinavian: {
    name: "Scandinavian Comfort",
    description: "You embrace the Nordic concept of 'hygge' – creating cozy yet bright spaces. Your style balances simplicity and functionality with warm textiles and natural elements.",
    characteristics: [
      "Light woods and bright spaces",
      "Cozy textiles and natural materials",
      "Simple forms with subtle details",
      "Practical and functional design"
    ],
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    recommendations: {
      colors: ["White", "Light gray", "Pale blue", "Blonde wood"],
      materials: ["Light wood", "Wool", "Linen", "Sheepskin"],
      furniture: ["Simple sofas", "Functional storage", "Wooden dining sets", "Accent chairs"],
      decor: ["Woven textiles", "Simple ceramics", "Candles", "Minimal wall art"]
    }
  },
  "mid-century": {
    name: "Mid-Century Modern",
    description: "You appreciate the iconic design era of the 1950s and 60s. Your style features clean lines, organic forms, and a perfect balance between function and form with a retro twist.",
    characteristics: [
      "Clean lines with organic curves",
      "Mix of traditional and non-traditional materials",
      "Bold graphic patterns",
      "Form follows function philosophy"
    ],
    image: "https://images.unsplash.com/photo-1561108861-ecf5135824c8",
    recommendations: {
      colors: ["Mustard", "Teal", "Orange", "Walnut brown"],
      materials: ["Walnut and teak", "Molded plastic", "Glass", "Tweed"],
      furniture: ["Eames-inspired chairs", "Tapered leg sofas", "Sputnik chandeliers", "Sleek credenzas"],
      decor: ["Atomic patterns", "Abstract art", "Sunburst clocks", "Graphic throw pillows"]
    }
  }
};

// Calculate style score based on answers
export const calculateStyleResult = (answers: string[]): string => {
  // Count occurrences of each style
  const styleCounts: Record<string, number> = {
    vintage: 0,
    industrial: 0,
    boho: 0,
    minimalist: 0,
    scandinavian: 0,
    "mid-century": 0
  };
  
  // For each answer, find the corresponding style and increment its count
  answers.forEach((answerId, index) => {
    const question = styleQuestions[index];
    const selectedOption = question.options.find(option => option.id === answerId);
    
    if (selectedOption) {
      styleCounts[selectedOption.style] += 1;
    }
  });
  
  // Find the style with the highest count
  let dominantStyle = "minimalist"; // Default
  let highestCount = 0;
  
  Object.entries(styleCounts).forEach(([style, count]) => {
    if (count > highestCount) {
      highestCount = count;
      dominantStyle = style;
    }
  });
  
  return dominantStyle;
};
