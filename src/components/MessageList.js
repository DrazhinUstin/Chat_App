import { useState, useEffect, useRef } from 'react';
import {
    collection,
    query,
    orderBy,
    limit,
    onSnapshot,
    getCountFromServer,
} from 'firebase/firestore';
import { db, dbLimit } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { calcMsgTime } from '../utils/helpers';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [msgsAmount, setMsgsAmount] = useState(0);
    const [isViewAll, setIsViewAll] = useState(false);
    const { user } = useAuthContext();
    const { chat, startEditing, deleteMsg } = useChatContext();
    const elemRef = useRef(null);

    useEffect(() => {
        const coll = collection(db, `chats/${chat.id}/messages`);
        const q = !isViewAll
            ? query(coll, orderBy('timestamp', 'desc'), limit(dbLimit))
            : query(coll, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
            if (querySnapshot.metadata.hasPendingWrites) return;
            const messages = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setMessages(messages.reverse());
        });
        return () => unsubscribe();
    }, [chat, isViewAll]);

    useEffect(() => {
        const elem = elemRef.current;
        if (elem) elem.scrollTop = elem.scrollHeight;
        getCountFromServer(collection(db, `chats/${chat.id}/messages`)).then((snapshot) => {
            setMsgsAmount(snapshot.data().count);
        });
    }, [chat, messages]);

    return (
        <ul className='message-list' ref={elemRef}>
            {msgsAmount > dbLimit && (
                <button className='text-link' onClick={() => setIsViewAll(!isViewAll)}>
                    {!isViewAll ? 'view all' : 'show less'}
                </button>
            )}
            {messages.map(({ id, uid, message, file, isEdited, timestamp }, i) => {
                return (
                    <li key={id} className={uid === user.uid ? 'user' : null}>
                        <p>{message}</p>
                        {file && <img src={file.url} alt={file.name} />}
                        <p>
                            {isEdited && 'edited'} {calcMsgTime(timestamp)}
                        </p>
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
