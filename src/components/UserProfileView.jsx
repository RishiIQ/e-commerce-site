import React, { useState } from 'react';
import { Package, Heart, MapPin } from 'lucide-react';

export default function UserProfileView({ user, setUser, orders, wishlist, products, onSelectProduct, onLogout, onShopMore, showToast }) {
  const [activeTab, setActiveTab] = useState('orders');
  const [newAddress, setNewAddress] = useState({ title: '', street: '', city: '', postal: '', country: 'Canada' });
  const [showAddressModal, setShowAddressModal] = useState(false);

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.title || !newAddress.street) return;
    const updatedUser = {
      ...user,
      addresses: [...(user.addresses || []), { id: Date.now(), ...newAddress }]
    };
    setUser(updatedUser);
    setNewAddress({ title: '', street: '', city: '', postal: '', country: 'Canada' });
    setShowAddressModal(false);
    showToast('New shipping address added successfully.');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16 space-y-12 animate-fade-in">
      <div className="bg-neutral-900 text-white p-10 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] bg-neutral-800 px-3 py-1 font-semibold rounded-full text-emerald-400">{user.tier}</span>
          <h1 className="font-serif text-3xl tracking-[0.1em]">{user.name}</h1>
          <p className="text-xs text-neutral-400">{user.email} • {user.phone}</p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 block font-semibold">Reward Points</span>
            <span className="text-2xl font-serif text-white font-bold">{user.points} pts</span>
          </div>
          <button onClick={onLogout} className="bg-neutral-800 hover:bg-neutral-700 px-5 py-3 text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer font-semibold">Sign Out</button>
        </div>
      </div>

      <div className="flex border-b border-neutral-200 text-xs uppercase tracking-[0.15em] font-semibold">
        <button 
          onClick={() => setActiveTab('orders')}
          className={`pb-4 px-6 transition-colors border-b-2 cursor-pointer ${activeTab === 'orders' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}
        >
          Order History ({orders.length})
        </button>
        <button 
          onClick={() => setActiveTab('wishlist')}
          className={`pb-4 px-6 transition-colors border-b-2 cursor-pointer ${activeTab === 'wishlist' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}
        >
          Saved Wishlist ({wishlist.length})
        </button>
        <button 
          onClick={() => setActiveTab('addresses')}
          className={`pb-4 px-6 transition-colors border-b-2 cursor-pointer ${activeTab === 'addresses' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}
        >
          Shipping Addresses ({user.addresses?.length || 0})
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`pb-4 px-6 transition-colors border-b-2 cursor-pointer ${activeTab === 'settings' ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}
        >
          Account Settings
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="font-serif text-xl tracking-[0.05em]">Your Recent Orders</h3>
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 space-y-4 shadow-sm">
              <Package className="w-8 h-8 mx-auto text-neutral-400" />
              <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">No past orders found.</p>
              <button onClick={onShopMore} className="bg-neutral-900 text-white px-6 py-2.5 text-xs uppercase tracking-wider rounded-xl font-semibold">Start Shopping</button>
            </div>
          ) : (
            orders.map(o => (
              <div key={o.id} className="bg-white p-8 rounded-2xl border border-neutral-200 space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-neutral-200 gap-2">
                  <div>
                    <span className="font-bold text-neutral-900 tracking-wider text-sm">{o.id}</span>
                    <p className="text-xs text-neutral-500 mt-0.5">Placed on {o.date} • Tracking: <span className="text-neutral-800 font-semibold">{o.tracking}</span></p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full ${o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {o.status}
                    </span>
                    <span className="font-bold text-sm text-neutral-900">${o.total.toFixed(2)} USD</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {o.items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                      <img src={item.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTG3Ox62DPlyQcs_PXOrGnN4RAuuJIexQNOiFEPzaug&s=10'} alt="" className="w-16 h-16 object-cover bg-neutral-100 rounded-lg shadow-xs" />
                      <div className="space-y-1">
                        <h4 className="font-medium text-xs text-neutral-900">{item.name}</h4>
                        <p className="text-[10px] text-neutral-500 font-semibold">Qty: {item.qty} • ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="font-serif text-xl tracking-[0.05em]">Saved Wishlist Items</h3>
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 space-y-4 shadow-sm">
              <Heart className="w-8 h-8 mx-auto text-neutral-400" />
              <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Your wishlist is currently empty.</p>
              <button onClick={onShopMore} className="bg-neutral-900 text-white px-6 py-2.5 text-xs uppercase tracking-wider rounded-xl font-semibold">Explore Collection</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlistedProducts.map(product => (
                <div key={product.id} onClick={() => onSelectProduct(product)} className="group cursor-pointer space-y-3 bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-xl transition-all">
                  <div className="aspect-[4/5] bg-neutral-100 overflow-hidden relative rounded-xl shadow-xs">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-neutral-900 group-hover:underline font-medium">{product.name}</h4>
                    <p className="text-xs text-neutral-500 mt-0.5 font-bold">${product.price.toFixed(2)} USD</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl tracking-[0.05em]">Saved Delivery Addresses</h3>
            <button 
              onClick={() => setShowAddressModal(true)}
              className="bg-neutral-900 text-white px-5 py-2.5 text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors font-semibold cursor-pointer"
            >
              + Add Address
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.addresses?.map(addr => (
              <div key={addr.id} className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-3 text-xs shadow-sm relative">
                <div className="flex justify-between items-start">
                  <span className="font-bold uppercase tracking-wider text-neutral-900">{addr.title}</span>
                  <MapPin className="w-4 h-4 text-neutral-500" />
                </div>
                <p className="text-neutral-700 font-medium">{addr.street}</p>
                <p className="text-neutral-700 font-medium">{addr.city}, {addr.postal}</p>
                <p className="text-neutral-500">{addr.country}</p>
                <button 
                  onClick={() => {
                    const updated = { ...user, addresses: user.addresses.filter(a => a.id !== addr.id) };
                    setUser(updated);
                    showToast('Address removed');
                  }}
                  className="text-red-600 uppercase text-[10px] tracking-wider pt-2 font-bold hover:underline block cursor-pointer"
                >
                  Remove Address
                </button>
              </div>
            ))}
          </div>

          {showAddressModal && (
            <div className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <form onSubmit={handleAddAddress} className="bg-white p-8 max-w-md w-full space-y-4 text-xs shadow-2xl rounded-2xl border border-neutral-200">
                <h3 className="font-serif text-lg font-semibold">Add New Address</h3>
                <input type="text" placeholder="Address Title (e.g. Office)" required value={newAddress.title} onChange={e=>setNewAddress({...newAddress, title:e.target.value})} className="w-full border border-neutral-300 p-3 rounded-xl focus:outline-none focus:border-neutral-900" />
                <input type="text" placeholder="Street Address" required value={newAddress.street} onChange={e=>setNewAddress({...newAddress, street:e.target.value})} className="w-full border border-neutral-300 p-3 rounded-xl focus:outline-none focus:border-neutral-900" />
                <input type="text" placeholder="City, Province" required value={newAddress.city} onChange={e=>setNewAddress({...newAddress, city:e.target.value})} className="w-full border border-neutral-300 p-3 rounded-xl focus:outline-none focus:border-neutral-900" />
                <input type="text" placeholder="Postal Code" required value={newAddress.postal} onChange={e=>setNewAddress({...newAddress, postal:e.target.value})} className="w-full border border-neutral-300 p-3 rounded-xl focus:outline-none focus:border-neutral-900" />
                <div className="flex space-x-2 pt-2">
                  <button type="button" onClick={() => setShowAddressModal(false)} className="bg-neutral-200 px-4 py-2.5 uppercase tracking-wider rounded-xl font-semibold">Cancel</button>
                  <button type="submit" className="bg-neutral-900 text-white px-6 py-2.5 uppercase tracking-wider rounded-xl font-semibold">Save Address</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-xl bg-white p-8 rounded-2xl border border-neutral-200 text-xs animate-fade-in shadow-sm">
          <h3 className="font-serif text-xl tracking-[0.05em]">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1 font-semibold">Full Name</label>
              <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1 font-semibold">Email Address</label>
              <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1 font-semibold">Phone Number</label>
              <input type="text" value={user.phone} onChange={e => setUser({...user, phone: e.target.value})} className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" />
            </div>
            <button onClick={() => showToast('Profile settings updated successfully.')} className="bg-neutral-900 text-white px-6 py-3.5 uppercase tracking-wider font-semibold rounded-xl hover:bg-neutral-800 transition-all shadow-md cursor-pointer">Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
}