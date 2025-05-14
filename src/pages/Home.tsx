
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Image, 
  ArrowRight, 
  User, 
  Heart, 
  Search 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getAllDecorItems } from '@/services/aiService';
import { toast } from 'sonner';

const decorStyles = [
  {
    id: 'vintage',
    name: 'Vintage',
    image: 'https://images.unsplash.com/photo-1572373548732-1686416eeb55'
  },
  {
    id: 'industrial',
    name: 'Industrial',
    image: 'https://images.unsplash.com/photo-1561108861-ecf5135824c8'
  },
  {
    id: 'boho',
    name: 'Bohemian',
    image: 'https://images.unsplash.com/photo-1617104678098-de229db51175'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4'
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4'
  },
  {
    id: 'mid-century',
    name: 'Mid-Century',
    image: 'https://images.unsplash.com/photo-1561108861-ecf5135824c8'
  }
];

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const [featuredItems, setFeaturedItems] = useState([]);
  
  useEffect(() => {
    const loadFeaturedItems = async () => {
      try {
        const items = await getAllDecorItems();
        setFeaturedItems(items);
      } catch (error) {
        console.error('Error loading featured items:', error);
        toast.error('Failed to load featured items');
      }
    };
    
    loadFeaturedItems();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with more vintage styling */}
      <section className="relative h-[80vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e')",
          }}
        >
          <div className="absolute inset-0 bg-dark-wood/40 backdrop-sepia"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center md:text-left">
          <div className="max-w-xl md:ml-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
              Discover Your Perfect Decor Style
            </h1>
            <p className="text-xl text-white/90 mb-8 italic">
              Personalized recommendations to match your taste and living space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-white" asChild>
                <Link to="/style-test">Take Style Test</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                <Link to="/room-upload">Upload Your Space</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - with vintage styling */}
      <section className="py-16 bg-warm-cream">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mx-auto font-serif text-dark-wood">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center card-hover border border-soft-beige/50">
              <div className="bg-soft-beige p-4 rounded-full mb-4">
                <User className="h-8 w-8 text-terracotta" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Discover Your Style</h3>
              <p className="text-warm-gray">
                Take our personality test to find decorating styles that match your preferences and lifestyle.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center card-hover border border-soft-beige/50">
              <div className="bg-soft-beige p-4 rounded-full mb-4">
                <Image className="h-8 w-8 text-terracotta" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Upload Your Space</h3>
              <p className="text-warm-gray">
                Share photos of your room to receive personalized decor recommendations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center card-hover border border-soft-beige/50">
              <div className="bg-soft-beige p-4 rounded-full mb-4">
                <Heart className="h-8 w-8 text-terracotta" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Find Perfect Matches</h3>
              <p className="text-warm-gray">
                Get AI-powered suggestions for decor pieces that complement your unique space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Styles Section - with vintage styling */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="section-title mb-4 md:mb-0 font-serif text-dark-wood">Discover Decor Styles</h2>
            <Button variant="ghost" className="flex items-center text-terracotta hover:text-terracotta/80" asChild>
              <Link to="/gallery">
                View All Styles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {decorStyles.map((style) => (
              <div key={style.id} className="group relative h-64 overflow-hidden rounded-lg card-hover border border-soft-beige">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 sepia-[0.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-wood/80 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-serif text-white font-semibold mb-2">{style.name}</h3>
                    <Link 
                      to={`/gallery?style=${style.id}`}
                      className="text-white/80 hover:text-white flex items-center text-sm"
                    >
                      Explore <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - with vintage styling */}
      {!isAuthenticated && (
        <section className="py-16 bg-terracotta text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Ready to transform your living space?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Create an account to access personalized recommendations, upload your room photos, 
              and get AI-powered decor suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-terracotta hover:bg-white/90" asChild>
                <Link to="/register">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/room-upload">Try Room Upload</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
