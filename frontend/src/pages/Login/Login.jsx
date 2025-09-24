import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import AuthLayout from '../../components/layout/AuthLayout/AuthLayout';
import Input from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { login } from "../../services/authService";
import authImage from '../../assets/login-image.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');

    // Validações de email e senha
    if (!email) {
      setEmailError('E-mail obrigatório');
      return;
    }
    if (!password) {
      setPasswordError('Senha obrigatória');
      return;
    }

    try {
      const data = await login(email, password);
      
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      if (err.message.includes("Token inválido")) {
        toast.error("Token inválido, tente novamente");
      } else if (err.message.includes("Firebase")) {
        toast.error("E-mail ou senha incorretos");
      } else {
        toast.error("Erro ao fazer login: " + err.message);
      }
    }
  };

  return (
    <AuthLayout imageUrl={authImage} title="Lista de Tarefas" reverse>
      <h1 style={{ color: '#fff', marginBottom: '1rem' }}>Faça seu Login</h1>
      <p style={{ color: '#fff', marginBottom: '3rem' }}>
        Acesse sua lista de tarefas e organize seu dia a dia!
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} noValidate>
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <Button type="submit">Entrar</Button>
      </form>

      <p style={{ color: '#fff', marginTop: '2rem' }}>
        Ainda não tem uma conta?{' '}
        <Link to="/" style={{ color: '#ffeb3b', textDecoration: 'underline' }}>
          Crie uma aqui
        </Link>
      </p>
    </AuthLayout>
  );
}
