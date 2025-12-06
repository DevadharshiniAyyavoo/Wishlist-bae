import React, { useState } from 'react';
import { ArrowLeft, Star, TrendingDown, Truck, Shield, Share2, MoreHorizontal, ShoppingCart, Zap, Globe, Store } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onShoppingMethodClick?: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onShoppingMethodClick }) => {
  const [activeImage, setActiveImage] = useState(product.image);

  // Combine main image and additional images for the gallery strip
  const galleryImages = [product.image, ...(product.additionalImages || [])].slice(0, 4);

  return (
    <div className="animate-fade-in-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center text-textMuted hover:text-textMain mb-6 transition group"
      >
        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Wishlist
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full bg-surfaceHighlight rounded-2xl overflow-hidden border border-surfaceHighlight">
             <img 
              src={activeImage} 
              alt={product.title} 
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {product.isDeal && (
              <div className="absolute top-4 left-4 bg-success text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <TrendingDown size={12} />
                PRICE DROP
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
             {galleryImages.map((img, index) => (
               <div 
                 key={index} 
                 onClick={() => setActiveImage(img)}
                 className={`aspect-square rounded-lg bg-surfaceHighlight border ${activeImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'} overflow-hidden cursor-pointer hover:border-slate-500 transition-all`}
               >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover opacity-80 hover:opacity-100" />
               </div>
             ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2">{product.category}</span>
            <div className="flex gap-2">
              <button className="p-2 bg-surfaceHighlight rounded-full text-textMuted hover:text-textMain transition"><Share2 size={18}/></button>
              <button className="p-2 bg-surfaceHighlight rounded-full text-textMuted hover:text-textMain transition"><MoreHorizontal size={18}/></button>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-textMain mb-2">{product.title}</h1>
          
          {/* Shopping Method & Rating */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
             <div className="flex items-center gap-1 bg-surfaceHighlight px-2 py-1 rounded text-yellow-400 text-sm font-semibold">
              <Star size={14} className="fill-yellow-400" />
              {product.rating}
            </div>

            {product.shoppingMethod === 'online' ? (
              <button 
                onClick={() => onShoppingMethodClick && onShoppingMethodClick(product)}
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20 hover:bg-blue-400/20 transition cursor-pointer"
              >
                <Globe size={12} />
                Online Shopping
              </button>
            ) : (
              <button 
                onClick={() => onShoppingMethodClick && onShoppingMethodClick(product)}
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 hover:bg-emerald-400/20 transition cursor-pointer"
              >
                <Store size={12} />
                In-Store Shopping
              </button>
            )}

            <span className="text-textMuted hidden sm:inline">•</span>
            <span className="text-green-400 text-sm font-medium">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
          </div>

          <div className="bg-surfaceHighlight/30 p-4 rounded-xl border border-surfaceHighlight mb-6">
             <div className="flex items-end gap-3 mb-1">
               <span className="text-4xl font-bold text-textMain">${product.price}</span>
               {product.originalPrice && (
                 <div className="flex flex-col justify-end pb-1">
                   <span className="text-textMuted line-through text-sm">${product.originalPrice}</span>
                 </div>
               )}
             </div>
             {product.originalPrice && (
                <p className="text-success text-xs font-medium">You save ${product.originalPrice - product.price} ({(100 - (product.price/product.originalPrice * 100)).toFixed(0)}%)</p>
             )}
          </div>

          <div className="prose prose-invert mb-8">
            <h3 className="text-lg font-semibold text-textMain mb-2">About this product</h3>
            <p className="text-textMuted text-sm leading-relaxed">{product.description}</p>
            <p className="text-textMuted text-sm leading-relaxed mt-2">{product.specs}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto grid grid-cols-2 gap-4">
            <button className="col-span-1 bg-surfaceHighlight hover:bg-surfaceHighlight/80 text-textMain font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2 border border-surfaceHighlight">
               <ShoppingCart size={20} /> Add to Cart
            </button>
            {product.inStock ? (
               <button className="col-span-1 bg-primary hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2">
                 <Zap size={20} /> Buy Now
               </button>
            ) : (
              <button className="col-span-1 bg-slate-800 text-slate-500 font-semibold py-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
                 Out of Stock
               </button>
            )}
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-textMuted">
             <div className="flex items-center gap-2">
               <Truck size={16} /> Free Delivery by Oct 24
             </div>
             <div className="flex items-center gap-2">
               <Shield size={16} /> 2 Year Warranty
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};