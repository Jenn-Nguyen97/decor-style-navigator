
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { toast } from 'sonner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

// Mock analytics data
const visitorsData = [
  { name: 'Jan', visitors: 420 },
  { name: 'Feb', visitors: 480 },
  { name: 'Mar', visitors: 510 },
  { name: 'Apr', visitors: 550 },
  { name: 'May', visitors: 620 },
  { name: 'Jun', visitors: 590 },
  { name: 'Jul', visitors: 630 }
];

const pageViewsData = [
  { name: 'Home', views: 1240 },
  { name: 'Gallery', views: 980 },
  { name: 'Style Test', views: 750 },
  { name: 'Room Upload', views: 540 },
  { name: 'Blog', views: 320 }
];

const styleDistributionData = [
  { name: 'Vintage', value: 35 },
  { name: 'Mid-Century', value: 25 },
  { name: 'Modern', value: 18 },
  { name: 'Bohemian', value: 15 },
  { name: 'Scandinavian', value: 7 }
];

const deviceData = [
  { name: 'Mobile', value: 58 },
  { name: 'Desktop', value: 34 },
  { name: 'Tablet', value: 8 }
];

const userStats = {
  totalUsers: 842,
  newUsersThisMonth: 64,
  activeUsers: 312,
  averageSessionTime: '3m 42s'
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00C49F', '#FFBB28', '#FF8042'];

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, hasRole } = useAuth();
  
  // Check if user is authenticated and has admin role
  React.useEffect(() => {
    if (!isAuthenticated || !user || !hasRole(['admin'])) {
      navigate('/');
      toast.error('You do not have permission to access this page');
    }
  }, [isAuthenticated, user, hasRole, navigate]);
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };
  
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Analytics Dashboard" 
        description="User statistics and site analytics"
        backgroundImage="https://images.unsplash.com/photo-1500673922987-e212871fec22"
      />
      
      <div className="container mx-auto py-12 px-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatNumber(userStats.totalUsers)}</div>
              <p className="text-sm text-warm-gray">+{userStats.newUsersThisMonth} this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatNumber(userStats.activeUsers)}</div>
              <p className="text-sm text-warm-gray">{Math.round((userStats.activeUsers / userStats.totalUsers) * 100)}% of total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avg. Session Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userStats.averageSessionTime}</div>
              <p className="text-sm text-warm-gray">Per user</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Room Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">392</div>
              <p className="text-sm text-warm-gray">+21 this week</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="traffic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
            <TabsTrigger value="engagement">User Engagement</TabsTrigger>
            <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          </TabsList>
          
          {/* Traffic Analysis Tab */}
          <TabsContent value="traffic">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Visitors Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Visitors Over Time</CardTitle>
                  <CardDescription>Monthly unique visitors</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={visitorsData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="visitors" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* Page Views Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Page Views Distribution</CardTitle>
                  <CardDescription>Views per page</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={pageViewsData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="views" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* Device Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Device Distribution</CardTitle>
                  <CardDescription>User devices</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where visitors come from</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { source: 'Direct', percentage: 40, color: '#0088fe' },
                      { source: 'Search Engines', percentage: 35, color: '#00C49F' },
                      { source: 'Social Media', percentage: 15, color: '#FFBB28' },
                      { source: 'Referrals', percentage: 10, color: '#FF8042' }
                    ].map((item) => (
                      <div key={item.source}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{item.source}</span>
                          <span className="text-sm text-warm-gray">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-soft-beige rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{
                              width: `${item.percentage}%`,
                              backgroundColor: item.color
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* User Engagement Tab */}
          <TabsContent value="engagement">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Style Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Style Preferences</CardTitle>
                  <CardDescription>Based on style test results</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={styleDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {styleDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* Most Viewed Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Most Viewed Items</CardTitle>
                  <CardDescription>Top 5 decor items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Vintage Brass Floor Lamp', views: 342, percentage: 90 },
                      { name: 'Mid-Century Armchair', views: 298, percentage: 78 },
                      { name: 'Bohemian Wall Hanging', views: 245, percentage: 64 },
                      { name: 'Industrial Coffee Table', views: 210, percentage: 55 },
                      { name: 'Scandinavian Pendant Light', views: 187, percentage: 49 }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm text-warm-gray">{item.views} views</span>
                        </div>
                        <div className="w-full bg-soft-beige rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full bg-terracotta" 
                            style={{
                              width: `${item.percentage}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* User Activity */}
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>User Activity Heatmap</CardTitle>
                  <CardDescription>Activity by day and hour</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-8 gap-1">
                    {/* Days column */}
                    <div className="pt-8">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="h-8 flex items-center justify-end pr-2 text-xs text-warm-gray">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Hours and heatmap cells */}
                    <div className="col-span-7">
                      <div className="grid grid-cols-24 mb-1">
                        {Array.from({ length: 24 }, (_, i) => (
                          <div key={i} className="text-xs text-warm-gray text-center">
                            {i}
                          </div>
                        ))}
                      </div>
                      
                      {Array.from({ length: 7 }, (_, day) => (
                        <div key={day} className="grid grid-cols-24 gap-1 mb-1">
                          {Array.from({ length: 24 }, (_, hour) => {
                            // Mock intensity calculation
                            const intensity = Math.floor(Math.random() * 100);
                            let bgColor = 'bg-soft-beige/30';
                            
                            if (intensity > 80) {
                              bgColor = 'bg-terracotta';
                            } else if (intensity > 60) {
                              bgColor = 'bg-terracotta/70';
                            } else if (intensity > 40) {
                              bgColor = 'bg-terracotta/50';
                            } else if (intensity > 20) {
                              bgColor = 'bg-terracotta/30';
                            }
                            
                            return (
                              <div
                                key={hour}
                                className={`h-8 rounded ${bgColor} hover:opacity-80 cursor-pointer transition-opacity`}
                                title={`${intensity} users`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* User Behavior Tab */}
          <TabsContent value="behavior">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Conversion Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle>User Conversion Funnel</CardTitle>
                  <CardDescription>Path to room upload</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: 'Site Visit', value: 1000, fill: '#8884d8' },
                        { name: 'Style Test', value: 680, fill: '#83a6ed' },
                        { name: 'Gallery Browse', value: 423, fill: '#8dd1e1' },
                        { name: 'Room Upload', value: 246, fill: '#82ca9d' },
                        { name: 'Purchase', value: 113, fill: '#ffc658' }
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 100,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="value" label={{ position: 'right' }}>
                        {[
                          { name: 'Site Visit', fill: '#8884d8' },
                          { name: 'Style Test', fill: '#83a6ed' },
                          { name: 'Gallery Browse', fill: '#8dd1e1' },
                          { name: 'Room Upload', fill: '#82ca9d' },
                          { name: 'Purchase', fill: '#ffc658' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* User Retention */}
              <Card>
                <CardHeader>
                  <CardTitle>User Retention</CardTitle>
                  <CardDescription>Return rate over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { week: 'Week 1', retention: 100 },
                        { week: 'Week 2', retention: 68 },
                        { week: 'Week 3', retention: 52 },
                        { week: 'Week 4', retention: 48 },
                        { week: 'Week 5', retention: 42 },
                        { week: 'Week 6', retention: 38 },
                        { week: 'Week 7', retention: 35 },
                        { week: 'Week 8', retention: 32 }
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="retention" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* User Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle>User Demographics</CardTitle>
                  <CardDescription>User age distribution</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { age: '18-24', users: 120 },
                        { age: '25-34', users: 285 },
                        { age: '35-44', users: 174 },
                        { age: '45-54', users: 167 },
                        { age: '55+', users: 96 }
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* User Locations */}
              <Card>
                <CardHeader>
                  <CardTitle>User Locations</CardTitle>
                  <CardDescription>Top regions by user count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { region: 'North America', users: 312, percentage: 37 },
                      { region: 'Europe', users: 267, percentage: 32 },
                      { region: 'Asia', users: 154, percentage: 18 },
                      { region: 'Oceania', users: 63, percentage: 7.5 },
                      { region: 'South America', users: 34, percentage: 4 },
                      { region: 'Africa', users: 12, percentage: 1.5 }
                    ].map((item) => (
                      <div key={item.region}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{item.region}</span>
                          <span className="text-sm text-warm-gray">{item.users} users</span>
                        </div>
                        <div className="w-full bg-soft-beige rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full bg-dark-wood" 
                            style={{
                              width: `${item.percentage}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center text-warm-gray">
          <p className="text-sm">Data shown is for demonstration purposes only.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
