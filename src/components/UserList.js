import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';

const UserList = ({ users, setUsers }) => {
    const { user } = useAuthContext();

    const handleClick = async ({ id, displayName }) => {
        const chatID = user.uid > id ? user.uid + id : id + user.uid;
        try {
            const docSnap = await getDoc(doc(db, `chats/${chatID}`));
            if (docSnap.exists()) {
                console.log('exist');
            } else {
                await setDoc(doc(db, `users/${user.uid}/chats/${chatID}`), {
                    uid: id,
                    displayName,
                    timestamp: serverTimestamp(),
                });
                await setDoc(doc(db, `users/${id}/chats/${chatID}`), {
                    uid: user.uid,
                    displayName: user.displayName,
                    timestamp: serverTimestamp(),
                });
                await setDoc(doc(db, `chats/${chatID}`), {});
            }
            setUsers([]);
        } catch (error) {}
    };

    return (
        <ul className='user-list'>
            {users.map(({ id, displayName }) => {
                return (
                    <li key={id} onClick={() => handleClick({ id, displayName })}>
                        <span>{displayName[0].toUpperCase()}</span>
                        <p>{displayName}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default UserList;
