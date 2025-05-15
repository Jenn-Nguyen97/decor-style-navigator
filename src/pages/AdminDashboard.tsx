
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Edit,
  Filter,
  BarChart2,
  Image as ImageIcon,
  User,
  Users,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, hasRole } = useAuth();
  
  // Check if user is authenticated and has admin role
  React.useEffect(() => {
    if (!isAuthenticated || !user || !hasRole(['admin'])) {
      navigate('/');
      toast.error('You do not have permission to access this page');
    }
  }, [isAuthenticated, user, hasRole, navigate]);
  
  // Mock data for admin dashboard
  const quickStats = [
    {
      title: 'Total Users',
      value: '842',
      change: '+8%',
      positive: true
    },
    {
      title: 'Room Uploads',
      value: '392',
      change: '+12%',
      positive: true
    },
    {
      title: 'Blog Posts',
      value: '27',
      change: '0%',
      positive: false
    },
    {
      title: 'Decor Items',
      value: '183',
      change: '+3%',
      positive: true
    }
  ];
  
  const recentActivities = [
    {
      type: 'upload',
      user: 'Sarah Johnson',
      action: 'uploaded a new room image',
      time: '2 hours ago'
    },
    {
      type: 'user',
      user: 'Michael Brown',
      action: 'completed style test',
      time: '4 hours ago'
    },
    {
      type: 'blog',
      user: 'Admin',
      action: 'published a new blog post',
      time: '1 day ago'
    },
    {
      type: 'gallery',
      user: 'Admin',
      action: 'added 5 new decor items',
      time: '2 days ago'
    },
  ];
  
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Admin Dashboard" 
        description="Manage your ClassicDecor website"
        backgroundImage="https://images.unsplash.com/photo-1487958449943-2429e8be8625"
      />
      
      <div className="container mx-auto py-12 px-4">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-serif">Welcome back, {user?.name}</h2>
            <p className="text-warm-gray">Here's what's happening with your site today.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              asChild
              className="bg-dark-wood hover:bg-dark-wood/90"
            >
              <Link to="/admin-blog">
                <Plus className="mr-2 h-4 w-4" /> New Blog Post
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat) => (
            <Card key={stat.title} className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className={`text-sm ${stat.positive ? 'text-green-600' : 'text-warm-gray'}`}>
                  {stat.change} this month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Admin Features */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-serif mb-4">Admin Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Edit className="h-5 w-5 mr-2 text-terracotta" />
                    Blog Management
                  </CardTitle>
                  <CardDescription>Create and manage blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-gray">
                    Write, edit, and publish blog posts about home decor trends, tips, and inspiration.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin-blog">Manage Blog</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2 text-terracotta" />
                    Gallery Management
                  </CardTitle>
                  <CardDescription>Manage decor items</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-gray">
                    Add, edit, or remove decor items from the gallery. Update prices, descriptions, and images.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin-gallery">Manage Gallery</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-terracotta" />
                    Filter Management
                  </CardTitle>
                  <CardDescription>Manage styles and types</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-gray">
                    Create and organize decor styles, categories, and product types for the gallery.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin-filters">Manage Filters</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-terracotta" />
                    Analytics
                  </CardTitle>
                  <CardDescription>View site statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-gray">
                    Monitor user behavior, traffic patterns, and most popular content on your site.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin-analytics">View Analytics</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-serif mb-4">Recent Activity</h3>
            <Card>
              <CardHeader>
                <CardTitle>User & Admin Activity</CardTitle>
                <CardDescription>Recent site interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`p-2 rounded-full mr-3 ${
                        activity.type === 'upload' ? 'bg-accent/10' : 
                        activity.type === 'user' ? 'bg-terracotta/10' :
                        activity.type === 'blog' ? 'bg-secondary/10' :
                        'bg-primary/10'
                      }`}>
                        {activity.type === 'upload' ? (
                          <ImageIcon className="h-4 w-4 text-accent" />
                        ) : activity.type === 'user' ? (
                          <User className="h-4 w-4 text-terracotta" />
                        ) : activity.type === 'blog' ? (
                          <Edit className="h-4 w-4 text-secondary" />
                        ) : (
                          <Filter className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.action}
                        </p>
                        <p className="text-xs text-warm-gray">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild variant="ghost">
                  <Link to="/admin-analytics">View All Activity</Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Quick Actions */}
            <h3 className="text-xl font-serif mb-4 mt-6">Quick Actions</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/admin-blog">
                      <Plus className="mr-2 h-4 w-4" />
                      New Blog Post
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/admin-gallery">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Decor Item
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/admin-filters">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Style
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/admin">
                      <Users className="mr-2 h-4 w-4" />
                      View All Users
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
