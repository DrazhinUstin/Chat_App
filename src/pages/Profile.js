import { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { Header, FormField } from '../components';
import { validateFile } from '../utils/helpers';

const Profile = () => {
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({ displayName: user.displayName, file: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const { displayName, file } = values;
            const profile = { displayName };
            if (validateFile(file)) {
                const storageRef = ref(storage, `users/${user.uid}`);
                await uploadBytes(storageRef, file);
                profile.photoURL = await getDownloadURL(storageRef);
                e.target.elements.file.value = '';
            }
            await updateProfile(auth.currentUser, profile);
            await updateDoc(doc(db, `users/${user.uid}`), profile);
            getDocs(collection(db, `users/${user.uid}/chats`)).then(({ docs }) => {
                docs.forEach(async (d) => {
                    const chatID = d.id;
                    const { uid } = d.data();
                    await updateDoc(doc(db, `users/${uid}/chats/${chatID}`), profile);
                });
            });
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'file') value = e.target.files[0];
        setValues({ ...values, [name]: value });
    };

    return (
        <main className='container'>
            <Header />
            <form className='form' onSubmit={handleSubmit}>
                <h3 className='form-header'>update profile</h3>
                <FormField
                    type='text'
                    name='displayName'
                    value={values.displayName}
                    onChange={handleChange}
                    label='username'
                    required
                />
                <input
                    type='file'
                    name='file'
                    style={{ display: 'none' }}
                    accept='.png, .jpg, .jpeg'
                    onChange={handleChange}
                />
                <button
                    type='button'
                    className='btn-block form-field'
                    disabled={isLoading}
                    onClick={(e) => e.target.previousElementSibling.click()}
                >
                    upload avatar
                </button>
                <button type='submit' className='btn-block green' disabled={isLoading}>
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

export default Profile;
