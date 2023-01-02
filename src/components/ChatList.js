import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { cutString } from '../utils/helpers';
import Avatar from './Avatar';

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const { user, setIsSidebarOpen } = useAuthContext();
    const { chat, selectChat } = useChatContext();

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

    const handleClick = (chat) => {
        selectChat(chat);
        if (document.documentElement.clientWidth <= 800) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <ul className='chat-list'>
            {chats.map(({ id, uid, displayName, photoURL, lastMessage }) => {
                return (
                    <li
                        key={id}
                        className={id === chat?.id ? 'active' : null}
                        onClick={() => handleClick({ id, uid, displayName, photoURL })}
                    >
                        <Avatar photoURL={photoURL} displayName={displayName} />
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
