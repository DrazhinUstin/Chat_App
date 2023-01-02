import { useState } from 'react';
import { useChatContext } from '../context/ChatContext';
import Avatar from './Avatar';

const ChatHeader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { chat, deleteChat } = useChatContext();

    return (
        <header className='chat-header'>
            <div>
                <Avatar photoURL={chat.photoURL} displayName={chat.displayName} />
                <p>{chat.displayName}</p>
            </div>
            <button
                className='btn red'
                disabled={isLoading}
                onClick={async () => {
                    setIsLoading(true);
                    await deleteChat();
                    setIsLoading(false);
                }}
            >
                {isLoading ? <span className='btn-spinner'></span> : 'delete chat'}
            </button>
        </header>
    );
};

export default ChatHeader;
