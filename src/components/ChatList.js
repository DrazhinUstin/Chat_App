import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const { user } = useAuthContext();
    const { selectChat } = useChatContext();

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
                    <li key={id} onClick={() => selectChat({ id, uid, displayName })}>
                        <span>{displayName[0].toUpperCase()}</span>
                        <p>{displayName}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default ChatList;
