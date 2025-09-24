import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import AuthLayout from '../../components/layout/AuthLayout/AuthLayout';
import Input from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { login } from "../../services/authService";
import authImage from '../../assets/login-image.svg';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');

    // Validações locais
    const errors = {};
    if (!email) errors.email = "E-mail obrigatório";
    else if (!email.includes("@")) errors.email = "E-mail inválido";

    if (!password) errors.password = "Senha obrigatória";

    if (Object.keys(errors).length > 0) {
      setEmailError(errors.email || '');
      setPasswordError(errors.password || '');
      return;
    }

  try {
    await login(email, password);
    navigate('/tasks');
  } catch (err) {
    console.error(err);

    if (err.error) {
      toast.error(err.error); // mostra mensagem do backend
    } else if (err.code && err.code.startsWith("auth/")) {
      switch (err.code) {
        case "auth/user-not-found":
          toast.error("Usuário não encontrado");
          break;
        case "auth/wrong-password":
          toast.error("Senha incorreta");
          break;
        default:
          toast.error("E-mail ou senha incorretos");
      }
    } else {
      toast.error(err.message || "Erro desconhecido");
    }
  }
}

  return (
    <AuthLayout imageUrl={authImage} title="Login - Lista de Tarefas" reverse>
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
          error={emailError}
          autoComplete="email"
          required
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          autoComplete="current-password"
          required
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
