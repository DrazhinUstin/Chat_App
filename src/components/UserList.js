import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';

const UserList = ({ users, setUsers }) => {
    const { user } = useAuthContext();
    const { setChat } = useChatContext();

    const handleClick = async ({ uid, displayName }) => {
        const chatID = user.uid > uid ? user.uid + uid : uid + user.uid;
        try {
            const docSnap = await getDoc(doc(db, `chats/${chatID}`));
            if (!docSnap.exists()) {
                await setDoc(doc(db, `users/${user.uid}/chats/${chatID}`), {
                    uid,
                    displayName,
                    timestamp: serverTimestamp(),
                });
                await setDoc(doc(db, `users/${uid}/chats/${chatID}`), {
                    uid: user.uid,
                    displayName: user.displayName,
                    timestamp: serverTimestamp(),
                });
                await setDoc(doc(db, `chats/${chatID}`), {});
            }
            setChat({ id: chatID, uid, displayName });
            setUsers([]);
        } catch (error) {}
    };

    return (
        <ul className='user-list'>
            {users.map(({ uid, displayName }) => {
                return (
                    <li key={uid} onClick={() => handleClick({ uid, displayName })}>
                        <span>{displayName[0].toUpperCase()}</span>
                        <p>{displayName}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default UserList;
