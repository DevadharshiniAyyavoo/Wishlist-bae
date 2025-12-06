import React from 'react';
import { ShoppingCart, Search, Menu, User, Zap, Sun, Moon } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  cartCount: number;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, cartCount, isDarkMode, onToggleTheme }) => {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-surfaceHighlight transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('wishlist')}>
            <div className="bg-primary/20 p-1.5 rounded-lg">
               <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">BAE</span>
            </div>
            <span className="text-xs font-medium text-blue-400 hidden sm:block tracking-wide">Shop at Ease!</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('wishlist')} className="text-sm font-medium text-textMuted hover:text-textMain transition">Shop</button>
            <button 
              onClick={() => onNavigate('deals')} 
              className={`text-sm font-medium flex items-center gap-1 transition ${currentView === 'deals' ? 'text-primary' : 'text-textMuted hover:text-textMain'}`}
            >
              <Zap size={14} /> Deals
            </button>
            <button 
              onClick={() => onNavigate('wishlist')} 
              className={`text-sm font-medium transition ${currentView === 'wishlist' || currentView === 'details' ? 'text-textMain border-b-2 border-primary py-5' : 'text-textMuted hover:text-textMain'}`}
            >
              Wishlist
            </button>
            <button className="text-sm font-medium text-textMuted hover:text-textMain transition">Orders</button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
             {/* Theme Toggle */}
            <button 
              onClick={onToggleTheme}
              className="p-2 text-textMuted hover:text-textMain hover:bg-surfaceHighlight rounded-full transition"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="p-2 text-textMuted hover:text-textMain hover:bg-surfaceHighlight rounded-full transition">
              <Search size={20} />
            </button>
            <button className="p-2 text-textMuted hover:text-textMain hover:bg-surfaceHighlight rounded-full transition relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
              )}
            </button>
            <button className="p-2 text-textMuted hover:text-textMain hover:bg-surfaceHighlight rounded-full transition">
              <User size={20} />
            </button>
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-textMuted hover:text-textMain transition">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};