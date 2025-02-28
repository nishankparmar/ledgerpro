
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-ledger-600 text-white p-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M3 3v18h18" />
              <path d="M7 16h8" />
              <path d="M7 12h12" />
              <path d="M7 8h12" />
            </svg>
          </div>
          <span className="font-bold text-xl text-ledger-800">LedgER Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-ledger-700 hover:text-ledger-900 font-medium">Home</Link>
          <Link to="/#features" className="text-ledger-700 hover:text-ledger-900 font-medium">Features</Link>
          {user && (
            <Link to="/dashboard" className="text-ledger-700 hover:text-ledger-900 font-medium">Dashboard</Link>
          )}
          <Link to="/#testimonials" className="text-ledger-700 hover:text-ledger-900 font-medium">Testimonials</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-ledger-700 font-medium">{user.email}</span>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-ledger-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-3 space-y-3 bg-white border-t">
          <Link to="/" className="block py-2 text-ledger-700 hover:text-ledger-900 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/#features" className="block py-2 text-ledger-700 hover:text-ledger-900 font-medium" onClick={() => setIsMenuOpen(false)}>Features</Link>
          {user && (
            <Link to="/dashboard" className="block py-2 text-ledger-700 hover:text-ledger-900 font-medium" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          )}
          <Link to="/#testimonials" className="block py-2 text-ledger-700 hover:text-ledger-900 font-medium" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
          
          {user ? (
            <div className="space-y-3 pt-2 border-t">
              <div className="text-sm text-ledger-600">{user.email}</div>
              <Button onClick={handleLogout} variant="outline" className="w-full">Logout</Button>
            </div>
          ) : (
            <div className="space-y-3 pt-2 border-t">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
