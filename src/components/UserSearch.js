import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { FaSearch } from 'react-icons/fa';
import UserList from './UserList';

const UserSearch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const displayName = e.target.elements[0].value;
            const q = query(collection(db, 'users'), where('displayName', '==', displayName));
            const { docs } = await getDocs(q);
            if (!docs.length) {
                setError({ message: 'User not found!' });
            }
            setUsers(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    return (
        <>
            <form className='form-flex' onSubmit={handleSubmit}>
                <input type='text' placeholder='Search a user' required />
                <button type='submit' className='btn' disabled={isLoading}>
                    {isLoading ? <span className='btn-spinner'></span> : <FaSearch />}
                </button>
            </form>
            {error && <p className='form-error'>{error.message}</p>}
            {users.length > 0 && <UserList users={users} setUsers={setUsers} />}
        </>
    );
};

export default UserSearch;
