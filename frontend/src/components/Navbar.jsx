import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>Stockify</Link>
      <div style={styles.links}>
        {user?.role === 'admin' && (
          <>
            <Link to="/admin" style={styles.link}>Dashboard</Link>
            <Link to="/admin/items" style={styles.link}>Items</Link>
            <Link to="/admin/transactions" style={styles.link}>Transactions</Link>
          </>
        )}
        {user?.role === 'buyer' && (
          <>
            <Link to="/shop" style={styles.link}>Shop</Link>
            <Link to="/orders" style={styles.link}>My Orders</Link>
          </>
        )}
        {user && (
          <span style={styles.userInfo}>
            {user.name} &middot;
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </span>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.5rem', background: '#1e1e2e', color: '#fff' },
  brand: { color: '#a78bfa', fontWeight: 700, fontSize: '1.2rem', textDecoration: 'none' },
  links: { display: 'flex', alignItems: 'center', gap: '1rem' },
  link: { color: '#cdd6f4', textDecoration: 'none', fontSize: '0.9rem' },
  userInfo: { color: '#a6adc8', fontSize: '0.85rem' },
  logoutBtn: { background: 'none', border: 'none', color: '#f38ba8', cursor: 'pointer', marginLeft: '0.5rem', fontSize: '0.85rem' },
};

export default Navbar;
