import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';

const Navbar = () => {
    const { user } = useAuthContext();
    const { setChat } = useChatContext();

    return (
        <nav className='navbar'>
            <h4>{user.displayName}</h4>
            <button
                className='btn'
                onClick={() => {
                    signOut(auth);
                    setChat(null);
                }}
            >
                sign out
            </button>
        </nav>
    );
};

export default Navbar;
