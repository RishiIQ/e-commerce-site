import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function HomeView({ products, onSelectProduct, onExplore, addToCart, wishlist, toggleWishlist }) {
  const [scrollY, setScrollY] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const heroSlides = [
    {
      title: "BALMORAL",
      subtitle: "Winter 2026 Collection",
      desc: "Winter 2026 focuses on essentials for colder days. Built for everyday use with simplicity and function.",
      image: "https://images.unsplash.com/photo-1782227286076-4f5153a8cdac?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      cta: "Shop Winter 26"
    },
    {
      title: "COURTSTRIKE",
      subtitle: "Performance & Precision",
      desc: "Engineered for elite athletes. Unmatched lateral stability, responsive cushioning, and timeless design.",
      image: "https://images.pexels.com/photos/35618113/pexels-photo-35618113.jpeg",
      cta: "Explore Footwear"
    },
    {
      title: "TECH & WEARABLES",
      subtitle: "Precision Biometrics",
      desc: "Track your output with titanium-bezel GPS watches and continuous HR monitoring bands.",
      image: "https://images.pexels.com/photos/36697935/pexels-photo-36697935.jpeg",
      cta: "Shop Wearables"
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, [heroSlides.length]);

  return (
    <div className="space-y-24 animate-fade-in pb-16 pt-2">
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-neutral-900 reveal-down-scroll active">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div 
              className="absolute inset-0 opacity-60 transition-transform duration-1000 ease-out"
              style={{ transform: `translateY(${scrollY * 0.25}px)` }}
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover scale-105 transform hover:scale-100 transition-transform duration-1000"
              />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white space-y-4 max-w-4xl px-6">
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-neutral-200 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">{slide.subtitle}</span>
              <h1 className="font-serif text-4xl sm:text-8xl tracking-[0.18em] font-normal transform transition-all duration-700 drop-shadow-lg">{slide.title}</h1>
            </div>
          </div>
        ))}

        <div className="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentHeroSlide ? 'w-12 bg-white shadow-md' : 'w-4 bg-white/40 hover:bg-white/70'}`}
              aria-label={`Slide ${idx + 1}`}
            ></button>
          ))}
        </div>

        <div className="absolute z-20 bottom-8 left-8 right-8 flex justify-between items-end text-white text-xs uppercase tracking-[0.2em] pointer-events-none">
          <div className="pointer-events-auto">
            <h2 className="font-serif text-xl tracking-[0.1em]">{heroSlides[currentHeroSlide].subtitle}</h2>
            <button onClick={onExplore} className="underline hover:opacity-75 mt-1 block font-semibold">{heroSlides[currentHeroSlide].cta}</button>
          </div>
          <p className="max-w-xs text-right hidden sm:block font-light text-[11px] text-neutral-300 bg-neutral-950/40 p-4 rounded-xl backdrop-blur-md">
            {heroSlides[currentHeroSlide].desc}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[40vh] border-b border-neutral-200 overflow-hidden reveal-on-scroll">
        <div className="relative bg-neutral-200 h-[60vh] lg:h-screen overflow-hidden flex items-center justify-center">
          <img src="https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" alt="Winter gear" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 bg-white">
          {products.slice(0, 2).map(product => (
            <div key={product.id} onClick={() => onSelectProduct(product)} className="p-8 sm:p-12 flex flex-col cursor-pointer group bg-white hover:bg-neutral-50/80 transition-all duration-500">
              <div className="aspect-[4/5] bg-neutral-100 mb-6 overflow-hidden relative rounded-xl shadow-xs">
                <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                  className="absolute top-3 right-3 p-2.5 bg-white/90 rounded-full hover:bg-white transition-colors shadow-md"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-black text-black' : 'text-neutral-700'}`} />
                </button>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">{product.category}</span>
                <h3 className="font-serif text-sm tracking-[0.05em] group-hover:underline font-medium text-neutral-900">{product.name}</h3>
                <p className="text-xs text-neutral-700 font-bold">${product.price.toFixed(2)} USD</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] border-b border-neutral-200 overflow-hidden reveal-on-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 bg-white order-2 lg:order-1">
          {products.slice(2, 4).map(product => (
            <div key={product.id} onClick={() => onSelectProduct(product)} className="p-8 sm:p-12 flex flex-col cursor-pointer group bg-white hover:bg-neutral-50/80 transition-all duration-500">
              <div className="aspect-[4/5] bg-neutral-100 mb-6 overflow-hidden relative rounded-xl shadow-xs">
                <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                  className="absolute top-3 right-3 p-2.5 bg-white/90 rounded-full hover:bg-white transition-colors shadow-md"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-black text-black' : 'text-neutral-700'}`} />
                </button>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">{product.category}</span>
                <h3 className="font-serif text-sm tracking-[0.05em] group-hover:underline font-medium text-neutral-900">{product.name}</h3>
                <p className="text-xs text-neutral-700 font-bold">${product.price.toFixed(2)} USD</p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative bg-neutral-900 h-[60vh] lg:h-screen overflow-hidden flex items-center justify-center order-1 lg:order-2">
          <img src="https://images.unsplash.com/photo-1619470148547-0adbfc64b595?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" alt="Running track" className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-1000" />
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 space-y-12 reveal-on-scroll">
        <div className="flex justify-between items-end border-b border-neutral-200 pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-semibold">Curated Selections</span>
            <h3 className="font-serif text-2xl lg:text-3xl tracking-[0.05em] mt-1">Featured Performance & Wearables</h3>
          </div>
          <button onClick={onExplore} className="text-xs uppercase tracking-[0.2em] font-semibold underline hover:opacity-75">Shop All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => p.isFeatured).slice(0, 8).map(product => (
            <div key={product.id} onClick={() => onSelectProduct(product)} className="group cursor-pointer space-y-4 bg-white p-4 rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col justify-between">
              <div>
                <div className="aspect-[4/5] bg-neutral-100 overflow-hidden relative rounded-xl shadow-xs mb-4">
                  <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 text-[9px] uppercase tracking-widest font-bold rounded-md shadow-xs">
                    {product.category}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-3 right-3 p-2.5 bg-white/90 rounded-full hover:bg-white transition-colors shadow-md"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-black text-black' : 'text-neutral-700'}`} />
                  </button>
                </div>
                <h4 className="font-serif text-sm text-neutral-900 group-hover:underline font-medium">{product.name}</h4>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-neutral-900 font-bold">${product.price.toFixed(2)} USD</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); addToCart(product, 'Standard', 'Standard', 1); }}
                  className="bg-neutral-900 text-white px-4 py-2 text-[10px] uppercase tracking-wider font-semibold rounded-lg hover:bg-neutral-800 transition-all shadow-sm"
                >
                  Quick Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen border-t border-neutral-200 bg-white overflow-hidden reveal-on-scroll">
        <div className="p-12 lg:p-24 flex flex-col justify-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">About Us</span>
          <h2 className="font-serif text-3xl lg:text-4xl tracking-[0.05em] leading-snug">
            Balmoral was founded in Canada to create timeless garments shaped by the country's distinct climate and way of life.
          </h2>
          <div>
            <button onClick={onExplore} className="text-xs uppercase tracking-[0.2em] font-semibold underline hover:opacity-75">Discover Collection</button>
          </div>
        </div>
        <div className="relative bg-neutral-200 h-screen lg:h-screen">
          <img src="https://images.pexels.com/photos/16766915/pexels-photo-16766915.jpeg" alt="About" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
        </div>
      </section>
    </div>
  );
}