import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout/AuthLayout';
import Button from '../../components/Button/Button';
import notFoundImage from '../../assets/not-found-image.svg';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <AuthLayout imageUrl={notFoundImage} title="Página não encontrada">
      <h1 style={{ color: '#fff', marginBottom: '1rem' }}>Página não encontrada!</h1>
      <p style={{ color: '#fff', marginBottom: '3rem' }}>
        Parece que ocorreu um erro ao tentar acessar esta página e ela não existe em nossa plataforma.
      </p>

      <Button onClick={() => navigate("/")}>Ir para a página de cadastro</Button>
    </AuthLayout>
  );
}
