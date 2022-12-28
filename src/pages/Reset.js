import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import { Header, FormField } from '../components';

const Reset = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const email = e.target.elements[0].value;
            await sendPasswordResetEmail(auth, email);
            navigate('/auth');
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    return (
        <main className='container'>
            <Header />
            <form className='form' onSubmit={handleSubmit}>
                <h3 className='form-header'>password reset</h3>
                <p className='form-message'>
                    Enter your email address and we will send you instructions to reset your
                    password.
                </p>
                <FormField type='email' name='email' required />
                <button type='submit' className='btn-block' disabled={isLoading}>
                    {isLoading ? <span className='btn-spinner'></span> : 'continue'}
                </button>
                <p className='form-message'>
                    <Link to='/auth' className='text-link'>
                        back to auth page
                    </Link>
                </p>
                {error && <p className='form-error'>{error.message}</p>}
            </form>
        </main>
    );
};

export default Reset;
