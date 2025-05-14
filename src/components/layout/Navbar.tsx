
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
  Home 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
            className={`font-medium hover:text-accent transition-colors ${
              isActive('/') ? 'text-accent' : 'text-foreground'
            }`}
          >
            Home
          </Link>
          <Link
            to="/blog"
            className={`font-medium hover:text-accent transition-colors ${
              isActive('/blog') ? 'text-accent' : 'text-foreground'
            }`}
          >
            Blog
          </Link>
          <Link
            to="/gallery"
            className={`font-medium hover:text-accent transition-colors ${
              isActive('/gallery') ? 'text-accent' : 'text-foreground'
            }`}
          >
            Gallery
          </Link>
          <Link
            to="/style-test"
            className={`font-medium hover:text-accent transition-colors ${
              isActive('/style-test') ? 'text-accent' : 'text-foreground'
            }`}
          >
            Style Test
          </Link>
          {hasRole(['admin']) && (
            <Link
              to="/admin"
              className={`font-medium hover:text-accent transition-colors ${
                isActive('/admin') ? 'text-accent' : 'text-foreground'
              }`}
            >
              Admin
            </Link>
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
              <DropdownMenuContent align="end" className="w-56">
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
                  <Link to="/uploads" className="flex items-center cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>My Uploads</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="flex items-center cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
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
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/gallery"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/style-test"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Style Test
            </Link>
            {hasRole(['admin']) && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-accent hover:text-white"
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
