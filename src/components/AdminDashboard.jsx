import React, { useState } from 'react';
import { Plus, Edit3, Trash2, X, Package, ShieldAlert } from 'lucide-react';

export default function AdminDashboard({ products, setProducts, orders, showToast }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Form state for adding or editing products
  const [form, setForm] = useState({
    name: '',
    category: 'Fashion',
    price: 120,
    stock: 25,
    isFeatured: false,
    image: '',
    description: ''
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setForm({
      name: '',
      category: 'Fashion',
      price: 120,
      stock: 25,
      isFeatured: false,
      image: '',
      description: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock || 20,
      isFeatured: product.isFeatured || false,
      image: product.image,
      description: product.description
    });
    setModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      if (showToast) showToast('Please fill in required product fields.');
      return;
    }

    if (editingProduct) {
      // Edit existing product
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...p, ...form } : p
      );
      setProducts(updatedProducts);
      if (showToast) showToast(`Successfully updated "${form.name}"`);
    } else {
      // Add new product
      const newProduct = {
        id: `BAL-${Date.now()}`,
        rating: 4.8,
        ...form
      };
      setProducts([newProduct, ...products]);
      if (showToast) showToast(`Successfully added "${form.name}" to inventory`);
    }

    setModalOpen(false);
  };

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      setProducts(products.filter(p => p.id !== productId));
      if (showToast) showToast(`Deleted "${productName}" from catalog.`);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16 space-y-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white p-8 sm:p-10 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] bg-neutral-800 px-3.5 py-1.5 font-semibold rounded-full text-emerald-400">
            Admin Executive Control
          </span>
          <h1 className="font-serif text-3xl tracking-[0.05em] mt-2">Catalog & Inventory Management</h1>
          <p className="text-xs text-neutral-400 mt-1 font-light">Easily add new arrivals, modify pricing, manage stock levels, or remove items.</p>
        </div>
        <button 
          onClick={openAddModal} 
          className="bg-white text-neutral-900 hover:bg-neutral-100 px-6 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Product Inventory Table */}
      <div className="border border-neutral-200 bg-white rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
          <h3 className="font-serif text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <Package className="w-5 h-5" /> Current Catalog Items ({products.length})
          </h3>
          <span className="text-xs text-neutral-500 font-light">Live store inventory synced</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 uppercase tracking-wider text-neutral-600 font-semibold border-b border-neutral-200">
              <tr>
                <th className="p-5">Product Details</th>
                <th className="p-5">Category</th>
                <th className="p-5">Price</th>
                <th className="p-5">Stock</th>
                <th className="p-5">Featured</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="p-5 flex items-center space-x-4">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover bg-neutral-100 rounded-xl shadow-xs shrink-0" />
                    <div>
                      <h4 className="font-serif font-medium text-neutral-900">{p.name}</h4>
                      <p className="text-[10px] text-neutral-400 font-mono mt-0.5">ID: {p.id}</p>
                    </div>
                  </td>
                  <td className="p-5 font-semibold text-neutral-700">{p.category}</td>
                  <td className="p-5 font-bold text-neutral-900">${p.price.toFixed(2)} USD</td>
                  <td className="p-5 font-semibold text-neutral-700">{p.stock || 20} units</td>
                  <td className="p-5">
                    <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md ${p.isFeatured ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'}`}>
                      {p.isFeatured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td className="p-5 text-right space-x-3">
                    <button 
                      onClick={() => openEditModal(p)} 
                      className="text-neutral-700 hover:text-black font-bold uppercase text-[10px] tracking-wider inline-flex items-center gap-1 cursor-pointer bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id, p.name)} 
                      className="text-red-600 hover:text-red-800 font-bold uppercase text-[10px] tracking-wider inline-flex items-center gap-1 cursor-pointer bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Easy-to-Understand Add / Edit Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white p-8 sm:p-10 max-w-lg w-full space-y-6 shadow-2xl rounded-3xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500">Inventory Management</span>
                <h3 className="font-serif text-xl font-normal text-neutral-900 mt-1">
                  {editingProduct ? 'Edit Product Details' : 'Add New Product'}
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full cursor-pointer">
                <X className="w-5 h-5 text-neutral-700" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Product Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Alpine Technical Jacket" 
                  required 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                  className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Category *</label>
                  <select 
                    value={form.category} 
                    onChange={e => setForm({...form, category: e.target.value})} 
                    className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium cursor-pointer"
                  >
                    <option value="Fashion">Fashion</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Gear">Gear</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Price ($ USD) *</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="149.00" 
                    required 
                    value={form.price} 
                    onChange={e => setForm({...form, price: Number(e.target.value)})} 
                    className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Stock Quantity</label>
                  <input 
                    type="number" 
                    placeholder="25" 
                    value={form.stock} 
                    onChange={e => setForm({...form, stock: Number(e.target.value)})} 
                    className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
                  />
                </div>

                <div className="space-y-1.5 flex flex-col justify-end">
                  <label className="flex items-center space-x-3 bg-neutral-50 border border-neutral-300 p-3 rounded-xl cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={form.isFeatured} 
                      onChange={e => setForm({...form, isFeatured: e.target.checked})} 
                      className="accent-neutral-900 w-4 h-4 cursor-pointer"
                    />
                    <span className="font-semibold text-neutral-900 uppercase text-[10px] tracking-wider">Feature on Home</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Product Image URL (Unsplash or direct link)</label>
                <input 
                  type="text" 
                  placeholder="https://images.unsplash.com/..." 
                  value={form.image} 
                  onChange={e => setForm({...form, image: e.target.value})} 
                  className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Product Description</label>
                <textarea 
                  rows="3" 
                  placeholder="Lightweight, streamlined, and refined for unrestricted movement..." 
                  value={form.description} 
                  onChange={e => setForm({...form, description: e.target.value})} 
                  className="w-full bg-neutral-50 border border-neutral-300 p-3.5 rounded-xl focus:outline-none focus:border-neutral-900 font-medium resize-none"
                ></textarea>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)} 
                  className="w-1/2 bg-neutral-200 hover:bg-neutral-300 py-4 uppercase tracking-wider rounded-xl font-semibold text-neutral-800 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 bg-neutral-900 hover:bg-neutral-800 text-white py-4 uppercase tracking-[0.2em] rounded-xl font-semibold transition-all shadow-lg cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}