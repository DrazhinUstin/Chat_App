import { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { calcMsgTime } from '../utils/helpers';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const { user } = useAuthContext();
    const { chat, startEditing, deleteMsg } = useChatContext();
    const elemRef = useRef(null);

    useEffect(() => {
        const q = query(collection(db, `chats/${chat.id}/messages`), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setMessages(messages);
        });
        return () => unsubscribe();
    }, [chat]);

    useEffect(() => {
        const elem = elemRef.current;
        if (elem) elem.scrollTop = elem.scrollHeight;
    }, [messages]);

    return (
        <ul className='message-list' ref={elemRef}>
            {messages.map(({ id, uid, message, file, timestamp }, i) => {
                return (
                    <li key={id} className={uid === user.uid ? 'user' : null}>
                        <p>{message}</p>
                        {file && <img src={file.url} alt={file.name} />}
                        <p>{calcMsgTime(timestamp)}</p>
                        {uid === user.uid && (
                            <footer>
                                <button
                                    onClick={() =>
                                        startEditing(id, message, i === messages.length - 1)
                                    }
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() =>
                                        deleteMsg(id, i === messages.length - 1, file?.name)
                                    }
                                >
                                    <FaTrashAlt />
                                </button>
                            </footer>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default MessageList;
