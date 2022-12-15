import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuthContext();

    return (
        <main className='container'>
            <h2>hello, {user.displayName}</h2>
            <button className='btn' onClick={() => signOut(auth)}>
                sign out
            </button>
        </main>
    );
};

export default Home;
