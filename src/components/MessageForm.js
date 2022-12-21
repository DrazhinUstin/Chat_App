import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
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
    } = useChatContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await addDoc(collection(db, `chats/${id}/messages`), {
                uid,
                displayName,
                message: e.target.elements[0].value,
                timestamp: Timestamp.now(),
            });
            e.target.elements[0].value = '';
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    return (
        <footer>
            <form className='form-flex' onSubmit={handleSubmit}>
                <input type='text' placeholder='Type a message...' required />
                <button type='submit' className='btn' disabled={isLoading}>
                    {isLoading ? <span className='btn-spinner'></span> : <FaPaperPlane />}
                </button>
            </form>
            {error && <p className='form-error'>{error.message}</p>}
        </footer>
    );
};

export default MessageForm;
