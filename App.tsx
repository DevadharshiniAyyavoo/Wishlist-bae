import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { MOCK_PRODUCTS } from './constants';
import { Product, ViewState, FilterType } from './types';
import { Filter, ArrowDownUp, Search, TrendingDown, Globe, Store, X, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('wishlist');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default to dark
  });

  // Effect to apply theme class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Store Modal State
  const [activeStoreProduct, setActiveStoreProduct] = useState<Product | null>(null);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = products;

    // View based filtering (if we are in 'deals' view from navbar)
    if (currentView === 'deals') {
       result = result.filter(p => p.isDeal);
    }

    // Tab based filtering
    if (activeFilter === 'price_drop') {
      result = result.filter(p => p.isDeal);
    } else if (activeFilter === 'in_stock') {
      result = result.filter(p => p.inStock);
    } else if (activeFilter === 'online') {
      result = result.filter(p => p.shoppingMethod === 'online');
    } else if (activeFilter === 'instore') {
      result = result.filter(p => p.shoppingMethod === 'instore');
    }

    // Search
    if (searchQuery) {
      result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return result;
  }, [products, activeFilter, searchQuery, currentView]);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view === 'wishlist' || view === 'deals') {
      setSelectedProduct(null);
      // Reset filter if navigating to wishlist to show all, or keep logic flexible
      if (view === 'wishlist') setActiveFilter('all');
    }
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('details');
    // Scroll to top
    window.scrollTo(0,0);
  };

  const handleDeleteProduct = (id: string) => {
    if(window.confirm('Are you sure you want to remove this item?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      if (selectedProduct && selectedProduct.id === id) {
        handleNavigate('wishlist');
      }
    }
  };

  // Handle click on "Online" or "In-Store" badge
  const handleShoppingMethodClick = (product: Product) => {
    if (product.shoppingMethod === 'online' && product.onlineUrl) {
      // Open link in new tab
      window.open(product.onlineUrl, '_blank');
    } else if (product.shoppingMethod === 'instore') {
      // Open modal
      setActiveStoreProduct(product);
    }
  };

  return (
    <div className="min-h-screen bg-background text-textMain font-sans selection:bg-primary/30 transition-colors duration-300">
      
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        cartCount={2}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <main className="pb-12">
        {currentView === 'details' && selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => handleNavigate('wishlist')} 
            onShoppingMethodClick={handleShoppingMethodClick}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-textMain mb-2">
                {currentView === 'deals' ? 'Top Deals & Offers' : 'Wishlist Items'}
              </h1>
              <p className="text-textMuted text-sm max-w-2xl">
                Manage the gadgets you are eyeing. Price drops and stock alerts will appear here.
              </p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-surface p-2 rounded-xl border border-surfaceHighlight transition-colors duration-300">
              
              {/* Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                <button 
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${activeFilter === 'all' ? 'bg-surfaceHighlight text-textMain shadow-sm' : 'text-textMuted hover:text-textMain'}`}
                >
                  All Items <span className="ml-1 text-xs opacity-60 bg-black/30 text-white px-1.5 py-0.5 rounded-full">{currentView === 'deals' ? products.filter(p => p.isDeal).length : products.length}</span>
                </button>
                
                {currentView === 'deals' ? (
                  <>
                    <button 
                      onClick={() => setActiveFilter('online')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition flex items-center gap-2 ${activeFilter === 'online' ? 'bg-blue-900/20 text-blue-400 border border-blue-900/50' : 'text-textMuted hover:text-textMain'}`}
                    >
                      <Globe size={14} /> Online
                    </button>
                    <button 
                      onClick={() => setActiveFilter('instore')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition flex items-center gap-2 ${activeFilter === 'instore' ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-900/50' : 'text-textMuted hover:text-textMain'}`}
                    >
                      <Store size={14} /> In-Store
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setActiveFilter('price_drop')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition flex items-center gap-2 ${activeFilter === 'price_drop' ? 'bg-green-900/20 text-green-400 border border-green-900/50' : 'text-textMuted hover:text-textMain'}`}
                    >
                      <TrendingDown size={14} /> Price Drop
                    </button>
                    <button 
                      onClick={() => setActiveFilter('in_stock')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${activeFilter === 'in_stock' ? 'bg-surfaceHighlight text-textMain' : 'text-textMuted hover:text-textMain'}`}
                    >
                      In Stock
                    </button>
                  </>
                )}
              </div>

              {/* Search & Sort */}
              <div className="flex items-center gap-3">
                 <div className="relative flex-grow md:flex-grow-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={16} />
                    <input 
                      type="text" 
                      placeholder="Find gadgets..." 
                      className="w-full md:w-64 bg-background border border-surfaceHighlight rounded-lg py-2 pl-9 pr-4 text-sm text-textMain focus:outline-none focus:border-primary transition-colors duration-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
                 <button className="p-2 text-textMuted hover:text-textMain bg-surfaceHighlight rounded-lg border border-surfaceHighlight hidden sm:block transition">
                   <ArrowDownUp size={18} />
                 </button>
                 <button className="p-2 text-textMuted hover:text-textMain bg-surfaceHighlight rounded-lg border border-surfaceHighlight hidden sm:block transition">
                   <Filter size={18} />
                 </button>
              </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-surface/50 rounded-2xl border border-surfaceHighlight border-dashed">
                <Search size={48} className="mx-auto text-textMuted mb-4" />
                <h3 className="text-xl font-semibold text-textMain mb-2">No items found</h3>
                <p className="text-textMuted">Try adjusting your filters or search query.</p>
              </div>
            )}

            {/* Product Grid - Reduced screen space usage via gap-4 and tight padding */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewDetails={handleViewDetails}
                  onDelete={handleDeleteProduct}
                  onShoppingMethodClick={handleShoppingMethodClick}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Store Location Modal */}
      {activeStoreProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface border border-surfaceHighlight rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center p-4 border-b border-surfaceHighlight bg-surfaceHighlight/30">
              <h3 className="text-lg font-bold text-textMain flex items-center gap-2">
                <Store className="text-emerald-400" size={20} />
                Showroom Locations
              </h3>
              <button 
                onClick={() => setActiveStoreProduct(null)}
                className="text-textMuted hover:text-textMain p-1 rounded-full hover:bg-surfaceHighlight/50 transition"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <img src={activeStoreProduct.image} alt={activeStoreProduct.title} className="w-16 h-16 rounded-lg object-cover bg-surfaceHighlight" />
                <div>
                  <h4 className="font-semibold text-textMain">{activeStoreProduct.title}</h4>
                  <p className="text-xs text-textMuted">Available at the following locations:</p>
                </div>
              </div>

              <div className="space-y-3">
                {activeStoreProduct.storeLocations && activeStoreProduct.storeLocations.length > 0 ? (
                  activeStoreProduct.storeLocations.map((location, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-surfaceHighlight/50 border border-surfaceHighlight hover:border-emerald-500/30 transition group cursor-default">
                      <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition">
                        <MapPin size={18} />
                      </div>
                      <span className="text-sm text-textMuted">{location}</span>
                    </div>
                  ))
                ) : (
                   <div className="text-center py-8 text-textMuted">
                     <p>No specific location data available for this demo item.</p>
                   </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-surfaceHighlight text-center">
                <p className="text-xs text-textMuted">
                  Please visit our stores for a hands-on experience. <br/>Stock availability may vary.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;