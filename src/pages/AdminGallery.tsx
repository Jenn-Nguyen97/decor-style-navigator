
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Plus, 
  Image as ImageIcon, 
  Edit, 
  Trash2,
  Search
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock decor items data
const initialDecorItems = [
  {
    id: '1',
    name: 'Vintage Brass Floor Lamp',
    description: 'Elegant floor lamp with adjustable brass shade, perfect for reading corners.',
    imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    styles: ['vintage', 'traditional'],
    type: 'lighting',
    subtype: 'floor-lamp',
    price: 299
  },
  {
    id: '2',
    name: 'Mid-Century Armchair',
    description: 'Comfortable armchair with solid wood frame and premium fabric upholstery.',
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    styles: ['mid-century', 'modern'],
    type: 'furniture',
    subtype: 'armchair',
    price: 599
  },
  {
    id: '3',
    name: 'Bohemian Wall Hanging',
    description: 'Handcrafted macramé wall hanging to add texture and warmth to your walls.',
    imageUrl: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    styles: ['boho', 'eclectic'],
    type: 'wall-decor',
    subtype: 'wall-hanging',
    price: 129
  }
];

// Style and type options
const styleOptions = [
  { id: 'vintage', name: 'Vintage' },
  { id: 'mid-century', name: 'Mid-Century' },
  { id: 'modern', name: 'Modern' },
  { id: 'traditional', name: 'Traditional' },
  { id: 'boho', name: 'Bohemian' },
  { id: 'industrial', name: 'Industrial' },
  { id: 'eclectic', name: 'Eclectic' },
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'scandinavian', name: 'Scandinavian' }
];

const typeOptions = [
  { id: 'furniture', name: 'Furniture', subtypes: ['sofa', 'chair', 'table', 'bed', 'armchair', 'cabinet'] },
  { id: 'lighting', name: 'Lighting', subtypes: ['floor-lamp', 'table-lamp', 'pendant', 'chandelier'] },
  { id: 'textiles', name: 'Textiles', subtypes: ['rug', 'curtain', 'pillow', 'throw'] },
  { id: 'wall-decor', name: 'Wall Decor', subtypes: ['art', 'mirror', 'clock', 'wall-hanging'] },
  { id: 'accessories', name: 'Accessories', subtypes: ['vase', 'candleholder', 'bookend', 'sculpture'] }
];

interface DecorItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  styles: string[];
  type: string;
  subtype: string;
  price: number;
}

const AdminGallery = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, hasRole } = useAuth();
  const [decorItems, setDecorItems] = useState<DecorItem[]>(initialDecorItems);
  const [currentItem, setCurrentItem] = useState<DecorItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  // Check if user is authenticated and has admin role
  React.useEffect(() => {
    if (!isAuthenticated || !user || !hasRole(['admin'])) {
      navigate('/');
      toast.error('You do not have permission to access this page');
    }
  }, [isAuthenticated, user, hasRole, navigate]);
  
  const filteredItems = decorItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || item.type === selectedType;
    
    return matchesSearch && matchesType;
  });
  
  const handleCreate = () => {
    setCurrentItem({
      id: Date.now().toString(),
      name: '',
      description: '',
      imageUrl: '',
      styles: [],
      type: '',
      subtype: '',
      price: 0
    });
    setIsDialogOpen(true);
  };
  
  const handleEdit = (item: DecorItem) => {
    setCurrentItem({...item});
    setIsDialogOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setDecorItems(decorItems.filter(item => item.id !== id));
      toast.success('Item deleted successfully');
    }
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentItem) return;
    
    if (decorItems.some(item => item.id === currentItem.id)) {
      // Update existing item
      setDecorItems(decorItems.map(item => 
        item.id === currentItem.id ? currentItem : item
      ));
      toast.success('Item updated successfully');
    } else {
      // Add new item
      setDecorItems([...decorItems, currentItem]);
      toast.success('Item added successfully');
    }
    
    setIsDialogOpen(false);
    setCurrentItem(null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentItem) return;
    
    const { name, value } = e.target;
    
    if (name === 'price') {
      setCurrentItem({
        ...currentItem,
        [name]: parseFloat(value) || 0
      });
    } else {
      setCurrentItem({
        ...currentItem,
        [name]: value
      });
    }
  };
  
  const handleStyleChange = (selectedStyles: string[]) => {
    if (!currentItem) return;
    
    setCurrentItem({
      ...currentItem,
      styles: selectedStyles
    });
  };
  
  const handleTypeChange = (value: string) => {
    if (!currentItem) return;
    
    setCurrentItem({
      ...currentItem,
      type: value,
      subtype: '' // Reset subtype when type changes
    });
  };
  
  const handleSubtypeChange = (value: string) => {
    if (!currentItem) return;
    
    setCurrentItem({
      ...currentItem,
      subtype: value
    });
  };
  
  // Get current type object for subtype selection
  const currentTypeObject = currentItem ? typeOptions.find(type => type.id === currentItem.type) : null;
  
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Gallery Management" 
        description="Manage decor items in the gallery"
        backgroundImage="https://images.unsplash.com/photo-1487958449943-2429e8be8625"
      />
      
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex flex-col md:flex-row gap-4 flex-grow">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-gray h-4 w-4" />
              <Input
                placeholder="Search items..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedType || ''} onValueChange={(value) => setSelectedType(value || null)}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {typeOptions.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleCreate}
            className="bg-dark-wood hover:bg-dark-wood/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <div className="h-48 relative">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full bg-soft-beige flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-warm-gray" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-warm-gray mb-2">
                  {typeOptions.find(type => type.id === item.type)?.name} - ${item.price}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.styles.map(style => (
                    <span 
                      key={style}
                      className="px-2 py-1 bg-soft-beige text-xs rounded-full"
                    >
                      {styleOptions.find(s => s.id === style)?.name}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-warm-gray mb-4">No items found.</p>
            <Button onClick={handleCreate}>Add Your First Item</Button>
          </div>
        )}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{currentItem?.id ? 'Edit Item' : 'Add New Item'}</DialogTitle>
            <DialogDescription>
              Fill in the details for this decor item.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Item Name
              </label>
              <Input
                id="name"
                name="name"
                value={currentItem?.name || ''}
                onChange={handleChange}
                placeholder="Enter item name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={currentItem?.description || ''}
                onChange={handleChange}
                placeholder="Enter item description"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="type">
                Item Type
              </label>
              <Select value={currentItem?.type || ''} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {currentTypeObject && currentItem?.type && (
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="subtype">
                  Subtype
                </label>
                <Select value={currentItem.subtype || ''} onValueChange={handleSubtypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subtype" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentTypeObject.subtypes.map(subtype => (
                      <SelectItem key={subtype} value={subtype}>{subtype}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Styles
              </label>
              <div className="grid grid-cols-2 gap-2">
                {styleOptions.map(style => (
                  <div key={style.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`style-${style.id}`}
                      checked={currentItem?.styles.includes(style.id) || false}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleStyleChange([...(currentItem?.styles || []), style.id]);
                        } else {
                          handleStyleChange((currentItem?.styles || []).filter(s => s !== style.id));
                        }
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={`style-${style.id}`}>{style.name}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="price">
                Price ($)
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                value={currentItem?.price || ''}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="imageUrl">
                Image URL
              </label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={currentItem?.imageUrl || ''}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
              
              {currentItem?.imageUrl && (
                <div className="mt-2 h-40 border rounded-md overflow-hidden">
                  <img 
                    src={currentItem.imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-dark-wood hover:bg-dark-wood/90"
              >
                Save Item
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGallery;
