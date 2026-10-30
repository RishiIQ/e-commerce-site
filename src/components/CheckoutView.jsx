import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export default function CheckoutView({ cart, subtotal, discount, shipping, total, user, onComplete, onCancel }) {
  // Dynamically extract name and primary address from the logged-in user context
  const primaryAddress = user?.addresses?.[0] || {};
  const nameParts = (user?.name || 'Marc Tremblay').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const [form, setForm] = useState({
    firstName: firstName,
    lastName: lastName,
    email: user?.email || 'marc.t@bowies.ca',
    phone: user?.phone || '+1 (514) 892-3310',
    address: primaryAddress.street || '1000 Rue Sherbrooke',
    city: primaryAddress.city || 'Montreal, QC',
    postal: primaryAddress.postal || 'H3A 3G4',
    country: primaryAddress.country || 'Canada',
    card: '•••• •••• •••• 4242'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate secure order placement
    setTimeout(() => {
      onComplete({
        id: `BLM-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        total,
        status: 'Processing',
        tracking: 'TRK-' + Math.floor(100000 + Math.random() * 900000),
        items: cart,
        shippingAddress: `${form.address}, ${form.city} ${form.postal}, ${form.country}`
      });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16 space-y-12 animate-fade-in">
      <div className="flex justify-between items-center border-b border-neutral-200 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
            Secure Checkout
          </span>
          <h1 className="font-serif text-3xl tracking-[0.05em] mt-2">Complete Your Order</h1>
        </div>
        <button 
          onClick={onCancel} 
          className="text-xs uppercase tracking-wider underline font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
        >
          Return to Shopping Bag
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Shipping & Payment Details */}
        <div className="lg:col-span-7 space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-sm">
          {/* Section 1: Contact & Shipping */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px]">1</span>
                Shipping & Contact Information
              </h3>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-medium">
                Pre-filled from account: {user?.name || 'Guest'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">First Name</label>
                <input 
                  type="text" 
                  required 
                  value={form.firstName} 
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })} 
                  className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Last Name</label>
                <input 
                  type="text" 
                  required 
                  value={form.lastName} 
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })} 
                  className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Phone Number</label>
                <input 
                  type="text" 
                  required 
                  value={form.phone} 
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                  className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Street Address</label>
              <input 
                type="text" 
                required 
                value={form.address} 
                onChange={(e) => setForm({ ...form, address: e.target.value })} 
                className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
              />
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">City / Region</label>
                <input 
                  type="text" 
                  required 
                  value={form.city} 
                  onChange={(e) => setForm({ ...form, city: e.target.value })} 
                  className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Postal Code</label>
                <input 
                  type="text" 
                  required 
                  value={form.postal} 
                  onChange={(e) => setForm({ ...form, postal: e.target.value })} 
                  className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Country</label>
                <input 
                  type="text" 
                  required 
                  value={form.country} 
                  onChange={(e) => setForm({ ...form, country: e.target.value })} 
                  className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
                />
              </div>
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* Section 2: Payment Details */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px]">2</span>
              Payment Details (Encrypted & Secure)
            </h3>

            <div className="space-y-1 text-xs">
              <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold flex items-center justify-between">
                <span>Card Number</span>
                <span className="flex items-center gap-1 text-emerald-700"><Lock className="w-3 h-3" /> 256-Bit SSL Secured</span>
              </label>
              <input 
                type="text" 
                required 
                value={form.card} 
                onChange={(e) => setForm({ ...form, card: e.target.value })} 
                className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium tracking-widest" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-neutral-900 text-white py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-neutral-800 transition-all rounded-2xl shadow-xl flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Processing Payment...' : `Complete Order ($${total.toFixed(2)} CAD)`}</span>
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Right Column: Order Summary Review */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-neutral-200 space-y-6 shadow-sm sticky top-28 text-xs">
          <h3 className="uppercase tracking-[0.2em] font-semibold text-neutral-900 pb-4 border-b border-neutral-100">
            Order Summary ({cart.reduce((s, i) => s + i.qty, 0)} items)
          </h3>

          <div className="max-h-72 overflow-y-auto space-y-4 pr-1">
            {cart.map(item => (
              <div key={item.cartItemId} className="flex items-center space-x-4 pb-4 border-b border-neutral-100">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-neutral-100 rounded-xl shadow-xs" />
                <div className="flex-1 space-y-1">
                  <h4 className="font-serif font-medium text-neutral-900">{item.name}</h4>
                  <p className="text-[10px] text-neutral-500">Size: {item.size} • Qty: {item.qty}</p>
                </div>
                <span className="font-bold text-neutral-900">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 pt-4 text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount Applied</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping (Express Courier)</span>
              <span className="font-semibold text-neutral-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex justify-between font-bold text-sm text-neutral-900">
            <span>Total Amount</span>
            <span className="text-base">${total.toFixed(2)} USD</span>
          </div>

          <div className="bg-neutral-50 p-4 rounded-2xl flex items-start space-x-3 text-[11px] text-neutral-600">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <p>Your order is protected by our 30-day hassle-free return guarantee and 2-year craftsmanship warranty.</p>
          </div>
        </div>
      </form>
    </div>
  );
}