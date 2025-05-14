
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
import { Search, Filter, Heart, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const decorStyles = [
  { id: 'all', name: 'All Styles' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'industrial', name: 'Industrial' },
  { id: 'boho', name: 'Bohemian' },
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'scandinavian', name: 'Scandinavian' },
  { id: 'mid-century', name: 'Mid-Century' },
];

const itemTypes = [
  { id: 'all', name: 'All Items' },
  { id: 'lighting', name: 'Lighting', subtypes: ['Table Lamp', 'Floor Lamp', 'Chandelier'] },
  { id: 'tables', name: 'Tables', subtypes: ['Coffee Table', 'Side Table', 'Console Table'] },
  { id: 'seating', name: 'Chairs & Sofas', subtypes: ['Armchair', 'Dining Chair', 'Sofa'] },
  { id: 'storage', name: 'Storage', subtypes: ['Shelf', 'Cabinet', 'Drawer'] },
  { id: 'mirrors', name: 'Mirrors', subtypes: ['Wall Mirror', 'Standing Mirror'] },
  { id: 'textiles', name: 'Rugs & Textiles', subtypes: ['Rug', 'Cushion', 'Curtain'] },
  { id: 'walldecor', name: 'Wall Decor', subtypes: ['Painting', 'Clock', 'Frame'] },
  { id: 'accessories', name: 'Accessories', subtypes: ['Vase', 'Candle', 'Tray'] },
];

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStyle = searchParams.get('style') || 'all';
  const initialType = searchParams.get('type') || 'all';
  
  const [activeTab, setActiveTab] = useState<'style' | 'type'>('style');
  const [activeStyle, setActiveStyle] = useState(initialStyle);
  const [activeType, setActiveType] = useState(initialType);
  const [activeSubtype, setActiveSubtype] = useState<string | null>(null);
  const [items, setItems] = useState<DecorItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<DecorItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const allItems = await getAllDecorItems();
        setItems(allItems);
        filterItems(allItems);
      } catch (error) {
        console.error('Error fetching items:', error);
        toast.error('Failed to load gallery items');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItems();
  }, []);
  
  const filterItems = (itemsToFilter = items) => {
    console.log('Filtering items with:', { activeTab, activeStyle, activeType, activeSubtype, searchTerm });
    
    let result = [...itemsToFilter];
    
    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(searchLower) || 
          item.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by active criteria based on tab
    if (activeTab === 'style' && activeStyle !== 'all') {
      result = result.filter(item => item.styles.includes(activeStyle));
    } else if (activeTab === 'type' && activeType !== 'all') {
      result = result.filter(item => item.type === activeType);
      
      // Further filter by subtype if selected
      if (activeSubtype) {
        result = result.filter(item => item.subtype === activeSubtype);
      }
    }
    
    console.log('Filtered results:', result);
    setFilteredItems(result);
  };
  
  const handleStyleChange = (value: string) => {
    console.log('Style changed to:', value);
    setActiveStyle(value);
    setActiveTab('style');
    
    // Update URL query parameters
    searchParams.set('style', value);
    searchParams.delete('type');
    setSearchParams(searchParams);
  };
  
  const handleTypeChange = (value: string) => {
    console.log('Type changed to:', value);
    setActiveType(value);
    setActiveSubtype(null); // Reset subtype when changing main type
    setActiveTab('type');
    
    // Update URL query parameters
    searchParams.set('type', value);
    searchParams.delete('style');
    setSearchParams(searchParams);
  };
  
  const handleSubtypeChange = (value: string | null) => {
    console.log('Subtype changed to:', value);
    setActiveSubtype(value);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };
  
  const handleTabChange = (value: 'style' | 'type') => {
    console.log('Tab changed to:', value);
    setActiveTab(value);
    
    // Update URL parameters
    if (value === 'style') {
      searchParams.set('style', activeStyle);
      searchParams.delete('type');
    } else {
      searchParams.set('type', activeType);
      searchParams.delete('style');
    }
    setSearchParams(searchParams);
  };
  
  // Get active type object for subtype filtering
  const activeTypeObject = itemTypes.find(type => type.id === activeType);
  
  useEffect(() => {
    // Apply filters whenever dependencies change
    filterItems();
  }, [activeStyle, activeType, activeSubtype, searchTerm, activeTab]);
  
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
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
        
        {/* Filter Panel */}
        <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="mb-6">
          <CollapsibleContent className="bg-soft-beige/30 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-serif mb-3">Filter by Style</h3>
                <div className="grid grid-cols-2 gap-2">
                  {decorStyles.map(style => (
                    <Button
                      key={style.id}
                      variant={activeStyle === style.id && activeTab === 'style' ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => handleStyleChange(style.id)}
                      type="button"
                    >
                      {style.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-serif mb-3">Filter by Item Type</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Select value={activeType} onValueChange={handleTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select item type" />
                    </SelectTrigger>
                    <SelectContent>
                      {itemTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {activeTypeObject && activeTypeObject.subtypes && activeTypeObject.id !== 'all' && (
                    <Select 
                      value={activeSubtype || ''} 
                      onValueChange={val => handleSubtypeChange(val || null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subtype" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All {activeTypeObject.name}</SelectItem>
                        {activeTypeObject.subtypes.map(subtype => (
                          <SelectItem key={subtype} value={subtype}>{subtype}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setActiveStyle('all');
                  setActiveType('all');
                  setActiveSubtype(null);
                  setActiveTab('style');
                  setSearchTerm('');
                  setSearchParams({});
                  setTimeout(() => filterItems(), 0);
                }}
                type="button"
              >
                Clear Filters
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Main Category Tabs */}
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab}
          onValueChange={(value) => handleTabChange(value as 'style' | 'type')} 
          className="mb-8"
        >
          <TabsList className="w-full sm:w-auto mb-4">
            <TabsTrigger value="style">Browse by Style</TabsTrigger>
            <TabsTrigger value="type">Browse by Item Type</TabsTrigger>
          </TabsList>
          
          {/* Style Content */}
          <TabsContent value="style">
            {/* Style Pills */}
            <div className="flex overflow-x-auto pb-4 space-x-2 mb-6">
              {decorStyles.map(style => (
                <Button 
                  key={style.id} 
                  variant={activeStyle === style.id ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handleStyleChange(style.id)}
                  className="whitespace-nowrap"
                  type="button"
                >
                  {style.name}
                </Button>
              ))}
            </div>
            
            {/* Item Grid */}
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
                        <span className="px-2 py-1 bg-soft-beige/70 rounded-full text-xs">
                          {item.type}
                        </span>
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
                      setActiveStyle('all');
                      setActiveType('all');
                      setActiveSubtype(null);
                      setTimeout(() => filterItems(), 0);
                    }}
                    className="mt-4"
                    type="button"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Item Type Content */}
          <TabsContent value="type">
            {/* Type Selection */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {itemTypes.map(type => (
                type.id !== 'all' && (
                  <DropdownMenu key={type.id}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant={activeType === type.id ? "default" : "outline"} 
                        className="w-full justify-between"
                        type="button"
                      >
                        {type.name}
                        <Filter className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 bg-white">
                      <DropdownMenuItem onClick={() => {
                        handleTypeChange(type.id);
                        handleSubtypeChange(null);
                      }}>
                        All {type.name}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {type.subtypes?.map(subtype => (
                        <DropdownMenuItem 
                          key={subtype} 
                          onClick={() => {
                            handleTypeChange(type.id);
                            handleSubtypeChange(subtype);
                          }}
                        >
                          {subtype}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              ))}
            </div>
            
            {/* Selected Type Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-serif">
                {activeTypeObject?.name}
                {activeSubtype ? ` › ${activeSubtype}` : ''}
              </h2>
            </div>
            
            {/* Item Grid (same as in Style tab) */}
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
                        <span className="px-2 py-1 bg-soft-beige/70 rounded-full text-xs">
                          {item.subtype || item.type}
                        </span>
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
                      setActiveStyle('all');
                      setActiveType('all');
                      setActiveSubtype(null);
                      setTimeout(() => filterItems(), 0);
                    }}
                    className="mt-4"
                    type="button"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Gallery;
