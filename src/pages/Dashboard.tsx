
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Heart, 
  Image as ImageIcon, 
  Upload, 
  User, 
  Settings, 
  ChevronRight,
  FileText, 
  Clock, 
  Plus 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const userRoomUploads = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e',
    uploadDate: '2025-05-10',
    type: 'Living Room'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    uploadDate: '2025-04-28',
    type: 'Bedroom'
  }
];

const userFavorites = [
  {
    id: '1',
    name: 'Vintage Brass Floor Lamp',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    style: 'Vintage'
  },
  {
    id: '2',
    name: 'Mid-Century Armchair',
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    style: 'Mid-Century Modern'
  },
  {
    id: '3',
    name: 'Bohemian Woven Wall Hanging',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    style: 'Bohemian'
  }
];

const recentActivity = [
  {
    id: '1',
    type: 'upload',
    description: 'Uploaded a new room image',
    date: '2025-05-10'
  },
  {
    id: '2',
    type: 'test',
    description: 'Completed style personality test',
    date: '2025-05-08'
  },
  {
    id: '3',
    type: 'favorite',
    description: 'Added 2 items to favorites',
    date: '2025-05-05'
  }
];

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div className="min-h-screen">
      <PageHeader 
        title={`Welcome, ${user.name}`}
        description="Manage your account, uploads, and favorites"
      />
      
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-6">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-soft-beige flex items-center justify-center mr-4">
                    <User className="h-8 w-8 text-warm-gray" />
                  </div>
                )}
                <div>
                  <h3 className="font-serif font-semibold">{user.name}</h3>
                  <p className="text-sm text-warm-gray">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Link 
                  to="/account" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-soft-beige transition-colors"
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-warm-gray" />
                    <span>Profile Settings</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-warm-gray" />
                </Link>
                <Link 
                  to="/uploads" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-soft-beige transition-colors"
                >
                  <div className="flex items-center">
                    <Upload className="h-5 w-5 mr-3 text-warm-gray" />
                    <span>My Uploads</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-warm-gray" />
                </Link>
                <Link 
                  to="/favorites" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-soft-beige transition-colors"
                >
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-3 text-warm-gray" />
                    <span>My Favorites</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-warm-gray" />
                </Link>
                <Link 
                  to="/style-test" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-soft-beige transition-colors"
                >
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-warm-gray" />
                    <span>My Style</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-warm-gray" />
                </Link>
                <Link 
                  to="/account/settings" 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-soft-beige transition-colors"
                >
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 mr-3 text-warm-gray" />
                    <span>Account Settings</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-warm-gray" />
                </Link>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className={`p-2 rounded-full mr-3 ${
                        activity.type === 'upload' ? 'bg-accent/10' : 
                        activity.type === 'test' ? 'bg-secondary/10' : 
                        'bg-primary/10'
                      }`}>
                        {activity.type === 'upload' ? (
                          <Upload className="h-4 w-4 text-accent" />
                        ) : activity.type === 'test' ? (
                          <FileText className="h-4 w-4 text-secondary" />
                        ) : (
                          <Heart className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-warm-gray flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="uploads" className="space-y-6">
              <TabsList className="grid grid-cols-2 mb-2">
                <TabsTrigger value="uploads">My Uploads</TabsTrigger>
                <TabsTrigger value="favorites">My Favorites</TabsTrigger>
              </TabsList>
              
              <TabsContent value="uploads">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Room Uploads</h3>
                  <Button asChild>
                    <Link to="/ai-design" className="flex items-center">
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Room
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userRoomUploads.map((upload) => (
                    <div key={upload.id} className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={upload.imageUrl}
                          alt={`Room upload ${uploa  d.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{upload.type}</h4>
                          <p className="text-xs text-warm-gray">
                            {new Date(upload.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/uploads/${upload.id}`}>View Analysis</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {userRoomUploads.length === 0 && (
                    <div className="col-span-full bg-soft-beige/30 rounded-lg p-8 text-center">
                      <ImageIcon className="h-12 w-12 text-warm-gray mx-auto mb-4" />
                      <h4 className="text-lg font-medium mb-2">No Room Uploads Yet</h4>
                      <p className="text-warm-gray mb-4">
                        Upload a photo of your room to get personalized decor recommendations.
                      </p>
                      <Button asChild>
                        <Link to="/ai-design">Upload Room</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="favorites">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Favorite Decor Items</h3>
                  <Button variant="outline" asChild>
                    <Link to="/gallery" className="flex items-center">
                      Browse More Items
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {userFavorites.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                        >
                          <Heart className="h-4 w-4 fill-accent text-accent" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <p className="text-xs text-warm-gray mb-3">Style: {item.style}</p>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link to={`/decor/${item.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {userFavorites.length === 0 && (
                    <div className="col-span-full bg-soft-beige/30 rounded-lg p-8 text-center">
                      <Heart className="h-12 w-12 text-warm-gray mx-auto mb-4" />
                      <h4 className="text-lg font-medium mb-2">No Favorites Yet</h4>
                      <p className="text-warm-gray mb-4">
                        Browse the gallery and add items to your favorites.
                      </p>
                      <Button asChild>
                        <Link to="/gallery">Browse Gallery</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
