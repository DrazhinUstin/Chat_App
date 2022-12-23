import { useChatContext } from '../context/ChatContext';
import { ChatHeader, MessageList, MessageForm } from './';

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
            <ChatHeader />
            <MessageList />
            <MessageForm />
        </section>
    );
};

export default Chat;
