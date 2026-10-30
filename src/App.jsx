import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import NotFoundView from './components/NotFoundView';

import { INITIAL_PRODUCTS, INITIAL_REVIEWS, getDeduplicatedProducts } from './data/products';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ProductDetailView from './components/ProductDetailView';
import CheckoutView from './components/CheckoutView';
import UserProfileView from './components/UserProfileView';
import AdminDashboard from './components/AdminDashboard';
import LoginRegisterView from './components/LoginRegisterView';
import InfoPageView from './components/InfoPageView';

// Wrapper component to handle product detail routing parameter
function ProductDetailWrapper({ products, addToCart, reviews, onAddReview, wishlist, toggleWishlist }) {
  const { id } = useParams();
  const product = products.find(p => p.id === id) || products[0];
  const productReviews = reviews.filter(r => r.productId === product?.id);

  return (
    <ProductDetailView 
      product={product} 
      onBack={() => window.history.back()}
      addToCart={addToCart}
      reviews={productReviews}
      onAddReview={onAddReview}
      isWishlisted={wishlist.includes(product?.id)}
      toggleWishlist={toggleWishlist}
    />
  );
}

// Wrapper component for Info/FAQ pages
function InfoPageWrapper() {
  const { page } = useParams();
  return <InfoPageView pageType={page || 'faq'} onBack={() => window.history.back()} />;
}

function StorefrontApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [shopCategory, setShopCategory] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll reveal animation trigger
  useEffect(() => {
    const handleScrollAnimations = () => {
      const reveals = document.querySelectorAll('.reveal-on-scroll');
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScrollAnimations);
    setTimeout(handleScrollAnimations, 100);
    return () => window.removeEventListener('scroll', handleScrollAnimations);
  }, []);

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('balmoral_products_v7');
      const rawList = saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
      return getDeduplicatedProducts(rawList);
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('balmoral_cart_v7');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('balmoral_user_v7');
      return saved ? JSON.parse(saved) : { 
        name: '', 
        email: '', 
        phone: '',
        tier: 'Standard Member',
        points: 0,
        role: 'customer', 
        loggedIn: false,
        addresses: []
      };
    } catch (e) {
      return { name: '', email: '', loggedIn: false, addresses: [] };
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('balmoral_wishlist_v7');
      return saved ? JSON.parse(saved) : ['BAL-001', 'BAL-009', 'BAL-013'];
    } catch (e) {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('balmoral_orders_v7');
      return saved ? JSON.parse(saved) : [
        { id: 'BLM-8821', date: '2026-02-19', total: 160.00, status: 'Delivered', tracking: 'TRK-9928104', items: [{ name: 'White Men Shirt', qty: 1, price: 16.00, image: 'https://images.pexels.com/photos/28710328/pexels-photo-28710328.jpeg' }] },
        { id: 'BLM-9104', date: '2026-02-24', total: 299.00, status: 'In Transit', tracking: 'TRK-4412993', items: [{ name: 'Apple Smartwatch', qty: 1, price: 299.00, image: 'https://images.pexels.com/photos/5083216/pexels-photo-5083216.jpeg' }] }
      ];
    } catch (e) {
      return [];
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('balmoral_reviews_v7');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch (e) {
      return INITIAL_REVIEWS;
    }
  });

  const [toastMessage, setToastMessage] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState('');
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    try { localStorage.setItem('balmoral_products_v7', JSON.stringify(products)); } catch(e){}
  }, [products]);

  useEffect(() => {
    try { localStorage.setItem('balmoral_cart_v7', JSON.stringify(cart)); } catch(e){}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem('balmoral_user_v7', JSON.stringify(user)); } catch(e){}
  }, [user]);

  useEffect(() => {
    try { localStorage.setItem('balmoral_wishlist_v7', JSON.stringify(wishlist)); } catch(e){}
  }, [wishlist]);

  useEffect(() => {
    try { localStorage.setItem('balmoral_orders_v7', JSON.stringify(orders)); } catch(e){}
  }, [orders]);

  useEffect(() => {
    try { localStorage.setItem('balmoral_reviews_v7', JSON.stringify(reviews)); } catch(e){}
  }, [reviews]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast('Removed from wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Added to wishlist');
    }
  };

  const addToCart = (product, size, color, qty = 1) => {
    const cartItemId = `${product.id}-${size || 'std'}-${color || 'std'}`;
    const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);
    
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].qty += qty;
      setCart(updated);
    } else {
      setCart([...cart, {
        cartItemId,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: size || 'Standard',
        color: color || 'Standard',
        qty
      }]);
    }
    showToast(`Added ${product.name} to Cart`);
    setIsCartOpen(true);
  };

  const updateCartQty = (cartItemId, delta) => {
    setCart(cart.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from bag.');
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const shippingFee = cartSubtotal >= 150 || cartSubtotal === 0 ? 0 : 15.00;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'BALMORAL10') {
      setDiscountPercent(10);
      setPromoSuccess('10% discount applied.');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "BALMORAL10"');
      setPromoSuccess('');
    }
  };

  // Determine if we should hide the navigation and footer
  const validStaticPaths = ['/', '/shop', '/checkout', '/profile', '/admin', '/login'];
  const isDynamicValid = location.pathname.startsWith('/product/') || location.pathname.startsWith('/info/');
  const isKnownPage = validStaticPaths.includes(location.pathname) || isDynamicValid;
  const hideNavAndFooter = location.pathname === '/login' || !isKnownPage;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(35px);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.active {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-down-scroll {
          opacity: 0;
          transform: translateY(-35px);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-down-scroll.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-neutral-900 text-white px-6 py-3.5 shadow-2xl flex items-center space-x-3 text-[11px] tracking-[0.2em] uppercase font-medium animate-bounce rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Header - Hidden on Login and 404 Views */}
      {!hideNavAndFooter && (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all duration-300 shadow-xs">
          <div className="py-5 text-center border-b border-neutral-100 bg-white">
            <Link 
              to="/" 
              className="group inline-flex items-center justify-center space-x-3 cursor-pointer"
            >
              <img 
                src="/balmoral.png" 
                alt="Balmoral Logo" 
                className="w-8 h-8 object-contain transform group-hover:scale-110 rounded-xl transition-transform duration-300" 
              />
              <span className="font-serif text-xl sm:text-2xl tracking-[0.4em] font-normal uppercase text-neutral-900 group-hover:opacity-75 transition-opacity">
                BALMORAL
              </span>
            </Link>
          </div>

          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between text-xs uppercase tracking-[0.18em]">
            <div className="flex items-center lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-neutral-800 hover:text-black cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </div>

            <nav className="hidden lg:flex items-center space-x-8 text-neutral-800 font-medium">
              <Link to="/" className="hover:text-black transition-colors cursor-pointer py-2 border-b-2 border-transparent hover:border-black">Home</Link>
              <Link to="/shop" onClick={() => setShopCategory('All')} className="hover:text-black transition-colors cursor-pointer py-2 border-b-2 border-transparent hover:border-black">Collection</Link>
              <Link to="/shop" onClick={() => setShopCategory('Fashion')} className="hover:text-black transition-colors cursor-pointer py-2 border-b-2 border-transparent hover:border-black">Fashion</Link>
              <Link to="/shop" onClick={() => setShopCategory('Footwears')} className="hover:text-black transition-colors cursor-pointer py-2 border-b-2 border-transparent hover:border-black">Footwears</Link>
              <Link to="/shop" onClick={() => setShopCategory('Gear')} className="hover:text-black transition-colors cursor-pointer py-2 border-b-2 border-transparent hover:border-black">Accessories</Link>
            </nav>

            <div className="flex items-center space-x-3 sm:space-x-6 text-neutral-800 font-medium ml-auto lg:ml-0">
              <Link 
                to={user && user.loggedIn ? "/profile" : "/login"} 
                className="bg-blue-200 hover:bg-blue-500 text-black hover:text-white px-4 py-2.5 rounded-xl hover:rounded-full transition-all duration-100 cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-md active:scale-95"
                title="Account"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">{user && user.loggedIn ? user.name.split(' ')[0] : 'Login'}</span>
              </Link>
              <button onClick={() => setIsCartOpen(true)} className="hover:text-white transition-colors font-medium flex items-center gap-1.5 cursor-pointer bg-gray-300 hover:bg-gray-900 text-black px-3.5 sm:px-4 py-2 rounded-full shadow-sm">
                <ShoppingBag className="w-4 h-4" /> 
                <span>Cart ({cart.reduce((s, i) => s + i.qty, 0)})</span>
              </button>
              {user && user.role === 'admin' && (
                <Link to="/admin" className="text-emerald-700 font-semibold cursor-pointer hidden sm:inline">Admin</Link>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-xs" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
                <img 
                  src="/balmoral.png" 
                  alt="Balmoral Logo" 
                  className="w-8 h-8 object-contain transform group-hover:scale-110 rounded-xl transition-transform duration-300" 
                />
                <span className="font-serif text-lg tracking-[0.2em]">BALMORAL</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex flex-col space-y-4 text-sm uppercase tracking-widest font-medium">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-left py-2 cursor-pointer">Home</Link>
                <Link to="/shop" onClick={() => { setShopCategory('All'); setIsMobileMenuOpen(false); }} className="text-left py-2 cursor-pointer">Collection</Link>
                <Link to="/shop" onClick={() => { setShopCategory('Fashion'); setIsMobileMenuOpen(false); }} className="text-left py-2 cursor-pointer">Fashion</Link>
                <Link to="/shop" onClick={() => { setShopCategory('Footwears'); setIsMobileMenuOpen(false); }} className="text-left py-2 cursor-pointer">Footwears</Link>
                <Link to="/shop" onClick={() => { setShopCategory('Gear'); setIsMobileMenuOpen(false); }} className="text-left py-2 cursor-pointer">Accessories</Link>
                {user && user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-left py-2 text-emerald-700 cursor-pointer">Admin Dashboard</Link>
                )}
              </nav>
            </div>
            <div className="border-t border-neutral-200 pt-6">
              <Link 
                to={user && user.loggedIn ? "/profile" : "/login"} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-full bg-neutral-900 text-white py-3 text-xs uppercase tracking-widest rounded-xl font-semibold text-center block cursor-pointer"
              >
                {user && user.loggedIn ? 'My Account' : 'Sign In / Register'}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Routes Configuration */}
      <main className="transition-all duration-500">
        <Routes>
          <Route path="/" element={
            <HomeView 
              products={products} 
              onSelectProduct={(p) => navigate(`/product/${p.id}`)}
              onExplore={() => { setShopCategory('All'); navigate('/shop'); }}
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          } />

          <Route path="/shop" element={
            <ShopView 
              products={products} 
              initialCategory={shopCategory}
              onSelectProduct={(p) => navigate(`/product/${p.id}`)}
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          } />

          <Route path="/product/:id" element={
            <ProductDetailWrapper 
              products={products} 
              addToCart={addToCart}
              reviews={reviews}
              onAddReview={(newRev) => setReviews([...reviews, { id: Date.now(), ...newRev }])}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          } />

          <Route path="/checkout" element={
            <CheckoutView 
              cart={cart}
              user={user}
              subtotal={cartSubtotal}
              discount={discountAmount}
              shipping={shippingFee}
              total={cartTotal}
              onComplete={(orderData) => {
                setOrders([orderData, ...orders]);
                setCart([]);
                setDiscountPercent(0);
                setPromoCode('');
                setPromoSuccess('');
                showToast('Order placed successfully.');
                navigate('/profile');
              }}
              onCancel={() => navigate('/shop')}
            />
          } />

          <Route path="/profile" element={
            <UserProfileView 
              user={user}
              setUser={setUser}
              orders={orders}
              wishlist={wishlist}
              products={products}
              onSelectProduct={(p) => navigate(`/product/${p.id}`)}
              onLogout={() => { setUser({ loggedIn: false, name: '', email: '', role: 'customer' }); navigate('/'); }}
              onShopMore={() => navigate('/shop')}
              showToast={showToast}
            />
          } />

          <Route path="/admin" element={
            <AdminDashboard 
              products={products}
              setProducts={setProducts}
              orders={orders}
              showToast={showToast}
            />
          } />

          <Route path="/info/:page" element={
            <InfoPageWrapper />
          } />

          <Route path="/login" element={
            <LoginRegisterView 
              onLoginSuccess={(userData) => {
                setUser(userData);
                showToast(`Welcome back, ${userData.name}`);
                navigate('/profile');
              }}
              showToast={showToast}
            />
          } />

          {/* 404 Fallback Route */}
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>

      {/* Slide-Over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-xs transition-opacity animate-fade-in" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-neutral-200 transform transition-transform duration-300">
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-900 text-white">
                <span className="font-serif text-xs tracking-[0.25em] uppercase font-medium flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Shopping Bag ({cart.reduce((s, i) => s + i.qty, 0)})
                </span>
                <button onClick={() => setIsCartOpen(false)} className="p-1.5 hover:bg-neutral-800 rounded-full transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-24 space-y-4">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-medium">Your shopping bag is empty.</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
                      className="bg-neutral-900 text-white px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-all rounded-lg shadow-md cursor-pointer"
                    >
                      Explore Collection
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartItemId} className="flex space-x-4 items-center pb-6 border-b border-neutral-100 group">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-neutral-100 rounded-lg shadow-sm" />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium text-xs text-neutral-900">{item.name}</h4>
                        <p className="text-[10px] text-neutral-500 font-medium">{item.size} / {item.color}</p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs font-bold">${item.price.toFixed(2)} CAD</span>
                          <div className="flex items-center space-x-2 border border-neutral-300 rounded-md px-2 py-1 bg-neutral-50">
                            <button onClick={() => updateCartQty(item.cartItemId, -1)} className="hover:text-black cursor-pointer"><Minus className="w-3 h-3" /></button>
                            <span className="text-xs font-semibold px-1">{item.qty}</span>
                            <button onClick={() => updateCartQty(item.cartItemId, 1)} className="hover:text-black cursor-pointer"><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.cartItemId)} className="text-neutral-400 hover:text-red-600 transition-colors p-2 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-neutral-200 bg-neutral-50 space-y-4 shadow-inner">
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Promo Code (BALMORAL10)" 
                      value={promoCode} 
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-white border border-neutral-300 px-3.5 py-2.5 text-xs focus:outline-none rounded-lg font-medium"
                    />
                    <button onClick={applyPromo} className="bg-neutral-900 text-white px-5 py-2.5 text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer">Apply</button>
                  </div>
                  {promoSuccess && <p className="text-[10px] text-emerald-700 font-semibold">{promoSuccess}</p>}
                  {promoError && <p className="text-[10px] text-red-600 font-semibold">{promoError}</p>}

                  <div className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-200">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-neutral-900 font-semibold">${cartSubtotal.toFixed(2)} CAD</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Discount ({discountPercent}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-neutral-900 font-medium">{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)} CAD`}</span>
                    </div>
                    <div className="flex justify-between text-neutral-900 font-bold text-sm pt-3 border-t border-neutral-200">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)} CAD</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => { 
                      if (!user || !user.loggedIn) {
                        setIsCartOpen(false);
                        navigate('/login');
                        showToast('Please sign in or create an account to proceed with your purchase.');
                      } else {
                        setIsCartOpen(false); 
                        navigate('/checkout'); 
                      }
                    }}
                    className="w-full bg-neutral-900 text-white py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 transition-all rounded-lg shadow-lg flex items-center justify-center space-x-2 group cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer - Hidden on Login and 404 Views */}
      {!hideNavAndFooter && (
        <footer className="bg-white border-t border-neutral-200 py-24 text-neutral-800">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-xs">
            <div className="space-y-4">
              <h4 className="uppercase tracking-[0.2em] font-semibold text-neutral-900">Contact Us</h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black flex items-center gap-2.5 transition-colors font-medium group">
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <Link to="/info/faq" className="hover:text-black transition-colors text-left font-medium cursor-pointer block">
                    FAQs & Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase tracking-[0.2em] font-semibold text-neutral-900">Shipping & returns</h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <Link to="/info/returns" className="hover:text-black transition-colors text-left font-medium cursor-pointer block">
                    Start a return
                  </Link>
                </li>
                <li>
                  <Link to="/info/shipping" className="hover:text-black transition-colors text-left font-medium cursor-pointer block">
                    Global delivery info
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase tracking-[0.2em] font-semibold text-neutral-900">Press & Policies</h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <Link to="/info/terms" className="hover:text-black transition-colors text-left font-medium cursor-pointer block">
                    Terms & policies
                  </Link>
                </li>
                <li>
                  <Link to="/info/lookbook" className="hover:text-black transition-colors text-left font-medium cursor-pointer block">
                    Winter 26 Lookbook
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase tracking-[0.2em] font-semibold text-neutral-900">Connect & Social</h4>
              
              {/* Social Media Icons */}
              <div className="flex items-center space-x-3 pt-2 text-neutral-800">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-neutral-100 hover:bg-neutral-900 hover:text-white transition-all rounded-full shadow-xs flex items-center justify-center cursor-pointer" title="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-neutral-100 hover:bg-neutral-900 hover:text-white transition-all rounded-full shadow-xs flex items-center justify-center cursor-pointer" title="Twitter / X">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-neutral-100 hover:bg-neutral-900 hover:text-white transition-all rounded-full shadow-xs flex items-center justify-center cursor-pointer" title="YouTube">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-neutral-100 hover:bg-neutral-900 hover:text-white transition-all rounded-full shadow-xs flex items-center justify-center cursor-pointer" title="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>

              <div className="flex pt-2">
                <input type="email" placeholder="Enter your email address here" className="border-b border-neutral-400 py-2 text-xs focus:outline-none flex-1 bg-transparent" />
                <button onClick={() => showToast('Successfully subscribed.')} className="uppercase tracking-widest text-[11px] pl-4 font-bold text-neutral-900 hover:opacity-75 cursor-pointer">Join</button>
              </div>
            </div>
          </div>
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mt-20 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
            <span>Copyright © 2026 Balmoral Running</span>
            <span>Credits MILL3</span>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StorefrontApp />
    </BrowserRouter>
  );
}