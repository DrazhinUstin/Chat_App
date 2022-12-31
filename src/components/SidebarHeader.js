import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import Avatar from './Avatar';

const SidebarHeader = () => {
    const { user } = useAuthContext();
    const { selectChat } = useChatContext();

    return (
        <header className='sidebar-header'>
            <div>
                <Link to='profile'>
                    <Avatar photoURL={user.photoURL} displayName={user.displayName} />
                </Link>
                <p>{user.displayName}</p>
            </div>
            <button
                className='btn red'
                onClick={() => {
                    signOut(auth);
                    selectChat(null);
                }}
            >
                sign out
            </button>
        </header>
    );
};

export default SidebarHeader;
