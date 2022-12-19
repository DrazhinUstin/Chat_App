import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const q = query(collection(db, `users/${user.uid}/chats`), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const chats = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setChats(chats);
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <ul className='chat-list'>
            {chats.map(({ id, uid, displayName }) => {
                return (
                    <li key={id}>
                        <span>{displayName[0].toUpperCase()}</span>
                        <p>{displayName}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default ChatList;
