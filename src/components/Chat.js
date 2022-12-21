import { useChatContext } from '../context/ChatContext';
import { MessageList, MessageForm } from './';

const Chat = () => {
    const { chat } = useChatContext();

    if (!chat) {
        return (
            <section className='section grid-center'>
                <h4>chat not selected...</h4>
            </section>
        );
    }

    return (
        <section className='chat'>
            <header className='chat-header'>
                <h4>{chat.displayName}</h4>
            </header>
            <MessageList />
            <MessageForm />
        </section>
    );
};

export default Chat;
