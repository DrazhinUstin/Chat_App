import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import Avatar from './Avatar';

const UserList = ({ users, setUsers }) => {
    const { user, setIsSidebarOpen } = useAuthContext();
    const { selectChat } = useChatContext();

    const handleClick = async ({ uid, displayName, photoURL }) => {
        const chatID = user.uid > uid ? user.uid + uid : uid + user.uid;
        try {
            const docSnap = await getDoc(doc(db, `chats/${chatID}`));
            if (!docSnap.exists()) {
                await setDoc(doc(db, `users/${user.uid}/chats/${chatID}`), {
                    uid,
                    displayName,
                    photoURL,
                    timestamp: serverTimestamp(),
                });
                await setDoc(doc(db, `users/${uid}/chats/${chatID}`), {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    timestamp: serverTimestamp(),
                });
                await setDoc(doc(db, `chats/${chatID}`), {});
            }
            selectChat({ id: chatID, uid, displayName, photoURL });
            setUsers([]);
            if (document.documentElement.clientWidth <= 800) {
                setIsSidebarOpen(false);
            }
        } catch (error) {}
    };

    return (
        <ul className='user-list'>
            {users.map(({ uid, displayName, photoURL }) => {
                return (
                    <li key={uid} onClick={() => handleClick({ uid, displayName, photoURL })}>
                        <Avatar photoURL={photoURL} displayName={displayName} />
                        <p>{displayName}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default UserList;
