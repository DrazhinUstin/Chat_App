import { createContext, useContext, useState } from 'react';
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebase';

const ChatContext = createContext();
const useChatContext = () => useContext(ChatContext);

const ChatProvider = ({ children }) => {
    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);

    const selectChat = (chat) => {
        setChat(chat);
        finishEditing();
    };

    const startEditing = (msgID, message) => {
        setIsEditing(true);
        setEditID(msgID);
        setMessage(message);
    };

    const finishEditing = () => {
        setIsEditing(false);
        setEditID(null);
        setMessage('');
    };

    const deleteMsg = async (msgID) => {
        try {
            await deleteDoc(doc(db, `chats/${chat.id}/messages/${msgID}`));
            if (msgID === editID) finishEditing();
        } catch (error) {}
    };

    const deleteChat = async () => {
        try {
            getDocs(collection(db, `chats/${chat.id}/messages`)).then((snapshot) => {
                snapshot.docs.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                });
            });
            await deleteDoc(doc(db, `chats/${chat.id}`));
            await deleteDoc(doc(db, `users/${auth.currentUser.uid}/chats/${chat.id}`));
            await deleteDoc(doc(db, `users/${chat.uid}/chats/${chat.id}`));
            selectChat(null);
        } catch (error) {}
    };

    return (
        <ChatContext.Provider
            value={{
                chat,
                selectChat,
                message,
                setMessage,
                isEditing,
                editID,
                startEditing,
                finishEditing,
                deleteMsg,
                deleteChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export { ChatProvider, useChatContext };
