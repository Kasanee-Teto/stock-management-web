import { useEffect, useState } from 'react';
import { getItems } from '../../api/items';
import { purchase } from '../../api/transactions';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getItems().then((r) => setItems(r.data));
  }, []);

  const handleBuy = async (item) => {
    try {
      await purchase({ itemId: item.id, quantity: 1 });
      setMessage(`✓ Purchased "${item.name}" successfully!`);
      getItems().then((r) => setItems(r.data));
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(`✗ ${err.response?.data?.message || 'Purchase failed'}`);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#cdd6f4', marginBottom: '0.5rem' }}>Shop</h2>
      {message && (
        <p style={{ color: message.startsWith('✓') ? '#a6e3a1' : '#f38ba8', marginBottom: '1rem' }}>{message}</p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        {items.map((item) => (
          <div key={item.id} style={card}>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.75rem' }} />}
            <h3 style={{ color: '#cdd6f4', marginBottom: '0.25rem' }}>{item.name}</h3>
            <p style={{ color: '#a6adc8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{item.description}</p>
            <p style={{ color: '#a78bfa', fontWeight: 700, marginBottom: '0.25rem' }}>${parseFloat(item.price).toFixed(2)}</p>
            <p style={{ color: item.stock > 0 ? '#a6e3a1' : '#f38ba8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
              {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
            </p>
            <button
              style={{ ...buyBtn, opacity: item.stock < 1 ? 0.5 : 1 }}
              disabled={item.stock < 1}
              onClick={() => handleBuy(item)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
      {items.length === 0 && <p style={{ color: '#a6adc8' }}>No items available.</p>}
    </div>
  );
};

const card = { background: '#313244', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column' };
const buyBtn = { background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem', cursor: 'pointer', fontSize: '0.95rem' };

export default Shop;
