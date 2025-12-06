import React, { useState, useRef, useEffect } from 'react';
import { Star, MoreHorizontal, ShoppingBag, Bell, Eye, Share2, TrendingDown, Store, Globe, X } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onDelete: (id: string) => void;
  onShoppingMethodClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onDelete, onShoppingMethodClick }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    console.log(`${action} for ${product.title}`);
    if (action === 'details') onViewDetails(product);
    if (action === 'remove') onDelete(product.id);
    setShowMenu(false);
  };

  return (
    <div 
      className="group relative bg-surface border border-surfaceHighlight rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col h-full"
      onClick={() => onViewDetails(product)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-surfaceHighlight/50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Quick Delete Button - Top Right Corner */}
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
          className="absolute top-2 right-2 bg-black/60 hover:bg-red-500 text-white p-1.5 rounded-full backdrop-blur-sm transition-all duration-200 z-10 opacity-0 group-hover:opacity-100"
          title="Remove Item"
        >
          <X size={14} />
        </button>

        {/* Badges - Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isDeal && (
            <div className="bg-success/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
              <TrendingDown size={10} />
              PRICE DROP
            </div>
          )}
          {!product.inStock && (
            <div className="bg-danger/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
              OUT OF STOCK
            </div>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <Star size={10} className="fill-yellow-400 text-yellow-400" />
          {product.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Shopping Method Indicator - Clearly Visible */}
        <div className="flex items-center gap-2 mb-2">
          {product.shoppingMethod === 'online' ? (
            <button 
              onClick={(e) => { e.stopPropagation(); onShoppingMethodClick(product); }}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full border border-blue-400/20 hover:bg-blue-400/20 transition cursor-pointer"
            >
              <Globe size={10} />
              <span>Online Shopping</span>
            </button>
          ) : (
            <button 
              onClick={(e) => { e.stopPropagation(); onShoppingMethodClick(product); }}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20 hover:bg-emerald-400/20 transition cursor-pointer"
            >
              <Store size={10} />
              <span>In-Store Shopping</span>
            </button>
          )}
        </div>

        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-bold tracking-wider text-textMuted uppercase">{product.category}</span>
          
          {/* Three Dots Menu Button */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={handleMenuClick}
              className="text-textMuted hover:text-textMain p-1 rounded-full hover:bg-surfaceHighlight transition"
            >
              <MoreHorizontal size={18} />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-surfaceHighlight border border-surfaceHighlight rounded-lg shadow-xl z-20 overflow-hidden">
                <button 
                  onClick={(e) => handleActionClick(e, 'details')}
                  className="w-full text-left px-3 py-2 text-xs text-textMuted hover:bg-surface hover:text-textMain flex items-center gap-2"
                >
                  <Eye size={12} /> View Details
                </button>
                <button 
                  onClick={(e) => handleActionClick(e, 'share')}
                  className="w-full text-left px-3 py-2 text-xs text-textMuted hover:bg-surface hover:text-textMain flex items-center gap-2"
                >
                  <Share2 size={12} /> Share Product
                </button>
                <button 
                  onClick={(e) => handleActionClick(e, 'remove')}
                  className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-surface hover:text-red-300 flex items-center gap-2"
                >
                  Remove Item
                </button>
              </div>
            )}
          </div>
        </div>

        <h3 className="text-sm font-semibold text-textMain mb-1 line-clamp-1">{product.title}</h3>
        <p className="text-xs text-textMuted mb-3 line-clamp-1">{product.specs}</p>

        {/* Price & Action */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-textMuted line-through">${product.originalPrice}</span>
            )}
            <span className="text-lg font-bold text-textMain">${product.price}</span>
          </div>

          {product.inStock ? (
            <button 
              onClick={(e) => { e.stopPropagation(); console.log('Buy Now'); }}
              className="bg-primary hover:bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <ShoppingBag size={14} />
              Buy Now
            </button>
          ) : (
            <button 
              onClick={(e) => { e.stopPropagation(); console.log('Notify Me'); }}
              className="bg-surfaceHighlight hover:bg-slate-700/50 text-primary border border-primary/30 text-xs font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <Bell size={14} />
              Notify Me
            </button>
          )}
        </div>
      </div>
    </div>
  );
};