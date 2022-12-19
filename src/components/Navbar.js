import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useAuthContext();

    return (
        <nav className='navbar'>
            <h4>{user.displayName}</h4>
            <button className='btn' onClick={() => signOut(auth)}>
                sign out
            </button>
        </nav>
    );
};

export default Navbar;
