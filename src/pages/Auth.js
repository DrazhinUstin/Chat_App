import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Auth = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.displayName) navigate('/');
    }, [user, navigate]);

    return (
        <main className='container section'>
            <h2 className='logo'>chat app</h2>
            <AuthForm />
        </main>
    );
};

export default Auth;
