import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaEdit, FaImage } from 'react-icons/fa';
import { collection, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../services/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { validateFile } from '../utils/helpers';

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
    const fileRef = useRef(null);

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
                let file = validateFile(fileRef.current.files[0]);
                if (file) {
                    const storageRef = ref(storage, `${id}/${new Date().getTime()}`);
                    await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(storageRef);
                    file = { name: storageRef.name, url };
                    fileRef.current.value = '';
                }
                await addDoc(collection(db, `chats/${id}/messages`), {
                    uid,
                    displayName,
                    message,
                    file,
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

    useEffect(() => {
        if (!editMode) return;
        fileRef.current.previousElementSibling.focus();
    }, [editMode]);

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
                <input
                    type='file'
                    accept='.png, .jpg, .jpeg'
                    style={{ display: 'none' }}
                    ref={fileRef}
                />
                <button
                    type='button'
                    className='btn green'
                    disabled={isLoading || editMode}
                    onClick={() => fileRef.current.click()}
                >
                    <FaImage />
                </button>
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
