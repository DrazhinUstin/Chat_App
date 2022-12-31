import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import FormField from './FormField';

const AuthForm = () => {
    const [isUserSignUp, setIsUserSignUp] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = values;
        if ((!isUserSignUp && (!displayName || !confirmPassword)) || !email || !password) {
            setError({ message: 'Please fill in all fields!' });
            return;
        }
        if (!isUserSignUp && password !== confirmPassword) {
            setError({ message: 'Password and confirm password are not equal!' });
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            if (!isUserSignUp) {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(auth.currentUser, {
                    displayName,
                });
                setDoc(doc(db, 'users', user.uid), {
                    displayName,
                    email,
                    photoURL: null,
                });
                navigate('/');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h3 className='form-header'>{!isUserSignUp ? 'sign up' : 'sign in'}</h3>
            {!isUserSignUp && (
                <FormField
                    type='text'
                    name='displayName'
                    value={values.displayName}
                    onChange={handleChange}
                    label='username'
                />
            )}
            <FormField type='email' name='email' value={values.email} onChange={handleChange} />
            <FormField
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
            />
            {!isUserSignUp && (
                <FormField
                    type='password'
                    name='confirmPassword'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    label='confirm password'
                />
            )}
            <button type='submit' className='btn-block' disabled={isLoading}>
                {isLoading ? <span className='btn-spinner'></span> : 'submit'}
            </button>
            <p className='form-message'>
                {!isUserSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                    type='button'
                    className='text-link'
                    onClick={() => setIsUserSignUp(!isUserSignUp)}
                >
                    {!isUserSignUp ? 'sign in' : 'sign up'}
                </button>
            </p>
            <p className='form-message'>
                <Link to='/reset' className='text-link'>
                    forgot password?
                </Link>
            </p>
            {error && <p className='form-error'>{error.message}</p>}
        </form>
    );
};

export default AuthForm;
