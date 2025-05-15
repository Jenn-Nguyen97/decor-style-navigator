
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Plus,
  Edit,
  Trash2,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock filter categories data
const initialStyleFilters = [
  { id: 'vintage', name: 'Vintage', description: 'Classic and antique pieces with historical charm', count: 24 },
  { id: 'mid-century', name: 'Mid-Century', description: 'Clean lines and organic forms from the 1940s-60s', count: 18 },
  { id: 'modern', name: 'Modern', description: 'Contemporary designs with sleek finishes', count: 32 },
  { id: 'traditional', name: 'Traditional', description: 'Timeless designs rooted in European styles', count: 15 },
  { id: 'boho', name: 'Bohemian', description: 'Eclectic and free-spirited with global influences', count: 21 },
  { id: 'industrial', name: 'Industrial', description: 'Raw materials and utilitarian appeal', count: 19 },
  { id: 'scandinavian', name: 'Scandinavian', description: 'Minimalist designs with natural elements', count: 27 },
  { id: 'coastal', name: 'Coastal', description: 'Beach-inspired decor with light colors and natural textures', count: 12 },
  { id: 'farmhouse', name: 'Farmhouse', description: 'Rustic and cozy with natural materials', count: 16 }
];

const initialTypeFilters = [
  { id: 'furniture', name: 'Furniture', subtypes: ['sofa', 'chair', 'table', 'bed', 'cabinet'], count: 54 },
  { id: 'lighting', name: 'Lighting', subtypes: ['floor-lamp', 'table-lamp', 'pendant', 'chandelier'], count: 36 },
  { id: 'textiles', name: 'Textiles', subtypes: ['rug', 'curtain', 'pillow', 'throw'], count: 29 },
  { id: 'wall-decor', name: 'Wall Decor', subtypes: ['art', 'mirror', 'clock', 'wall-hanging'], count: 42 },
  { id: 'accessories', name: 'Accessories', subtypes: ['vase', 'candleholder', 'bookend', 'sculpture'], count: 61 }
];

interface StyleFilter {
  id: string;
  name: string;
  description: string;
  count: number;
}

interface TypeFilter {
  id: string;
  name: string;
  subtypes: string[];
  count: number;
}

const AdminFilters = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState<'style' | 'type'>('style');
  const [styleFilters, setStyleFilters] = useState<StyleFilter[]>(initialStyleFilters);
  const [typeFilters, setTypeFilters] = useState<TypeFilter[]>(initialTypeFilters);
  const [currentStyleFilter, setCurrentStyleFilter] = useState<StyleFilter | null>(null);
  const [currentTypeFilter, setCurrentTypeFilter] = useState<TypeFilter | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSubtype, setNewSubtype] = useState('');
  
  // Check if user is authenticated and has admin role
  React.useEffect(() => {
    if (!isAuthenticated || !user || !hasRole(['admin'])) {
      navigate('/');
      toast.error('You do not have permission to access this page');
    }
  }, [isAuthenticated, user, hasRole, navigate]);
  
  // Style Filters Functions
  const handleCreateStyle = () => {
    setCurrentStyleFilter({
      id: '',
      name: '',
      description: '',
      count: 0
    });
    setIsDialogOpen(true);
  };
  
  const handleEditStyle = (filter: StyleFilter) => {
    setCurrentStyleFilter({...filter});
    setIsDialogOpen(true);
  };
  
  const handleDeleteStyle = (id: string) => {
    if (confirm('Are you sure you want to delete this style filter?')) {
      setStyleFilters(styleFilters.filter(filter => filter.id !== id));
      toast.success('Style filter deleted successfully');
    }
  };
  
  const handleSaveStyle = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentStyleFilter) return;
    
    // Generate ID from name if it's a new filter
    const filterId = currentStyleFilter.id || currentStyleFilter.name.toLowerCase().replace(/\s+/g, '-');
    
    const updatedFilter = {
      ...currentStyleFilter,
      id: filterId
    };
    
    if (styleFilters.some(filter => filter.id === updatedFilter.id)) {
      // Update existing filter
      setStyleFilters(styleFilters.map(filter => 
        filter.id === updatedFilter.id ? updatedFilter : filter
      ));
      toast.success('Style filter updated successfully');
    } else {
      // Add new filter
      setStyleFilters([...styleFilters, updatedFilter]);
      toast.success('Style filter created successfully');
    }
    
    setIsDialogOpen(false);
    setCurrentStyleFilter(null);
  };
  
  // Type Filters Functions
  const handleCreateType = () => {
    setCurrentTypeFilter({
      id: '',
      name: '',
      subtypes: [],
      count: 0
    });
    setIsDialogOpen(true);
  };
  
  const handleEditType = (filter: TypeFilter) => {
    setCurrentTypeFilter({...filter});
    setIsDialogOpen(true);
  };
  
  const handleDeleteType = (id: string) => {
    if (confirm('Are you sure you want to delete this type filter?')) {
      setTypeFilters(typeFilters.filter(filter => filter.id !== id));
      toast.success('Type filter deleted successfully');
    }
  };
  
  const handleSaveType = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentTypeFilter) return;
    
    // Generate ID from name if it's a new filter
    const filterId = currentTypeFilter.id || currentTypeFilter.name.toLowerCase().replace(/\s+/g, '-');
    
    const updatedFilter = {
      ...currentTypeFilter,
      id: filterId
    };
    
    if (typeFilters.some(filter => filter.id === updatedFilter.id)) {
      // Update existing filter
      setTypeFilters(typeFilters.map(filter => 
        filter.id === updatedFilter.id ? updatedFilter : filter
      ));
      toast.success('Type filter updated successfully');
    } else {
      // Add new filter
      setTypeFilters([...typeFilters, updatedFilter]);
      toast.success('Type filter created successfully');
    }
    
    setIsDialogOpen(false);
    setCurrentTypeFilter(null);
  };
  
  const handleAddSubtype = () => {
    if (!currentTypeFilter || !newSubtype.trim()) return;
    
    if (!currentTypeFilter.subtypes.includes(newSubtype.trim())) {
      setCurrentTypeFilter({
        ...currentTypeFilter,
        subtypes: [...currentTypeFilter.subtypes, newSubtype.trim()]
      });
    }
    
    setNewSubtype('');
  };
  
  const handleRemoveSubtype = (subtype: string) => {
    if (!currentTypeFilter) return;
    
    setCurrentTypeFilter({
      ...currentTypeFilter,
      subtypes: currentTypeFilter.subtypes.filter(s => s !== subtype)
    });
  };
  
  const handleStyleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentStyleFilter) return;
    
    const { name, value } = e.target;
    setCurrentStyleFilter({
      ...currentStyleFilter,
      [name]: name === 'count' ? parseInt(value) || 0 : value
    });
  };
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentTypeFilter) return;
    
    const { name, value } = e.target;
    setCurrentTypeFilter({
      ...currentTypeFilter,
      [name]: name === 'count' ? parseInt(value) || 0 : value
    });
  };
  
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Filter Management" 
        description="Manage style and type filters for the gallery"
        backgroundImage="https://images.unsplash.com/photo-1524230572899-a752b3835840"
      />
      
      <div className="container mx-auto py-12 px-4">
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'style' ? 'border-b-2 border-terracotta text-terracotta' : 'text-warm-gray'}`}
            onClick={() => setActiveTab('style')}
          >
            Style Filters
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'type' ? 'border-b-2 border-terracotta text-terracotta' : 'text-warm-gray'}`}
            onClick={() => setActiveTab('type')}
          >
            Type Filters
          </button>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-serif">
            {activeTab === 'style' ? 'Decor Style Filters' : 'Decor Type Filters'}
          </h2>
          <Button 
            onClick={activeTab === 'style' ? handleCreateStyle : handleCreateType}
            className="bg-dark-wood hover:bg-dark-wood/90"
          >
            <Plus className="mr-2 h-4 w-4" /> 
            {activeTab === 'style' ? 'Add Style' : 'Add Type'}
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            {activeTab === 'style' ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Items</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {styleFilters.map(filter => (
                    <TableRow key={filter.id}>
                      <TableCell className="font-medium">{filter.name}</TableCell>
                      <TableCell>{filter.description}</TableCell>
                      <TableCell className="text-center">{filter.count}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditStyle(filter)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteStyle(filter.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {styleFilters.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-warm-gray">
                        No style filters found. Create one to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Subtypes</TableHead>
                    <TableHead className="text-center">Items</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {typeFilters.map(filter => (
                    <TableRow key={filter.id}>
                      <TableCell className="font-medium">{filter.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {filter.subtypes.map(subtype => (
                            <span 
                              key={subtype}
                              className="px-2 py-1 bg-soft-beige text-xs rounded-full"
                            >
                              {subtype}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{filter.count}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditType(filter)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteType(filter.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {typeFilters.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-warm-gray">
                        No type filters found. Create one to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Dialog for Style Filter */}
      {activeTab === 'style' && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentStyleFilter?.id ? 'Edit Style Filter' : 'Add Style Filter'}</DialogTitle>
              <DialogDescription>
                Create or modify style filters for decor items.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSaveStyle} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="styleName">
                  Style Name
                </label>
                <Input
                  id="styleName"
                  name="name"
                  value={currentStyleFilter?.name || ''}
                  onChange={handleStyleChange}
                  placeholder="e.g., Contemporary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="styleDescription">
                  Description
                </label>
                <Input
                  id="styleDescription"
                  name="description"
                  value={currentStyleFilter?.description || ''}
                  onChange={handleStyleChange}
                  placeholder="Describe this style..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="styleCount">
                  Item Count
                </label>
                <Input
                  id="styleCount"
                  name="count"
                  type="number"
                  value={currentStyleFilter?.count || ''}
                  onChange={handleStyleChange}
                  placeholder="0"
                />
                <p className="text-xs text-warm-gray mt-1">This is for display purposes only. Actual count is based on items in the database.</p>
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
                  Save Style
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Dialog for Type Filter */}
      {activeTab === 'type' && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentTypeFilter?.id ? 'Edit Type Filter' : 'Add Type Filter'}</DialogTitle>
              <DialogDescription>
                Create or modify type filters for decor items.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSaveType} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="typeName">
                  Type Name
                </label>
                <Input
                  id="typeName"
                  name="name"
                  value={currentTypeFilter?.name || ''}
                  onChange={handleTypeChange}
                  placeholder="e.g., Lighting"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subtypes
                </label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {currentTypeFilter?.subtypes.map(subtype => (
                    <span 
                      key={subtype}
                      className="px-2 py-1 bg-soft-beige text-xs rounded-full flex items-center"
                    >
                      {subtype}
                      <button
                        type="button"
                        className="ml-1 text-warm-gray hover:text-gray-900"
                        onClick={() => handleRemoveSubtype(subtype)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={newSubtype}
                    onChange={(e) => setNewSubtype(e.target.value)}
                    placeholder="Add a subtype..."
                    className="flex-grow"
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleAddSubtype}
                  >
                    Add
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="typeCount">
                  Item Count
                </label>
                <Input
                  id="typeCount"
                  name="count"
                  type="number"
                  value={currentTypeFilter?.count || ''}
                  onChange={handleTypeChange}
                  placeholder="0"
                />
                <p className="text-xs text-warm-gray mt-1">This is for display purposes only. Actual count is based on items in the database.</p>
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
                  Save Type
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminFilters;
