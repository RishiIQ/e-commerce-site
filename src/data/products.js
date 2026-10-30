export const INITIAL_PRODUCTS = [
  // Fashion (Tops & Bottoms)
  { id: 'BAL-001', name: 'St-Ambroise Winter Half Tights', category: 'Fashion', price: 160.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1641399050826-9616c90427bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', description: 'Lightweight, streamlined, and refined for unrestricted movement from the starting line to the finish.', isFeatured: true, stock: 25 },
  { id: 'BAL-002', name: 'Oakwood Technical Tank Top', category: 'Fashion', price: 140.00, rating: 4.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFAaCKJhl8faq87DKpsdG7KYGA5_pk1pKmC7PXMbSUeToCLHxy2km-PM&s=10', description: 'Designed for high-output racing and training with bonded seams and sweat-wicking merino blend.', isFeatured: true, stock: 30 },
  { id: 'BAL-003', name: 'Vendôme Organic Cotton T-Shirt', category: 'Fashion', price: 80.00, rating: 4.7, image: 'https://iciw.centracdn.net/client/dynamic/images/12880_42e565b384-13517-342-1-1350x0.jpg', description: 'Heavyweight organic cotton jersey with subtle tonal chest embroidery.', isFeatured: true, stock: 45 },
  { id: 'BAL-004', name: 'Melrose Relaxed Joggers', category: 'Fashion', price: 170.00, rating: 4.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw8rnDjpD2pSnHS807BPJlc0ov4dYwFauiCkLrcPUKB2T6X0O0zsA0byw2&s=10', description: 'Tailored running pants crafted from weather-resistant stretch woven fabric with zipped pockets.', isFeatured: true, stock: 18 },
  { id: 'BAL-005', name: 'Big-O Graphic Tee', category: 'Fashion', price: 80.00, rating: 4.6, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDL_iPsmCS-w93D2QQ3VV_g3YWW20rkbSU7mG6u2D-7dlvq7YrBn-xN3IW&s=10', description: 'Relaxed fit jersey featuring archival Balmoral typography screenprinted on rear.', isFeatured: false, stock: 35 },
  { id: 'BAL-006', name: 'Miller Running Pants', category: 'Fashion', price: 175.00, rating: 4.8, image: 'https://www.balmoralrunning.com/cdn/shop/files/MillerPantsBlackFront.jpg?v=1788958636', description: 'Articulated knees and tapered ankle cuffs for zero distraction during high-speed strides.', isFeatured: false, stock: 22 },
  { id: 'BAL-007', name: 'Bloom Embroidered Tee', category: 'Fashion', price: 85.00, rating: 4.7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6NdvE2QFWH90VhkiOBx6VVOtyS6p-3aT4Cyhb7H7Qag37QDCG1rZtcMxN&s=10', description: 'Clean silhouette with delicate floral embroidery sourced from local botanical motifs.', isFeatured: false, stock: 28 },
  { id: 'BAL-008', name: 'St-Ambroise Winter Tights', category: 'Fashion', price: 175.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', description: 'Thermal brushed interior lining designed to withstand sub-zero training sessions.', isFeatured: false, stock: 15 },

  // Footwear
  { id: 'BAL-009', name: 'Selkirk Courtstrike 2.0 Shoe', category: 'Footwear', price: 139.00, rating: 5.0, image: 'https://m.media-amazon.com/images/I/81iAERnFOIL._AC_UY300_.jpg', description: 'Engineered for competitive court players with carbon fiber shanks and responsive EVA foam.', isFeatured: true, stock: 15 },
  { id: 'BAL-010', name: 'Apex Endurance Runner', category: 'Footwear', price: 165.00, rating: 4.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2YgiHd8DT9Xq4XcKfEipLSdbFEpbxNYqcZvtCFjaVFqRJQY8-F7yG8HEf&s=10', description: 'Long-distance road shoe with maximum energy return and breathable monofilament mesh.', isFeatured: false, stock: 20 },
  { id: 'BAL-011', name: 'Vanguard Trail Sneaker', category: 'Footwear', price: 180.00, rating: 4.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDf0T1hjE1i4Je8dsxXujKJJMaepd9KzhK31Mcn5Px0cYBfoaF9nfIcG3K&s=10', description: 'Rugged Vibram outsole paired with waterproof membrane for unpredictable terrain.', isFeatured: false, stock: 12 },
  { id: 'BAL-012', name: 'Sovereign Court Trainer', category: 'Footwear', price: 145.00, rating: 4.7, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80', description: 'Minimalist leather-trimmed court shoe designed for lifestyle and light athletic conditioning.', isFeatured: false, stock: 25 },

  // Wearables
  { id: 'BAL-013', name: 'SonicTech Elite Smartwatch', category: 'Wearables', price: 299.00, rating: 4.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBO2uxgdu9a2fUCIGyC7ybRUfLTOTK3q_MKEun2OzCF0E1S-MflSvvILM&s=10', description: 'Precision GPS running and training smartwatch featuring AMOLED display and titanium bezel.', isFeatured: true, stock: 18 },
  { id: 'BAL-014', name: 'Pulse HR Biometric Band', category: 'Wearables', price: 129.00, rating: 4.6, image: 'https://m.media-amazon.com/images/I/51P8XtHQXFL.jpg', description: 'Sleek continuous heart rate, blood oxygen, and sleep architecture monitor.', isFeatured: false, stock: 30 },
  { id: 'BAL-015', name: 'AeroStride Cadence Pod', category: 'Wearables', price: 89.00, rating: 4.7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUAIDGrRzMMrr2KnMFLREQGJ1O1_TpdkvZz8FKVWBs5QDb4ogL3pgdKo&s=10', description: 'Clips securely to footwear to track ground contact time, vertical oscillation, and stride length.', isFeatured: false, stock: 22 },

  // Electronics
  { id: 'BAL-016', name: 'Aura Pro ANC Wireless Earbuds', category: 'Electronics', price: 189.00, rating: 4.7, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80', description: 'Immersive acoustic fidelity paired with adaptive active noise cancellation and secure sport wings.', isFeatured: true, stock: 22 },
  { id: 'BAL-017', name: 'Beacon Sport Headlamp', category: 'Electronics', price: 75.00, rating: 4.8, image: 'https://plus.unsplash.com/premium_photo-1764424937658-e92fe4f24f4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', description: 'Ultra-lightweight 600-lumen rechargeable headlamp with red night-vision mode.', isFeatured: false, stock: 40 },
  { id: 'BAL-018', name: 'SonicBlast Waterproof Speaker', category: 'Electronics', price: 149.00, rating: 4.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNNCwB6M_r-uQIHP9Ly180H-jeR5zJOgpflZTXQmB26LMgZCZUdmUgFWE&s=10', description: 'Rugged 360-degree portable audio companion with 24-hour battery reserve.', isFeatured: false, stock: 16 },

  // Gear & Accessories
  { id: 'BAL-019', name: 'HyperGrip Pro Carbon Paddle', category: 'Gear', price: 199.00, rating: 4.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdvuq-7ki4hrEmjzRFPuUEfse9tKv2t0glbplXjF-rwTP7D-lBYgUwC_s&s=10', description: 'Toray T700 raw carbon fiber surface delivering exceptional spin and tactile control.', isFeatured: true, stock: 12 },
  { id: 'BAL-020', name: 'Winston Technical Facemask', category: 'Gear', price: 90.00, rating: 4.8, image: 'https://winstonindia.com/cdn/shop/files/3-in-1_LED_Face_Mask.png?v=1764257078&width=1080', description: 'Breathable windproof balaclava engineered for sub-zero training mornings.', isFeatured: true, stock: 25 },
  { id: 'BAL-021', name: 'Finchsley Insulated Mittens', category: 'Gear', price: 90.00, rating: 4.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWldNAEqrGk1odfKLVIgFniJCM3IOHFlkkLTSLRUEwHM99wzpKEuHdumTi&s=10', description: 'Down-insulated mitts featuring touchscreen-compatible leather palms.', isFeatured: true, stock: 20 },
  { id: 'BAL-022', name: 'Nomad Running Backpack 12L', category: 'Gear', price: 160.00, rating: 4.8, image: 'https://wildernessandwaves.co/cdn/shop/files/camel-12l-hiking-backpack-black-waterproof-hydration-daypack.webp?v=1784063645&width=2048', description: 'Ergonomic hydration vest with included 1.5L reservoir and quick-access gel pockets.', isFeatured: false, stock: 14 }
];

export const INITIAL_REVIEWS = [
  { id: 1, productId: 'BAL-001', author: 'Guillaume M.', rating: 5, date: '2026-02-18', title: 'Exceptional quality', comment: 'The fabric weight and tailoring are superb. Perfect for crisp morning runs.' },
  { id: 2, productId: 'BAL-009', author: 'Sophie L.', rating: 5, date: '2026-02-20', title: 'Unmatched court stability', comment: 'Courtstrike 2.0 provides incredible grip and lateral support during fast pickleball rallies.' }
];

export const getDeduplicatedProducts = (productsList) => {
  const seenIds = new Set();
  const seenNameImage = new Set();
  return productsList.filter(item => {
    const nameImageKey = `${item.name.trim().toLowerCase()}|${item.image.trim()}`;
    if (seenIds.has(item.id) || seenNameImage.has(nameImageKey)) {
      return false;
    }
    seenIds.add(item.id);
    seenNameImage.add(nameImageKey);
    return true;
  });
};