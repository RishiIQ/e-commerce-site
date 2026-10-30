import React, { useState, useEffect } from 'react';
import { Search, Star, ShoppingBag, Filter, SlidersHorizontal, Heart } from 'lucide-react';
import { getDeduplicatedProducts } from '../data/products';

export default function ShopView({ products, initialCategory = 'All', onSelectProduct, addToCart, wishlist, toggleWishlist }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(300);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const categories = ['All', 'Fashion', 'Footwear', 'Wearables', 'Electronics', 'Gear'];
  const deduplicatedCatalog = getDeduplicatedProducts(products);

  const filtered = deduplicatedCatalog.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    const matchesPrice = p.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 4.5) - (a.rating || 4.5);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-12 animate-fade-in">
      <div className="relative rounded-3xl overflow-hidden h-[45vh] lg:h-[55vh] flex items-center justify-center text-center shadow-2xl bg-neutral-900 reveal-down-scroll active">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=85" 
            alt="Collection Hero" 
            className="w-full h-full object-cover opacity-60 scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-3xl px-6 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-neutral-200 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            Winter 2026 Release
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl tracking-[0.15em] text-white font-normal drop-shadow-md">
            The Collection
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
            Meticulously tailored garments and high-performance hardware designed for durability, weather protection, and timeless minimalist elegance.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6 reveal-on-scroll active">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all duration-300 rounded-xl cursor-pointer shadow-xs ${category === cat ? 'bg-neutral-900 text-white shadow-md scale-105' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
            >
              {cat === 'Footwear' ? 'Footwears' : cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search gear, apparel..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="bg-neutral-50 border border-neutral-300 pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-neutral-900 rounded-xl w-full sm:w-64 font-medium transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-50 border border-neutral-300 px-4 py-2.5 text-xs uppercase tracking-wider focus:outline-none rounded-xl font-semibold text-neutral-800 cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-neutral-100 rounded-xl text-xs text-neutral-700 reveal-on-scroll active">
        <div className="flex items-center space-x-3">
          <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
          <span className="font-semibold uppercase tracking-wider">Max Price Filter: <strong className="text-neutral-900">${priceRange} USD</strong></span>
        </div>
        <input 
          type="range" 
          min="50" 
          max="350" 
          step="10" 
          value={priceRange} 
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-48 accent-neutral-900 cursor-pointer"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-28 bg-white rounded-3xl border border-neutral-200 space-y-4 shadow-sm reveal-on-scroll active">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
            <Filter className="w-8 h-8" />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold">No products found matching your criteria.</p>
          <button onClick={() => { setSearch(''); setCategory('All'); setPriceRange(350); }} className="bg-neutral-900 text-white px-6 py-2.5 text-xs uppercase tracking-wider rounded-lg font-medium hover:bg-neutral-800 transition-all">Reset filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 reveal-on-scroll active">
          {filtered.map(product => (
            <div 
              key={product.id} 
              onClick={() => onSelectProduct(product)} 
              className="group cursor-pointer bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs hover:shadow-2xl transition-all duration-500 flex flex-col justify-between transform hover:-translate-y-1.5 relative overflow-hidden"
            >
              <div>
                <div className="aspect-[4/5] bg-neutral-100 overflow-hidden relative rounded-xl shadow-xs mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-neutral-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-widest font-bold rounded-md shadow-xs text-neutral-900">
                    {product.category}
                  </span>

                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-3 right-3 p-2.5 bg-white/90 rounded-full hover:bg-white transition-colors shadow-md"
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 transition-transform active:scale-125 ${wishlist.includes(product.id) ? 'fill-black text-black' : 'text-neutral-700'}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating || 4.8}</span>
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <h3 className="font-serif text-sm text-neutral-900 group-hover:text-black group-hover:underline font-medium line-clamp-1">{product.name}</h3>
                  <p className="text-[11px] text-neutral-500 font-light line-clamp-2">{product.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-100 px-1">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-semibold">Price</span>
                  <span className="text-xs text-neutral-900 font-bold">${product.price.toFixed(2)} USD</span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); addToCart(product, 'Standard', 'Standard', 1); }}
                  className="bg-neutral-900 text-white px-4 py-2.5 text-[10px] uppercase tracking-wider font-semibold rounded-xl hover:bg-neutral-800 transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3 h-3" /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}