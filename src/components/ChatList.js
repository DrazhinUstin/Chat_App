import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { cutString } from '../utils/helpers';

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const { user } = useAuthContext();
    const { selectChat } = useChatContext();

    useEffect(() => {
        const q = query(collection(db, `users/${user.uid}/chats`), orderBy('timestamp', 'desc'));
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
            {chats.map(({ id, uid, displayName, lastMessage }) => {
                return (
                    <li key={id} onClick={() => selectChat({ id, uid, displayName })}>
                        <span>{displayName[0].toUpperCase()}</span>
                        <div>
                            <p>{displayName}</p>
                            {lastMessage && <p>{cutString(lastMessage)}</p>}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default ChatList;
