import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateEmail, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { Header, FormField } from '../components';

const UpdateEmail = () => {
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({ email: user.email, password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const { email, password } = values;
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updateEmail(auth.currentUser, email);
            await updateDoc(doc(db, `users/${user.uid}`), { email });
            navigate('/profile');
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <main className='container'>
            <Header />
            <form className='form' onSubmit={handleSubmit}>
                <h3 className='form-header'>update email</h3>
                <FormField
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    required
                />
                <FormField
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    required
                />
                <button type='submit' className='btn-block' disabled={isLoading}>
                    {isLoading ? <span className='btn-spinner'></span> : 'submit'}
                </button>
                <p className='form-message'>
                    <Link to='/' className='text-link'>
                        back to home page
                    </Link>
                </p>
                {error && <p className='form-error'>{error.message}</p>}
            </form>
        </main>
    );
};

export default UpdateEmail;
