import { Navigate } from 'react-router-dom';

// Rota de proteção que depende do usuário estar logado para acessar uma página protegida

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('idToken');  
  if (!token) return <Navigate to="/login" replace />;

  return children;
}