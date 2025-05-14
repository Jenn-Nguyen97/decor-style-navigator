
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Image,
  Users,
  ShoppingBag,
  Upload,
  Plus,
  BarChart3,
  Settings
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not an admin
  useEffect(() => {
    if (!hasRole('admin')) {
      navigate('/');
    }
  }, [hasRole, navigate]);
  
  if (!hasRole('admin')) {
    return null;
  }
  
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Admin Dashboard"
        description="Manage content, users, and settings for ClassicDecor"
      />
      
      <div className="container mx-auto py-12 px-4">
        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-accent/10 rounded-full">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-warm-gray">Total Users</p>
                  <h3 className="text-2xl font-bold">289</h3>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-warm-gray">Blog Posts</p>
                  <h3 className="text-2xl font-bold">24</h3>
                  <p className="text-xs text-green-600">+3 this week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-secondary/10 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-warm-gray">Decor Items</p>
                  <h3 className="text-2xl font-bold">127</h3>
                  <p className="text-xs text-green-600">+5 this week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-dusty-blue/10 rounded-full">
                  <Upload className="h-6 w-6 text-dusty-blue" />
                </div>
                <div>
                  <p className="text-sm text-warm-gray">Room Uploads</p>
                  <h3 className="text-2xl font-bold">56</h3>
                  <p className="text-xs text-green-600">+18% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin Tabs */}
        <Tabs defaultValue="content" className="space-y-4">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Blog Posts</CardTitle>
                  <Button className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Creating the Perfect Vintage Living Room",
                    "The Art of Mixing Patterns in Bohemian Spaces",
                    "Minimalist Principles for a Calmer Home",
                    "Scandinavian Design for Small Spaces"
                  ].map((post, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-background rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-3 text-warm-gray" />
                        <span>{post}</span>
                      </div>
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Gallery Images</CardTitle>
                  <Button className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Images
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((img, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={`https://images.unsplash.com/photo-${1570000000000 + index}`} 
                        alt="Gallery item"
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-dark-wood/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                        <Button variant="ghost" size="icon" className="text-white">
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Decor Items</CardTitle>
                  <Button className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Vintage Brass Floor Lamp",
                    "Mid-Century Armchair",
                    "Industrial Wall Shelf",
                    "Bohemian Woven Wall Hanging",
                    "Scandinavian Coffee Table"
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-background rounded-md">
                      <div className="flex items-center">
                        <ShoppingBag className="h-4 w-4 mr-3 text-warm-gray" />
                        <span>{item}</span>
                      </div>
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <Button className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    {name: "Admin User", email: "admin@example.com", role: "Admin"},
                    {name: "Jane Smith", email: "jane@example.com", role: "Customer"},
                    {name: "John Davis", email: "john@example.com", role: "Customer"},
                    {name: "Emma Wilson", email: "emma@example.com", role: "Customer"}
                  ].map((user, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-background rounded-md">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-3 text-warm-gray" />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-warm-gray">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          user.role === "Admin" ? "bg-accent/20 text-accent" : "bg-secondary/20 text-secondary"
                        }`}>
                          {user.role}
                        </span>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Site Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[4/3] bg-soft-beige/30 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-24 w-24 text-warm-gray" />
                  <p className="ml-4 text-lg text-warm-gray">Analytics visualization would go here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Site Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-warm-gray mb-1">Site Name</label>
                      <input 
                        type="text" 
                        value="ClassicDecor" 
                        className="w-full p-2 border border-soft-beige rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-warm-gray mb-1">Contact Email</label>
                      <input 
                        type="email" 
                        value="contact@classicdecor.com" 
                        className="w-full p-2 border border-soft-beige rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-warm-gray mb-1">Site Description</label>
                    <textarea 
                      rows={3}
                      className="w-full p-2 border border-soft-beige rounded-md"
                      defaultValue="ClassicDecor helps users discover decor pieces that match their personality and living space through AI-powered visualization."
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="maintenance" className="mr-2" />
                    <label htmlFor="maintenance">Enable Maintenance Mode</label>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
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

export default AdminDashboard;
