
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-gray-700 hover:text-ledger-700 transition-colors px-3 py-2 text-sm font-medium"
    >
      {children}
    </a>
  );

  const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
    <a
      href={href}
      className="block px-4 py-3 text-gray-700 hover:bg-ledger-50 rounded-lg transition-colors"
      onClick={onClick}
    >
      {children}
    </a>
  );

  const DropdownLink = ({ text }: { text: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative group">
        <button 
          className="flex items-center text-gray-700 hover:text-ledger-700 transition-colors px-3 py-2 text-sm font-medium"
          onClick={() => setIsOpen(!isOpen)}
        >
          {text}
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        
        <div 
          className={cn(
            "absolute z-10 left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all",
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          <div className="py-1">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-ledger-50">Module 1</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-ledger-50">Module 2</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-ledger-50">Module 3</a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled 
          ? "py-2 bg-white/90 backdrop-blur-md shadow-sm" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-display text-ledger-800 text-xl font-bold">
                LedgER<span className="text-ledger-600">Pro</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="#features">Features</NavLink>
            <DropdownLink text="Modules" />
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-ledger-700 border-ledger-200 hover:bg-ledger-50">
                    <User className="mr-2 h-4 w-4" />
                    {user.email?.split('@')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/dashboard" className="flex items-center w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/settings" className="flex items-center w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="text-ledger-700 border-ledger-200 hover:bg-ledger-50">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-ledger-700 hover:bg-ledger-800 text-white">
                    Try for free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-ledger-700 hover:bg-ledger-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ledger-500"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="#features" onClick={() => setIsMenuOpen(false)}>Features</MobileNavLink>
            <MobileNavLink href="#modules" onClick={() => setIsMenuOpen(false)}>Modules</MobileNavLink>
            <MobileNavLink href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <>
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-ledger-100 flex items-center justify-center text-ledger-700">
                      <span className="text-sm font-medium">{user.email?.[0].toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.email?.split('@')[0]}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link to="/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-ledger-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/profile" className="block px-4 py-3 text-gray-700 hover:bg-ledger-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-3 text-gray-700 hover:bg-ledger-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Settings
                  </Link>
                  <button onClick={handleSignOut} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-ledger-50 rounded-lg transition-colors">
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 px-2 space-y-1">
                <Link to="/login" className="block px-4 py-3 text-gray-700 hover:bg-ledger-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Log in
                </Link>
                <Link to="/signup" className="block px-4 py-3 text-gray-700 hover:bg-ledger-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
