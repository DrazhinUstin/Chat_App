import { useState } from 'react';
import { useChatContext } from '../context/ChatContext';

const ChatHeader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { chat, deleteChat } = useChatContext();

    return (
        <header className='chat-header'>
            <h4>{chat.displayName}</h4>
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
