import { createContext, useContext, useState } from 'react';
import {
    doc,
    collection,
    getDocs,
    deleteDoc,
    updateDoc,
    query,
    orderBy,
    limit,
    serverTimestamp,
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, auth, storage } from '../services/firebase';

const ChatContext = createContext();
const useChatContext = () => useContext(ChatContext);

const ChatProvider = ({ children }) => {
    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState('');
    const [editMode, setEditMode] = useState(null);

    const selectChat = (chat) => {
        setChat(chat);
        finishEditing();
    };

    const startEditing = (msgID, msg, isLastMsg = false) => {
        setEditMode({ msgID, msg, isLastMsg });
        setMessage(msg);
    };

    const finishEditing = () => {
        setEditMode(null);
        setMessage('');
    };

    const deleteMsg = async (msgID, isLastMsg, fileName) => {
        try {
            await deleteDoc(doc(db, `chats/${chat.id}/messages/${msgID}`));
            if (msgID === editMode?.msgID) finishEditing();
            if (isLastMsg) await updateLastMsg();
            if (fileName) {
                const storageRef = ref(storage, `chats/${chat.id}/${fileName}`);
                await deleteObject(storageRef);
            }
        } catch (error) {}
    };

    const deleteChat = async () => {
        try {
            getDocs(collection(db, `chats/${chat.id}/messages`)).then((snapshot) => {
                snapshot.docs.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                    const { file } = doc.data();
                    if (file) {
                        const fileRef = ref(storage, `chats/${chat.id}/${file.name}`);
                        await deleteObject(fileRef);
                    }
                });
            });
            await deleteDoc(doc(db, `chats/${chat.id}`));
            await deleteDoc(doc(db, `users/${auth.currentUser.uid}/chats/${chat.id}`));
            await deleteDoc(doc(db, `users/${chat.uid}/chats/${chat.id}`));
            selectChat(null);
        } catch (error) {}
    };

    const updateLastMsg = async (lastMessage) => {
        if (!lastMessage) {
            const q = query(
                collection(db, `chats/${chat.id}/messages`),
                orderBy('timestamp', 'desc'),
                limit(1)
            );
            const { docs } = await getDocs(q);
            lastMessage = docs[0]?.data().message || '';
        }
        await updateDoc(doc(db, `users/${auth.currentUser.uid}/chats/${chat.id}`), {
            lastMessage,
            timestamp: serverTimestamp(),
        });
        await updateDoc(doc(db, `users/${chat.uid}/chats/${chat.id}`), {
            lastMessage,
            timestamp: serverTimestamp(),
        });
    };

    return (
        <ChatContext.Provider
            value={{
                chat,
                selectChat,
                message,
                setMessage,
                editMode,
                startEditing,
                finishEditing,
                deleteMsg,
                deleteChat,
                updateLastMsg,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export { ChatProvider, useChatContext };
