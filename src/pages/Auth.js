import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Header, AuthForm } from '../components';

const Auth = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.displayName) navigate('/');
    }, [user, navigate]);

    return (
        <main className='container'>
            <Header />
            <AuthForm />
        </main>
    );
};

export default Auth;
