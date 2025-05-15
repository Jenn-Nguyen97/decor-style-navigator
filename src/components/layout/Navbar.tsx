
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Menu, 
  X, 
  Search, 
  LogOut, 
  Settings, 
  Heart, 
  FileText, 
  Home, 
  Image,
  Edit,
  Filter,
  BarChart2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, logout, hasRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-serif font-bold text-dark-wood">
            ClassicDecor
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`font-medium hover:text-terracotta transition-colors ${
              isActive('/') ? 'text-terracotta' : 'text-foreground'
            }`}
          >
            Home
          </Link>
          <Link
            to="/gallery"
            className={`font-medium hover:text-terracotta transition-colors ${
              isActive('/gallery') ? 'text-terracotta' : 'text-foreground'
            }`}
          >
            Gallery
          </Link>
          <Link
            to="/style-test"
            className={`font-medium hover:text-terracotta transition-colors ${
              isActive('/style-test') ? 'text-terracotta' : 'text-foreground'
            }`}
          >
            Style Test
          </Link>
          <Link
            to="/room-upload"
            className={`font-medium hover:text-terracotta transition-colors ${
              isActive('/room-upload') ? 'text-terracotta' : 'text-foreground'
            }`}
          >
            Upload Room
          </Link>
          {hasRole(['admin']) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`font-medium hover:text-terracotta transition-colors ${
                    location.pathname.includes('/admin') ? 'text-terracotta' : 'text-foreground'
                  }`}
                >
                  Admin
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Admin Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin-dashboard" className="flex items-center cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin-blog" className="flex items-center cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Blog Management</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin-gallery" className="flex items-center cursor-pointer">
                    <Image className="mr-2 h-4 w-4" />
                    <span>Gallery Management</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin-filters" className="flex items-center cursor-pointer">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Filter Management</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin-analytics" className="flex items-center cursor-pointer">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Legacy Admin Panel</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* User Menu & Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full" size="icon">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 vintage-card">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favorites" className="flex items-center cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favorites</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/room-upload" className="flex items-center cursor-pointer">
                    <Image className="mr-2 h-4 w-4" />
                    <span>Upload Room</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </Link>
                </DropdownMenuItem>
                {hasRole(['admin']) && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Admin</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link to="/admin-dashboard" className="flex items-center cursor-pointer">
                          <Home className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="flex items-center cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta/10" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button className="bg-terracotta hover:bg-terracotta/90 text-white" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-soft-beige"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-soft-beige"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/style-test"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-soft-beige"
              onClick={() => setMobileMenuOpen(false)}
            >
              Style Test
            </Link>
            <Link
              to="/room-upload"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-soft-beige"
              onClick={() => setMobileMenuOpen(false)}
            >
              Upload Room
            </Link>
            {hasRole(['admin']) && (
              <>
                <div className="px-3 py-2 text-sm font-semibold text-warm-gray">
                  Admin
                </div>
                <Link
                  to="/admin-dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium pl-6 hover:bg-soft-beige"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin-blog"
                  className="block px-3 py-2 rounded-md text-base font-medium pl-6 hover:bg-soft-beige"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog Management
                </Link>
                <Link
                  to="/admin-gallery"
                  className="block px-3 py-2 rounded-md text-base font-medium pl-6 hover:bg-soft-beige"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery Management
                </Link>
                <Link
                  to="/admin-filters"
                  className="block px-3 py-2 rounded-md text-base font-medium pl-6 hover:bg-soft-beige"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Filter Management
                </Link>
                <Link
                  to="/admin-analytics"
                  className="block px-3 py-2 rounded-md text-base font-medium pl-6 hover:bg-soft-beige"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Analytics
                </Link>
              </>
            )}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-soft-beige"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-soft-beige"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-soft-beige"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-soft-beige"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
