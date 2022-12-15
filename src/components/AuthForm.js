import { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthForm = () => {
    const [isUserSignUp, setIsUserSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = values;
        if ((!isUserSignUp && (!username || !confirmPassword)) || !email || !password) {
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
                await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(auth.currentUser, {
                    displayName: username,
                });
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
                <div className='form-field'>
                    <label htmlFor='username'>username:</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={values.username}
                        onChange={handleChange}
                    />
                </div>
            )}
            <div className='form-field'>
                <label htmlFor='email'>email:</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                />
            </div>
            <div className='form-field'>
                <label htmlFor='password'>password:</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                />
            </div>
            {!isUserSignUp && (
                <div className='form-field'>
                    <label htmlFor='confirm-password'>confirm password:</label>
                    <input
                        type='password'
                        id='confirm-password'
                        name='confirmPassword'
                        value={values.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
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
            {error && <p className='form-error'>{error.message}</p>}
        </form>
    );
};

export default AuthForm;
