
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Plus,
  Search, 
  User, 
  Image as ImageIcon, 
  FileText, 
  Settings 
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data for admin dashboard
const mockUsers = [
  { id: 1, name: 'Jane Smith', email: 'jane@example.com', role: 'customer', status: 'active', signupDate: '2025-01-15' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'active', signupDate: '2025-02-20' },
  { id: 3, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'customer', status: 'inactive', signupDate: '2025-03-05' },
  { id: 4, name: 'Michael Brown', email: 'michael@example.com', role: 'admin', status: 'active', signupDate: '2024-12-10' }
];

const mockUploads = [
  { id: 1, userId: 2, imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45', status: 'approved', uploadDate: '2025-04-10' },
  { id: 2, userId: 1, imageUrl: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e', status: 'pending', uploadDate: '2025-05-01' },
  { id: 3, userId: 3, imageUrl: 'https://images.unsplash.com/photo-1617104678098-de229db51175', status: 'rejected', uploadDate: '2025-05-05' }
];

const mockDecorItems = [
  { id: 1, name: 'Vintage Brass Floor Lamp', category: 'Lighting', price: 299, status: 'active' },
  { id: 2, name: 'Mid-Century Armchair', category: 'Furniture', price: 599, status: 'active' },
  { id: 3, name: 'Industrial Wall Shelf', category: 'Storage', price: 189, status: 'inactive' },
  { id: 4, name: 'Bohemian Woven Wall Hanging', category: 'Wall Decor', price: 129, status: 'active' },
  { id: 5, name: 'Scandinavian Coffee Table', category: 'Furniture', price: 349, status: 'active' }
];

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, hasRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Check if user is authenticated and has admin role
  if (!isAuthenticated || !user || !hasRole(['admin'])) {
    // Redirect non-admins
    navigate('/');
    return null;
  }
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter data based on search term
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredUploads = mockUploads;
  const filteredItems = mockDecorItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle status change for uploads
  const handleUploadStatusChange = (uploadId: number, newStatus: string) => {
    toast.success(`Upload ${uploadId} status changed to ${newStatus}`);
  };
  
  // Handle item status toggle
  const handleItemStatusToggle = (itemId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast.success(`Item ${itemId} status changed to ${newStatus}`);
  };
  
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Admin Dashboard" 
        description="Manage users, content, and settings"
        backgroundImage="https://images.unsplash.com/photo-1616046229478-9901c5536a45"
      />
      
      <div className="container mx-auto py-12 px-4">
        {/* Admin navigation and search */}
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-serif mb-2">Welcome, Admin</h2>
            <p className="text-warm-gray">Manage your site content and users</p>
          </div>
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-gray h-4 w-4" />
            <Input
              placeholder="Search users, uploads, or items..."
              className="pl-10 vintage-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        {/* Admin tabs */}
        <Tabs defaultValue="decor" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-xl mx-auto">
            <TabsTrigger value="decor">
              <div className="flex flex-col items-center md:flex-row md:space-x-2">
                <ImageIcon className="h-4 w-4 mb-1 md:mb-0" />
                <span className="hidden md:inline">Decor Items</span>
                <span className="md:hidden">Decor</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="uploads">
              <div className="flex flex-col items-center md:flex-row md:space-x-2">
                <FileText className="h-4 w-4 mb-1 md:mb-0" />
                <span className="hidden md:inline">Room Uploads</span>
                <span className="md:hidden">Uploads</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="users">
              <div className="flex flex-col items-center md:flex-row md:space-x-2">
                <User className="h-4 w-4 mb-1 md:mb-0" />
                <span className="hidden md:inline">Users</span>
                <span className="md:hidden">Users</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="settings">
              <div className="flex flex-col items-center md:flex-row md:space-x-2">
                <Settings className="h-4 w-4 mb-1 md:mb-0" />
                <span className="hidden md:inline">Settings</span>
                <span className="md:hidden">Settings</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          {/* Decor Items Tab */}
          <TabsContent value="decor">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <CardTitle className="text-xl">Decor Items</CardTitle>
                <Button className="bg-dark-wood hover:bg-dark-wood/90">
                  <Plus className="mr-2 h-4 w-4" /> Add New Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-soft-beige">
                        <th className="text-left py-3 px-4 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Category</th>
                        <th className="text-left py-3 px-4 font-semibold">Price</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-right py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="border-b border-soft-beige">
                          <td className="py-3 px-4">{item.name}</td>
                          <td className="py-3 px-4">{item.category}</td>
                          <td className="py-3 px-4">${item.price}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              item.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-warm-gray/20 text-warm-gray'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleItemStatusToggle(item.id, item.status)}
                              >
                                {item.status === 'active' ? 'Deactivate' : 'Activate'}
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                              >
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Room Uploads Tab */}
          <TabsContent value="uploads">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Room Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUploads.map((upload) => {
                    const user = mockUsers.find(u => u.id === upload.userId);
                    return (
                      <div key={upload.id} className="border border-soft-beige rounded-lg overflow-hidden bg-white">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={upload.imageUrl} 
                            alt={`Upload ${upload.id}`}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-warm-gray">ID: {upload.id}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              upload.status === 'approved' ? 'bg-green-100 text-green-800' : 
                              upload.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {upload.status}
                            </span>
                          </div>
                          <p className="text-sm mb-2">
                            <span className="font-medium">User:</span> {user?.name || 'Unknown'}
                          </p>
                          <p className="text-sm mb-3">
                            <span className="font-medium">Date:</span> {new Date(upload.uploadDate).toLocaleDateString()}
                          </p>
                          <div className="flex space-x-2">
                            {upload.status !== 'approved' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleUploadStatusChange(upload.id, 'approved')}
                              >
                                Approve
                              </Button>
                            )}
                            {upload.status !== 'rejected' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleUploadStatusChange(upload.id, 'rejected')}
                              >
                                Reject
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-soft-beige">
                        <th className="text-left py-3 px-4 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Role</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Signup Date</th>
                        <th className="text-right py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-soft-beige">
                          <td className="py-3 px-4">{user.name}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.role === 'admin' ? 'bg-terracotta/20 text-terracotta' : 'bg-soft-beige text-warm-gray'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-warm-gray/20 text-warm-gray'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{new Date(user.signupDate).toLocaleDateString()}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Site Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-warm-gray mb-6">
                  Configure global settings for your ClassicDecor website.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">General Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Site Name</label>
                        <Input defaultValue="ClassicDecor" className="vintage-input" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Contact Email</label>
                        <Input defaultValue="contact@classicdecor.com" className="vintage-input" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Feature Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable Style Test</p>
                          <p className="text-sm text-warm-gray">Allow users to take the style personality test</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            Enabled
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable Room Upload</p>
                          <p className="text-sm text-warm-gray">Allow users to upload room images for AI analysis</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            Enabled
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button className="bg-dark-wood hover:bg-dark-wood/90">
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
