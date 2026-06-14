import { useEffect, useState } from 'react';
import { getItems, createItem, updateItem, updateStock, deleteItem } from '../../api/items';

const emptyForm = { name: '', description: '', price: '', stock: '', imageUrl: '' };

const AdminItems = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const load = () => getItems().then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        await updateItem(editing, form);
      } else {
        await createItem(form);
      }
      setForm(emptyForm);
      setEditing(null);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving item');
    }
  };

  const handleEdit = (item) => {
    setEditing(item.id);
    setForm({ name: item.name, description: item.description, price: item.price, stock: item.stock, imageUrl: item.imageUrl });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    await deleteItem(id);
    load();
  };

  const handleStockChange = async (id, newStock) => {
    await updateStock(id, Number(newStock));
    load();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#cdd6f4', marginBottom: '1.5rem' }}>{editing ? 'Edit Item' : 'Add Item'}</h2>
      {error && <p style={{ color: '#f38ba8', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem', maxWidth: '600px' }}>
        {['name', 'description', 'price', 'stock', 'imageUrl'].map((field) => (
          <input
            key={field}
            style={inp}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            type={['price', 'stock'].includes(field) ? 'number' : 'text'}
            required={['name', 'price'].includes(field)}
          />
        ))}
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.5rem' }}>
          <button style={btn('#7c3aed')} type="submit">{editing ? 'Update' : 'Add Item'}</button>
          {editing && <button style={btn('#45475a')} type="button" onClick={() => { setEditing(null); setForm(emptyForm); }}>Cancel</button>}
        </div>
      </form>

      <h3 style={{ color: '#cdd6f4', marginBottom: '1rem' }}>All Items</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cdd6f4' }}>
          <thead>
            <tr style={{ background: '#45475a' }}>
              {['Name', 'Price', 'Stock', 'Actions'].map((h) => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #45475a' }}>
                <td style={td}>{item.name}</td>
                <td style={td}>${parseFloat(item.price).toFixed(2)}</td>
                <td style={td}>
                  <input
                    type="number"
                    defaultValue={item.stock}
                    style={{ ...inp, width: '80px', padding: '0.3rem 0.5rem' }}
                    onBlur={(e) => handleStockChange(item.id, e.target.value)}
                    min="0"
                  />
                </td>
                <td style={td}>
                  <button style={btn('#0891b2', '0.8rem')} onClick={() => handleEdit(item)}>Edit</button>{' '}
                  <button style={btn('#dc2626', '0.8rem')} onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const inp = { padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #45475a', background: '#1e1e2e', color: '#cdd6f4', fontSize: '0.9rem', width: '100%', boxSizing: 'border-box' };
const th = { padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 };
const td = { padding: '0.75rem 1rem' };
const btn = (bg, fs = '0.9rem') => ({ background: bg, color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 0.9rem', cursor: 'pointer', fontSize: fs });

export default AdminItems;
