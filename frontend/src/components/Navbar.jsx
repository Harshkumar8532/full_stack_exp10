import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, MapPin, Moon, Sun } from 'lucide-react';
import { GlobalContext } from '../context/GlobalContext';

export default function Navbar() {
  const { cart, user, logout, darkMode, toggleDarkMode } = useContext(GlobalContext);

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <nav className="fixed top-0 w-full z-50 glass shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Location */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tighter text-gray-900 dark:text-white">Zomiggy</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors cursor-pointer border-b-2 border-transparent hover:border-primary pb-1">
              <MapPin size={18} className="text-primary" />
              <span className="font-semibold">Deliver to</span>
              <span className="truncate max-w-[150px]">New York, NY</span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
            <input 
              type="text" 
              placeholder="Search for restaurant, cuisine or a dish" 
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-dark-surface border-transparent focus:bg-white dark:focus:bg-dark-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 font-medium hover:text-primary transition-colors text-gray-700 dark:text-gray-200">
                  <User size={20} /> <span className="hidden sm:inline">{user.name}</span>
                </Link>
                <button onClick={logout} className="text-sm text-gray-500 hover:text-primary font-medium">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                 <Link to="/login" className="font-semibold text-gray-700 dark:text-gray-200 hover:text-primary transition-colors text-sm">Log in</Link>
                 <Link to="/register" className="bg-primary text-white font-medium px-5 py-2.5 rounded-lg hover:bg-red-600 transition-colors text-sm shadow-lg shadow-primary/30">Sign up</Link>
              </div>
            )}

            <Link to="/cart" className="relative flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
              <ShoppingCart size={24} />
              <span className="hidden sm:inline font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
