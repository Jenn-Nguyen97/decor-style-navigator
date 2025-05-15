
import React, { useState, useEffect } from 'react';
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
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';

// Mock blog posts data
const initialBlogPosts = [
  {
    id: '1',
    title: 'Vintage Decor Trends for 2025',
    excerpt: 'Discover the latest vintage decor trends that are making a comeback this year.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.',
    imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    publishDate: '2025-03-15',
    author: 'Admin User'
  },
  {
    id: '2',
    title: 'How to Mix Modern and Classic Elements',
    excerpt: 'Learn the art of blending contemporary pieces with classic designs for a timeless look.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.',
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    publishDate: '2025-04-02',
    author: 'Admin User'
  }
];

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  publishDate: string;
  author: string;
}

const AdminBlog = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, hasRole } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  
  // Check if user is authenticated and has admin role
  useEffect(() => {
    if (!isAuthenticated || !user || !hasRole(['admin'])) {
      navigate('/');
      toast.error('You do not have permission to access this page');
    }
  }, [isAuthenticated, user, hasRole, navigate]);
  
  const handleCreateNew = () => {
    setCurrentPost({
      id: Date.now().toString(),
      title: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      publishDate: new Date().toISOString().split('T')[0],
      author: user?.name || 'Admin'
    });
    setIsEditing(true);
  };
  
  const handleEdit = (post: BlogPost) => {
    setCurrentPost({...post});
    setIsEditing(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setBlogPosts(blogPosts.filter(post => post.id !== id));
      toast.success('Blog post deleted successfully');
    }
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPost) return;
    
    if (blogPosts.some(post => post.id === currentPost.id)) {
      // Update existing post
      setBlogPosts(blogPosts.map(post => 
        post.id === currentPost.id ? currentPost : post
      ));
      toast.success('Blog post updated successfully');
    } else {
      // Add new post
      setBlogPosts([...blogPosts, currentPost]);
      toast.success('Blog post created successfully');
    }
    
    setIsEditing(false);
    setCurrentPost(null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentPost) return;
    
    const { name, value } = e.target;
    setCurrentPost({
      ...currentPost,
      [name]: value
    });
  };
  
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Blog Management" 
        description="Create and manage blog posts for ClassicDecor"
        backgroundImage="https://images.unsplash.com/photo-1616046229478-9901c5536a45"
      />
      
      <div className="container mx-auto py-12 px-4">
        {!isEditing ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif">Blog Posts</h2>
              <Button 
                onClick={handleCreateNew}
                className="bg-dark-wood hover:bg-dark-wood/90"
              >
                <Plus className="mr-2 h-4 w-4" /> New Post
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {blogPosts.map(post => (
                <Card key={post.id} className="bg-white">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {post.imageUrl && (
                        <div className="md:w-1/3 h-48 md:h-auto">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}
                      <div className="p-6 md:w-2/3">
                        <h3 className="text-xl font-serif mb-2">{post.title}</h3>
                        <p className="text-sm text-warm-gray mb-2">
                          Published on {new Date(post.publishDate).toLocaleDateString()} by {post.author}
                        </p>
                        <p className="mb-4">{post.excerpt}</p>
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {blogPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-warm-gray mb-4">No blog posts yet.</p>
                  <Button onClick={handleCreateNew}>Create Your First Post</Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{currentPost?.id ? 'Edit Blog Post' : 'New Blog Post'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="title">
                    Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={currentPost?.title || ''}
                    onChange={handleChange}
                    placeholder="Enter post title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="excerpt">
                    Excerpt
                  </label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={currentPost?.excerpt || ''}
                    onChange={handleChange}
                    placeholder="Enter a brief summary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="content">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    name="content"
                    value={currentPost?.content || ''}
                    onChange={handleChange}
                    className="min-h-[200px]"
                    placeholder="Write your post content here"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="imageUrl">
                    Image URL
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={currentPost?.imageUrl || ''}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      className="flex-grow"
                    />
                    <Button type="button" variant="outline" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {currentPost?.imageUrl && (
                    <div className="mt-2 h-40 border rounded-md overflow-hidden">
                      <img 
                        src={currentPost.imageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  setCurrentPost(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-dark-wood hover:bg-dark-wood/90"
              >
                Save Post
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
