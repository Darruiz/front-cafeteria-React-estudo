import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRemember(true);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (email === 'test@example.com' && password === 'password') {
            console.log('Autenticação bem-sucedida');

            if (remember) {
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }

            navigate('/home');
        } else {
            console.log('Autenticação falhou');
        }
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <Title>Login</Title>
                <Input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <CheckboxContainer>
                    <input
                        type="checkbox"
                        id="remember"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                    />
                    <label htmlFor="remember">Lembrar acesso</label>
                </CheckboxContainer>
                <Button type="submit">Entrar</Button>
            </LoginForm>
        </LoginContainer>
    );
};

export default Login;

// Estilos com styled-components
const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const LoginForm = styled.form`
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    color: #333;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    input {
        margin-right: 0.5rem;
    }

    label {
        font-size: 0.9rem;
        color: #555;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #0056b3;
    }
`;