import { useState } from 'react';
import { FaPaperPlane, FaEdit } from 'react-icons/fa';
import { collection, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';

const MessageForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {
        user: { uid, displayName },
    } = useAuthContext();
    const {
        chat: { id },
        message,
        setMessage,
        editMode,
        finishEditing,
        updateLastMsg,
    } = useChatContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            if (editMode) {
                await updateDoc(doc(db, `chats/${id}/messages/${editMode.msgID}`), {
                    message,
                });
                editMode.isLastMsg && updateLastMsg();
                finishEditing();
            } else {
                await addDoc(collection(db, `chats/${id}/messages`), {
                    uid,
                    displayName,
                    message,
                    timestamp: Timestamp.now(),
                });
                updateLastMsg(message);
                setMessage('');
            }
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    return (
        <footer>
            <form className='form-flex' onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Type a message...'
                    required
                />
                <button type='submit' className='btn' disabled={isLoading}>
                    {isLoading ? (
                        <span className='btn-spinner'></span>
                    ) : editMode ? (
                        <FaEdit />
                    ) : (
                        <FaPaperPlane />
                    )}
                </button>
            </form>
            {error && <p className='form-error'>{error.message}</p>}
        </footer>
    );
};

export default MessageForm;
