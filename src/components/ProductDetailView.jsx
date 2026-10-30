import React, { useState } from 'react';
import { Heart, Minus, Plus, Truck, RefreshCw, Shield } from 'lucide-react';

export default function ProductDetailView({ product, onBack, addToCart, onAddReview, isWishlisted, toggleWishlist }) {
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [revAuthor, setRevAuthor] = useState('');
  const [revTitle, setRevTitle] = useState('');
  const [revComment, setRevComment] = useState('');

  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

  const handleReview = (e) => {
    e.preventDefault();
    if (!revAuthor || !revTitle || !revComment) return;
    onAddReview({ productId: product.id, author: revAuthor, rating: 5, title: revTitle, comment: revComment, date: new Date().toISOString().split('T')[0] });
    setRevAuthor(''); setRevTitle(''); setRevComment('');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 space-y-16 animate-fade-in">
      <button onClick={onBack} className="text-xs uppercase tracking-[0.2em] underline font-semibold hover:opacity-75 cursor-pointer">← Back to Collection</button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="aspect-[4/5] bg-neutral-100 overflow-hidden relative rounded-2xl shadow-xl">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          <button 
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-4 right-4 p-3.5 bg-white/95 rounded-full hover:bg-white transition-colors shadow-lg"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-black text-black' : 'text-neutral-700'}`} />
          </button>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] bg-neutral-200 px-3 py-1 font-semibold rounded-md">{product.category}</span>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.050em] mt-2 font-normal">{product.name}</h1>
            <div className="text-2xl font-bold text-neutral-900">${product.price.toFixed(2)} USD</div>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed font-light">{product.description}</p>

          <div className="space-y-3 pt-4 border-t border-neutral-200">
            <span className="text-xs uppercase tracking-wider font-semibold">Select Size</span>
            <div className="flex gap-2">
              {sizes.map(sz => (
                <button 
                  key={sz} 
                  onClick={() => setSelectedSize(sz)}
                  className={`px-5 py-2.5 text-xs uppercase tracking-wider border rounded-xl transition-all cursor-pointer font-medium ${selectedSize === sz ? 'bg-neutral-900 text-white border-neutral-900 shadow-md' : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-900'}`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-6 border-t border-neutral-200">
            <div className="flex items-center border border-neutral-300 px-3 py-3 rounded-xl bg-neutral-50">
              <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="w-4 h-4" /></button>
              <span className="px-4 text-xs font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)}><Plus className="w-4 h-4" /></button>
            </div>
            <button 
              onClick={() => addToCart(product, selectedSize, 'Default', qty)}
              className="flex-1 bg-neutral-900 text-white py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 transition-all rounded-xl shadow-xl cursor-pointer"
            >
              Add to Bag — ${(product.price * qty).toFixed(2)} USD
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 text-[11px] text-neutral-600 border-t border-neutral-200">
            <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-neutral-900" /> Free Express Shipping over $150</div>
            <div className="flex items-center gap-2"><RefreshCw className="w-4 h-4 text-neutral-900" /> 30-Day Hassle-free Returns</div>
            <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-neutral-900" /> 2-Year Craftsmanship Warranty</div>
          </div>
        </div>
      </div>

   
    </div>
  );
}