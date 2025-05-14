
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { getAllDecorItems, DecorItem } from '@/services/aiService';
import PageHeader from '@/components/common/PageHeader';
import { Search, Filter, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const decorStyles = [
  { id: 'all', name: 'All Styles' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'industrial', name: 'Industrial' },
  { id: 'boho', name: 'Bohemian' },
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'scandinavian', name: 'Scandinavian' },
  { id: 'mid-century', name: 'Mid-Century' },
];

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStyle = searchParams.get('style') || 'all';
  
  const [activeTab, setActiveTab] = useState(initialStyle);
  const [items, setItems] = useState<DecorItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<DecorItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const allItems = await getAllDecorItems();
        setItems(allItems);
        filterItems(allItems, activeTab, searchTerm);
      } catch (error) {
        console.error('Error fetching items:', error);
        toast.error('Failed to load gallery items');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItems();
  }, []);
  
  const filterItems = (itemsToFilter: DecorItem[], style: string, search: string) => {
    let result = [...itemsToFilter];
    
    // Filter by style
    if (style !== 'all') {
      result = result.filter(item => item.styles.includes(style));
    }
    
    // Filter by search term
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(searchLower) || 
          item.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredItems(result);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterItems(items, value, searchTerm);
    
    // Update URL query parameter
    searchParams.set('style', value);
    setSearchParams(searchParams);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterItems(items, activeTab, value);
  };
  
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Decor Gallery"
        description="Explore our collection of classic decor pieces for your home"
        backgroundImage="https://images.unsplash.com/photo-1616046229478-9901c5536a45"
      />
      
      <div className="container mx-auto py-12 px-4">
        {/* Search and Filter Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-gray h-4 w-4" />
            <Input
              placeholder="Search decor pieces..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
        
        {/* Style Tabs */}
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="flex overflow-x-auto pb-1 space-x-2">
            {decorStyles.map(style => (
              <TabsTrigger key={style.id} value={style.id} className="whitespace-nowrap">
                {style.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {decorStyles.map(style => (
            <TabsContent key={style.id} value={style.id} className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading ? (
                  // Loading skeletons
                  Array(8).fill(0).map((_, index) => (
                    <div 
                      key={index} 
                      className="bg-soft-beige/30 animate-pulse h-[300px] rounded-lg"
                    ></div>
                  ))
                ) : filteredItems.length > 0 ? (
                  // Item cards
                  filteredItems.map(item => (
                    <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
                      <div className="relative">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-full h-48 object-cover" 
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif font-semibold mb-1">{item.name}</h3>
                        <p className="text-sm text-warm-gray line-clamp-2 mb-3">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.styles.map(style => (
                            <span 
                              key={style} 
                              className="px-2 py-1 bg-soft-beige rounded-full text-xs"
                            >
                              {style}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          {item.price && (
                            <span className="font-semibold">${item.price}</span>
                          )}
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/decor/${item.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // No results
                  <div className="col-span-full text-center py-12">
                    <p className="text-xl text-warm-gray">
                      No items found for your search criteria.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('');
                        setActiveTab('all');
                        filterItems(items, 'all', '');
                      }}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Gallery;
