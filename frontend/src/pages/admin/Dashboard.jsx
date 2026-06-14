import { useEffect, useState } from 'react';
import { getItems } from '../../api/items';
import { getAllTransactions } from '../../api/transactions';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ items: 0, transactions: 0, revenue: 0, lowStock: 0 });

  useEffect(() => {
    Promise.all([getItems(), getAllTransactions()]).then(([itemsRes, txRes]) => {
      const items = itemsRes.data;
      const txs = txRes.data;
      setStats({
        items: items.length,
        transactions: txs.length,
        revenue: txs.reduce((sum, t) => sum + parseFloat(t.totalPrice), 0),
        lowStock: items.filter((i) => i.stock < 5).length,
      });
    });
  }, []);

  const cards = [
    { label: 'Total Items', value: stats.items, color: '#7c3aed' },
    { label: 'Transactions', value: stats.transactions, color: '#0891b2' },
    { label: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, color: '#059669' },
    { label: 'Low Stock Items', value: stats.lowStock, color: '#dc2626' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#cdd6f4', marginBottom: '1.5rem' }}>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {cards.map((c) => (
          <div key={c.label} style={{ background: '#313244', borderRadius: '12px', padding: '1.5rem', borderLeft: `4px solid ${c.color}` }}>
            <p style={{ color: '#a6adc8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{c.label}</p>
            <p style={{ color: '#cdd6f4', fontSize: '1.75rem', fontWeight: 700 }}>{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
