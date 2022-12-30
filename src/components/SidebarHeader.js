import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';

const SidebarHeader = () => {
    const { user } = useAuthContext();
    const { selectChat } = useChatContext();

    return (
        <header className='sidebar-header'>
            <h4>{user.displayName}</h4>
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
