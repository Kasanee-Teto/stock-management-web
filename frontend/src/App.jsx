import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import AdminItems from './pages/admin/Items';
import AdminTransactions from './pages/admin/Transactions';
import Shop from './pages/buyer/Shop';
import Orders from './pages/buyer/Orders';

const HomeRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === 'admin' ? '/admin' : '/shop'} replace />;
};

const Layout = ({ children }) => (
  <div style={{ minHeight: '100vh', background: '#1e1e2e' }}>
    <Navbar />
    {children}
  </div>
);

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout><HomeRedirect /></Layout>} />

        {/* Admin routes */}
        <Route path="/admin" element={<Layout><ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute></Layout>} />
        <Route path="/admin/items" element={<Layout><ProtectedRoute role="admin"><AdminItems /></ProtectedRoute></Layout>} />
        <Route path="/admin/transactions" element={<Layout><ProtectedRoute role="admin"><AdminTransactions /></ProtectedRoute></Layout>} />

        {/* Buyer routes */}
        <Route path="/shop" element={<Layout><ProtectedRoute role="buyer"><Shop /></ProtectedRoute></Layout>} />
        <Route path="/orders" element={<Layout><ProtectedRoute role="buyer"><Orders /></ProtectedRoute></Layout>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
