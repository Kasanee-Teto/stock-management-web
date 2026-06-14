import { useEffect, useState } from 'react';
import { getAllTransactions } from '../../api/transactions';

const AdminTransactions = () => {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    getAllTransactions().then((r) => setTxs(r.data));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#cdd6f4', marginBottom: '1.5rem' }}>Transaction Log</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cdd6f4' }}>
          <thead>
            <tr style={{ background: '#45475a' }}>
              {['Date', 'Buyer', 'Item', 'Qty', 'Total', 'Status'].map((h) => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {txs.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: '1px solid #45475a' }}>
                <td style={td}>{new Date(tx.createdAt).toLocaleDateString()}</td>
                <td style={td}>{tx.user?.name}</td>
                <td style={td}>{tx.item?.name}</td>
                <td style={td}>{tx.quantity}</td>
                <td style={td}>${parseFloat(tx.totalPrice).toFixed(2)}</td>
                <td style={td}>
                  <span style={{ ...badge, background: tx.status === 'completed' ? '#05603a' : '#7f1d1d' }}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {txs.length === 0 && <p style={{ color: '#a6adc8', marginTop: '1rem' }}>No transactions yet.</p>}
      </div>
    </div>
  );
};

const th = { padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 };
const td = { padding: '0.75rem 1rem' };
const badge = { padding: '2px 10px', borderRadius: '999px', fontSize: '0.8rem', color: '#fff' };

export default AdminTransactions;
