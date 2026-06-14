import { useEffect, useState } from 'react';
import { getMyTransactions } from '../../api/transactions';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyTransactions().then((r) => setOrders(r.data));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#cdd6f4', marginBottom: '1.5rem' }}>My Orders</h2>
      {orders.length === 0 && <p style={{ color: '#a6adc8' }}>You haven't made any purchases yet.</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {orders.map((order) => (
          <div key={order.id} style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#cdd6f4', fontWeight: 600 }}>{order.item?.name}</p>
                <p style={{ color: '#a6adc8', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Qty: {order.quantity} · ${parseFloat(order.totalPrice).toFixed(2)}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ ...badge, background: '#05603a' }}>{order.status}</span>
                <p style={{ color: '#585b70', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const card = { background: '#313244', borderRadius: '12px', padding: '1rem 1.25rem' };
const badge = { padding: '2px 10px', borderRadius: '999px', fontSize: '0.8rem', color: '#fff' };

export default Orders;
