import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { register } from "../../services/authService";
import AuthLayout from '../../components/layout/AuthLayout/AuthLayout';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import authImage from '../../assets/register-image.svg';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    const errors = {};

    // Validações de email e senha
    if (!email) {
      errors.email = "E-mail é obrigatório";
    } else if (!email.includes("@")) {
      errors.email = "E-mail inválido";
    } else if (email.length > 255) {
      errors.email = "E-mail deve ter no máximo 255 caracteres";
    }

    if (!password) {
      errors.password = "Senha é obrigatória";
    } else if (password.length < 6) {
      errors.password = "Senha deve ter ao menos 6 caracteres";
    } else if (password.length > 70) {
      errors.password = "Senha deve ter no máximo 70 caracteres";
    }

    // Verificando para enviar o form se não tiver nenhum
    if (Object.keys(errors).length > 0) {
      setEmailError(errors.email || "");
      setPasswordError(errors.password || "");
      return;
    }

    // Chamada ao backend
    try {
      const data = await register(email, password);
      toast.success("Cadastro concluído com sucesso!");
      navigate('/tasks');
    } catch (err) {
      console.error(err);

      if (err.message.includes("E-mail já está cadastrado")) {
        setEmailError("Este e-mail já está em uso.");
        toast.error("Este e-mail já está em uso.");
      } else {
        toast.error("Erro ao cadastrar: " + err.message);
      }
    }
  };

  return (
    <AuthLayout imageUrl={authImage} title="Cadastro - Lista de Tarefas">
      <h1 style={{ color: '#fff', marginBottom: '1rem' }}>Cadastre-se</h1>
      <p style={{ color: '#fff', marginBottom: '3rem' }}>
        Faça seu cadastro na plataforma e tenha acesso à lista de tarefas!
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} noValidate>
        <InputField
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          autoComplete="email"
        />
        <InputField
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          autoComplete="new-password"
        />

        <Button type="submit">Cadastrar</Button>
      </form>

      <p style={{ color: '#fff', marginTop: '2rem' }}>
        Já tem uma conta?{' '}
        <Link to="/login" style={{ color: '#ffeb3b', textDecoration: 'underline' }}>
          Faça login
        </Link>
      </p>
    </AuthLayout>
  );
}
